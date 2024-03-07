<script setup lang="ts">
import { withDefaults, onMounted, onUnmounted, defineProps, nextTick, ref, shallowRef, watchEffect, watch, computed, toRefs, reactive, shallowReactive, type ShallowRef } from 'vue';
import { Vector3, Euler, Texture, Mesh, Group, Object3D, Vector2, Intersection, MathUtils } from 'three';
import { DecalGeometry } from 'three-stdlib'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { Box, TransformControls } from '../index'
import { useControls } from '@tresjs/leches'

export interface DecalProps {
    debug?: boolean;
    depthTest?: boolean;
    polygonOffsetFactor?: number;
    map?: Texture | undefined;
    mesh?: ShallowRef<Mesh | null>;
    position?: [number, number, number];
    rotation?: Euler;
    scale?: [number, number, number];
}

const props = withDefaults(defineProps<DecalProps>(), {
    debug: false,
    depthTest: false,
    polygonOffsetFactor: -10,
    map: undefined,
    mesh: () => shallowRef(null),
    position: () => [0, 0, 0],
    rotation: () => new Euler(),
    scale: () => [1, 1, 1],
});

const { debug, depthTest, polygonOffsetFactor, map, mesh, position, rotation, scale } = toRefs(props);

const orbitControlsStarted = ref<boolean>(false);
const onDraggingOrbitControls = ref<boolean>(false);
const decalProjected = ref<boolean>(false);

const decalPosition = shallowReactive<Vector3>(new Vector3(...position.value));
const decalOrientation = shallowReactive<Euler>(rotation.value);
const decalScale = shallowReactive<Vector3>(new Vector3(...scale.value));
const mouseHelperOrientation = shallowReactive<Euler>(new Euler());

const mainRef = shallowRef<Mesh | null>(null);
const lineHelperRef = shallowRef<Mesh | null>(null);
const mouseHelperRef = shallowRef<Mesh | null>(null);
const currentIntersect = shallowReactive<Intersection | {}>({});
const decalIntersect = shallowReactive<Intersection | {}>({});

const intersection = shallowReactive({
    point: new Vector3(),
    normal: new Vector3()
})

const currentIntersectIsEmpty = computed(() => Object.keys(currentIntersect).length === 0);
const decalIntersectIsEmpty = computed(() => Object.keys(decalIntersect).length === 0);

const { onLoop } = useRenderLoop()
const { raycaster, controls } = useTresContext()

watch(debug, () => {
    console.log('debug', debug.value)
})

const onExportDecal = () => {
    if (decalIntersectIsEmpty.value) return

    console.log('decalPosition', decalPosition)
    console.log('decalOrientation', decalOrientation)
    console.log('decalScale', decalScale)
    console.log('normal', decalIntersect.face.normal)
    console.log('mainRef', mainRef.value)
}

const { scaleControls, orientationControls, exportBtn } = useControls({
    scaleControls: {
        label: 'Scale',
        visible: false,
        value: decalScale,
        step: 0.1,
    },
    orientationControls: {
        label: 'Orientation',
        visible: false,
        value: 0,
        min: -360, // in degrees
        max: 360, // in degrees
        step: 1
    },
    exportBtn: {
        label: 'Export Decal',
        type: 'button',
        onClick: onExportDecal,
        size: 'sm',
    },
})


watch([scaleControls.value, orientationControls.value], () => {
    makeGeometryDebugMode()
})

watch(controls, () => {
    controls.value.addEventListener('start', onStartOrbitControls);
    controls.value.addEventListener('end', onEndOrbitControls);
    controls.value.addEventListener('change', onChangeOrbitControls);

    controls.value.enableDamping = false; // Very import in debug mode
})

watch(lineHelperRef, () => {
    lineHelperRef.value.geometry.setFromPoints([new Vector3(), new Vector3()]);
})

watch(mainRef, async () => {
    console.log('mainRef', mainRef)

    if (!debug.value) {
        await nextTick()

        setTimeout(() => {
            makeGeometry()
        }, 2000);
    }
})

watch(decalIntersectIsEmpty, () => {
    scaleControls.value.visible = !decalIntersectIsEmpty.value
    orientationControls.value.visible = !decalIntersectIsEmpty.value
    exportBtn.value.visible = !decalIntersectIsEmpty.value
})

const onStartOrbitControls = () => {
    if (currentIntersectIsEmpty.value && !debug.value) return

    orbitControlsStarted.value = true
}

const onEndOrbitControls = () => {
    if (!debug.value) return

    if (!onDraggingOrbitControls.value && !currentIntersectIsEmpty.value) {
        Object.assign(decalIntersect, currentIntersect);
        mouseHelperOrientation.copy(mouseHelperRef.value.value.rotation.clone())

        makeGeometryDebugMode()
    }

    orbitControlsStarted.value = false
    onDraggingOrbitControls.value = false
}

const onChangeOrbitControls = () => {
    if ((currentIntersectIsEmpty.value || !orbitControlsStarted.value) && !debug.value) return

    onDraggingOrbitControls.value = true
}

