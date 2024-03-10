<script setup lang="ts">
import { withDefaults, onMounted, onUnmounted, getCurrentInstance, defineProps, nextTick, unref, ref, shallowRef, watchEffect, watch, computed, toRaw, toRefs, reactive, shallowReactive, type ShallowRef, toValue } from 'vue';
import { Vector3, Euler, Texture, Mesh, Intersection, MathUtils } from 'three';
import { DecalGeometry } from 'three-stdlib'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { Box } from '../index'
import { useControls } from '@tresjs/leches'

const instance = getCurrentInstance()
const uid = instance?.uid

export interface DecalProps {
    debug?: boolean;
    depthTest?: boolean;
    polygonOffsetFactor?: number;
    map?: Texture | null;
    mesh?: ShallowRef<Mesh | null>;
    position?: number[];
    orientation?: number[];
    size?: number[];
    normal?: number[];
    order?: number;
}

const props = withDefaults(defineProps<DecalProps>(), {
    debug: false,
    depthTest: false,
    polygonOffsetFactor: -10,
    map: null,
    mesh: () => shallowRef(null),
    position: () => [0, 0, 0],
    orientation: () => [0, 0, 0],
    size: () => [1, 1, 1],
    normal: () => [0, 0, 0],
    order: () => Math.round(Math.random() * 100),
});

const { debug, depthTest, polygonOffsetFactor, mesh, map, position, orientation, size, normal, order } = toRefs(props);

const orbitControlsStarted = ref<boolean>(false);
const onDraggingOrbitControls = ref<boolean>(false);
const sizeControls = ref<Object>({});
const orientationControls = ref<Object>({});

const decalPosition = shallowReactive<Vector3>(new Vector3(...position.value));
const decalOrientation = shallowReactive<Euler>(new Euler(...orientation.value));
const decalSize = shallowReactive<Vector3>(new Vector3(...size.value));
const decalNormal = shallowReactive<Vector3>(new Vector3(...normal.value));

const mouseHelperOrientation = shallowReactive<Euler>(new Euler());

const meshRef = shallowRef<Mesh | null>(null);
const meshLineRef = shallowRef<Mesh | null>(null);
const boxHelperRef = shallowRef<Mesh | null>(null);
const currentIntersect = shallowReactive<Intersection | {}>({});
const decalIntersect = shallowReactive<Intersection | {}>({});

const currentIntersectIsEmpty = computed(() => Object.keys(currentIntersect).length === 0);
const decalIntersectIsEmpty = computed(() => Object.keys(decalIntersect).length === 0);

const { onLoop } = useRenderLoop()
const { raycaster, controls } = useTresContext()

watch(debug, () => {
    // console.log('debug', debug.value)
})

const onExportDecal = () => {
    if (decalIntersectIsEmpty.value) return

    const datas = {
        position: [...toRaw(decalPosition)],
        orientation: [...toRaw(decalOrientation)].slice(0, -1), // delete the EulerOrder
        size: [...toRaw(decalSize)],
        normal: [...decalIntersect.face.normal]
    }

    console.log('↓ —— OBJECT TO COPY —— ↓', datas, '↑ —— OBJECT TO COPY —— ↑')
}

if (debug.value) {
    const { size, orientation } = useControls({
        size: {
            label: 'Size',
            value: decalSize,
            visible: false,
            step: 0.1,
        },
        orientation: {
            label: 'Orientation',
            visible: false,
            value: 0,
            min: -360, // in degrees
            max: 360, // in degrees
            step: 1
        },
        btn: {
            label: 'Export Decal',
            type: 'button',
            onClick: onExportDecal,
            size: 'sm',
        },
    })

    sizeControls.value = size.value
    orientationControls.value = orientation.value
}


watch([sizeControls.value, orientationControls.value], () => {
    makeGeometryDebugMode()
})

watch(controls, () => {
    if (!controls.value || !debug.value) return

    controls.value.addEventListener('start', onStartOrbitControls);
    controls.value.addEventListener('end', onEndOrbitControls);
    controls.value.addEventListener('change', onChangeOrbitControls);

    controls.value.enableDamping = !debug.value; // Very import in debug mode
})

watch(meshLineRef, () => {
    if (!meshLineRef.value) return

    meshLineRef.value.geometry.setFromPoints([new Vector3(), new Vector3()]);
})

watch(decalIntersectIsEmpty, () => {
    sizeControls.value.visible = !decalIntersectIsEmpty.value
    orientationControls.value.visible = !decalIntersectIsEmpty.value
})

