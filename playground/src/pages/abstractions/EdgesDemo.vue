<script setup lang="ts">
import { TresCanvas, useTresContext } from "@tresjs/core";
import { PCFSoftShadowMap, SRGBColorSpace, NoToneMapping, MathUtils, Vector3, Color } from "three";
import { Edges, OrbitControls, useGLTF, Levioso, ContactShadows } from "@tresjs/cientos";
import { useControls, TresLeches } from "@tresjs/leches";
import "@tresjs/leches/styles";
import { useWindowSize } from "@vueuse/core";

const gl = {
  powerPreference: "high-performance",
  precision: "highp",
  clearColor: "#F6B03B",
  shadows: true,
  shadowMapType: PCFSoftShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
  toneMappingExposure: 1,
};

const elTresCanvas = shallowRef();
const nodesName = ref(["Shape", "Shape_2", "Shape_4", "Shape_6", "Shape_7", "Shape_8", "Shape_9", "Shape_10", "Shape_11", "Shape_12"]);

const { nodes, scene } = await useGLTF("/edges.glb", { draco: true });

const tresContext = computed(() => elTresCanvas.value?.context);

const { width, height } = useWindowSize();

const optionsEdges = {
  color: "#292929",
  opacity: 0.85,
  threshold: 15,
};

const { EdgesColor, EdgesThreshold, EdgesOpacity } = useControls("Edges", {
  color: { value: optionsEdges.color, type: "color", label: "Color" },
  opacity: {
    label: "Color Opacity",
    value: optionsEdges.opacity,
    min: 0,
    max: 1,
    step: 0.01,
  },
  threshold: {
    label: "Threshold Angle",
    value: optionsEdges.threshold,
    min: 1,
    max: 100,
    step: 1,
  },
});

const optionsAmbientLight = {
  intensity: 1,
  color: "#ffffff",
};

const { AmbientLightIntensity, AmbientLightColor } = useControls("AmbientLight", {
  intensity: {
    label: "Intensity",
    value: optionsAmbientLight.intensity,
    min: 0,
    max: 10,
    step: 0.1,
  },
  color: { value: optionsAmbientLight.color, type: "color", label: "Color" },
});

const optionsDirectionalLight = {
  intensity: 1,
  color: "#ffffff",
  position: new Vector3(2, 5, 2),
};

const { DirectionalLightIntensity, DirectionalLightColor, DirectionalLightPosition } = useControls("DirectionalLight", {
  intensity: {
    label: "Intensity",
    value: optionsDirectionalLight.intensity,
    min: 0,
    max: 10,
    step: 0.1,
  },
  color: { value: optionsDirectionalLight.color, type: "color", label: "Color" },
  position: {
    value: optionsDirectionalLight.position,
    label: "Position",
  },
});

const optionsMaterialPieces = {
  color: "#82DBC5",
};

const { value: MaterialPiecesColor } = useControls("MaterialPieces", {
  color: { value: optionsMaterialPieces.color, type: "color", label: "Color" },
});

watchEffect(() => {
  console.log("watchEffect");
});
</script>

<template>
  <TresLeches />

  <TresCanvas ref="elTresCanvas" v-bind="gl">
    <TresOrthographicCamera :near="1" :far="1000" :position="[312, 318, 500]" :zoom="1" />
    <!-- <TresGridHelper :args="[10, 10]" :position-y="-.25" /> -->

    <ContactShadows :scale="10" :position-y="-0.25" :blur="0.25" :resolution="1024" :opacity="0.25" transparent
      color="#F6B03B" />

    <TresAmbientLight :color="new Color(AmbientLightColor.value)" :intensity="AmbientLightIntensity.value"
      :position-y="5" />

    <TresDirectionalLight cast-shadow :color="new Color(DirectionalLightColor.value)"
      :intensity="DirectionalLightIntensity.value" :position="[...DirectionalLightPosition.value]" />

    <Suspense>
      <TresGroup :position-y="0.25" :scale="0.01" :rotate-y="MathUtils.degToRad(180)">
        <Levioso v-for="(item, index) in nodesName" :key="index + 5" :speed="1 + (index % 4)" :rotation-factor="1"
          :float-factor="0.1">
          <primitive transparent cast-shadow receive-shadow :object="nodes[item]">
            <!-- <TresMeshPhysicalMaterial :transmission="transmission.value" :thickness="thickness.value"
              :roughness="roughness.value" /> -->
            <TresMeshPhysicalMaterial :color="new Color(MaterialPiecesColor)" />

            <Edges :scale="1.01" :threshold="EdgesThreshold.value">
              <TresMeshBasicMaterial :color="EdgesColor.value" :opacity="EdgesOpacity.value" :transparent="true" />
            </Edges>
          </primitive>
        </Levioso>
      </TresGroup>
    </Suspense>

    <OrbitControls make-default auto-rotate :auto-rotate-speed="0.1" enableDamping :enable-pan="false" />
  </TresCanvas>
</template>
