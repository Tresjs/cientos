// src/vite.config.ts
import Unocss from "file:///Users/devusersteven/Documents/clients/me/oss/tres/cientos/node_modules/.pnpm/unocss@0.65.4_postcss@8.5.1_rollup@4.32.0_vite@6.0.11_@types+node@22.10.10_jiti@2.4.2_tsx@4.1_xvzjgdckdeust32jr5j6ndqm5y/node_modules/unocss/dist/vite.mjs";
import Components from "file:///Users/devusersteven/Documents/clients/me/oss/tres/cientos/node_modules/.pnpm/unplugin-vue-components@0.27.5_@babel+parser@7.26.5_rollup@4.32.0_vue@3.5.13_typescript@5.7.3_/node_modules/unplugin-vue-components/dist/vite.js";
import { defineConfig } from "file:///Users/devusersteven/Documents/clients/me/oss/tres/cientos/node_modules/.pnpm/vite@6.0.11_@types+node@22.10.10_jiti@2.4.2_tsx@4.19.2_yaml@2.7.0/node_modules/vite/dist/node/index.js";
import svgLoader from "file:///Users/devusersteven/Documents/clients/me/oss/tres/cientos/node_modules/.pnpm/vite-svg-loader@5.1.0_vue@3.5.13_typescript@5.7.3_/node_modules/vite-svg-loader/index.js";

// src/.vitepress/plugins/markdownTransform.ts
import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

// metadata/index.json
var metadata_default = {
  packages: {
    composables: {
      name: "composables",
      dir: "src/composables",
      categories: [],
      components: []
    },
    core: {
      name: "core",
      dir: "src/core",
      categories: [
        "abstractions",
        "shapes",
        "controls",
        "loaders",
        "staging",
        "misc"
      ],
      components: [
        {
          name: "AnimatedSprite",
          docs: "src/core/AnimatedSprite/index.md",
          path: "src/core/AnimatedSprite",
          package: "core",
          category: "abstractions",
          component: "src/core/AnimatedSprite/component.vue",
          playgrounds: [
            "src/core/AnimatedSprite/playground.vue"
          ]
        },
        {
          name: "Box",
          docs: "src/core/Box/index.md",
          path: "src/core/Box",
          package: "core",
          category: "shapes",
          component: "src/core/Box/component.vue"
        },
        {
          name: "CameraControls",
          docs: "src/core/CameraControls/index.md",
          path: "src/core/CameraControls",
          package: "core",
          category: "controls",
          component: "src/core/CameraControls/component.vue",
          playgrounds: [
            "src/core/CameraControls/playground.vue"
          ]
        },
        {
          name: "CatmullRomCurve3",
          docs: "src/core/CatmullRomCurve3/index.md",
          path: "src/core/CatmullRomCurve3",
          package: "core",
          category: "shapes",
          component: "src/core/CatmullRomCurve3/component.vue",
          playgrounds: [
            "src/core/CatmullRomCurve3/playground.vue"
          ]
        },
        {
          name: "Circle",
          docs: "src/core/Circle/index.md",
          path: "src/core/Circle",
          package: "core",
          category: "shapes",
          component: "src/core/Circle/component.vue"
        },
        {
          name: "Cone",
          docs: "src/core/Cone/index.md",
          path: "src/core/Cone",
          package: "core",
          category: "shapes",
          component: "src/core/Cone/component.vue"
        },
        {
          name: "CubeCamera",
          docs: "src/core/CubeCamera/index.md",
          path: "src/core/CubeCamera",
          package: "core",
          category: "abstractions",
          component: "src/core/CubeCamera/component.vue",
          playgrounds: [
            "src/core/CubeCamera/playground.vue"
          ]
        },
        {
          name: "Cylinder",
          docs: "src/core/Cylinder/index.md",
          path: "src/core/Cylinder",
          package: "core",
          category: "shapes",
          component: "src/core/Cylinder/component.vue",
          playgrounds: [
            "src/core/Cylinder/playground.vue"
          ]
        },
        {
          name: "Dodecahedron",
          docs: "src/core/Dodecahedron/index.md",
          path: "src/core/Dodecahedron",
          package: "core",
          category: "shapes",
          component: "src/core/Dodecahedron/component.vue"
        },
        {
          name: "ExampleComponent",
          docs: "src/core/ExampleComponent/index.md",
          path: "src/core/ExampleComponent",
          package: "core",
          category: "abstractions",
          component: "src/core/ExampleComponent/component.vue",
          playgrounds: [
            "src/core/ExampleComponent/playground.vue"
          ],
          related: [
            "AccumulativeShadows",
            "ContactShadows"
          ]
        },
        {
          name: "GLTF",
          docs: "src/core/GLTF/index.md",
          path: "src/core/GLTF",
          package: "core",
          category: "loaders",
          component: "src/core/GLTF/component.vue",
          fn: "src/core/GLTF/index.ts",
          playgrounds: [
            "src/core/GLTF/playground.vue",
            "src/core/GLTF/playgrounduseGLTF.vue"
          ],
          alias: [
            "GLTFModel"
          ]
        },
        {
          name: "Grid",
          docs: "src/core/Grid/index.md",
          path: "src/core/Grid",
          package: "core",
          category: "staging",
          component: "src/core/Grid/component.vue",
          playgrounds: [
            "src/core/Grid/playground.vue"
          ]
        },
        {
          name: "Html",
          docs: "src/core/Html/index.md",
          path: "src/core/Html",
          package: "core",
          category: "misc",
          component: "src/core/Html/component.vue",
          playgrounds: [
            "src/core/Html/playground.vue"
          ]
        },
        {
          name: "Icosahedron",
          docs: "src/core/Icosahedron/index.md",
          path: "src/core/Icosahedron",
          package: "core",
          category: "shapes",
          component: "src/core/Icosahedron/component.vue"
        },
        {
          name: "KeyboardControls",
          docs: "src/core/KeyboardControls/index.md",
          path: "src/core/KeyboardControls",
          package: "core",
          category: "controls",
          component: "src/core/KeyboardControls/component.vue",
          playgrounds: [
            "src/core/KeyboardControls/playground.vue"
          ]
        },
        {
          name: "Line2",
          docs: "src/core/Line2/index.md",
          path: "src/core/Line2",
          package: "core",
          category: "shapes",
          component: "src/core/Line2/component.vue",
          playgrounds: [
            "src/core/Line2/playground.vue"
          ]
        },
        {
          name: "MapControls",
          docs: "src/core/MapControls/index.md",
          path: "src/core/MapControls",
          package: "core",
          category: "controls",
          component: "src/core/MapControls/component.vue",
          playgrounds: [
            "src/core/MapControls/playground.vue"
          ]
        },
        {
          name: "Octahedron",
          docs: "src/core/Octahedron/index.md",
          path: "src/core/Octahedron",
          package: "core",
          category: "shapes",
          component: "src/core/Octahedron/component.vue"
        },
        {
          name: "OrbitControls",
          docs: "src/core/OrbitControls/index.md",
          path: "src/core/OrbitControls",
          package: "core",
          category: "controls",
          component: "src/core/OrbitControls/component.vue",
          playgrounds: [
            "src/core/OrbitControls/playground.vue"
          ]
        },
        {
          name: "Plane",
          docs: "src/core/Plane/index.md",
          path: "src/core/Plane",
          package: "core",
          category: "shapes",
          component: "src/core/Plane/component.vue"
        },
        {
          name: "PointerLockControls",
          docs: "src/core/PointerLockControls/index.md",
          path: "src/core/PointerLockControls",
          package: "core",
          category: "controls",
          component: "src/core/PointerLockControls/component.vue",
          playgrounds: [
            "src/core/PointerLockControls/playground.vue"
          ]
        },
        {
          name: "Ring",
          docs: "src/core/Ring/index.md",
          path: "src/core/Ring",
          package: "core",
          category: "shapes",
          component: "src/core/Ring/component.vue"
        },
        {
          name: "RoundedBox",
          docs: "src/core/RoundedBox/index.md",
          path: "src/core/RoundedBox",
          package: "core",
          category: "shapes",
          component: "src/core/RoundedBox/component.vue",
          playgrounds: [
            "src/core/RoundedBox/playground.vue"
          ]
        },
        {
          name: "ScrollControls",
          docs: "src/core/ScrollControls/index.md",
          path: "src/core/ScrollControls",
          package: "core",
          category: "controls",
          component: "src/core/ScrollControls/component.vue",
          playgrounds: [
            "src/core/ScrollControls/playground.vue"
          ]
        },
        {
          name: "Sky",
          docs: "src/core/Sky/index.md",
          path: "src/core/Sky",
          package: "core",
          category: "staging",
          component: "src/core/Sky/component.vue",
          playgrounds: [
            "src/core/Sky/playground.vue"
          ]
        },
        {
          name: "Sphere",
          docs: "src/core/Sphere/index.md",
          path: "src/core/Sphere",
          package: "core",
          category: "shapes",
          component: "src/core/Sphere/component.vue"
        },
        {
          name: "StatsGl",
          docs: "src/core/StatsGl/index.md",
          path: "src/core/StatsGl",
          package: "core",
          category: "misc",
          component: "src/core/StatsGl/component.vue"
        },
        {
          name: "Superformula",
          docs: "src/core/Superformula/index.md",
          path: "src/core/Superformula",
          package: "core",
          category: "shapes",
          component: "src/core/Superformula/component.vue",
          playgrounds: [
            "src/core/Superformula/playground.vue"
          ]
        },
        {
          name: "Tetrahedron",
          docs: "src/core/Tetrahedron/index.md",
          path: "src/core/Tetrahedron",
          package: "core",
          category: "shapes",
          component: "src/core/Tetrahedron/component.vue"
        },
        {
          name: "Torus",
          docs: "src/core/Torus/index.md",
          path: "src/core/Torus",
          package: "core",
          category: "shapes",
          component: "src/core/Torus/component.vue"
        },
        {
          name: "TorusKnot",
          docs: "src/core/TorusKnot/index.md",
          path: "src/core/TorusKnot",
          package: "core",
          category: "shapes",
          component: "src/core/TorusKnot/component.vue"
        },
        {
          name: "TransformControls",
          docs: "src/core/TransformControls/index.md",
          path: "src/core/TransformControls",
          package: "core",
          category: "controls",
          component: "src/core/TransformControls/component.vue",
          playgrounds: [
            "src/core/TransformControls/playground.vue"
          ]
        },
        {
          name: "Tube",
          docs: "src/core/Tube/index.md",
          path: "src/core/Tube",
          package: "core",
          category: "shapes",
          component: "src/core/Tube/component.vue"
        }
      ]
    },
    old: {
      name: "old",
      dir: "src/old",
      categories: [],
      components: []
    },
    public: {
      name: "public",
      dir: "src/public",
      categories: [],
      components: []
    },
    utils: {
      name: "utils",
      dir: "src/utils",
      categories: [],
      components: []
    }
  },
  categories: [
    "abstractions",
    "shapes",
    "controls",
    "loaders",
    "staging",
    "misc"
  ],
  components: [
    {
      name: "AnimatedSprite",
      docs: "src/core/AnimatedSprite/index.md",
      path: "src/core/AnimatedSprite",
      package: "core",
      category: "abstractions",
      component: "src/core/AnimatedSprite/component.vue",
      playgrounds: [
        "src/core/AnimatedSprite/playground.vue"
      ]
    },
    {
      name: "Box",
      docs: "src/core/Box/index.md",
      path: "src/core/Box",
      package: "core",
      category: "shapes",
      component: "src/core/Box/component.vue"
    },
    {
      name: "CameraControls",
      docs: "src/core/CameraControls/index.md",
      path: "src/core/CameraControls",
      package: "core",
      category: "controls",
      component: "src/core/CameraControls/component.vue",
      playgrounds: [
        "src/core/CameraControls/playground.vue"
      ]
    },
    {
      name: "CatmullRomCurve3",
      docs: "src/core/CatmullRomCurve3/index.md",
      path: "src/core/CatmullRomCurve3",
      package: "core",
      category: "shapes",
      component: "src/core/CatmullRomCurve3/component.vue",
      playgrounds: [
        "src/core/CatmullRomCurve3/playground.vue"
      ]
    },
    {
      name: "Circle",
      docs: "src/core/Circle/index.md",
      path: "src/core/Circle",
      package: "core",
      category: "shapes",
      component: "src/core/Circle/component.vue"
    },
    {
      name: "Cone",
      docs: "src/core/Cone/index.md",
      path: "src/core/Cone",
      package: "core",
      category: "shapes",
      component: "src/core/Cone/component.vue"
    },
    {
      name: "CubeCamera",
      docs: "src/core/CubeCamera/index.md",
      path: "src/core/CubeCamera",
      package: "core",
      category: "abstractions",
      component: "src/core/CubeCamera/component.vue",
      playgrounds: [
        "src/core/CubeCamera/playground.vue"
      ]
    },
    {
      name: "Cylinder",
      docs: "src/core/Cylinder/index.md",
      path: "src/core/Cylinder",
      package: "core",
      category: "shapes",
      component: "src/core/Cylinder/component.vue",
      playgrounds: [
        "src/core/Cylinder/playground.vue"
      ]
    },
    {
      name: "Dodecahedron",
      docs: "src/core/Dodecahedron/index.md",
      path: "src/core/Dodecahedron",
      package: "core",
      category: "shapes",
      component: "src/core/Dodecahedron/component.vue"
    },
    {
      name: "ExampleComponent",
      docs: "src/core/ExampleComponent/index.md",
      path: "src/core/ExampleComponent",
      package: "core",
      category: "abstractions",
      component: "src/core/ExampleComponent/component.vue",
      playgrounds: [
        "src/core/ExampleComponent/playground.vue"
      ],
      related: [
        "AccumulativeShadows",
        "ContactShadows"
      ]
    },
    {
      name: "GLTF",
      docs: "src/core/GLTF/index.md",
      path: "src/core/GLTF",
      package: "core",
      category: "loaders",
      component: "src/core/GLTF/component.vue",
      fn: "src/core/GLTF/index.ts",
      playgrounds: [
        "src/core/GLTF/playground.vue",
        "src/core/GLTF/playgrounduseGLTF.vue"
      ],
      alias: [
        "GLTFModel"
      ]
    },
    {
      name: "Grid",
      docs: "src/core/Grid/index.md",
      path: "src/core/Grid",
      package: "core",
      category: "staging",
      component: "src/core/Grid/component.vue",
      playgrounds: [
        "src/core/Grid/playground.vue"
      ]
    },
    {
      name: "Html",
      docs: "src/core/Html/index.md",
      path: "src/core/Html",
      package: "core",
      category: "misc",
      component: "src/core/Html/component.vue",
      playgrounds: [
        "src/core/Html/playground.vue"
      ]
    },
    {
      name: "Icosahedron",
      docs: "src/core/Icosahedron/index.md",
      path: "src/core/Icosahedron",
      package: "core",
      category: "shapes",
      component: "src/core/Icosahedron/component.vue"
    },
    {
      name: "KeyboardControls",
      docs: "src/core/KeyboardControls/index.md",
      path: "src/core/KeyboardControls",
      package: "core",
      category: "controls",
      component: "src/core/KeyboardControls/component.vue",
      playgrounds: [
        "src/core/KeyboardControls/playground.vue"
      ]
    },
    {
      name: "Line2",
      docs: "src/core/Line2/index.md",
      path: "src/core/Line2",
      package: "core",
      category: "shapes",
      component: "src/core/Line2/component.vue",
      playgrounds: [
        "src/core/Line2/playground.vue"
      ]
    },
    {
      name: "MapControls",
      docs: "src/core/MapControls/index.md",
      path: "src/core/MapControls",
      package: "core",
      category: "controls",
      component: "src/core/MapControls/component.vue",
      playgrounds: [
        "src/core/MapControls/playground.vue"
      ]
    },
    {
      name: "Octahedron",
      docs: "src/core/Octahedron/index.md",
      path: "src/core/Octahedron",
      package: "core",
      category: "shapes",
      component: "src/core/Octahedron/component.vue"
    },
    {
      name: "OrbitControls",
      docs: "src/core/OrbitControls/index.md",
      path: "src/core/OrbitControls",
      package: "core",
      category: "controls",
      component: "src/core/OrbitControls/component.vue",
      playgrounds: [
        "src/core/OrbitControls/playground.vue"
      ]
    },
    {
      name: "Plane",
      docs: "src/core/Plane/index.md",
      path: "src/core/Plane",
      package: "core",
      category: "shapes",
      component: "src/core/Plane/component.vue"
    },
    {
      name: "PointerLockControls",
      docs: "src/core/PointerLockControls/index.md",
      path: "src/core/PointerLockControls",
      package: "core",
      category: "controls",
      component: "src/core/PointerLockControls/component.vue",
      playgrounds: [
        "src/core/PointerLockControls/playground.vue"
      ]
    },
    {
      name: "Ring",
      docs: "src/core/Ring/index.md",
      path: "src/core/Ring",
      package: "core",
      category: "shapes",
      component: "src/core/Ring/component.vue"
    },
    {
      name: "RoundedBox",
      docs: "src/core/RoundedBox/index.md",
      path: "src/core/RoundedBox",
      package: "core",
      category: "shapes",
      component: "src/core/RoundedBox/component.vue",
      playgrounds: [
        "src/core/RoundedBox/playground.vue"
      ]
    },
    {
      name: "ScrollControls",
      docs: "src/core/ScrollControls/index.md",
      path: "src/core/ScrollControls",
      package: "core",
      category: "controls",
      component: "src/core/ScrollControls/component.vue",
      playgrounds: [
        "src/core/ScrollControls/playground.vue"
      ]
    },
    {
      name: "Sky",
      docs: "src/core/Sky/index.md",
      path: "src/core/Sky",
      package: "core",
      category: "staging",
      component: "src/core/Sky/component.vue",
      playgrounds: [
        "src/core/Sky/playground.vue"
      ]
    },
    {
      name: "Sphere",
      docs: "src/core/Sphere/index.md",
      path: "src/core/Sphere",
      package: "core",
      category: "shapes",
      component: "src/core/Sphere/component.vue"
    },
    {
      name: "StatsGl",
      docs: "src/core/StatsGl/index.md",
      path: "src/core/StatsGl",
      package: "core",
      category: "misc",
      component: "src/core/StatsGl/component.vue"
    },
    {
      name: "Superformula",
      docs: "src/core/Superformula/index.md",
      path: "src/core/Superformula",
      package: "core",
      category: "shapes",
      component: "src/core/Superformula/component.vue",
      playgrounds: [
        "src/core/Superformula/playground.vue"
      ]
    },
    {
      name: "Tetrahedron",
      docs: "src/core/Tetrahedron/index.md",
      path: "src/core/Tetrahedron",
      package: "core",
      category: "shapes",
      component: "src/core/Tetrahedron/component.vue"
    },
    {
      name: "Torus",
      docs: "src/core/Torus/index.md",
      path: "src/core/Torus",
      package: "core",
      category: "shapes",
      component: "src/core/Torus/component.vue"
    },
    {
      name: "TorusKnot",
      docs: "src/core/TorusKnot/index.md",
      path: "src/core/TorusKnot",
      package: "core",
      category: "shapes",
      component: "src/core/TorusKnot/component.vue"
    },
    {
      name: "TransformControls",
      docs: "src/core/TransformControls/index.md",
      path: "src/core/TransformControls",
      package: "core",
      category: "controls",
      component: "src/core/TransformControls/component.vue",
      playgrounds: [
        "src/core/TransformControls/playground.vue"
      ]
    },
    {
      name: "Tube",
      docs: "src/core/Tube/index.md",
      path: "src/core/Tube",
      package: "core",
      category: "shapes",
      component: "src/core/Tube/component.vue"
    }
  ]
};