watchEffect(() => {
    if (!meshRef?.value) return

    const parent = mesh?.value || meshRef.value.parent

    if (!(parent instanceof Mesh)) {
        throw new Error('Decal must have a Mesh as parent or specify its "mesh" prop')
    }

    if (map.value) {
        meshRef.value.material.map = map.value
    }

    if (decalIntersectIsEmpty.value) {
        makeGeometry()
    }
})

const onStartOrbitControls = () => {
    if (currentIntersectIsEmpty.value && !debug.value) return

    orbitControlsStarted.value = true
}

const onEndOrbitControls = () => {
    if (!debug.value || !boxHelperRef.value?.value) return

    if (!onDraggingOrbitControls.value && !currentIntersectIsEmpty.value) {
        Object.assign(decalIntersect, currentIntersect);
        mouseHelperOrientation.copy(boxHelperRef.value.value.rotation.clone())

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
    if (!meshLineRef.value || !meshRef.value || !boxHelperRef?.value?.value || !debug.value || !controls.value) return;

    const parent = mesh?.value || meshRef.value.parent

    if (!parent) return;

    const intersects = raycaster.value.intersectObject(parent, false);

    if (intersects.length > 0) {
        const { point, face } = intersects[0];

        if (!face) return;

        Object.assign(currentIntersect, intersects[0]);

        const { depth } = boxHelperRef.value.value.geometry.parameters

        const parentMatrixWorld = parent.matrixWorld.clone().invert()
        const p = point.clone().applyMatrix4(parentMatrixWorld)

        boxHelperRef.value.value.position.copy(p);

        const nLookAt = face.normal.clone();
        nLookAt.transformDirection(parent.matrixWorld);
        nLookAt.multiplyScalar(depth);
        nLookAt.add(point);

        const nLineHelper = face.normal.clone();
        nLineHelper.transformDirection(parent.matrixWorld);
        nLineHelper.multiplyScalar(depth * 4);
        nLineHelper.add(point);
        nLineHelper.applyMatrix4(parentMatrixWorld)

        boxHelperRef.value.value.lookAt(nLookAt);

        const positions = meshLineRef.value.geometry.attributes.position;
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
    const parent = mesh?.value || meshRef.value?.parent
    const target = meshRef.value;

    if (!parent || !target) return;

    target.geometry?.dispose();

    parent?.updateMatrixWorld()

    const parentMatrixWorld = parent.matrixWorld.clone().invert();
    const normal = decalIntersect.face.normal.clone();
    const position = decalIntersect.point.clone();
    const size = sizeControls.value.value
    const orientation = mouseHelperOrientation.clone()
    orientation.z -= MathUtils.degToRad(orientationControls.value.value)

    decalPosition.copy(position);
    decalOrientation.copy(orientation);
    decalSize.copy(size);

    target.position.copy(normal).multiplyScalar(0.01);

    target.geometry = new DecalGeometry(parent, decalPosition, decalOrientation, decalSize);
    target.geometry.applyMatrix4(parentMatrixWorld);
}

const makeGeometry = () => {
    const parent = mesh?.value || meshRef.value?.parent
    const target = meshRef.value;

    if (!parent && !target) return;

    target.geometry?.dispose();

    parent?.updateMatrixWorld()

    const parentMatrix = parent.matrixWorld.clone().invert();

    target.geometry = new DecalGeometry(parent, decalPosition, decalOrientation, decalSize);
    target.geometry.applyMatrix4(parentMatrix);

    target.position.copy(new Vector3());
    target.position.add(decalNormal.multiplyScalar(0.01));
}

onUnmounted(() => {
    controls?.value?.removeEventListener('start', onStartOrbitControls);
    controls?.value?.removeEventListener('end', onEndOrbitControls);
    controls?.value?.removeEventListener('change', onChangeOrbitControls);

    meshRef?.value?.geometry?.dispose()
});

defineExpose({
    value: meshRef,
})
</script>

<template>
    <TresMesh ref="meshRef" v-bind="$attrs" :render-order="order" material-transparent material-polygonOffset
        :material-polygonOffsetFactor="polygonOffsetFactor" :material-depthTest="depthTest">
        <slot />
    </TresMesh>

    <TresLine v-if="debug" :visible="!!(!currentIntersectIsEmpty)" ref="meshLineRef">
        <TresBufferGeometry />
        <TresLineBasicMaterial color="#0000ff" />
    </TresLine>

    <Box v-if="debug" :visible="false" ref="boxHelperRef" :args="[.1, .1, 1]">
        <TresMeshNormalMaterial />
    </Box>
</template>