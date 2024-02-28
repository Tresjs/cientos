<script setup lang="ts">
import { computed, toRefs, watch, shallowRef, useSlots } from 'vue';
import { LineSegments } from 'three';
import { EdgesGeometry } from 'three';
import { TresColor } from '@tresjs/core';

export interface EdgesProps {
    /**
     * Color of the edges.
     *
     * @type {TresColor}
     * @default '#ff0000'
     * @memberof EdgesProps
     *
     */
    color?: TresColor
    /**
    * Show edges only when the angle between two faces surpasses this threshold.
    *
    * @type {number}
    * @default 15
    * @memberof EdgesProps
    *
    **/
    threshold?: number
}

const props = withDefaults(defineProps<EdgesProps>(), {
    threshold: 15,
    color: '#ff0000',
});

const { color, threshold: thresholdAngle } = toRefs(props);

const lineSegmentsRef = shallowRef<LineSegments>();

const slots = useSlots();

const hasChildren = computed(() => !!slots.default);

// Watch for changes in lineSegments, thresholdAngle, and color.
watch(
    () => [lineSegmentsRef.value, thresholdAngle.value],
    ([lineSegments, threshold]) => {
        if (lineSegments) {
            const parent = lineSegments.parent;

            if (parent) {
                const geom = parent.geometry;

                // Update geometry and color if necessary.
                if (
                    geom !== lineSegments.userData.currentGeom ||
                    threshold !== lineSegments.userData.currentThreshold ||
                    color.value !== lineSegments.userData.currentColor
                ) {
                    lineSegments.userData.currentColor = color.value;
                    lineSegments.userData.currentGeom = geom;
                    lineSegments.userData.currentThreshold = threshold;
                    lineSegments.geometry = new EdgesGeometry(geom, threshold);
                }
            }
        }
    }
);
</script>

<template>
    <TresLineSegments ref="lineSegmentsRef" v-bind="$attrs">
        <template v-if="hasChildren">
            <slot />
        </template>
        <template v-else>
            <TresLineBasicMaterial :color="color" />
        </template>
    </TresLineSegments>
</template>