onLoop(({ delta, elapsed, clock }) => {
    if (!lineHelperRef.value || !mainRef.value || !mouseHelperRef.value.value || !debug.value || !controls.value) return;

    const parent = mesh?.value || mainRef.value.parent

    if (!parent) return;

    const intersects = raycaster.value.intersectObject(parent, false);

    if (intersects.length > 0) {
        const { point, face } = intersects[0];

        if (!face) return;

        Object.assign(currentIntersect, intersects[0]);

        const { depth, width, height } = mouseHelperRef.value.value.geometry.parameters

        const parentMatrix = parent.matrixWorld.clone().invert()
        const p = point.clone().applyMatrix4(parentMatrix)

        mouseHelperRef.value.value.position.copy(p);
        intersection.point.copy(p);

        const nLookAt = face.normal.clone();
        nLookAt.transformDirection(parent.matrixWorld);
        nLookAt.multiplyScalar(depth);
        nLookAt.add(point);

        const nLineHelper = face.normal.clone();
        nLineHelper.transformDirection(parent.matrixWorld);
        nLineHelper.multiplyScalar(depth * 4);
        nLineHelper.add(point);
        nLineHelper.applyMatrix4(parentMatrix)

        intersection.normal.copy(face.normal);
        mouseHelperRef.value.value.lookAt(nLookAt);

        const positions = lineHelperRef.value.geometry.attributes.position;
        positions.setXYZ(0, p.x, p.y, p.z);
        positions.setXYZ(1, nLineHelper.x, nLineHelper.y, nLineHelper.z);
        positions.needsUpdate = true;
    } else {
        for (const key in currentIntersect) {
            if (Object.hasOwnProperty.call(currentIntersect, key)) {
                delete currentIntersect[key];
            }
        }
    }
});

const makeGeometryDebugMode = () => {
    console.log('makeGeometryDebugMode')

    const parent = mesh?.value || mainRef.value?.parent
    const target = mainRef.value;

    if (!parent || !target) return;

    target.geometry?.dispose();

    const offsetZIndex = 0.001;
    const parentMatrix = parent.matrixWorld.clone().invert();
    const normal = decalIntersect.face.normal.clone();

    const position = decalIntersect.point.clone();
    const orientation = mouseHelperOrientation.clone()
    orientation.z -= MathUtils.degToRad(orientationControls.value.value)

    const scale = scaleControls.value.value

    decalPosition.copy(position);
    decalOrientation.copy(orientation);
    decalScale.copy(scale);

    target.position.copy(normal).multiplyScalar(offsetZIndex);

    target.geometry = new DecalGeometry(parent, decalPosition, decalOrientation, decalScale);
    target.geometry.applyMatrix4(parentMatrix);

    decalProjected.value = true
}

const makeGeometry = () => {
    const parent = mesh?.value || mainRef.value?.parent
    const target = mainRef.value;

    if (!parent || !target) return;

    target.geometry?.dispose();

    const parentMatrix = parent.matrixWorld.clone().invert();

    target.geometry = new DecalGeometry(parent, decalPosition, decalOrientation, decalScale);
    target.geometry.applyMatrix4(parentMatrix);

    console.log(target)






    const positions = target.geometry.getAttribute('position');
    const normals = target.geometry.getAttribute('normal');
    let normalAtPosition = new Vector3();
    let found = false;

    // Parcourir chaque sommet pour trouver une correspondance
    for (let i = 0; i < positions.count; i++) {
        let vertex = new Vector3().fromBufferAttribute(positions, i);

        if (vertex.equals(decalPosition)) {
            // Si le sommet correspond à la position, récupérer la normale correspondante
            normalAtPosition.fromBufferAttribute(normals, i);
            found = true;
            break;
        }
    }

    if (found) {
        console.log('Normale trouvée à la position :', normalAtPosition);
    } else {
        console.log('Aucune normale trouvée pour la position donnée.');
    }



    const normal = new Vector3(0.9148628154432836, 0.08766946862228234, 0.39413207582062515)

    target.position.copy(new Vector3());
    target.position.add(normal.multiplyScalar(0.001));

    console.log(target)
}

watchEffect(() => {
    if (!mainRef?.value) return

    const parent = mesh?.value || mainRef.value.parent

    if (!(parent instanceof Mesh)) {
        throw new Error('Decal must have a Mesh as parent or specify its "mesh" prop')
    }
})

onUnmounted(() => {
    controls?.value?.removeEventListener('start', onStartOrbitControls);
    controls?.value?.removeEventListener('end', onEndOrbitControls);
    controls?.value?.removeEventListener('change', onChangeOrbitControls);

    mainRef?.value?.geometry?.dispose()
});

defineExpose({
    value: mainRef,
})
</script>

<template>
    <TresMesh ref="mainRef" v-bind="$attrs" material-transparent :material-polygonOffset="true"
        :material-polygonOffsetFactor="polygonOffsetFactor" :material-depthTest="depthTest" :material-map="map">
        <slot />
    </TresMesh>

    <TresLine v-if="debug" :visible="!!(!currentIntersectIsEmpty)" ref="lineHelperRef">
        <TresBufferGeometry />
        <TresLineBasicMaterial color="#0000ff" />
    </TresLine>

    <Box v-if="debug" :visible="false" ref="mouseHelperRef" :args="[.1, .1, 1]">
        <TresMeshNormalMaterial />
    </Box>
</template>