// metadata/metadata.ts
var metadata = metadata_default;
var components = metadata.components;
var categories = metadata.categories;
var componentNames = components.map((f) => f.name);
var categoryNames = Array.from(categories);
function getComponent(name) {
  return components.find((f) => f.name === name);
}

// src/.vitepress/plugins/markdownTransform.ts
var __vite_injected_original_dirname = "/Users/devusersteven/Documents/clients/me/oss/tres/cientos/src/.vitepress/plugins";
function MarkdownTransform() {
  const DIR_TYPES = resolve(__vite_injected_original_dirname, "../../../dist");
  const hasTypes = existsSync(DIR_TYPES);
  if (!hasTypes) {
    console.warn("No types dist found, run `npm run build:types` first.");
  }
  return {
    name: "cientos-md-transform",
    enforce: "pre",
    async transform(code, id) {
      if (!id.match(/\.md\b/)) {
        return null;
      }
      const [pkg, _name, _] = id.split("/").slice(-3);
      const maybeComponent = components.find((c) => c.docs && id.endsWith(c.docs));
      const name = maybeComponent ? maybeComponent.name : "";
      if (name) {
        const frontmatterEnds = code.indexOf("---\n\n");
        const firstHeader = code.search(/\n#{2,6}\s.+/);
        const sliceIndex = firstHeader < 0 ? frontmatterEnds < 0 ? 0 : frontmatterEnds + 4 : firstHeader;
        const { footer, header } = await getComponentMarkdown(pkg, name);
        if (hasTypes) {
          code = replacer(code, footer, "FOOTER", "tail");
        }
        if (header) {
          code = code.slice(0, sliceIndex) + header + code.slice(sliceIndex);
        }
        code = code.replace(/(# \w+)\n/, `$1

<FunctionInfo fn="${name}"/>
`).replace(/## (Components?(?:\sUsage)?)/i, "## $1\n<LearnMoreComponents />\n\n").replace(/## (Directives?(?:\sUsage)?)/i, "## $1\n<LearnMoreDirectives />\n\n");
      }
      return code;
    }
  };
}
var DIR_SRC = resolve(__vite_injected_original_dirname, "../..");
var GITHUB_BLOB_URL = "https://github.com/Tresjs/cientos/blob/main/src";
async function getComponentMarkdown(pkg, name) {
  const URL = `${GITHUB_BLOB_URL}/${pkg}/${name}`;
  const dirname = join(DIR_SRC, pkg, name);
  const demoPath = ["demo.vue", "demo.client.vue"].find((i) => existsSync(join(dirname, i)));
  const types = await getTypeDefinition(pkg, name);
  if (!types) {
    console.warn(`No types found for ${pkg}/${name}`);
  }
  let typingSection = "";
  const positiveNOrInfinity = (n) => n < 0 ? Number.POSITIVE_INFINITY : n;
  if (types) {
    const trimFromHere = Math.min(
      positiveNOrInfinity(types.indexOf("declare function __VLS_template(): {")),
      positiveNOrInfinity(types.indexOf("declare const _default:"))
    );
    const trimmedTypes = types.trim().substring(0, trimFromHere);
    const code = `\`\`\`typescript
${trimmedTypes}
\`\`\``;
    typingSection = `
## Type Declarations

${code}`;
  }
  const links = [
    ["Source", `${URL}/index.ts`],
    demoPath ? ["Demo", `${URL}/${demoPath}`] : void 0,
    ["Docs", `${URL}/index.md`]
  ].filter((i) => i).map((i) => `[${i[0]}](${i[1]})`).join(" \u2022 ");
  const sourceSection = `## Source

${links}
`;
  const footer = `${typingSection}

${sourceSection}
`;
  return {
    header: "",
    footer
  };
}
function replacer(code, value, key, insert = "none") {
  const START = `<!--${key}_STARTS-->`;
  const END = `<!--${key}_ENDS-->`;
  const regex = new RegExp(`${START}[\\s\\S]*?${END}`, "im");
  const target = value ? `${START}

${value.trim()}

${END}` : `${START}${END}`;
  if (!code.match(regex)) {
    if (insert === "none") {
      return code;
    } else if (insert === "head") {
      return `${target}

${code}`;
    } else {
      return `${code}

${target}`;
    }
  }
  return code.replace(regex, target);
}
async function getTypeDefinition(pkg, name) {
  const component = getComponent(name);
  if (!component) {
    return;
  }
  const DIR_DTS = resolve(__vite_injected_original_dirname, "../../../dist");
  const FILE_DTS = join(DIR_DTS, `${component.path}/component.vue.d.ts`);
  if (!existsSync(FILE_DTS)) {
    return;
  }
  let types = readFileSync(FILE_DTS, "utf-8");
  types = types.replace(/import\(.*?\)\./g, "").replace(/import[\s\S]+?from ?["'][\s\S]+?["']/g, "").replace(/export \{\}/g, "");
  const prettier = await import("file:///Users/devusersteven/Documents/clients/me/oss/tres/cientos/node_modules/.pnpm/prettier@3.4.2/node_modules/prettier/index.mjs");
  return (await prettier.format(
    types,
    {
      semi: false,
      parser: "typescript"
    }
  )).trim();
}

// src/.vitepress/plugins/extractCodeSnippetDemos.ts
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import url from "node:url";
import MarkdownIt from "file:///Users/devusersteven/Documents/clients/me/oss/tres/cientos/node_modules/.pnpm/markdown-it@14.1.0/node_modules/markdown-it/index.mjs";
import matter from "file:///Users/devusersteven/Documents/clients/me/oss/tres/cientos/node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/index.js";
import { parse } from "file:///Users/devusersteven/Documents/clients/me/oss/tres/cientos/node_modules/.pnpm/vue@3.5.13_typescript@5.7.3/node_modules/vue/compiler-sfc/index.mjs";
var __vite_injected_original_import_meta_url = "file:///Users/devusersteven/Documents/clients/me/oss/tres/cientos/src/.vitepress/plugins/extractCodeSnippetDemos.ts";
var __dirname2 = path.dirname(url.fileURLToPath(__vite_injected_original_import_meta_url));
var toAbsolute = (p) => path.resolve(__dirname2, p);
var DEMO_FILES_GLOB = toAbsolute("../../*/*/index.md");
var COMPONENTS_DIRECTORY = toAbsolute("../theme/components");
var COMPONENTS_PREFIX = "CientosCodeSnippetDemo";
function CodeSnippetDemosBuildTransform() {
  return {
    name: "cientos-md-extract-code-snippet-demos",
    enforce: "pre",
    async buildStart() {
      const existingCodeSnippetsDemos = fs.globSync(path.join(COMPONENTS_DIRECTORY, `${COMPONENTS_PREFIX}*.*`));
      await Promise.all(existingCodeSnippetsDemos.map((c) => fsPromises.rm(c)));
      const markdownit = MarkdownIt();
      const paths = fs.globSync(DEMO_FILES_GLOB);
      const pathsContents = await Promise.all(paths.map((p) => fsPromises.readFile(p, "utf-8").then((content) => ({ content, path: p }))));
      await Promise.all(pathsContents.map(({ path: p, content }) => {
        const tokens = markdownit.parse(content, {}).filter((t) => t.tag === "code" && t.info.includes("demo") && t.info.includes("vue"));
        const pieces = p.split(path.sep);
        const componentName = pieces[pieces.length - 2];
        let i = 0;
        return Promise.all(tokens.map((t) => {
          const demoName = `${COMPONENTS_PREFIX}${componentName}Snippet${i++}`;
          const warning = "// NOTE: Automatically generated. Edits will be discarded.\n";
          if (t.content.includes("<!-- demo-control")) {
            const content2 = getDemoWithControls(t.content);
            return fsPromises.writeFile(path.join(COMPONENTS_DIRECTORY, `${demoName}.vue`), warning + content2);
          } else {
            return fsPromises.writeFile(path.join(COMPONENTS_DIRECTORY, `${demoName}.vue`), warning + t.content);
          }
        }));
      }));
    },
    async transform(code, id) {
      console.log("transform");
      const markdownit = MarkdownIt();
      const tokens = markdownit.parse(code, {});
      const codeSnippetDemos = tokens.filter((token) => token.tag === "code" && token.info.includes("demo") && token.info.includes("vue"));
      const pieces = id.split(path.sep);
      const componentName = pieces[pieces.length - 2];
      for (let i = 0; i < codeSnippetDemos.length; i++) {
        const demoName = `${COMPONENTS_PREFIX}${componentName}Snippet${i}`;
        code = code.replace("```vue demo", `<${demoName} />
\`\`\`vue`);
      }
      return code;
    }
  };
}
function getDemoWithControls(srcText) {
  const { script, scriptSetup, template } = parse(srcText).descriptor;
  if (!template || !scriptSetup) {
    return srcText;
  }
  const openAstNodes = [template.ast];
  let controlInfos = [];
  while (openAstNodes.length) {
    const node = openAstNodes.pop();
    if (!node?.children) {
      continue;
    }
    const children = node.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if ("children" in child && child.children) {
        openAstNodes.push(child);
      }
      if (child.loc?.source?.startsWith("<!-- demo-control")) {
        for (let ii = i + 1; ii < children.length; ii++) {
          if (children[ii].type !== 3) {
            const controlInfo = parseControlDefinition(child.loc.source);
            const nextNonCommentSibling = children[ii];
            const propName = controlInfo.prop;
            const prop = propName && nextNonCommentSibling.props ? nextNonCommentSibling.props.filter((p) => [p.rawName, p.name].includes(propName) || [p.rawName, p.name].includes(`:${propName}`))[0] : null;
            if (prop) {
              controlInfo.node = nextNonCommentSibling;
              controlInfo.prop = prop;
              controlInfos.push(controlInfo);
            }
            break;
          }
        }
      }
    }
  }
  controlInfos = controlInfos.filter((c) => c.node !== null);
  const controlInfosByCharOffsetDec = [...controlInfos].sort((a, b) => b.prop.loc.start.offset - a.prop.loc.start.offset);
  controlInfosByCharOffsetDec.forEach((c, i) => {
    c.refName = `demoControlRef${i}`;
    const startI = c.prop.loc.start.offset - template.loc.start.offset;
    const start = template.content.substring(0, startI);
    const endI = c.prop.loc.end.offset - template.loc.start.offset;
    const end = template.content.substring(endI);
    const propName = c.prop.rawName ?? c.prop.name;
    const prefix = propName.startsWith("v-") || propName.startsWith(":") ? "" : ":";
    const propString = `${prefix}${propName}="${c.refName}"`;
    template.content = `${start}${propString}${end}`;
  });
  const controlsComponents = [];
  const controlsRefs = [];
  const controlsImportsSet = /* @__PURE__ */ new Set();
  controlInfos.forEach((c) => {
    const controlType = (() => {
      if ("type" in c) {
        return c.type;
      }
      if (typeof c.value === "string" && c.value.startsWith("#")) {
        return "color";
      }
      if (typeof c.value === "string" && "options" in c) {
        return "select";
      }
      if (typeof c.value === "string") {
        return "text";
      }
      if (typeof c.value === "number") {
        return "range";
      }
      if (typeof c.value === "boolean") {
        return "checkbox";
      }
      if (Array.isArray(c.value) && c.value.length === 3 && c.value.every((n) => typeof n === "number")) {
        return "vector3";
      }
      return null;
    })();
    if (controlType === null) {
      return;
    }
    const rawLabel = c.label ?? c.prop.rawName ?? c.prop.name;
    const label = rawLabel.startsWith(":") ? rawLabel.substring(1) : rawLabel;
    const start = `<DocsDemoControl label="${label}">
`;
    const end = `
</DocsDemoControl>`;
    if (controlType === "checkbox") {
      controlsImportsSet.add("import DocsDemoCheckbox from './DocsDemoCheckbox.vue'");
      controlsComponents.push(`${start}<DocsDemoCheckbox :value="${c.refName}" @change="(v)=>{ ${c.refName} = v }" />${end}`);
      controlsRefs.push(`const ${c.refName} = demoRef(${c.value})`);
    } else if (controlType === "text") {
      controlsImportsSet.add("import DocsDemoText from './DocsDemoText.vue'");
      controlsComponents.push(`${start}<DocsDemoText :value="${c.refName}" @change="(v)=>{ ${c.refName} = v }" />${end}`);
      controlsRefs.push(`const ${c.refName} = demoRef('${c.value}')`);
    } else if (controlType === "color") {
      controlsImportsSet.add("import DocsDemoColor from './DocsDemoColor.vue'");
      controlsComponents.push(`${start}<DocsDemoColor :value="${c.refName}" @change="(v)=>{ ${c.refName} = v }" />${end}`);
      controlsRefs.push(`const ${c.refName} = demoRef('${c.value}')`);
    } else if (controlType === "select") {
      controlsImportsSet.add("import DocsDemoSelect from './DocsDemoSelect.vue'");
      const options = c.options?.map?.((s) => `'${s}'`) ?? `'${c.value}'`;
      controlsComponents.push(`${start}<DocsDemoSelect :options="[${options}]" :value="${c.refName}" @change="(v)=>{ ${c.refName} = v }" />${end}`);
      controlsRefs.push(`const ${c.refName} = demoRef('${c.value}')`);
    } else if (controlType === "range") {
      controlsImportsSet.add("import DocsDemoRange from './DocsDemoRange.vue'");
      const min = typeof c.min === "undefined" ? "" : `:min="${c.min}" `;
      const max = typeof c.max === "undefined" ? "" : `:max="${c.max}" `;
      controlsComponents.push(`${start}<DocsDemoRange ${min}${max}:step="${c.step ?? 0.01}" :value="${c.refName}" @change="(v)=>{ ${c.refName} = v }" />${end}`);
      controlsRefs.push(`const ${c.refName} = demoRef(${c.value})`);
    } else if (controlType === "vector3") {
      controlsImportsSet.add("import DocsDemoRangeVector3 from './DocsDemoRangeVector3.vue'");
      const min = typeof c.min === "undefined" ? "" : `:min="${c.min}" `;
      const max = typeof c.max === "undefined" ? "" : `:max="${c.max}" `;
      controlsComponents.push(`${start}<DocsDemoRangeVector3 ${min}${max}:step="${c.step ?? 0.01}" :value="${c.refName}" @change="(v)=>{ ${c.refName} = v }" />${end}`);
      controlsRefs.push(`const ${c.refName} = demoRef<[number, number, number]>([${c.value}])`);
    }
  });
  const scriptSetupOut = scriptSetup ? `<script setup lang="${scriptSetup.lang}">
import { ref as demoRef } from 'vue'${scriptSetup.content}
import DocsDemoWithControls from './DocsDemoWithControls.vue'
${Array.from(controlsImportsSet).join("\n")}

${controlsRefs.join("\n")}
</script>

` : "";
  const scriptOut = script ? `<script setup lang="${script.lang}">
${script.content}
</script>

` : "";
  const templateOut = template ? `<template>
<DocsDemoWithControls>${template.content}</DocsDemoWithControls>
<div>
${controlsComponents.join("\n")}
</div>
</template>
` : "";
  return `${scriptSetupOut}${scriptOut}${templateOut}`;
}
function parseControlDefinition(definitionString) {
  const childSourceAsFrontmatter = definitionString.split("\n").map((s) => s.trim()).join("\n").replace("<!-- demo-control", "---\nprop: ").replace("-->", "---");
  const controlInfo = matter(childSourceAsFrontmatter).data;
  if ("options" in controlInfo) {
    const splitChar = controlInfo.options.includes(",") ? "," : " ";
    controlInfo.options = controlInfo.options.split(splitChar).map((s) => s.trim()).filter((s) => !!s);
  }
  return controlInfo;
}

// src/vite.config.ts
var vite_config_default = defineConfig({
  plugins: [
    CodeSnippetDemosBuildTransform(),
    MarkdownTransform(),
    svgLoader(),
    Unocss(),
    Components({
      // allow auto load markdown components under `.vitepress/theme/components`
      dirs: [".vitepress/theme/components"],
      extensions: ["vue", "md"],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "components.d.ts"
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL3ZpdGUuY29uZmlnLnRzIiwgInNyYy8udml0ZXByZXNzL3BsdWdpbnMvbWFya2Rvd25UcmFuc2Zvcm0udHMiLCAibWV0YWRhdGEvaW5kZXguanNvbiIsICJtZXRhZGF0YS9tZXRhZGF0YS50cyIsICJzcmMvLnZpdGVwcmVzcy9wbHVnaW5zL2V4dHJhY3RDb2RlU25pcHBldERlbW9zLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2RldnVzZXJzdGV2ZW4vRG9jdW1lbnRzL2NsaWVudHMvbWUvb3NzL3RyZXMvY2llbnRvcy9zcmNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9kZXZ1c2Vyc3RldmVuL0RvY3VtZW50cy9jbGllbnRzL21lL29zcy90cmVzL2NpZW50b3Mvc3JjL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9kZXZ1c2Vyc3RldmVuL0RvY3VtZW50cy9jbGllbnRzL21lL29zcy90cmVzL2NpZW50b3Mvc3JjL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IFVub2NzcyBmcm9tICd1bm9jc3Mvdml0ZSdcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHN2Z0xvYWRlciBmcm9tICd2aXRlLXN2Zy1sb2FkZXInXG5pbXBvcnQgeyBNYXJrZG93blRyYW5zZm9ybSB9IGZyb20gJy4vLnZpdGVwcmVzcy9wbHVnaW5zL21hcmtkb3duVHJhbnNmb3JtJ1xuaW1wb3J0IHsgQ29kZVNuaXBwZXREZW1vc0J1aWxkVHJhbnNmb3JtIH0gZnJvbSAnLi8udml0ZXByZXNzL3BsdWdpbnMvZXh0cmFjdENvZGVTbmlwcGV0RGVtb3MnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICBDb2RlU25pcHBldERlbW9zQnVpbGRUcmFuc2Zvcm0oKSxcbiAgICBNYXJrZG93blRyYW5zZm9ybSgpLFxuICAgIHN2Z0xvYWRlcigpLFxuICAgIFVub2NzcygpLFxuICAgIENvbXBvbmVudHMoe1xuICAgICAgLy8gYWxsb3cgYXV0byBsb2FkIG1hcmtkb3duIGNvbXBvbmVudHMgdW5kZXIgYC52aXRlcHJlc3MvdGhlbWUvY29tcG9uZW50c2BcbiAgICAgIGRpcnM6IFsnLnZpdGVwcmVzcy90aGVtZS9jb21wb25lbnRzJ10sXG4gICAgICBleHRlbnNpb25zOiBbJ3Z1ZScsICdtZCddLFxuICAgICAgLy8gYWxsb3cgYXV0byBpbXBvcnQgYW5kIHJlZ2lzdGVyIGNvbXBvbmVudHMgdXNlZCBpbiBtYXJrZG93blxuICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC9cXC5tZCQvXSxcbiAgICAgIGR0czogJ2NvbXBvbmVudHMuZC50cycsXG4gICAgfSksXG4gIF0sXG59KVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZGV2dXNlcnN0ZXZlbi9Eb2N1bWVudHMvY2xpZW50cy9tZS9vc3MvdHJlcy9jaWVudG9zL3NyYy8udml0ZXByZXNzL3BsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9kZXZ1c2Vyc3RldmVuL0RvY3VtZW50cy9jbGllbnRzL21lL29zcy90cmVzL2NpZW50b3Mvc3JjLy52aXRlcHJlc3MvcGx1Z2lucy9tYXJrZG93blRyYW5zZm9ybS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZGV2dXNlcnN0ZXZlbi9Eb2N1bWVudHMvY2xpZW50cy9tZS9vc3MvdHJlcy9jaWVudG9zL3NyYy8udml0ZXByZXNzL3BsdWdpbnMvbWFya2Rvd25UcmFuc2Zvcm0udHNcIjtpbXBvcnQgdHlwZSB7IFBsdWdpbiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyBleGlzdHNTeW5jLCByZWFkRmlsZVN5bmMgfSBmcm9tICdub2RlOmZzJ1xuaW1wb3J0IHsgam9pbiwgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCdcbmltcG9ydCB7IGNvbXBvbmVudHMsIGdldENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL21ldGFkYXRhL21ldGFkYXRhJ1xuXG5leHBvcnQgZnVuY3Rpb24gTWFya2Rvd25UcmFuc2Zvcm0oKTogUGx1Z2luIHtcbiAgY29uc3QgRElSX1RZUEVTID0gcmVzb2x2ZShfX2Rpcm5hbWUsICcuLi8uLi8uLi9kaXN0JylcbiAgY29uc3QgaGFzVHlwZXMgPSBleGlzdHNTeW5jKERJUl9UWVBFUylcblxuICBpZiAoIWhhc1R5cGVzKSB7IGNvbnNvbGUud2FybignTm8gdHlwZXMgZGlzdCBmb3VuZCwgcnVuIGBucG0gcnVuIGJ1aWxkOnR5cGVzYCBmaXJzdC4nKSB9XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAnY2llbnRvcy1tZC10cmFuc2Zvcm0nLFxuICAgIGVuZm9yY2U6ICdwcmUnLFxuICAgIGFzeW5jIHRyYW5zZm9ybShjb2RlLCBpZCkge1xuICAgICAgaWYgKCFpZC5tYXRjaCgvXFwubWRcXGIvKSkgeyByZXR1cm4gbnVsbCB9XG4gICAgICBjb25zdCBbcGtnLCBfbmFtZSwgX10gPSBpZC5zcGxpdCgnLycpLnNsaWNlKC0zKVxuXG4gICAgICBjb25zdCBtYXliZUNvbXBvbmVudCA9IGNvbXBvbmVudHMuZmluZChjID0+IGMuZG9jcyAmJiBpZC5lbmRzV2l0aChjLmRvY3MpKVxuXG4gICAgICBjb25zdCBuYW1lID0gbWF5YmVDb21wb25lbnQgPyBtYXliZUNvbXBvbmVudC5uYW1lIDogJydcblxuICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgY29uc3QgZnJvbnRtYXR0ZXJFbmRzID0gY29kZS5pbmRleE9mKCctLS1cXG5cXG4nKVxuICAgICAgICBjb25zdCBmaXJzdEhlYWRlciA9IGNvZGUuc2VhcmNoKC9cXG4jezIsNn1cXHMuKy8pXG4gICAgICAgIGNvbnN0IHNsaWNlSW5kZXggPSBmaXJzdEhlYWRlciA8IDAgPyBmcm9udG1hdHRlckVuZHMgPCAwID8gMCA6IGZyb250bWF0dGVyRW5kcyArIDQgOiBmaXJzdEhlYWRlclxuXG4gICAgICAgIGNvbnN0IHsgZm9vdGVyLCBoZWFkZXIgfSA9IGF3YWl0IGdldENvbXBvbmVudE1hcmtkb3duKHBrZywgbmFtZSlcblxuICAgICAgICBpZiAoaGFzVHlwZXMpIHtcbiAgICAgICAgICBjb2RlID0gcmVwbGFjZXIoY29kZSwgZm9vdGVyLCAnRk9PVEVSJywgJ3RhaWwnKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhlYWRlcikge1xuICAgICAgICAgIGNvZGUgPSBjb2RlLnNsaWNlKDAsIHNsaWNlSW5kZXgpICsgaGVhZGVyICsgY29kZS5zbGljZShzbGljZUluZGV4KVxuICAgICAgICB9XG5cbiAgICAgICAgY29kZSA9IGNvZGVcbiAgICAgICAgICAucmVwbGFjZSgvKCMgXFx3KylcXG4vLCBgJDFcXG5cXG48RnVuY3Rpb25JbmZvIGZuPVwiJHtuYW1lfVwiLz5cXG5gKVxuICAgICAgICAgIC5yZXBsYWNlKC8jIyAoQ29tcG9uZW50cz8oPzpcXHNVc2FnZSk/KS9pLCAnIyMgJDFcXG48TGVhcm5Nb3JlQ29tcG9uZW50cyAvPlxcblxcbicpXG4gICAgICAgICAgLnJlcGxhY2UoLyMjIChEaXJlY3RpdmVzPyg/Olxcc1VzYWdlKT8pL2ksICcjIyAkMVxcbjxMZWFybk1vcmVEaXJlY3RpdmVzIC8+XFxuXFxuJylcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvZGVcbiAgICB9LFxuICB9XG59XG5cbmNvbnN0IERJUl9TUkMgPSByZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uJylcbmNvbnN0IEdJVEhVQl9CTE9CX1VSTCA9ICdodHRwczovL2dpdGh1Yi5jb20vVHJlc2pzL2NpZW50b3MvYmxvYi9tYWluL3NyYydcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENvbXBvbmVudE1hcmtkb3duKHBrZzogc3RyaW5nLCBuYW1lOiBzdHJpbmcpIHtcbiAgY29uc3QgVVJMID0gYCR7R0lUSFVCX0JMT0JfVVJMfS8ke3BrZ30vJHtuYW1lfWBcblxuICBjb25zdCBkaXJuYW1lID0gam9pbihESVJfU1JDLCBwa2csIG5hbWUpXG4gIGNvbnN0IGRlbW9QYXRoID0gWydkZW1vLnZ1ZScsICdkZW1vLmNsaWVudC52dWUnXS5maW5kKGkgPT4gZXhpc3RzU3luYyhqb2luKGRpcm5hbWUsIGkpKSlcbiAgY29uc3QgdHlwZXMgPSBhd2FpdCBnZXRUeXBlRGVmaW5pdGlvbihwa2csIG5hbWUpXG5cbiAgaWYgKCF0eXBlcykgeyBjb25zb2xlLndhcm4oYE5vIHR5cGVzIGZvdW5kIGZvciAke3BrZ30vJHtuYW1lfWApIH1cblxuICBsZXQgdHlwaW5nU2VjdGlvbiA9ICcnXG5cbiAgY29uc3QgcG9zaXRpdmVOT3JJbmZpbml0eSA9IChuOiBudW1iZXIpID0+IG4gPCAwID8gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZIDogblxuXG4gIGlmICh0eXBlcykge1xuICAgIC8vIE5PVEU6IFR5cGVzIGFycml2ZSB3aXRoIGEgbG90IG9mIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGNydWZ0LlxuICAgIC8vIFRyaW0gaXQgb2ZmLlxuICAgIGNvbnN0IHRyaW1Gcm9tSGVyZSA9IE1hdGgubWluKFxuICAgICAgcG9zaXRpdmVOT3JJbmZpbml0eSh0eXBlcy5pbmRleE9mKCdkZWNsYXJlIGZ1bmN0aW9uIF9fVkxTX3RlbXBsYXRlKCk6IHsnKSksXG4gICAgICBwb3NpdGl2ZU5PckluZmluaXR5KHR5cGVzLmluZGV4T2YoJ2RlY2xhcmUgY29uc3QgX2RlZmF1bHQ6JykpLFxuICAgIClcbiAgICBjb25zdCB0cmltbWVkVHlwZXMgPSB0eXBlcy50cmltKCkuc3Vic3RyaW5nKDAsIHRyaW1Gcm9tSGVyZSlcblxuICAgIGNvbnN0IGNvZGUgPSBgXFxgXFxgXFxgdHlwZXNjcmlwdFxcbiR7dHJpbW1lZFR5cGVzfVxcblxcYFxcYFxcYGBcbiAgICB0eXBpbmdTZWN0aW9uID0gYFxcbiMjIFR5cGUgRGVjbGFyYXRpb25zXFxuXFxuJHtjb2RlfWBcbiAgfVxuXG4gIGNvbnN0IGxpbmtzID0gKFtcbiAgICBbJ1NvdXJjZScsIGAke1VSTH0vaW5kZXgudHNgXSxcbiAgICBkZW1vUGF0aCA/IFsnRGVtbycsIGAke1VSTH0vJHtkZW1vUGF0aH1gXSA6IHVuZGVmaW5lZCxcbiAgICBbJ0RvY3MnLCBgJHtVUkx9L2luZGV4Lm1kYF0sXG4gIF0pXG4gICAgLmZpbHRlcihpID0+IGkpXG4gICAgLm1hcChpID0+IGBbJHtpIVswXX1dKCR7aSFbMV19KWApXG4gICAgLmpvaW4oJyBcdTIwMjIgJylcblxuICBjb25zdCBzb3VyY2VTZWN0aW9uID0gYCMjIFNvdXJjZVxcblxcbiR7bGlua3N9XFxuYFxuXG4gIGNvbnN0IGZvb3RlciA9IGAke3R5cGluZ1NlY3Rpb259XFxuXFxuJHtzb3VyY2VTZWN0aW9ufVxcbmBcblxuICByZXR1cm4ge1xuICAgIGhlYWRlcjogJycsXG4gICAgZm9vdGVyLFxuICB9XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VyKGNvZGU6IHN0cmluZywgdmFsdWU6IHN0cmluZywga2V5OiBzdHJpbmcsIGluc2VydDogJ2hlYWQnIHwgJ3RhaWwnIHwgJ25vbmUnID0gJ25vbmUnKSB7XG4gIGNvbnN0IFNUQVJUID0gYDwhLS0ke2tleX1fU1RBUlRTLS0+YFxuICBjb25zdCBFTkQgPSBgPCEtLSR7a2V5fV9FTkRTLS0+YFxuICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYCR7U1RBUlR9W1xcXFxzXFxcXFNdKj8ke0VORH1gLCAnaW0nKVxuXG4gIGNvbnN0IHRhcmdldCA9IHZhbHVlID8gYCR7U1RBUlR9XFxuXFxuJHt2YWx1ZS50cmltKCl9XFxuXFxuJHtFTkR9YCA6IGAke1NUQVJUfSR7RU5EfWBcblxuICBpZiAoIWNvZGUubWF0Y2gocmVnZXgpKSB7XG4gICAgaWYgKGluc2VydCA9PT0gJ25vbmUnKSB7IHJldHVybiBjb2RlIH1cbiAgICBlbHNlIGlmIChpbnNlcnQgPT09ICdoZWFkJykgeyByZXR1cm4gYCR7dGFyZ2V0fVxcblxcbiR7Y29kZX1gIH1cbiAgICBlbHNlIHsgcmV0dXJuIGAke2NvZGV9XFxuXFxuJHt0YXJnZXR9YCB9XG4gIH1cblxuICByZXR1cm4gY29kZS5yZXBsYWNlKHJlZ2V4LCB0YXJnZXQpXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUeXBlRGVmaW5pdGlvbihwa2c6IHN0cmluZywgbmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmcgfCB1bmRlZmluZWQ+IHtcbiAgY29uc3QgY29tcG9uZW50ID0gZ2V0Q29tcG9uZW50KG5hbWUpXG4gIGlmICghY29tcG9uZW50KSB7IHJldHVybiB9XG5cbiAgY29uc3QgRElSX0RUUyA9IHJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vLi4vZGlzdCcpXG4gIGNvbnN0IEZJTEVfRFRTID0gam9pbihESVJfRFRTLCBgJHtjb21wb25lbnQucGF0aH0vY29tcG9uZW50LnZ1ZS5kLnRzYClcblxuICBpZiAoIWV4aXN0c1N5bmMoRklMRV9EVFMpKSB7IHJldHVybiB9XG5cbiAgbGV0IHR5cGVzID0gcmVhZEZpbGVTeW5jKEZJTEVfRFRTLCAndXRmLTgnKVxuXG4gIC8vIE5PVEU6IGNsZWFuIHVwIHR5cGVzXG4gIHR5cGVzID0gdHlwZXNcbiAgICAucmVwbGFjZSgvaW1wb3J0XFwoLio/XFwpXFwuL2csICcnKVxuICAgIC5yZXBsYWNlKC9pbXBvcnRbXFxzXFxTXSs/ZnJvbSA/W1wiJ11bXFxzXFxTXSs/W1wiJ10vZywgJycpXG4gICAgLnJlcGxhY2UoL2V4cG9ydCBcXHtcXH0vZywgJycpXG5cbiAgY29uc3QgcHJldHRpZXIgPSBhd2FpdCBpbXBvcnQoJ3ByZXR0aWVyJylcbiAgcmV0dXJuIChhd2FpdCBwcmV0dGllclxuICAgIC5mb3JtYXQoXG4gICAgICB0eXBlcyxcbiAgICAgIHtcbiAgICAgICAgc2VtaTogZmFsc2UsXG4gICAgICAgIHBhcnNlcjogJ3R5cGVzY3JpcHQnLFxuICAgICAgfSxcbiAgICApKVxuICAgIC50cmltKClcbn1cbiIsICJ7XG4gIFwicGFja2FnZXNcIjoge1xuICAgIFwiY29tcG9zYWJsZXNcIjoge1xuICAgICAgXCJuYW1lXCI6IFwiY29tcG9zYWJsZXNcIixcbiAgICAgIFwiZGlyXCI6IFwic3JjL2NvbXBvc2FibGVzXCIsXG4gICAgICBcImNhdGVnb3JpZXNcIjogW10sXG4gICAgICBcImNvbXBvbmVudHNcIjogW11cbiAgICB9LFxuICAgIFwiY29yZVwiOiB7XG4gICAgICBcIm5hbWVcIjogXCJjb3JlXCIsXG4gICAgICBcImRpclwiOiBcInNyYy9jb3JlXCIsXG4gICAgICBcImNhdGVnb3JpZXNcIjogW1xuICAgICAgICBcImFic3RyYWN0aW9uc1wiLFxuICAgICAgICBcInNoYXBlc1wiLFxuICAgICAgICBcImNvbnRyb2xzXCIsXG4gICAgICAgIFwibG9hZGVyc1wiLFxuICAgICAgICBcInN0YWdpbmdcIixcbiAgICAgICAgXCJtaXNjXCJcbiAgICAgIF0sXG4gICAgICBcImNvbXBvbmVudHNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQW5pbWF0ZWRTcHJpdGVcIixcbiAgICAgICAgICBcImRvY3NcIjogXCJzcmMvY29yZS9BbmltYXRlZFNwcml0ZS9pbmRleC5tZFwiLFxuICAgICAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL0FuaW1hdGVkU3ByaXRlXCIsXG4gICAgICAgICAgXCJwYWNrYWdlXCI6IFwiY29yZVwiLFxuICAgICAgICAgIFwiY2F0ZWdvcnlcIjogXCJhYnN0cmFjdGlvbnNcIixcbiAgICAgICAgICBcImNvbXBvbmVudFwiOiBcInNyYy9jb3JlL0FuaW1hdGVkU3ByaXRlL2NvbXBvbmVudC52dWVcIixcbiAgICAgICAgICBcInBsYXlncm91bmRzXCI6IFtcbiAgICAgICAgICAgIFwic3JjL2NvcmUvQW5pbWF0ZWRTcHJpdGUvcGxheWdyb3VuZC52dWVcIlxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkJveFwiLFxuICAgICAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL0JveC9pbmRleC5tZFwiLFxuICAgICAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL0JveFwiLFxuICAgICAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgICAgICBcImNhdGVnb3J5XCI6IFwic2hhcGVzXCIsXG4gICAgICAgICAgXCJjb21wb25lbnRcIjogXCJzcmMvY29yZS9Cb3gvY29tcG9uZW50LnZ1ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJDYW1lcmFDb250cm9sc1wiLFxuICAgICAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL0NhbWVyYUNvbnRyb2xzL2luZGV4Lm1kXCIsXG4gICAgICAgICAgXCJwYXRoXCI6IFwic3JjL2NvcmUvQ2FtZXJhQ29udHJvbHNcIixcbiAgICAgICAgICBcInBhY2thZ2VcIjogXCJjb3JlXCIsXG4gICAgICAgICAgXCJjYXRlZ29yeVwiOiBcImNvbnRyb2xzXCIsXG4gICAgICAgICAgXCJjb21wb25lbnRcIjogXCJzcmMvY29yZS9DYW1lcmFDb250cm9scy9jb21wb25lbnQudnVlXCIsXG4gICAgICAgICAgXCJwbGF5Z3JvdW5kc1wiOiBbXG4gICAgICAgICAgICBcInNyYy9jb3JlL0NhbWVyYUNvbnRyb2xzL3BsYXlncm91bmQudnVlXCJcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJDYXRtdWxsUm9tQ3VydmUzXCIsXG4gICAgICAgICAgXCJkb2NzXCI6IFwic3JjL2NvcmUvQ2F0bXVsbFJvbUN1cnZlMy9pbmRleC5tZFwiLFxuICAgICAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL0NhdG11bGxSb21DdXJ2ZTNcIixcbiAgICAgICAgICBcInBhY2thZ2VcIjogXCJjb3JlXCIsXG4gICAgICAgICAgXCJjYXRlZ29yeVwiOiBcInNoYXBlc1wiLFxuICAgICAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvQ2F0bXVsbFJvbUN1cnZlMy9jb21wb25lbnQudnVlXCIsXG4gICAgICAgICAgXCJwbGF5Z3JvdW5kc1wiOiBbXG4gICAgICAgICAgICBcInNyYy9jb3JlL0NhdG11bGxSb21DdXJ2ZTMvcGxheWdyb3VuZC52dWVcIlxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkNpcmNsZVwiLFxuICAgICAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL0NpcmNsZS9pbmRleC5tZFwiLFxuICAgICAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL0NpcmNsZVwiLFxuICAgICAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgICAgICBcImNhdGVnb3J5XCI6IFwic2hhcGVzXCIsXG4gICAgICAgICAgXCJjb21wb25lbnRcIjogXCJzcmMvY29yZS9DaXJjbGUvY29tcG9uZW50LnZ1ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJDb25lXCIsXG4gICAgICAgICAgXCJkb2NzXCI6IFwic3JjL2NvcmUvQ29uZS9pbmRleC5tZFwiLFxuICAgICAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL0NvbmVcIixcbiAgICAgICAgICBcInBhY2thZ2VcIjogXCJjb3JlXCIsXG4gICAgICAgICAgXCJjYXRlZ29yeVwiOiBcInNoYXBlc1wiLFxuICAgICAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvQ29uZS9jb21wb25lbnQudnVlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkN1YmVDYW1lcmFcIixcbiAgICAgICAgICBcImRvY3NcIjogXCJzcmMvY29yZS9DdWJlQ2FtZXJhL2luZGV4Lm1kXCIsXG4gICAgICAgICAgXCJwYXRoXCI6IFwic3JjL2NvcmUvQ3ViZUNhbWVyYVwiLFxuICAgICAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgICAgICBcImNhdGVnb3J5XCI6IFwiYWJzdHJhY3Rpb25zXCIsXG4gICAgICAgICAgXCJjb21wb25lbnRcIjogXCJzcmMvY29yZS9DdWJlQ2FtZXJhL2NvbXBvbmVudC52dWVcIixcbiAgICAgICAgICBcInBsYXlncm91bmRzXCI6IFtcbiAgICAgICAgICAgIFwic3JjL2NvcmUvQ3ViZUNhbWVyYS9wbGF5Z3JvdW5kLnZ1ZVwiXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQ3lsaW5kZXJcIixcbiAgICAgICAgICBcImRvY3NcIjogXCJzcmMvY29yZS9DeWxpbmRlci9pbmRleC5tZFwiLFxuICAgICAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL0N5bGluZGVyXCIsXG4gICAgICAgICAgXCJwYWNrYWdlXCI6IFwiY29yZVwiLFxuICAgICAgICAgIFwiY2F0ZWdvcnlcIjogXCJzaGFwZXNcIixcbiAgICAgICAgICBcImNvbXBvbmVudFwiOiBcInNyYy9jb3JlL0N5bGluZGVyL2NvbXBvbmVudC52dWVcIixcbiAgICAgICAgICBcInBsYXlncm91bmRzXCI6IFtcbiAgICAgICAgICAgIFwic3JjL2NvcmUvQ3lsaW5kZXIvcGxheWdyb3VuZC52dWVcIlxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkRvZGVjYWhlZHJvblwiLFxuICAgICAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL0RvZGVjYWhlZHJvbi9pbmRleC5tZFwiLFxuICAgICAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL0RvZGVjYWhlZHJvblwiLFxuICAgICAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgICAgICBcImNhdGVnb3J5XCI6IFwic2hhcGVzXCIsXG4gICAgICAgICAgXCJjb21wb25lbnRcIjogXCJzcmMvY29yZS9Eb2RlY2FoZWRyb24vY29tcG9uZW50LnZ1ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJFeGFtcGxlQ29tcG9uZW50XCIsXG4gICAgICAgICAgXCJkb2NzXCI6IFwic3JjL2NvcmUvRXhhbXBsZUNvbXBvbmVudC9pbmRleC5tZFwiLFxuICAgICAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL0V4YW1wbGVDb21wb25lbnRcIixcbiAgICAgICAgICBcInBhY2thZ2VcIjogXCJjb3JlXCIsXG4gICAgICAgICAgXCJjYXRlZ29yeVwiOiBcImFic3RyYWN0aW9uc1wiLFxuICAgICAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvRXhhbXBsZUNvbXBvbmVudC9jb21wb25lbnQudnVlXCIsXG4gICAgICAgICAgXCJwbGF5Z3JvdW5kc1wiOiBbXG4gICAgICAgICAgICBcInNyYy9jb3JlL0V4YW1wbGVDb21wb25lbnQvcGxheWdyb3VuZC52dWVcIlxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJyZWxhdGVkXCI6IFtcbiAgICAgICAgICAgIFwiQWNjdW11bGF0aXZlU2hhZG93c1wiLFxuICAgICAgICAgICAgXCJDb250YWN0U2hhZG93c1wiXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiR0xURlwiLFxuICAgICAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL0dMVEYvaW5kZXgubWRcIixcbiAgICAgICAgICBcInBhdGhcIjogXCJzcmMvY29yZS9HTFRGXCIsXG4gICAgICAgICAgXCJwYWNrYWdlXCI6IFwiY29yZVwiLFxuICAgICAgICAgIFwiY2F0ZWdvcnlcIjogXCJsb2FkZXJzXCIsXG4gICAgICAgICAgXCJjb21wb25lbnRcIjogXCJzcmMvY29yZS9HTFRGL2NvbXBvbmVudC52dWVcIixcbiAgICAgICAgICBcImZuXCI6IFwic3JjL2NvcmUvR0xURi9pbmRleC50c1wiLFxuICAgICAgICAgIFwicGxheWdyb3VuZHNcIjogW1xuICAgICAgICAgICAgXCJzcmMvY29yZS9HTFRGL3BsYXlncm91bmQudnVlXCIsXG4gICAgICAgICAgICBcInNyYy9jb3JlL0dMVEYvcGxheWdyb3VuZHVzZUdMVEYudnVlXCJcbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiYWxpYXNcIjogW1xuICAgICAgICAgICAgXCJHTFRGTW9kZWxcIlxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkdyaWRcIixcbiAgICAgICAgICBcImRvY3NcIjogXCJzcmMvY29yZS9HcmlkL2luZGV4Lm1kXCIsXG4gICAgICAgICAgXCJwYXRoXCI6IFwic3JjL2NvcmUvR3JpZFwiLFxuICAgICAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgICAgICBcImNhdGVnb3J5XCI6IFwic3RhZ2luZ1wiLFxuICAgICAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvR3JpZC9jb21wb25lbnQudnVlXCIsXG4gICAgICAgICAgXCJwbGF5Z3JvdW5kc1wiOiBbXG4gICAgICAgICAgICBcInNyYy9jb3JlL0dyaWQvcGxheWdyb3VuZC52dWVcIlxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkh0bWxcIixcbiAgICAgICAgICBcImRvY3NcIjogXCJzcmMvY29yZS9IdG1sL2luZGV4Lm1kXCIsXG4gICAgICAgICAgXCJwYXRoXCI6IFwic3JjL2NvcmUvSHRtbFwiLFxuICAgICAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgICAgICBcImNhdGVnb3J5XCI6IFwibWlzY1wiLFxuICAgICAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvSHRtbC9jb21wb25lbnQudnVlXCIsXG4gICAgICAgICAgXCJwbGF5Z3JvdW5kc1wiOiBbXG4gICAgICAgICAgICBcInNyYy9jb3JlL0h0bWwvcGxheWdyb3VuZC52dWVcIlxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkljb3NhaGVkcm9uXCIsXG4gICAgICAgICAgXCJkb2NzXCI6IFwic3JjL2NvcmUvSWNvc2FoZWRyb24vaW5kZXgubWRcIixcbiAgICAgICAgICBcInBhdGhcIjogXCJzcmMvY29yZS9JY29zYWhlZHJvblwiLFxuICAgICAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgICAgICBcImNhdGVnb3J5XCI6IFwic2hhcGVzXCIsXG4gICAgICAgICAgXCJjb21wb25lbnRcIjogXCJzcmMvY29yZS9JY29zYWhlZHJvbi9jb21wb25lbnQudnVlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIktleWJvYXJkQ29udHJvbHNcIixcbiAgICAgICAgICBcImRvY3NcIjogXCJzcmMvY29yZS9LZXlib2FyZENvbnRyb2xzL2luZGV4Lm1kXCIsXG4gICAgICAgICAgXCJwYXRoXCI6IFwic3JjL2NvcmUvS2V5Ym9hcmRDb250cm9sc1wiLFxuICAgICAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgICAgICBcImNhdGVnb3J5XCI6IFwiY29udHJvbHNcIixcbiAgICAgICAgICBcImNvbXBvbmVudFwiOiBcInNyYy9jb3JlL0tleWJvYXJkQ29udHJvbHMvY29tcG9uZW50LnZ1ZVwiLFxuICAgICAgICAgIFwicGxheWdyb3VuZHNcIjogW1xuICAgICAgICAgICAgXCJzcmMvY29yZS9LZXlib2FyZENvbnRyb2xzL3BsYXlncm91bmQudnVlXCJcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJMaW5lMlwiLFxuICAgICAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL0xpbmUyL2luZGV4Lm1kXCIsXG4gICAgICAgICAgXCJwYXRoXCI6IFwic3JjL2NvcmUvTGluZTJcIixcbiAgICAgICAgICBcInBhY2thZ2VcIjogXCJjb3JlXCIsXG4gICAgICAgICAgXCJjYXRlZ29yeVwiOiBcInNoYXBlc1wiLFxuICAgICAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvTGluZTIvY29tcG9uZW50LnZ1ZVwiLFxuICAgICAgICAgIFwicGxheWdyb3VuZHNcIjogW1xuICAgICAgICAgICAgXCJzcmMvY29yZS9MaW5lMi9wbGF5Z3JvdW5kLnZ1ZVwiXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWFwQ29udHJvbHNcIixcbiAgICAgICAgICBcImRvY3NcIjogXCJzcmMvY29yZS9NYXBDb250cm9scy9pbmRleC5tZFwiLFxuICAgICAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL01hcENvbnRyb2xzXCIsXG4gICAgICAgICAgXCJwYWNrYWdlXCI6IFwiY29yZVwiLFxuICAgICAgICAgIFwiY2F0ZWdvcnlcIjogXCJjb250cm9sc1wiLFxuICAgICAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvTWFwQ29udHJvbHMvY29tcG9uZW50LnZ1ZVwiLFxuICAgICAgICAgIFwicGxheWdyb3VuZHNcIjogW1xuICAgICAgICAgICAgXCJzcmMvY29yZS9NYXBDb250cm9scy9wbGF5Z3JvdW5kLnZ1ZVwiXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiT2N0YWhlZHJvblwiLFxuICAgICAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL09jdGFoZWRyb24vaW5kZXgubWRcIixcbiAgICAgICAgICBcInBhdGhcIjogXCJzcmMvY29yZS9PY3RhaGVkcm9uXCIsXG4gICAgICAgICAgXCJwYWNrYWdlXCI6IFwiY29yZVwiLFxuICAgICAgICAgIFwiY2F0ZWdvcnlcIjogXCJzaGFwZXNcIixcbiAgICAgICAgICBcImNvbXBvbmVudFwiOiBcInNyYy9jb3JlL09jdGFoZWRyb24vY29tcG9uZW50LnZ1ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJPcmJpdENvbnRyb2xzXCIsXG4gICAgICAgICAgXCJkb2NzXCI6IFwic3JjL2NvcmUvT3JiaXRDb250cm9scy9pbmRleC5tZFwiLFxuICAgICAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL09yYml0Q29udHJvbHNcIixcbiAgICAgICAgICBcInBhY2thZ2VcIjogXCJjb3JlXCIsXG4gICAgICAgICAgXCJjYXRlZ29yeVwiOiBcImNvbnRyb2xzXCIsXG4gICAgICAgICAgXCJjb21wb25lbnRcIjogXCJzcmMvY29yZS9PcmJpdENvbnRyb2xzL2NvbXBvbmVudC52dWVcIixcbiAgICAgICAgICBcInBsYXlncm91bmRzXCI6IFtcbiAgICAgICAgICAgIFwic3JjL2NvcmUvT3JiaXRDb250cm9scy9wbGF5Z3JvdW5kLnZ1ZVwiXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiUGxhbmVcIixcbiAgICAgICAgICBcImRvY3NcIjogXCJzcmMvY29yZS9QbGFuZS9pbmRleC5tZFwiLFxuICAgICAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL1BsYW5lXCIsXG4gICAgICAgICAgXCJwYWNrYWdlXCI6IFwiY29yZVwiLFxuICAgICAgICAgIFwiY2F0ZWdvcnlcIjogXCJzaGFwZXNcIixcbiAgICAgICAgICBcImNvbXBvbmVudFwiOiBcInNyYy9jb3JlL1BsYW5lL2NvbXBvbmVudC52dWVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiUG9pbnRlckxvY2tDb250cm9sc1wiLFxuICAgICAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL1BvaW50ZXJMb2NrQ29udHJvbHMvaW5kZXgubWRcIixcbiAgICAgICAgICBcInBhdGhcIjogXCJzcmMvY29yZS9Qb2ludGVyTG9ja0NvbnRyb2xzXCIsXG4gICAgICAgICAgXCJwYWNrYWdlXCI6IFwiY29yZVwiLFxuICAgICAgICAgIFwiY2F0ZWdvcnlcIjogXCJjb250cm9sc1wiLFxuICAgICAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvUG9pbnRlckxvY2tDb250cm9scy9jb21wb25lbnQudnVlXCIsXG4gICAgICAgICAgXCJwbGF5Z3JvdW5kc1wiOiBbXG4gICAgICAgICAgICBcInNyYy9jb3JlL1BvaW50ZXJMb2NrQ29udHJvbHMvcGxheWdyb3VuZC52dWVcIlxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlJpbmdcIixcbiAgICAgICAgICBcImRvY3NcIjogXCJzcmMvY29yZS9SaW5nL2luZGV4Lm1kXCIsXG4gICAgICAgICAgXCJwYXRoXCI6IFwic3JjL2NvcmUvUmluZ1wiLFxuICAgICAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgICAgICBcImNhdGVnb3J5XCI6IFwic2hhcGVzXCIsXG4gICAgICAgICAgXCJjb21wb25lbnRcIjogXCJzcmMvY29yZS9SaW5nL2NvbXBvbmVudC52dWVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiUm91bmRlZEJveFwiLFxuICAgICAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL1JvdW5kZWRCb3gvaW5kZXgubWRcIixcbiAgICAgICAgICBcInBhdGhcIjogXCJzcmMvY29yZS9Sb3VuZGVkQm94XCIsXG4gICAgICAgICAgXCJwYWNrYWdlXCI6IFwiY29yZVwiLFxuICAgICAgICAgIFwiY2F0ZWdvcnlcIjogXCJzaGFwZXNcIixcbiAgICAgICAgICBcImNvbXBvbmVudFwiOiBcInNyYy9jb3JlL1JvdW5kZWRCb3gvY29tcG9uZW50LnZ1ZVwiLFxuICAgICAgICAgIFwicGxheWdyb3VuZHNcIjogW1xuICAgICAgICAgICAgXCJzcmMvY29yZS9Sb3VuZGVkQm94L3BsYXlncm91bmQudnVlXCJcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJTY3JvbGxDb250cm9sc1wiLFxuICAgICAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL1Njcm9sbENvbnRyb2xzL2luZGV4Lm1kXCIsXG4gICAgICAgICAgXCJwYXRoXCI6IFwic3JjL2NvcmUvU2Nyb2xsQ29udHJvbHNcIixcbiAgICAgICAgICBcInBhY2thZ2VcIjogXCJjb3JlXCIsXG4gICAgICAgICAgXCJjYXRlZ29yeVwiOiBcImNvbnRyb2xzXCIsXG4gICAgICAgICAgXCJjb21wb25lbnRcIjogXCJzcmMvY29yZS9TY3JvbGxDb250cm9scy9jb21wb25lbnQudnVlXCIsXG4gICAgICAgICAgXCJwbGF5Z3JvdW5kc1wiOiBbXG4gICAgICAgICAgICBcInNyYy9jb3JlL1Njcm9sbENvbnRyb2xzL3BsYXlncm91bmQudnVlXCJcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJTa3lcIixcbiAgICAgICAgICBcImRvY3NcIjogXCJzcmMvY29yZS9Ta3kvaW5kZXgubWRcIixcbiAgICAgICAgICBcInBhdGhcIjogXCJzcmMvY29yZS9Ta3lcIixcbiAgICAgICAgICBcInBhY2thZ2VcIjogXCJjb3JlXCIsXG4gICAgICAgICAgXCJjYXRlZ29yeVwiOiBcInN0YWdpbmdcIixcbiAgICAgICAgICBcImNvbXBvbmVudFwiOiBcInNyYy9jb3JlL1NreS9jb21wb25lbnQudnVlXCIsXG4gICAgICAgICAgXCJwbGF5Z3JvdW5kc1wiOiBbXG4gICAgICAgICAgICBcInNyYy9jb3JlL1NreS9wbGF5Z3JvdW5kLnZ1ZVwiXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiU3BoZXJlXCIsXG4gICAgICAgICAgXCJkb2NzXCI6IFwic3JjL2NvcmUvU3BoZXJlL2luZGV4Lm1kXCIsXG4gICAgICAgICAgXCJwYXRoXCI6IFwic3JjL2NvcmUvU3BoZXJlXCIsXG4gICAgICAgICAgXCJwYWNrYWdlXCI6IFwiY29yZVwiLFxuICAgICAgICAgIFwiY2F0ZWdvcnlcIjogXCJzaGFwZXNcIixcbiAgICAgICAgICBcImNvbXBvbmVudFwiOiBcInNyYy9jb3JlL1NwaGVyZS9jb21wb25lbnQudnVlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlN0YXRzR2xcIixcbiAgICAgICAgICBcImRvY3NcIjogXCJzcmMvY29yZS9TdGF0c0dsL2luZGV4Lm1kXCIsXG4gICAgICAgICAgXCJwYXRoXCI6IFwic3JjL2NvcmUvU3RhdHNHbFwiLFxuICAgICAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgICAgICBcImNhdGVnb3J5XCI6IFwibWlzY1wiLFxuICAgICAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvU3RhdHNHbC9jb21wb25lbnQudnVlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlN1cGVyZm9ybXVsYVwiLFxuICAgICAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL1N1cGVyZm9ybXVsYS9pbmRleC5tZFwiLFxuICAgICAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL1N1cGVyZm9ybXVsYVwiLFxuICAgICAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgICAgICBcImNhdGVnb3J5XCI6IFwic2hhcGVzXCIsXG4gICAgICAgICAgXCJjb21wb25lbnRcIjogXCJzcmMvY29yZS9TdXBlcmZvcm11bGEvY29tcG9uZW50LnZ1ZVwiLFxuICAgICAgICAgIFwicGxheWdyb3VuZHNcIjogW1xuICAgICAgICAgICAgXCJzcmMvY29yZS9TdXBlcmZvcm11bGEvcGxheWdyb3VuZC52dWVcIlxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlRldHJhaGVkcm9uXCIsXG4gICAgICAgICAgXCJkb2NzXCI6IFwic3JjL2NvcmUvVGV0cmFoZWRyb24vaW5kZXgubWRcIixcbiAgICAgICAgICBcInBhdGhcIjogXCJzcmMvY29yZS9UZXRyYWhlZHJvblwiLFxuICAgICAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgICAgICBcImNhdGVnb3J5XCI6IFwic2hhcGVzXCIsXG4gICAgICAgICAgXCJjb21wb25lbnRcIjogXCJzcmMvY29yZS9UZXRyYWhlZHJvbi9jb21wb25lbnQudnVlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlRvcnVzXCIsXG4gICAgICAgICAgXCJkb2NzXCI6IFwic3JjL2NvcmUvVG9ydXMvaW5kZXgubWRcIixcbiAgICAgICAgICBcInBhdGhcIjogXCJzcmMvY29yZS9Ub3J1c1wiLFxuICAgICAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgICAgICBcImNhdGVnb3J5XCI6IFwic2hhcGVzXCIsXG4gICAgICAgICAgXCJjb21wb25lbnRcIjogXCJzcmMvY29yZS9Ub3J1cy9jb21wb25lbnQudnVlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlRvcnVzS25vdFwiLFxuICAgICAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL1RvcnVzS25vdC9pbmRleC5tZFwiLFxuICAgICAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL1RvcnVzS25vdFwiLFxuICAgICAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgICAgICBcImNhdGVnb3J5XCI6IFwic2hhcGVzXCIsXG4gICAgICAgICAgXCJjb21wb25lbnRcIjogXCJzcmMvY29yZS9Ub3J1c0tub3QvY29tcG9uZW50LnZ1ZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJUcmFuc2Zvcm1Db250cm9sc1wiLFxuICAgICAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL1RyYW5zZm9ybUNvbnRyb2xzL2luZGV4Lm1kXCIsXG4gICAgICAgICAgXCJwYXRoXCI6IFwic3JjL2NvcmUvVHJhbnNmb3JtQ29udHJvbHNcIixcbiAgICAgICAgICBcInBhY2thZ2VcIjogXCJjb3JlXCIsXG4gICAgICAgICAgXCJjYXRlZ29yeVwiOiBcImNvbnRyb2xzXCIsXG4gICAgICAgICAgXCJjb21wb25lbnRcIjogXCJzcmMvY29yZS9UcmFuc2Zvcm1Db250cm9scy9jb21wb25lbnQudnVlXCIsXG4gICAgICAgICAgXCJwbGF5Z3JvdW5kc1wiOiBbXG4gICAgICAgICAgICBcInNyYy9jb3JlL1RyYW5zZm9ybUNvbnRyb2xzL3BsYXlncm91bmQudnVlXCJcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJUdWJlXCIsXG4gICAgICAgICAgXCJkb2NzXCI6IFwic3JjL2NvcmUvVHViZS9pbmRleC5tZFwiLFxuICAgICAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL1R1YmVcIixcbiAgICAgICAgICBcInBhY2thZ2VcIjogXCJjb3JlXCIsXG4gICAgICAgICAgXCJjYXRlZ29yeVwiOiBcInNoYXBlc1wiLFxuICAgICAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvVHViZS9jb21wb25lbnQudnVlXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAgXCJvbGRcIjoge1xuICAgICAgXCJuYW1lXCI6IFwib2xkXCIsXG4gICAgICBcImRpclwiOiBcInNyYy9vbGRcIixcbiAgICAgIFwiY2F0ZWdvcmllc1wiOiBbXSxcbiAgICAgIFwiY29tcG9uZW50c1wiOiBbXVxuICAgIH0sXG4gICAgXCJwdWJsaWNcIjoge1xuICAgICAgXCJuYW1lXCI6IFwicHVibGljXCIsXG4gICAgICBcImRpclwiOiBcInNyYy9wdWJsaWNcIixcbiAgICAgIFwiY2F0ZWdvcmllc1wiOiBbXSxcbiAgICAgIFwiY29tcG9uZW50c1wiOiBbXVxuICAgIH0sXG4gICAgXCJ1dGlsc1wiOiB7XG4gICAgICBcIm5hbWVcIjogXCJ1dGlsc1wiLFxuICAgICAgXCJkaXJcIjogXCJzcmMvdXRpbHNcIixcbiAgICAgIFwiY2F0ZWdvcmllc1wiOiBbXSxcbiAgICAgIFwiY29tcG9uZW50c1wiOiBbXVxuICAgIH1cbiAgfSxcbiAgXCJjYXRlZ29yaWVzXCI6IFtcbiAgICBcImFic3RyYWN0aW9uc1wiLFxuICAgIFwic2hhcGVzXCIsXG4gICAgXCJjb250cm9sc1wiLFxuICAgIFwibG9hZGVyc1wiLFxuICAgIFwic3RhZ2luZ1wiLFxuICAgIFwibWlzY1wiXG4gIF0sXG4gIFwiY29tcG9uZW50c1wiOiBbXG4gICAge1xuICAgICAgXCJuYW1lXCI6IFwiQW5pbWF0ZWRTcHJpdGVcIixcbiAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL0FuaW1hdGVkU3ByaXRlL2luZGV4Lm1kXCIsXG4gICAgICBcInBhdGhcIjogXCJzcmMvY29yZS9BbmltYXRlZFNwcml0ZVwiLFxuICAgICAgXCJwYWNrYWdlXCI6IFwiY29yZVwiLFxuICAgICAgXCJjYXRlZ29yeVwiOiBcImFic3RyYWN0aW9uc1wiLFxuICAgICAgXCJjb21wb25lbnRcIjogXCJzcmMvY29yZS9BbmltYXRlZFNwcml0ZS9jb21wb25lbnQudnVlXCIsXG4gICAgICBcInBsYXlncm91bmRzXCI6IFtcbiAgICAgICAgXCJzcmMvY29yZS9BbmltYXRlZFNwcml0ZS9wbGF5Z3JvdW5kLnZ1ZVwiXG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJCb3hcIixcbiAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL0JveC9pbmRleC5tZFwiLFxuICAgICAgXCJwYXRoXCI6IFwic3JjL2NvcmUvQm94XCIsXG4gICAgICBcInBhY2thZ2VcIjogXCJjb3JlXCIsXG4gICAgICBcImNhdGVnb3J5XCI6IFwic2hhcGVzXCIsXG4gICAgICBcImNvbXBvbmVudFwiOiBcInNyYy9jb3JlL0JveC9jb21wb25lbnQudnVlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIkNhbWVyYUNvbnRyb2xzXCIsXG4gICAgICBcImRvY3NcIjogXCJzcmMvY29yZS9DYW1lcmFDb250cm9scy9pbmRleC5tZFwiLFxuICAgICAgXCJwYXRoXCI6IFwic3JjL2NvcmUvQ2FtZXJhQ29udHJvbHNcIixcbiAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgIFwiY2F0ZWdvcnlcIjogXCJjb250cm9sc1wiLFxuICAgICAgXCJjb21wb25lbnRcIjogXCJzcmMvY29yZS9DYW1lcmFDb250cm9scy9jb21wb25lbnQudnVlXCIsXG4gICAgICBcInBsYXlncm91bmRzXCI6IFtcbiAgICAgICAgXCJzcmMvY29yZS9DYW1lcmFDb250cm9scy9wbGF5Z3JvdW5kLnZ1ZVwiXG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJDYXRtdWxsUm9tQ3VydmUzXCIsXG4gICAgICBcImRvY3NcIjogXCJzcmMvY29yZS9DYXRtdWxsUm9tQ3VydmUzL2luZGV4Lm1kXCIsXG4gICAgICBcInBhdGhcIjogXCJzcmMvY29yZS9DYXRtdWxsUm9tQ3VydmUzXCIsXG4gICAgICBcInBhY2thZ2VcIjogXCJjb3JlXCIsXG4gICAgICBcImNhdGVnb3J5XCI6IFwic2hhcGVzXCIsXG4gICAgICBcImNvbXBvbmVudFwiOiBcInNyYy9jb3JlL0NhdG11bGxSb21DdXJ2ZTMvY29tcG9uZW50LnZ1ZVwiLFxuICAgICAgXCJwbGF5Z3JvdW5kc1wiOiBbXG4gICAgICAgIFwic3JjL2NvcmUvQ2F0bXVsbFJvbUN1cnZlMy9wbGF5Z3JvdW5kLnZ1ZVwiXG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJDaXJjbGVcIixcbiAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL0NpcmNsZS9pbmRleC5tZFwiLFxuICAgICAgXCJwYXRoXCI6IFwic3JjL2NvcmUvQ2lyY2xlXCIsXG4gICAgICBcInBhY2thZ2VcIjogXCJjb3JlXCIsXG4gICAgICBcImNhdGVnb3J5XCI6IFwic2hhcGVzXCIsXG4gICAgICBcImNvbXBvbmVudFwiOiBcInNyYy9jb3JlL0NpcmNsZS9jb21wb25lbnQudnVlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIkNvbmVcIixcbiAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL0NvbmUvaW5kZXgubWRcIixcbiAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL0NvbmVcIixcbiAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgIFwiY2F0ZWdvcnlcIjogXCJzaGFwZXNcIixcbiAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvQ29uZS9jb21wb25lbnQudnVlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIkN1YmVDYW1lcmFcIixcbiAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL0N1YmVDYW1lcmEvaW5kZXgubWRcIixcbiAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL0N1YmVDYW1lcmFcIixcbiAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgIFwiY2F0ZWdvcnlcIjogXCJhYnN0cmFjdGlvbnNcIixcbiAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvQ3ViZUNhbWVyYS9jb21wb25lbnQudnVlXCIsXG4gICAgICBcInBsYXlncm91bmRzXCI6IFtcbiAgICAgICAgXCJzcmMvY29yZS9DdWJlQ2FtZXJhL3BsYXlncm91bmQudnVlXCJcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIkN5bGluZGVyXCIsXG4gICAgICBcImRvY3NcIjogXCJzcmMvY29yZS9DeWxpbmRlci9pbmRleC5tZFwiLFxuICAgICAgXCJwYXRoXCI6IFwic3JjL2NvcmUvQ3lsaW5kZXJcIixcbiAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgIFwiY2F0ZWdvcnlcIjogXCJzaGFwZXNcIixcbiAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvQ3lsaW5kZXIvY29tcG9uZW50LnZ1ZVwiLFxuICAgICAgXCJwbGF5Z3JvdW5kc1wiOiBbXG4gICAgICAgIFwic3JjL2NvcmUvQ3lsaW5kZXIvcGxheWdyb3VuZC52dWVcIlxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJuYW1lXCI6IFwiRG9kZWNhaGVkcm9uXCIsXG4gICAgICBcImRvY3NcIjogXCJzcmMvY29yZS9Eb2RlY2FoZWRyb24vaW5kZXgubWRcIixcbiAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL0RvZGVjYWhlZHJvblwiLFxuICAgICAgXCJwYWNrYWdlXCI6IFwiY29yZVwiLFxuICAgICAgXCJjYXRlZ29yeVwiOiBcInNoYXBlc1wiLFxuICAgICAgXCJjb21wb25lbnRcIjogXCJzcmMvY29yZS9Eb2RlY2FoZWRyb24vY29tcG9uZW50LnZ1ZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJFeGFtcGxlQ29tcG9uZW50XCIsXG4gICAgICBcImRvY3NcIjogXCJzcmMvY29yZS9FeGFtcGxlQ29tcG9uZW50L2luZGV4Lm1kXCIsXG4gICAgICBcInBhdGhcIjogXCJzcmMvY29yZS9FeGFtcGxlQ29tcG9uZW50XCIsXG4gICAgICBcInBhY2thZ2VcIjogXCJjb3JlXCIsXG4gICAgICBcImNhdGVnb3J5XCI6IFwiYWJzdHJhY3Rpb25zXCIsXG4gICAgICBcImNvbXBvbmVudFwiOiBcInNyYy9jb3JlL0V4YW1wbGVDb21wb25lbnQvY29tcG9uZW50LnZ1ZVwiLFxuICAgICAgXCJwbGF5Z3JvdW5kc1wiOiBbXG4gICAgICAgIFwic3JjL2NvcmUvRXhhbXBsZUNvbXBvbmVudC9wbGF5Z3JvdW5kLnZ1ZVwiXG4gICAgICBdLFxuICAgICAgXCJyZWxhdGVkXCI6IFtcbiAgICAgICAgXCJBY2N1bXVsYXRpdmVTaGFkb3dzXCIsXG4gICAgICAgIFwiQ29udGFjdFNoYWRvd3NcIlxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJuYW1lXCI6IFwiR0xURlwiLFxuICAgICAgXCJkb2NzXCI6IFwic3JjL2NvcmUvR0xURi9pbmRleC5tZFwiLFxuICAgICAgXCJwYXRoXCI6IFwic3JjL2NvcmUvR0xURlwiLFxuICAgICAgXCJwYWNrYWdlXCI6IFwiY29yZVwiLFxuICAgICAgXCJjYXRlZ29yeVwiOiBcImxvYWRlcnNcIixcbiAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvR0xURi9jb21wb25lbnQudnVlXCIsXG4gICAgICBcImZuXCI6IFwic3JjL2NvcmUvR0xURi9pbmRleC50c1wiLFxuICAgICAgXCJwbGF5Z3JvdW5kc1wiOiBbXG4gICAgICAgIFwic3JjL2NvcmUvR0xURi9wbGF5Z3JvdW5kLnZ1ZVwiLFxuICAgICAgICBcInNyYy9jb3JlL0dMVEYvcGxheWdyb3VuZHVzZUdMVEYudnVlXCJcbiAgICAgIF0sXG4gICAgICBcImFsaWFzXCI6IFtcbiAgICAgICAgXCJHTFRGTW9kZWxcIlxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJuYW1lXCI6IFwiR3JpZFwiLFxuICAgICAgXCJkb2NzXCI6IFwic3JjL2NvcmUvR3JpZC9pbmRleC5tZFwiLFxuICAgICAgXCJwYXRoXCI6IFwic3JjL2NvcmUvR3JpZFwiLFxuICAgICAgXCJwYWNrYWdlXCI6IFwiY29yZVwiLFxuICAgICAgXCJjYXRlZ29yeVwiOiBcInN0YWdpbmdcIixcbiAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvR3JpZC9jb21wb25lbnQudnVlXCIsXG4gICAgICBcInBsYXlncm91bmRzXCI6IFtcbiAgICAgICAgXCJzcmMvY29yZS9HcmlkL3BsYXlncm91bmQudnVlXCJcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIkh0bWxcIixcbiAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL0h0bWwvaW5kZXgubWRcIixcbiAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL0h0bWxcIixcbiAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgIFwiY2F0ZWdvcnlcIjogXCJtaXNjXCIsXG4gICAgICBcImNvbXBvbmVudFwiOiBcInNyYy9jb3JlL0h0bWwvY29tcG9uZW50LnZ1ZVwiLFxuICAgICAgXCJwbGF5Z3JvdW5kc1wiOiBbXG4gICAgICAgIFwic3JjL2NvcmUvSHRtbC9wbGF5Z3JvdW5kLnZ1ZVwiXG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJJY29zYWhlZHJvblwiLFxuICAgICAgXCJkb2NzXCI6IFwic3JjL2NvcmUvSWNvc2FoZWRyb24vaW5kZXgubWRcIixcbiAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL0ljb3NhaGVkcm9uXCIsXG4gICAgICBcInBhY2thZ2VcIjogXCJjb3JlXCIsXG4gICAgICBcImNhdGVnb3J5XCI6IFwic2hhcGVzXCIsXG4gICAgICBcImNvbXBvbmVudFwiOiBcInNyYy9jb3JlL0ljb3NhaGVkcm9uL2NvbXBvbmVudC52dWVcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJuYW1lXCI6IFwiS2V5Ym9hcmRDb250cm9sc1wiLFxuICAgICAgXCJkb2NzXCI6IFwic3JjL2NvcmUvS2V5Ym9hcmRDb250cm9scy9pbmRleC5tZFwiLFxuICAgICAgXCJwYXRoXCI6IFwic3JjL2NvcmUvS2V5Ym9hcmRDb250cm9sc1wiLFxuICAgICAgXCJwYWNrYWdlXCI6IFwiY29yZVwiLFxuICAgICAgXCJjYXRlZ29yeVwiOiBcImNvbnRyb2xzXCIsXG4gICAgICBcImNvbXBvbmVudFwiOiBcInNyYy9jb3JlL0tleWJvYXJkQ29udHJvbHMvY29tcG9uZW50LnZ1ZVwiLFxuICAgICAgXCJwbGF5Z3JvdW5kc1wiOiBbXG4gICAgICAgIFwic3JjL2NvcmUvS2V5Ym9hcmRDb250cm9scy9wbGF5Z3JvdW5kLnZ1ZVwiXG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJMaW5lMlwiLFxuICAgICAgXCJkb2NzXCI6IFwic3JjL2NvcmUvTGluZTIvaW5kZXgubWRcIixcbiAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL0xpbmUyXCIsXG4gICAgICBcInBhY2thZ2VcIjogXCJjb3JlXCIsXG4gICAgICBcImNhdGVnb3J5XCI6IFwic2hhcGVzXCIsXG4gICAgICBcImNvbXBvbmVudFwiOiBcInNyYy9jb3JlL0xpbmUyL2NvbXBvbmVudC52dWVcIixcbiAgICAgIFwicGxheWdyb3VuZHNcIjogW1xuICAgICAgICBcInNyYy9jb3JlL0xpbmUyL3BsYXlncm91bmQudnVlXCJcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIk1hcENvbnRyb2xzXCIsXG4gICAgICBcImRvY3NcIjogXCJzcmMvY29yZS9NYXBDb250cm9scy9pbmRleC5tZFwiLFxuICAgICAgXCJwYXRoXCI6IFwic3JjL2NvcmUvTWFwQ29udHJvbHNcIixcbiAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgIFwiY2F0ZWdvcnlcIjogXCJjb250cm9sc1wiLFxuICAgICAgXCJjb21wb25lbnRcIjogXCJzcmMvY29yZS9NYXBDb250cm9scy9jb21wb25lbnQudnVlXCIsXG4gICAgICBcInBsYXlncm91bmRzXCI6IFtcbiAgICAgICAgXCJzcmMvY29yZS9NYXBDb250cm9scy9wbGF5Z3JvdW5kLnZ1ZVwiXG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJPY3RhaGVkcm9uXCIsXG4gICAgICBcImRvY3NcIjogXCJzcmMvY29yZS9PY3RhaGVkcm9uL2luZGV4Lm1kXCIsXG4gICAgICBcInBhdGhcIjogXCJzcmMvY29yZS9PY3RhaGVkcm9uXCIsXG4gICAgICBcInBhY2thZ2VcIjogXCJjb3JlXCIsXG4gICAgICBcImNhdGVnb3J5XCI6IFwic2hhcGVzXCIsXG4gICAgICBcImNvbXBvbmVudFwiOiBcInNyYy9jb3JlL09jdGFoZWRyb24vY29tcG9uZW50LnZ1ZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJPcmJpdENvbnRyb2xzXCIsXG4gICAgICBcImRvY3NcIjogXCJzcmMvY29yZS9PcmJpdENvbnRyb2xzL2luZGV4Lm1kXCIsXG4gICAgICBcInBhdGhcIjogXCJzcmMvY29yZS9PcmJpdENvbnRyb2xzXCIsXG4gICAgICBcInBhY2thZ2VcIjogXCJjb3JlXCIsXG4gICAgICBcImNhdGVnb3J5XCI6IFwiY29udHJvbHNcIixcbiAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvT3JiaXRDb250cm9scy9jb21wb25lbnQudnVlXCIsXG4gICAgICBcInBsYXlncm91bmRzXCI6IFtcbiAgICAgICAgXCJzcmMvY29yZS9PcmJpdENvbnRyb2xzL3BsYXlncm91bmQudnVlXCJcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIlBsYW5lXCIsXG4gICAgICBcImRvY3NcIjogXCJzcmMvY29yZS9QbGFuZS9pbmRleC5tZFwiLFxuICAgICAgXCJwYXRoXCI6IFwic3JjL2NvcmUvUGxhbmVcIixcbiAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgIFwiY2F0ZWdvcnlcIjogXCJzaGFwZXNcIixcbiAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvUGxhbmUvY29tcG9uZW50LnZ1ZVwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJQb2ludGVyTG9ja0NvbnRyb2xzXCIsXG4gICAgICBcImRvY3NcIjogXCJzcmMvY29yZS9Qb2ludGVyTG9ja0NvbnRyb2xzL2luZGV4Lm1kXCIsXG4gICAgICBcInBhdGhcIjogXCJzcmMvY29yZS9Qb2ludGVyTG9ja0NvbnRyb2xzXCIsXG4gICAgICBcInBhY2thZ2VcIjogXCJjb3JlXCIsXG4gICAgICBcImNhdGVnb3J5XCI6IFwiY29udHJvbHNcIixcbiAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvUG9pbnRlckxvY2tDb250cm9scy9jb21wb25lbnQudnVlXCIsXG4gICAgICBcInBsYXlncm91bmRzXCI6IFtcbiAgICAgICAgXCJzcmMvY29yZS9Qb2ludGVyTG9ja0NvbnRyb2xzL3BsYXlncm91bmQudnVlXCJcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIlJpbmdcIixcbiAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL1JpbmcvaW5kZXgubWRcIixcbiAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL1JpbmdcIixcbiAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgIFwiY2F0ZWdvcnlcIjogXCJzaGFwZXNcIixcbiAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvUmluZy9jb21wb25lbnQudnVlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIlJvdW5kZWRCb3hcIixcbiAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL1JvdW5kZWRCb3gvaW5kZXgubWRcIixcbiAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL1JvdW5kZWRCb3hcIixcbiAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgIFwiY2F0ZWdvcnlcIjogXCJzaGFwZXNcIixcbiAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvUm91bmRlZEJveC9jb21wb25lbnQudnVlXCIsXG4gICAgICBcInBsYXlncm91bmRzXCI6IFtcbiAgICAgICAgXCJzcmMvY29yZS9Sb3VuZGVkQm94L3BsYXlncm91bmQudnVlXCJcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIlNjcm9sbENvbnRyb2xzXCIsXG4gICAgICBcImRvY3NcIjogXCJzcmMvY29yZS9TY3JvbGxDb250cm9scy9pbmRleC5tZFwiLFxuICAgICAgXCJwYXRoXCI6IFwic3JjL2NvcmUvU2Nyb2xsQ29udHJvbHNcIixcbiAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgIFwiY2F0ZWdvcnlcIjogXCJjb250cm9sc1wiLFxuICAgICAgXCJjb21wb25lbnRcIjogXCJzcmMvY29yZS9TY3JvbGxDb250cm9scy9jb21wb25lbnQudnVlXCIsXG4gICAgICBcInBsYXlncm91bmRzXCI6IFtcbiAgICAgICAgXCJzcmMvY29yZS9TY3JvbGxDb250cm9scy9wbGF5Z3JvdW5kLnZ1ZVwiXG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJTa3lcIixcbiAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL1NreS9pbmRleC5tZFwiLFxuICAgICAgXCJwYXRoXCI6IFwic3JjL2NvcmUvU2t5XCIsXG4gICAgICBcInBhY2thZ2VcIjogXCJjb3JlXCIsXG4gICAgICBcImNhdGVnb3J5XCI6IFwic3RhZ2luZ1wiLFxuICAgICAgXCJjb21wb25lbnRcIjogXCJzcmMvY29yZS9Ta3kvY29tcG9uZW50LnZ1ZVwiLFxuICAgICAgXCJwbGF5Z3JvdW5kc1wiOiBbXG4gICAgICAgIFwic3JjL2NvcmUvU2t5L3BsYXlncm91bmQudnVlXCJcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIlNwaGVyZVwiLFxuICAgICAgXCJkb2NzXCI6IFwic3JjL2NvcmUvU3BoZXJlL2luZGV4Lm1kXCIsXG4gICAgICBcInBhdGhcIjogXCJzcmMvY29yZS9TcGhlcmVcIixcbiAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgIFwiY2F0ZWdvcnlcIjogXCJzaGFwZXNcIixcbiAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvU3BoZXJlL2NvbXBvbmVudC52dWVcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJuYW1lXCI6IFwiU3RhdHNHbFwiLFxuICAgICAgXCJkb2NzXCI6IFwic3JjL2NvcmUvU3RhdHNHbC9pbmRleC5tZFwiLFxuICAgICAgXCJwYXRoXCI6IFwic3JjL2NvcmUvU3RhdHNHbFwiLFxuICAgICAgXCJwYWNrYWdlXCI6IFwiY29yZVwiLFxuICAgICAgXCJjYXRlZ29yeVwiOiBcIm1pc2NcIixcbiAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvU3RhdHNHbC9jb21wb25lbnQudnVlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIlN1cGVyZm9ybXVsYVwiLFxuICAgICAgXCJkb2NzXCI6IFwic3JjL2NvcmUvU3VwZXJmb3JtdWxhL2luZGV4Lm1kXCIsXG4gICAgICBcInBhdGhcIjogXCJzcmMvY29yZS9TdXBlcmZvcm11bGFcIixcbiAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgIFwiY2F0ZWdvcnlcIjogXCJzaGFwZXNcIixcbiAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvU3VwZXJmb3JtdWxhL2NvbXBvbmVudC52dWVcIixcbiAgICAgIFwicGxheWdyb3VuZHNcIjogW1xuICAgICAgICBcInNyYy9jb3JlL1N1cGVyZm9ybXVsYS9wbGF5Z3JvdW5kLnZ1ZVwiXG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcIm5hbWVcIjogXCJUZXRyYWhlZHJvblwiLFxuICAgICAgXCJkb2NzXCI6IFwic3JjL2NvcmUvVGV0cmFoZWRyb24vaW5kZXgubWRcIixcbiAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL1RldHJhaGVkcm9uXCIsXG4gICAgICBcInBhY2thZ2VcIjogXCJjb3JlXCIsXG4gICAgICBcImNhdGVnb3J5XCI6IFwic2hhcGVzXCIsXG4gICAgICBcImNvbXBvbmVudFwiOiBcInNyYy9jb3JlL1RldHJhaGVkcm9uL2NvbXBvbmVudC52dWVcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJuYW1lXCI6IFwiVG9ydXNcIixcbiAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL1RvcnVzL2luZGV4Lm1kXCIsXG4gICAgICBcInBhdGhcIjogXCJzcmMvY29yZS9Ub3J1c1wiLFxuICAgICAgXCJwYWNrYWdlXCI6IFwiY29yZVwiLFxuICAgICAgXCJjYXRlZ29yeVwiOiBcInNoYXBlc1wiLFxuICAgICAgXCJjb21wb25lbnRcIjogXCJzcmMvY29yZS9Ub3J1cy9jb21wb25lbnQudnVlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIlRvcnVzS25vdFwiLFxuICAgICAgXCJkb2NzXCI6IFwic3JjL2NvcmUvVG9ydXNLbm90L2luZGV4Lm1kXCIsXG4gICAgICBcInBhdGhcIjogXCJzcmMvY29yZS9Ub3J1c0tub3RcIixcbiAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgIFwiY2F0ZWdvcnlcIjogXCJzaGFwZXNcIixcbiAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvVG9ydXNLbm90L2NvbXBvbmVudC52dWVcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJuYW1lXCI6IFwiVHJhbnNmb3JtQ29udHJvbHNcIixcbiAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL1RyYW5zZm9ybUNvbnRyb2xzL2luZGV4Lm1kXCIsXG4gICAgICBcInBhdGhcIjogXCJzcmMvY29yZS9UcmFuc2Zvcm1Db250cm9sc1wiLFxuICAgICAgXCJwYWNrYWdlXCI6IFwiY29yZVwiLFxuICAgICAgXCJjYXRlZ29yeVwiOiBcImNvbnRyb2xzXCIsXG4gICAgICBcImNvbXBvbmVudFwiOiBcInNyYy9jb3JlL1RyYW5zZm9ybUNvbnRyb2xzL2NvbXBvbmVudC52dWVcIixcbiAgICAgIFwicGxheWdyb3VuZHNcIjogW1xuICAgICAgICBcInNyYy9jb3JlL1RyYW5zZm9ybUNvbnRyb2xzL3BsYXlncm91bmQudnVlXCJcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwibmFtZVwiOiBcIlR1YmVcIixcbiAgICAgIFwiZG9jc1wiOiBcInNyYy9jb3JlL1R1YmUvaW5kZXgubWRcIixcbiAgICAgIFwicGF0aFwiOiBcInNyYy9jb3JlL1R1YmVcIixcbiAgICAgIFwicGFja2FnZVwiOiBcImNvcmVcIixcbiAgICAgIFwiY2F0ZWdvcnlcIjogXCJzaGFwZXNcIixcbiAgICAgIFwiY29tcG9uZW50XCI6IFwic3JjL2NvcmUvVHViZS9jb21wb25lbnQudnVlXCJcbiAgICB9XG4gIF1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2RldnVzZXJzdGV2ZW4vRG9jdW1lbnRzL2NsaWVudHMvbWUvb3NzL3RyZXMvY2llbnRvcy9tZXRhZGF0YVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2RldnVzZXJzdGV2ZW4vRG9jdW1lbnRzL2NsaWVudHMvbWUvb3NzL3RyZXMvY2llbnRvcy9tZXRhZGF0YS9tZXRhZGF0YS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZGV2dXNlcnN0ZXZlbi9Eb2N1bWVudHMvY2xpZW50cy9tZS9vc3MvdHJlcy9jaWVudG9zL21ldGFkYXRhL21ldGFkYXRhLnRzXCI7aW1wb3J0IHR5cGUgeyBQYWNrYWdlSW5kZXhlcyB9IGZyb20gJy4vdHlwZXMnXG5pbXBvcnQgX21ldGFkYXRhIGZyb20gJy4vaW5kZXguanNvbidcblxuZXhwb3J0IGNvbnN0IG1ldGFkYXRhID0gX21ldGFkYXRhIGFzIFBhY2thZ2VJbmRleGVzXG5leHBvcnQgY29uc3QgY29tcG9uZW50cyA9IG1ldGFkYXRhLmNvbXBvbmVudHNcbmV4cG9ydCBjb25zdCBjYXRlZ29yaWVzID0gbWV0YWRhdGEuY2F0ZWdvcmllc1xuXG5leHBvcnQgY29uc3QgY29tcG9uZW50TmFtZXMgPSBjb21wb25lbnRzLm1hcChmID0+IGYubmFtZSlcbmV4cG9ydCBjb25zdCBjYXRlZ29yeU5hbWVzID0gQXJyYXkuZnJvbShjYXRlZ29yaWVzKVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tcG9uZW50KG5hbWU6IHN0cmluZykge1xuICByZXR1cm4gY29tcG9uZW50cy5maW5kKGYgPT4gZi5uYW1lID09PSBuYW1lKVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZGV2dXNlcnN0ZXZlbi9Eb2N1bWVudHMvY2xpZW50cy9tZS9vc3MvdHJlcy9jaWVudG9zL3NyYy8udml0ZXByZXNzL3BsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9kZXZ1c2Vyc3RldmVuL0RvY3VtZW50cy9jbGllbnRzL21lL29zcy90cmVzL2NpZW50b3Mvc3JjLy52aXRlcHJlc3MvcGx1Z2lucy9leHRyYWN0Q29kZVNuaXBwZXREZW1vcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZGV2dXNlcnN0ZXZlbi9Eb2N1bWVudHMvY2xpZW50cy9tZS9vc3MvdHJlcy9jaWVudG9zL3NyYy8udml0ZXByZXNzL3BsdWdpbnMvZXh0cmFjdENvZGVTbmlwcGV0RGVtb3MudHNcIjtpbXBvcnQgZnMgZnJvbSAnbm9kZTpmcydcbmltcG9ydCBmc1Byb21pc2VzIGZyb20gJ25vZGU6ZnMvcHJvbWlzZXMnXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgdXJsIGZyb20gJ25vZGU6dXJsJ1xuaW1wb3J0IE1hcmtkb3duSXQgZnJvbSAnbWFya2Rvd24taXQnXG5pbXBvcnQgbWF0dGVyIGZyb20gJ2dyYXktbWF0dGVyJ1xuaW1wb3J0IHR5cGUgeyBQbHVnaW4gfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tICd2dWUvY29tcGlsZXItc2ZjJ1xuXG5jb25zdCBfX2Rpcm5hbWUgPSBwYXRoLmRpcm5hbWUodXJsLmZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSlcblxuY29uc3QgdG9BYnNvbHV0ZSA9IChwOiBzdHJpbmcpID0+IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIHApXG5cbmNvbnN0IERFTU9fRklMRVNfR0xPQiA9IHRvQWJzb2x1dGUoJy4uLy4uLyovKi9pbmRleC5tZCcpXG5jb25zdCBDT01QT05FTlRTX0RJUkVDVE9SWSA9IHRvQWJzb2x1dGUoJy4uL3RoZW1lL2NvbXBvbmVudHMnKVxuY29uc3QgQ09NUE9ORU5UU19QUkVGSVggPSAnQ2llbnRvc0NvZGVTbmlwcGV0RGVtbydcblxuZXhwb3J0IGZ1bmN0aW9uIENvZGVTbmlwcGV0RGVtb3NCdWlsZFRyYW5zZm9ybSgpOiBQbHVnaW4ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICdjaWVudG9zLW1kLWV4dHJhY3QtY29kZS1zbmlwcGV0LWRlbW9zJyxcbiAgICBlbmZvcmNlOiAncHJlJyxcbiAgICBhc3luYyBidWlsZFN0YXJ0KCkge1xuICAgICAgLy8gTk9URTogUmVtb3ZlIGV4aXN0aW5nIGNvZGUgc25pcHBldCBkZW1vcy5cbiAgICAgIGNvbnN0IGV4aXN0aW5nQ29kZVNuaXBwZXRzRGVtb3MgPSBmcy5nbG9iU3luYyhwYXRoLmpvaW4oQ09NUE9ORU5UU19ESVJFQ1RPUlksIGAke0NPTVBPTkVOVFNfUFJFRklYfSouKmApKVxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoZXhpc3RpbmdDb2RlU25pcHBldHNEZW1vcy5tYXAoYyA9PiBmc1Byb21pc2VzLnJtKGMpKSlcblxuICAgICAgLy8gTk9URTogQ3JlYXRlIGNvZGUgc25pcHBldCBkZW1vcyBmcm9tIG1kIGZpbGVzLlxuICAgICAgY29uc3QgbWFya2Rvd25pdCA9IE1hcmtkb3duSXQoKVxuICAgICAgY29uc3QgcGF0aHMgPSBmcy5nbG9iU3luYyhERU1PX0ZJTEVTX0dMT0IpXG4gICAgICBjb25zdCBwYXRoc0NvbnRlbnRzID0gYXdhaXQgUHJvbWlzZS5hbGwocGF0aHMubWFwKHAgPT4gZnNQcm9taXNlcy5yZWFkRmlsZShwLCAndXRmLTgnKS50aGVuKGNvbnRlbnQgPT4gKHsgY29udGVudCwgcGF0aDogcCB9KSkpKVxuXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChwYXRoc0NvbnRlbnRzLm1hcCgoeyBwYXRoOiBwLCBjb250ZW50IH0pID0+IHtcbiAgICAgICAgY29uc3QgdG9rZW5zID0gbWFya2Rvd25pdC5wYXJzZShjb250ZW50LCB7fSkuZmlsdGVyKHQgPT4gdC50YWcgPT09ICdjb2RlJyAmJiB0LmluZm8uaW5jbHVkZXMoJ2RlbW8nKSAmJiB0LmluZm8uaW5jbHVkZXMoJ3Z1ZScpKVxuICAgICAgICBjb25zdCBwaWVjZXMgPSBwLnNwbGl0KHBhdGguc2VwKVxuICAgICAgICBjb25zdCBjb21wb25lbnROYW1lID0gcGllY2VzW3BpZWNlcy5sZW5ndGggLSAyXVxuICAgICAgICBsZXQgaSA9IDBcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHRva2Vucy5tYXAoKHQpID0+IHtcbiAgICAgICAgICBjb25zdCBkZW1vTmFtZSA9IGAke0NPTVBPTkVOVFNfUFJFRklYfSR7Y29tcG9uZW50TmFtZX1TbmlwcGV0JHtpKyt9YFxuICAgICAgICAgIGNvbnN0IHdhcm5pbmcgPSAnLy8gTk9URTogQXV0b21hdGljYWxseSBnZW5lcmF0ZWQuIEVkaXRzIHdpbGwgYmUgZGlzY2FyZGVkLlxcbidcblxuICAgICAgICAgIGlmICh0LmNvbnRlbnQuaW5jbHVkZXMoJzwhLS0gZGVtby1jb250cm9sJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBnZXREZW1vV2l0aENvbnRyb2xzKHQuY29udGVudClcbiAgICAgICAgICAgIHJldHVybiBmc1Byb21pc2VzLndyaXRlRmlsZShwYXRoLmpvaW4oQ09NUE9ORU5UU19ESVJFQ1RPUlksIGAke2RlbW9OYW1lfS52dWVgKSwgd2FybmluZyArIGNvbnRlbnQpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZzUHJvbWlzZXMud3JpdGVGaWxlKHBhdGguam9pbihDT01QT05FTlRTX0RJUkVDVE9SWSwgYCR7ZGVtb05hbWV9LnZ1ZWApLCB3YXJuaW5nICsgdC5jb250ZW50KVxuICAgICAgICAgIH1cbiAgICAgICAgfSkpXG4gICAgICB9KSlcbiAgICB9LFxuICAgIGFzeW5jIHRyYW5zZm9ybShjb2RlLCBpZCkge1xuICAgICAgLy8gTk9URTogSW5zZXJ0IHRoZSBkZW1vIGluIGZyb250IG9mIGl0cyBjb2RlIHNuaXBwZXRcbiAgICAgIGNvbnNvbGUubG9nKCd0cmFuc2Zvcm0nKVxuICAgICAgY29uc3QgbWFya2Rvd25pdCA9IE1hcmtkb3duSXQoKVxuICAgICAgY29uc3QgdG9rZW5zID0gbWFya2Rvd25pdC5wYXJzZShjb2RlLCB7fSlcbiAgICAgIGNvbnN0IGNvZGVTbmlwcGV0RGVtb3MgPSB0b2tlbnMuZmlsdGVyKHRva2VuID0+IHRva2VuLnRhZyA9PT0gJ2NvZGUnICYmIHRva2VuLmluZm8uaW5jbHVkZXMoJ2RlbW8nKSAmJiB0b2tlbi5pbmZvLmluY2x1ZGVzKCd2dWUnKSlcbiAgICAgIGNvbnN0IHBpZWNlcyA9IGlkLnNwbGl0KHBhdGguc2VwKVxuICAgICAgY29uc3QgY29tcG9uZW50TmFtZSA9IHBpZWNlc1twaWVjZXMubGVuZ3RoIC0gMl1cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29kZVNuaXBwZXREZW1vcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkZW1vTmFtZSA9IGAke0NPTVBPTkVOVFNfUFJFRklYfSR7Y29tcG9uZW50TmFtZX1TbmlwcGV0JHtpfWBcbiAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZSgnYGBgdnVlIGRlbW8nLCBgPCR7ZGVtb05hbWV9IC8+XFxuXFxgXFxgXFxgdnVlYClcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb2RlXG4gICAgfSxcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZW1vV2l0aENvbnRyb2xzKHNyY1RleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHsgc2NyaXB0LCBzY3JpcHRTZXR1cCwgdGVtcGxhdGUgfSA9IHBhcnNlKHNyY1RleHQpLmRlc2NyaXB0b3JcbiAgaWYgKCF0ZW1wbGF0ZSB8fCAhc2NyaXB0U2V0dXApIHsgcmV0dXJuIHNyY1RleHQgfVxuXG4gIC8vIE5PVEU6IERlc2NlbmQgdGhyb3VnaCB0ZW1wbGF0ZSBBU1QgdG8gZmluZCBjb250cm9sIGRlZmluaXRpb25cbiAgLy8gbm9kZXMgYW5kIHRoZSBub2RlcyB0aGV5IHNob3VsZCBjb250cm9sXG4gIGNvbnN0IG9wZW5Bc3ROb2RlcyA9IFt0ZW1wbGF0ZS5hc3RdIGFzIHsgc291cmNlOiBzdHJpbmcsIHR5cGU6IG51bWJlciwgY2hpbGRyZW46IGFueVtdIH1bXVxuICBsZXQgY29udHJvbEluZm9zID0gW11cbiAgd2hpbGUgKG9wZW5Bc3ROb2Rlcy5sZW5ndGgpIHtcbiAgICBjb25zdCBub2RlID0gb3BlbkFzdE5vZGVzLnBvcCgpXG4gICAgaWYgKCFub2RlPy5jaGlsZHJlbikgeyBjb250aW51ZSB9XG4gICAgY29uc3QgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbltpXVxuICAgICAgaWYgKCdjaGlsZHJlbicgaW4gY2hpbGQgJiYgY2hpbGQuY2hpbGRyZW4pIHtcbiAgICAgICAgb3BlbkFzdE5vZGVzLnB1c2goY2hpbGQpXG4gICAgICB9XG4gICAgICBpZiAoY2hpbGQubG9jPy5zb3VyY2U/LnN0YXJ0c1dpdGgoJzwhLS0gZGVtby1jb250cm9sJykpIHtcbiAgICAgICAgZm9yIChsZXQgaWkgPSBpICsgMTsgaWkgPCBjaGlsZHJlbi5sZW5ndGg7IGlpKyspIHtcbiAgICAgICAgICAvLyBOT1RFOiBGaW5kIHRoZSBuZXh0IHNpYmxpbmcgdGhhdCBpc24ndCBhIGNvbW1lbnQgKHR5cGUgMylcbiAgICAgICAgICBpZiAoY2hpbGRyZW5baWldLnR5cGUgIT09IDMpIHtcbiAgICAgICAgICAgIC8vIE5PVEU6IFdlIGhhdmUgYSBjb250cm9sIGRlZmluaXRpb24gYW5kIGEgc2libGluZyB0b1xuICAgICAgICAgICAgLy8gYXBwbHkgdGhlIGNvbnRyb2wgdG8uIFNvLCB3ZSdsbCBhZGQgYSBgY29udHJvbEluZm9gIHRvXG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBjb250cm9sbGVkIHByb3AuXG4gICAgICAgICAgICBjb25zdCBjb250cm9sSW5mbyA9IHBhcnNlQ29udHJvbERlZmluaXRpb24oY2hpbGQubG9jLnNvdXJjZSlcbiAgICAgICAgICAgIGNvbnN0IG5leHROb25Db21tZW50U2libGluZyA9IGNoaWxkcmVuW2lpXVxuXG4gICAgICAgICAgICBjb25zdCBwcm9wTmFtZSA9IGNvbnRyb2xJbmZvLnByb3BcbiAgICAgICAgICAgIGNvbnN0IHByb3AgPSAocHJvcE5hbWUgJiYgbmV4dE5vbkNvbW1lbnRTaWJsaW5nLnByb3BzKSA/IG5leHROb25Db21tZW50U2libGluZy5wcm9wcy5maWx0ZXIocCA9PiBbcC5yYXdOYW1lLCBwLm5hbWVdLmluY2x1ZGVzKHByb3BOYW1lKSB8fCBbcC5yYXdOYW1lLCBwLm5hbWVdLmluY2x1ZGVzKGA6JHtwcm9wTmFtZX1gKSlbMF0gOiBudWxsXG4gICAgICAgICAgICBpZiAocHJvcCkge1xuICAgICAgICAgICAgICBjb250cm9sSW5mby5ub2RlID0gbmV4dE5vbkNvbW1lbnRTaWJsaW5nXG4gICAgICAgICAgICAgIGNvbnRyb2xJbmZvLnByb3AgPSBwcm9wXG4gICAgICAgICAgICAgIGNvbnRyb2xJbmZvcy5wdXNoKGNvbnRyb2xJbmZvKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIE5PVEU6IFJlbW92ZSBhbnkgY29udHJvbEluZm9zIHdlIGRpZG4ndCBmaW5kXG4gIGNvbnRyb2xJbmZvcyA9IGNvbnRyb2xJbmZvcy5maWx0ZXIoYyA9PiBjLm5vZGUgIT09IG51bGwpXG5cbiAgLy8gTk9URTogU29ydCBjb250cm9sc0luZm9zIGluIGRlc2NlbmRpbmcgb3JkZXIgb2YgY2hhciBvZmZzZXQuIERlc2NlbmRpbmdcbiAgLy8gb3JkZXIgYWxsb3dzIHVzIHRvIHJlcGxhY2UgJ2FiYycgd2l0aCAnYWJjZGUnIG9yICdhYicgd2l0aG91dCBuZWVkaW5nXG4gIC8vIHRvIHJlY2FsY3VsYXRlIHRoZSByZW1haW5pbmcgb2Zmc2V0cy5cbiAgY29uc3QgY29udHJvbEluZm9zQnlDaGFyT2Zmc2V0RGVjID0gWy4uLmNvbnRyb2xJbmZvc10uc29ydCgoYSwgYikgPT4gYi5wcm9wLmxvYy5zdGFydC5vZmZzZXQgLSBhLnByb3AubG9jLnN0YXJ0Lm9mZnNldClcbiAgY29udHJvbEluZm9zQnlDaGFyT2Zmc2V0RGVjLmZvckVhY2goKGMsIGkpID0+IHtcbiAgICAvLyBOT1RFOiBSZXBsYWNlIGNvbnRyb2xsZWQgcHJvcCdzIHZhbHVlIHdpdGggYSByZWZcbiAgICBjLnJlZk5hbWUgPSBgZGVtb0NvbnRyb2xSZWYke2l9YFxuICAgIC8vIE5PVEU6IFJlcGxhY2UgdmFsdWUgaW4gYHRlbXBsYXRlYCB3aXRoIHJlZk5hbWVcbiAgICBjb25zdCBzdGFydEkgPSBjLnByb3AubG9jLnN0YXJ0Lm9mZnNldCAtIHRlbXBsYXRlLmxvYy5zdGFydC5vZmZzZXRcbiAgICBjb25zdCBzdGFydCA9IHRlbXBsYXRlLmNvbnRlbnQuc3Vic3RyaW5nKDAsIHN0YXJ0SSlcbiAgICBjb25zdCBlbmRJID0gYy5wcm9wLmxvYy5lbmQub2Zmc2V0IC0gdGVtcGxhdGUubG9jLnN0YXJ0Lm9mZnNldFxuICAgIGNvbnN0IGVuZCA9IHRlbXBsYXRlLmNvbnRlbnQuc3Vic3RyaW5nKGVuZEkpXG4gICAgY29uc3QgcHJvcE5hbWUgPSBjLnByb3AucmF3TmFtZSA/PyBjLnByb3AubmFtZVxuICAgIGNvbnN0IHByZWZpeCA9IChwcm9wTmFtZS5zdGFydHNXaXRoKCd2LScpIHx8IHByb3BOYW1lLnN0YXJ0c1dpdGgoJzonKSkgPyAnJyA6ICc6J1xuICAgIGNvbnN0IHByb3BTdHJpbmcgPSBgJHtwcmVmaXh9JHtwcm9wTmFtZX09XCIke2MucmVmTmFtZX1cImBcbiAgICB0ZW1wbGF0ZS5jb250ZW50ID0gYCR7c3RhcnR9JHtwcm9wU3RyaW5nfSR7ZW5kfWBcbiAgfSlcblxuICBjb25zdCBjb250cm9sc0NvbXBvbmVudHM6IHN0cmluZ1tdID0gW11cbiAgY29uc3QgY29udHJvbHNSZWZzOiBzdHJpbmdbXSA9IFtdXG4gIGNvbnN0IGNvbnRyb2xzSW1wb3J0c1NldCA9IG5ldyBTZXQ8c3RyaW5nPigpXG4gIGNvbnRyb2xJbmZvcy5mb3JFYWNoKChjKSA9PiB7XG4gICAgY29uc3QgY29udHJvbFR5cGU6ICdjb2xvcicgfCAnc2VsZWN0JyB8ICd0ZXh0JyB8ICdyYW5nZScgfCAnY2hlY2tib3gnIHwgJ3ZlY3RvcjMnID0gKCgpID0+IHtcbiAgICAgIGlmICgndHlwZScgaW4gYykgeyByZXR1cm4gYy50eXBlIH1cbiAgICAgIGlmICh0eXBlb2YgYy52YWx1ZSA9PT0gJ3N0cmluZycgJiYgYy52YWx1ZS5zdGFydHNXaXRoKCcjJykpIHsgcmV0dXJuICdjb2xvcicgfVxuICAgICAgaWYgKHR5cGVvZiBjLnZhbHVlID09PSAnc3RyaW5nJyAmJiAnb3B0aW9ucycgaW4gYykgeyByZXR1cm4gJ3NlbGVjdCcgfVxuICAgICAgaWYgKHR5cGVvZiBjLnZhbHVlID09PSAnc3RyaW5nJykgeyByZXR1cm4gJ3RleHQnIH1cbiAgICAgIGlmICh0eXBlb2YgYy52YWx1ZSA9PT0gJ251bWJlcicpIHsgcmV0dXJuICdyYW5nZScgfVxuICAgICAgaWYgKHR5cGVvZiBjLnZhbHVlID09PSAnYm9vbGVhbicpIHsgcmV0dXJuICdjaGVja2JveCcgfVxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYy52YWx1ZSkgJiYgYy52YWx1ZS5sZW5ndGggPT09IDMgJiYgYy52YWx1ZS5ldmVyeShuID0+IHR5cGVvZiBuID09PSAnbnVtYmVyJykpIHsgcmV0dXJuICd2ZWN0b3IzJyB9XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH0pKClcblxuICAgIGlmIChjb250cm9sVHlwZSA9PT0gbnVsbCkgeyByZXR1cm4gfVxuXG4gICAgY29uc3QgcmF3TGFiZWwgPSBjLmxhYmVsID8/IGMucHJvcC5yYXdOYW1lID8/IGMucHJvcC5uYW1lXG4gICAgLy8gTk9URTogTm9ybWFsaXplIGxhYmVscyBmb3IgVUkgYnkgcmVtb3ZpbmcgaW5pdGlhbCAnOicsIGlmIG9uZSBleGlzdHMuXG4gICAgY29uc3QgbGFiZWwgPSByYXdMYWJlbC5zdGFydHNXaXRoKCc6JykgPyByYXdMYWJlbC5zdWJzdHJpbmcoMSkgOiByYXdMYWJlbFxuICAgIGNvbnN0IHN0YXJ0ID0gYDxEb2NzRGVtb0NvbnRyb2wgbGFiZWw9XCIke2xhYmVsfVwiPlxcbmBcbiAgICBjb25zdCBlbmQgPSBgXFxuPC9Eb2NzRGVtb0NvbnRyb2w+YFxuXG4gICAgaWYgKGNvbnRyb2xUeXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICBjb250cm9sc0ltcG9ydHNTZXQuYWRkKCdpbXBvcnQgRG9jc0RlbW9DaGVja2JveCBmcm9tIFxcJy4vRG9jc0RlbW9DaGVja2JveC52dWVcXCcnKVxuICAgICAgY29udHJvbHNDb21wb25lbnRzLnB1c2goYCR7c3RhcnR9PERvY3NEZW1vQ2hlY2tib3ggOnZhbHVlPVwiJHtjLnJlZk5hbWV9XCIgQGNoYW5nZT1cIih2KT0+eyAke2MucmVmTmFtZX0gPSB2IH1cIiAvPiR7ZW5kfWApXG4gICAgICBjb250cm9sc1JlZnMucHVzaChgY29uc3QgJHtjLnJlZk5hbWV9ID0gZGVtb1JlZigke2MudmFsdWV9KWApXG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRyb2xUeXBlID09PSAndGV4dCcpIHtcbiAgICAgIGNvbnRyb2xzSW1wb3J0c1NldC5hZGQoJ2ltcG9ydCBEb2NzRGVtb1RleHQgZnJvbSBcXCcuL0RvY3NEZW1vVGV4dC52dWVcXCcnKVxuICAgICAgY29udHJvbHNDb21wb25lbnRzLnB1c2goYCR7c3RhcnR9PERvY3NEZW1vVGV4dCA6dmFsdWU9XCIke2MucmVmTmFtZX1cIiBAY2hhbmdlPVwiKHYpPT57ICR7Yy5yZWZOYW1lfSA9IHYgfVwiIC8+JHtlbmR9YClcbiAgICAgIGNvbnRyb2xzUmVmcy5wdXNoKGBjb25zdCAke2MucmVmTmFtZX0gPSBkZW1vUmVmKCcke2MudmFsdWV9JylgKVxuICAgIH1cbiAgICBlbHNlIGlmIChjb250cm9sVHlwZSA9PT0gJ2NvbG9yJykge1xuICAgICAgY29udHJvbHNJbXBvcnRzU2V0LmFkZCgnaW1wb3J0IERvY3NEZW1vQ29sb3IgZnJvbSBcXCcuL0RvY3NEZW1vQ29sb3IudnVlXFwnJylcbiAgICAgIGNvbnRyb2xzQ29tcG9uZW50cy5wdXNoKGAke3N0YXJ0fTxEb2NzRGVtb0NvbG9yIDp2YWx1ZT1cIiR7Yy5yZWZOYW1lfVwiIEBjaGFuZ2U9XCIodik9PnsgJHtjLnJlZk5hbWV9ID0gdiB9XCIgLz4ke2VuZH1gKVxuICAgICAgY29udHJvbHNSZWZzLnB1c2goYGNvbnN0ICR7Yy5yZWZOYW1lfSA9IGRlbW9SZWYoJyR7Yy52YWx1ZX0nKWApXG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbnRyb2xUeXBlID09PSAnc2VsZWN0Jykge1xuICAgICAgY29udHJvbHNJbXBvcnRzU2V0LmFkZCgnaW1wb3J0IERvY3NEZW1vU2VsZWN0IGZyb20gXFwnLi9Eb2NzRGVtb1NlbGVjdC52dWVcXCcnKVxuICAgICAgY29uc3Qgb3B0aW9ucyA9IGMub3B0aW9ucz8ubWFwPy4oKHM6IHN0cmluZykgPT4gYCcke3N9J2ApID8/IGAnJHtjLnZhbHVlfSdgXG4gICAgICBjb250cm9sc0NvbXBvbmVudHMucHVzaChgJHtzdGFydH08RG9jc0RlbW9TZWxlY3QgOm9wdGlvbnM9XCJbJHtvcHRpb25zfV1cIiA6dmFsdWU9XCIke2MucmVmTmFtZX1cIiBAY2hhbmdlPVwiKHYpPT57ICR7Yy5yZWZOYW1lfSA9IHYgfVwiIC8+JHtlbmR9YClcbiAgICAgIGNvbnRyb2xzUmVmcy5wdXNoKGBjb25zdCAke2MucmVmTmFtZX0gPSBkZW1vUmVmKCcke2MudmFsdWV9JylgKVxuICAgIH1cbiAgICBlbHNlIGlmIChjb250cm9sVHlwZSA9PT0gJ3JhbmdlJykge1xuICAgICAgY29udHJvbHNJbXBvcnRzU2V0LmFkZCgnaW1wb3J0IERvY3NEZW1vUmFuZ2UgZnJvbSBcXCcuL0RvY3NEZW1vUmFuZ2UudnVlXFwnJylcbiAgICAgIGNvbnN0IG1pbiA9IHR5cGVvZiBjLm1pbiA9PT0gJ3VuZGVmaW5lZCcgPyAnJyA6IGA6bWluPVwiJHtjLm1pbn1cIiBgXG4gICAgICBjb25zdCBtYXggPSB0eXBlb2YgYy5tYXggPT09ICd1bmRlZmluZWQnID8gJycgOiBgOm1heD1cIiR7Yy5tYXh9XCIgYFxuICAgICAgY29udHJvbHNDb21wb25lbnRzLnB1c2goYCR7c3RhcnR9PERvY3NEZW1vUmFuZ2UgJHttaW59JHttYXh9OnN0ZXA9XCIke2Muc3RlcCA/PyAwLjAxfVwiIDp2YWx1ZT1cIiR7Yy5yZWZOYW1lfVwiIEBjaGFuZ2U9XCIodik9PnsgJHtjLnJlZk5hbWV9ID0gdiB9XCIgLz4ke2VuZH1gKVxuICAgICAgY29udHJvbHNSZWZzLnB1c2goYGNvbnN0ICR7Yy5yZWZOYW1lfSA9IGRlbW9SZWYoJHtjLnZhbHVlfSlgKVxuICAgIH1cbiAgICBlbHNlIGlmIChjb250cm9sVHlwZSA9PT0gJ3ZlY3RvcjMnKSB7XG4gICAgICBjb250cm9sc0ltcG9ydHNTZXQuYWRkKCdpbXBvcnQgRG9jc0RlbW9SYW5nZVZlY3RvcjMgZnJvbSBcXCcuL0RvY3NEZW1vUmFuZ2VWZWN0b3IzLnZ1ZVxcJycpXG4gICAgICBjb25zdCBtaW4gPSB0eXBlb2YgYy5taW4gPT09ICd1bmRlZmluZWQnID8gJycgOiBgOm1pbj1cIiR7Yy5taW59XCIgYFxuICAgICAgY29uc3QgbWF4ID0gdHlwZW9mIGMubWF4ID09PSAndW5kZWZpbmVkJyA/ICcnIDogYDptYXg9XCIke2MubWF4fVwiIGBcbiAgICAgIGNvbnRyb2xzQ29tcG9uZW50cy5wdXNoKGAke3N0YXJ0fTxEb2NzRGVtb1JhbmdlVmVjdG9yMyAke21pbn0ke21heH06c3RlcD1cIiR7Yy5zdGVwID8/IDAuMDF9XCIgOnZhbHVlPVwiJHtjLnJlZk5hbWV9XCIgQGNoYW5nZT1cIih2KT0+eyAke2MucmVmTmFtZX0gPSB2IH1cIiAvPiR7ZW5kfWApXG4gICAgICBjb250cm9sc1JlZnMucHVzaChgY29uc3QgJHtjLnJlZk5hbWV9ID0gZGVtb1JlZjxbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0+KFske2MudmFsdWV9XSlgKVxuICAgIH1cbiAgfSlcblxuICBjb25zdCBzY3JpcHRTZXR1cE91dCA9IHNjcmlwdFNldHVwXG4gICAgPyBgPHNjcmlwdCBzZXR1cCBsYW5nPVwiJHtzY3JpcHRTZXR1cC5sYW5nfVwiPlxuaW1wb3J0IHsgcmVmIGFzIGRlbW9SZWYgfSBmcm9tICd2dWUnJHtzY3JpcHRTZXR1cC5jb250ZW50fVxuaW1wb3J0IERvY3NEZW1vV2l0aENvbnRyb2xzIGZyb20gJy4vRG9jc0RlbW9XaXRoQ29udHJvbHMudnVlJ1xuJHtBcnJheS5mcm9tKGNvbnRyb2xzSW1wb3J0c1NldCkuam9pbignXFxuJyl9XG5cbiR7Y29udHJvbHNSZWZzLmpvaW4oJ1xcbicpfVxuPC9zY3JpcHQ+XFxuXFxuYFxuICAgIDogJydcblxuICBjb25zdCBzY3JpcHRPdXQgPSBzY3JpcHRcbiAgICA/IGA8c2NyaXB0IHNldHVwIGxhbmc9XCIke3NjcmlwdC5sYW5nfVwiPlxuJHtzY3JpcHQuY29udGVudH1cbjwvc2NyaXB0PlxcblxcbmBcbiAgICA6ICcnXG5cbiAgY29uc3QgdGVtcGxhdGVPdXQgPSB0ZW1wbGF0ZVxuICAgID8gYDx0ZW1wbGF0ZT5cbjxEb2NzRGVtb1dpdGhDb250cm9scz4ke3RlbXBsYXRlLmNvbnRlbnR9PC9Eb2NzRGVtb1dpdGhDb250cm9scz5cbjxkaXY+XG4ke2NvbnRyb2xzQ29tcG9uZW50cy5qb2luKCdcXG4nKX1cbjwvZGl2PlxuPC90ZW1wbGF0ZT5cbmBcbiAgICA6ICcnXG5cbiAgcmV0dXJuIGAke3NjcmlwdFNldHVwT3V0fSR7c2NyaXB0T3V0fSR7dGVtcGxhdGVPdXR9YFxufVxuXG5mdW5jdGlvbiBwYXJzZUNvbnRyb2xEZWZpbml0aW9uKGRlZmluaXRpb25TdHJpbmc6IHN0cmluZykge1xuICBjb25zdCBjaGlsZFNvdXJjZUFzRnJvbnRtYXR0ZXIgPSBkZWZpbml0aW9uU3RyaW5nLnNwbGl0KCdcXG4nKS5tYXAoKHM6IHN0cmluZykgPT4gcy50cmltKCkpLmpvaW4oJ1xcbicpLnJlcGxhY2UoJzwhLS0gZGVtby1jb250cm9sJywgJy0tLVxcbnByb3A6ICcpLnJlcGxhY2UoJy0tPicsICctLS0nKVxuICBjb25zdCBjb250cm9sSW5mbyA9IG1hdHRlcihjaGlsZFNvdXJjZUFzRnJvbnRtYXR0ZXIpLmRhdGFcbiAgaWYgKCdvcHRpb25zJyBpbiBjb250cm9sSW5mbykge1xuICAgIC8vIE5PVEU6IFNwbGl0IG9wdGlvbnMgYnkgJywnIGlmIHRoZXJlJ3MgYSBjb21tYSwgb3RoZXJ3aXNlIGJ5ICcgJ1xuICAgIGNvbnN0IHNwbGl0Q2hhciA9IGNvbnRyb2xJbmZvLm9wdGlvbnMuaW5jbHVkZXMoJywnKSA/ICcsJyA6ICcgJ1xuICAgIGNvbnRyb2xJbmZvLm9wdGlvbnMgPSAoY29udHJvbEluZm8ub3B0aW9ucyBhcyBzdHJpbmcpLnNwbGl0KHNwbGl0Q2hhcikubWFwKHMgPT4gcy50cmltKCkpLmZpbHRlcihzID0+ICEhcylcbiAgfVxuICByZXR1cm4gY29udHJvbEluZm9cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFcsT0FBTyxZQUFZO0FBQy9YLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sZUFBZTs7O0FDRnRCLFNBQVMsWUFBWSxvQkFBb0I7QUFDekMsU0FBUyxNQUFNLGVBQWU7OztBQ0Y5QjtBQUFBLEVBQ0UsVUFBWTtBQUFBLElBQ1YsYUFBZTtBQUFBLE1BQ2IsTUFBUTtBQUFBLE1BQ1IsS0FBTztBQUFBLE1BQ1AsWUFBYyxDQUFDO0FBQUEsTUFDZixZQUFjLENBQUM7QUFBQSxJQUNqQjtB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QUFhO0FBQUEsVUFDYixhQUFlO0FBQUEsWUFDYjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBUTtBQUFBLFVBQ1IsTUFBUTtBQUFBLFVBQ1IsTUFBUTtBQUFBLFVBQ1IsU0FBVztBQUFBLFVBQ1gsVUFBWTtBQUFBLFVBQ1osV0FBYTtBQUFBLFVBQ2IsYUFBZTtBQUFBLFlBQ2I7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQVE7QUFBQSxVQUNSLE1BQVE7QUFBQSxVQUNSLE1BQVE7QUFBQSxVQUNSLFNBQVc7QUFBQSxVQUNYLFVBQVk7QUFBQSxVQUNaLFdBQWE7QUFBQSxRQUNmO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBUTtBQUFBLFVBQ1IsTUFBUTtBQUFBLFVBQ1IsTUFBUTtBQUFBLFVBQ1IsU0FBVztBQUFBLFVBQ1gsVUFBWTtBQUFBLFVBQ1osV0FBYTtBQUFBLFVBQ2IsYUFBZTtBQUFBLFlBQ2I7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQVE7QUFBQSxVQUNSLE1BQVE7QUFBQSxVQUNSLE1BQVE7QUFBQSxVQUNSLFNBQVc7QUFBQSxVQUNYLFVBQVk7QUFBQSxVQUNaLFdBQWE7QUFBQSxVQUNiLGFBQWU7QUFBQSxZQUNiO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFRO0FBQUEsVUFDUixNQUFRO0FBQUEsVUFDUixNQUFRO0FBQUEsVUFDUixTQUFXO0FBQUEsVUFDWCxVQUFZO0FBQUEsVUFDWixXQUFhO0FBQUEsVUFDYixhQUFlO0FBQUEsWUFDYjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBUTtBQUFBLFVBQ1IsTUFBUTtBQUFBLFVBQ1IsTUFBUTtBQUFBLFVBQ1IsU0FBVztBQUFBLFVBQ1gsVUFBWTtBQUFBLFVBQ1osV0FBYTtBQUFBLFFBQ2Y7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFRO0FBQUEsVUFDUixNQUFRO0FBQUEsVUFDUixNQUFRO0FBQUEsVUFDUixTQUFXO0FBQUEsVUFDWCxVQUFZO0FBQUEsVUFDWixXQUFhO0FBQUEsVUFDYixhQUFlO0FBQUEsWUFDYjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBUTtBQUFBLFVBQ1IsTUFBUTtBQUFBLFVBQ1IsTUFBUTtBQUFBLFVBQ1IsU0FBVztBQUFBLFVBQ1gsVUFBWTtBQUFBLFVBQ1osV0FBYTtBQUFBLFFBQ2Y7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFRO0FBQUEsVUFDUixNQUFRO0FBQUEsVUFDUixNQUFRO0FBQUEsVUFDUixTQUFXO0FBQUEsVUFDWCxVQUFZO0FBQUEsVUFDWixXQUFhO0FBQUEsVUFDYixhQUFlO0FBQUEsWUFDYjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBUTtBQUFBLFVBQ1IsTUFBUTtBQUFBLFVBQ1IsTUFBUTtBQUFBLFVBQ1IsU0FBVztBQUFBLFVBQ1gsVUFBWTtBQUFBLFVBQ1osV0FBYTtBQUFBLFFBQ2Y7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFRO0FBQUEsVUFDUixNQUFRO0FBQUEsVUFDUixNQUFRO0FBQUEsVUFDUixTQUFXO0FBQUEsVUFDWCxVQUFZO0FBQUEsVUFDWixXQUFhO0FBQUEsVUFDYixhQUFlO0FBQUEsWUFDYjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBUTtBQUFBLFVBQ1IsTUFBUTtBQUFBLFVBQ1IsTUFBUTtBQUFBLFVBQ1IsU0FBVztBQUFBLFVBQ1gsVUFBWTtBQUFBLFVBQ1osV0FBYTtBQUFBLFVBQ2IsYUFBZTtBQUFBLFlBQ2I7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQVE7QUFBQSxVQUNSLE1BQVE7QUFBQSxVQUNSLE1BQVE7QUFBQSxVQUNSLFNBQVc7QUFBQSxVQUNYLFVBQVk7QUFBQSxVQUNaLFdBQWE7QUFBQSxVQUNiLGFBQWU7QUFBQSxZQUNiO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFRO0FBQUEsVUFDUixNQUFRO0FBQUEsVUFDUixNQUFRO0FBQUEsVUFDUixTQUFXO0FBQUEsVUFDWCxVQUFZO0FBQUEsVUFDWixXQUFhO0FBQUEsUUFDZjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQVE7QUFBQSxVQUNSLE1BQVE7QUFBQSxVQUNSLE1BQVE7QUFBQSxVQUNSLFNBQVc7QUFBQSxVQUNYLFVBQVk7QUFBQSxVQUNaLFdBQWE7QUFBQSxRQUNmO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBUTtBQUFBLFVBQ1IsTUFBUTtBQUFBLFVBQ1IsTUFBUTtBQUFBLFVBQ1IsU0FBVztBQUFBLFVBQ1gsVUFBWTtBQUFBLFVBQ1osV0FBYTtBQUFBLFVBQ2IsYUFBZTtBQUFBLFlBQ2I7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQVE7QUFBQSxVQUNSLE1BQVE7QUFBQSxVQUNSLE1BQVE7QUFBQSxVQUNSLFNBQVc7QUFBQSxVQUNYLFVBQVk7QUFBQSxVQUNaLFdBQWE7QUFBQSxRQUNmO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBUTtBQUFBLFVBQ1IsTUFBUTtBQUFBLFVBQ1IsTUFBUTtBQUFBLFVBQ1IsU0FBVztBQUFBLFVBQ1gsVUFBWTtBQUFBLFVBQ1osV0FBYTtBQUFBLFFBQ2Y7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFRO0FBQUEsVUFDUixNQUFRO0FBQUEsVUFDUixNQUFRO0FBQUEsVUFDUixTQUFXO0FBQUEsVUFDWCxVQUFZO0FBQUEsVUFDWixXQUFhO0FBQUEsUUFDZjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQVE7QUFBQSxVQUNSLE1BQVE7QUFBQSxVQUNSLE1BQVE7QUFBQSxVQUNSLFNBQVc7QUFBQSxVQUNYLFVBQVk7QUFBQSxVQUNaLFdBQWE7QUFBQSxVQUNiLGFBQWU7QUFBQSxZQUNiO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFRO0FBQUEsVUFDUixNQUFRO0FBQUEsVUFDUixNQUFRO0FBQUEsVUFDUixT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RjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFRO0FBQUEsTUFDUixNQUFRO0FBQUEsTUFDUixNQUFRO0FBQUEsTUFDUixTQUFXO0FBQUEsTUFDWCxVQUFZO0FBQUEsTUFDWixXQUFhO0FBQUEsTUFDYixhQUFlO0FBQUEsUUFDYjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBUTtBQUFBLE1BQ1IsTUFBUTtBQUFBLE1BQ1IsTUFBUTtBQUFBLE1BQ1IsU0FBVztBQUFBLE1BQ1gsVUFBWTtBQUFBLE1BQ1osV0FBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFRO0FBQUEsTUFDUixNQUFRO0FBQUEsTUFDUixNQUFRO0FBQUEsTUFDUixTQUFXO0FBQUEsTUFDWCxVQUFZO0FBQUEsTUFDWixXQUFhO0FBQUEsTUFDYixhQUFlO0FBQUEsUUFDYjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBUTtBQUFBLE1BQ1IsTUFBUTtBQUFBLE1BQ1IsTUFBUTtBQUFBLE1BQ1IsU0FBVztBQUFBLE1BQ1gsVUFBWTtBQUFBLE1BQ1osV0FBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFRO0FBQUEsTUFDUixNQUFRO0FBQUEsTUFDUixNQUFRO0FBQUEsTUFDUixTQUFXO0FBQUEsTUFDWCxVQUFZO0FBQUEsTUFDWixXQUFhO0FBQUEsTUFDYixhQUFlO0FBQUEsUUFDYjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBUTtBQUFBLE1BQ1IsTUFBUTtBQUFBLE1BQ1IsTUFBUTtBQUFBLE1BQ1IsU0FBVztBQUFBLE1BQ1gsVUFBWTtBQUFBLE1BQ1osV0FBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFRO0FBQUEsTUFDUixNQUFRO0FBQUEsTUFDUixNQUFRO0FBQUEsTUFDUixTQUFXO0FBQUEsTUFDWCxVQUFZO0FBQUEsTUFDWixXQUFhO0FBQUEsTUFDYixhQUFlO0FBQUEsUUFD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QUUsUUFBUSxjQUFjLEtBQUssU0FBUyxFQUFFLEdBQUc7QUFDOUQseUJBQW1CLEtBQUssR0FBRyxLQUFLLHlCQUF5QixHQUFHLEdBQUcsR0FBRyxVQUFVLEVBQUUsUUFBUSxJQUFJLGFBQWEsRUFBRSxPQUFPLHFCQUFxQixFQUFFLE9BQU8sYUFBYSxHQUFHLEVBQUU7QUFDaEssbUJBQWEsS0FBSyxTQUFTLEVBQUUsT0FBTyx5Q0FBeUMsRUFBRSxLQUFLLElBQUk7QUFBQSxJQUMxRjtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0saUJBQWlCLGNBQ25CLHVCQUF1QixZQUFZLElBQUk7QUFBQSxzQ0FDUCxZQUFZLE9BQU87QUFBQTtBQUFBLEVBRXZELE1BQU0sS0FBSyxrQkFBa0IsRUFBRSxLQUFLLElBQUksQ0FBQztBQUFBO0FBQUEsRUFFekMsYUFBYSxLQUFLLElBQUksQ0FBQztBQUFBO0FBQUE7QUFBQSxJQUVuQjtBQUVKLFFBQU0sWUFBWSxTQUNkLHVCQUF1QixPQUFPLElBQUk7QUFBQSxFQUN0QyxPQUFPLE9BQU87QUFBQTtBQUFBO0FBQUEsSUFFVjtBQUVKLFFBQU0sY0FBYyxXQUNoQjtBQUFBLHdCQUNrQixTQUFTLE9BQU87QUFBQTtBQUFBLEVBRXRDLG1CQUFtQixLQUFLLElBQUksQ0FBQztBQUFBO0FBQUE7QUFBQSxJQUl6QjtBQUVKLFNBQU8sR0FBRyxjQUFjLEdBQUcsU0FBUyxHQUFHLFdBQVc7QUFDcEQ7QUFFQSxTQUFTLHVCQUF1QixrQkFBMEI7QUFDeEQsUUFBTSwyQkFBMkIsaUJBQWlCLE1BQU0sSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFjLEVBQUUsS0FBSyxDQUFDLEVBQUUsS0FBSyxJQUFJLEVBQUUsUUFBUSxxQkFBcUIsYUFBYSxFQUFFLFFBQVEsT0FBTyxLQUFLO0FBQ3RLLFFBQU0sY0FBYyxPQUFPLHdCQUF3QixFQUFFO0FBQ3JELE1BQUksYUFBYSxhQUFhO0FBRTVCLFVBQU0sWUFBWSxZQUFZLFFBQVEsU0FBUyxHQUFHLElBQUksTUFBTTtBQUM1RCxnQkFBWSxVQUFXLFlBQVksUUFBbUIsTUFBTSxTQUFTLEVBQUUsSUFBSSxPQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxPQUFLLENBQUMsQ0FBQyxDQUFDO0FBQUEsRUFDM0c7QUFDQSxTQUFPO0FBQ1Q7OztBSjdOQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCwrQkFBK0I7QUFBQSxJQUMvQixrQkFBa0I7QUFBQSxJQUNsQixVQUFVO0FBQUEsSUFDVixPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUE7QUFBQSxNQUVULE1BQU0sQ0FBQyw2QkFBNkI7QUFBQSxNQUNwQyxZQUFZLENBQUMsT0FBTyxJQUFJO0FBQUE7QUFBQSxNQUV4QixTQUFTLENBQUMsVUFBVSxjQUFjLE9BQU87QUFBQSxNQUN6QyxLQUFLO0FBQUEsSUFDUCxDQUFDO0FBQUEsRUFDSDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbIl9fZGlybmFtZSIsICJjb250ZW50Il0KfQo=
