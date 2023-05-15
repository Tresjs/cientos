// vite.config.ts
import vue from "file:///C:/Users/Jaime/Desktop/packages-libraries/tres-group/cientos/node_modules/.pnpm/@vitejs+plugin-vue@4.2.1_vite@4.3.5+vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { defineConfig } from "file:///C:/Users/Jaime/Desktop/packages-libraries/tres-group/cientos/node_modules/.pnpm/vite@4.3.5/node_modules/vite/dist/node/index.js";
import banner from "file:///C:/Users/Jaime/Desktop/packages-libraries/tres-group/cientos/node_modules/.pnpm/vite-plugin-banner@0.7.0/node_modules/vite-plugin-banner/dist/index.mjs";
import dts from "file:///C:/Users/Jaime/Desktop/packages-libraries/tres-group/cientos/node_modules/.pnpm/vite-plugin-dts@2.3.0_vite@4.3.5/node_modules/vite-plugin-dts/dist/index.mjs";
import analyze from "file:///C:/Users/Jaime/Desktop/packages-libraries/tres-group/cientos/node_modules/.pnpm/rollup-plugin-analyzer@4.0.0/node_modules/rollup-plugin-analyzer/index.js";
import { resolve } from "file:///C:/Users/Jaime/Desktop/packages-libraries/tres-group/cientos/node_modules/.pnpm/pathe@1.1.0/node_modules/pathe/dist/index.mjs";
import { lightGreen, yellow, gray, bold } from "file:///C:/Users/Jaime/Desktop/packages-libraries/tres-group/cientos/node_modules/.pnpm/kolorist@1.8.0/node_modules/kolorist/dist/esm/index.mjs";

// package.json
var package_default = {
  name: "@tresjs/cientos",
  description: "Collection of useful helpers and fully functional, ready-made abstractions for Tres",
  version: "2.0.0-rc.3",
  type: "module",
  packageManager: "pnpm@8.4.0",
  author: "Alvaro Saburido <hola@alvarosaburido.dev> (https://github.com/alvarosabu/)",
  files: [
    "dist"
  ],
  license: "MIT",
  main: "./dist/trescientos.umd.cjs",
  module: "./dist/trescientos.js",
  types: "./dist/index.d.ts",
  exports: {
    ".": {
      import: "./dist/trescientos.js",
      require: "./dist/trescientos.umd.cjs"
    },
    "./styles": "./dist/style.css",
    "./*": "./dist/trescientos.js"
  },
  publishConfig: {
    access: "public"
  },
  keywords: [
    "vue",
    "3d",
    "threejs",
    "three",
    "threejs-vue"
  ],
  scripts: {
    dev: "vite",
    playground: "cd playground && nr dev",
    build: "vite build",
    preview: "vite preview",
    release: "release-it",
    lint: "eslint . --ext .js,.jsx,.ts,.tsx,.vue",
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  peerDependencies: {
    "@tresjs/core": "2.0.0-rc.2",
    three: "latest",
    vue: "^3.2.47"
  },
  devDependencies: {
    "@alvarosabu/prettier-config": "^1.3.0",
    "@release-it/conventional-changelog": "^5.1.1",
    "@tweakpane/plugin-essentials": "^0.1.8",
    "@types/three": "^0.152.0",
    "@typescript-eslint/eslint-plugin": "^5.59.2",
    "@typescript-eslint/parser": "^5.59.2",
    "@vitejs/plugin-vue": "^4.2.1",
    eslint: "^8.39.0",
    "eslint-config-prettier": "^8.8.0",
    "eslint-plugin-vue": "^9.11.0",
    gsap: "^3.11.5",
    kolorist: "^1.8.0",
    pathe: "^1.1.0",
    prettier: "^2.8.8",
    "release-it": "^15.10.3",
    "rollup-plugin-analyzer": "^4.0.0",
    "rollup-plugin-visualizer": "^5.9.0",
    tweakpane: "^3.1.9",
    typescript: "^5.0.4",
    unocss: "^0.51.8",
    vite: "^4.3.4",
    "vite-plugin-banner": "^0.7.0",
    "vite-plugin-dts": "2.3.0",
    "vite-svg-loader": "^4.0.0",
    vitepress: "1.0.0-alpha.75"
  },
  dependencies: {
    "@tresjs/core": "2.0.0-rc.4",
    "@vueuse/core": "^10.1.2",
    three: "^0.152.2",
    "three-stdlib": "^2.21.10",
    vue: "^3.2.47"
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "C:\\Users\\Jaime\\Desktop\\packages-libraries\\tres-group\\cientos";
console.log(`${lightGreen("\u25B2")} ${gray("\u25A0")} ${yellow("\u2665")} ${bold("Tres/cientos")} v${package_default.version}`);
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "/@": resolve(__vite_injected_original_dirname, "./src")
    },
    dedupe: ["@tresjs/core"]
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("Tres") && tag !== "TresCanvas"
        }
      }
    }),
    dts({
      insertTypesEntry: true
    }),
    banner({
      content: `/**
 * name: ${package_default.name}
 * version: v${package_default.version}
 * (c) ${(/* @__PURE__ */ new Date()).getFullYear()}
 * description: ${package_default.description}
 * author: ${package_default.author}
 */`
    })
  ],
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "trescientos",
      fileName: "trescientos"
    },
    copyPublicDir: false,
    watch: {
      include: [resolve(__vite_injected_original_dirname, "src")]
    },
    rollupOptions: {
      plugins: [
        analyze()
        /* visualizer({
          gzipSize: true,
          brotliSize: true,
          open: false,
        }), */
      ],
      external: ["three", "vue", "@tresjs/core"],
      output: {
        exports: "named",
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          "@tresjs/core": "TresjsCore",
          three: "Three",
          vue: "Vue"
        }
      }
    }
  },
  optimizeDeps: {
    exclude: ["three", "vue", "@tresjs/core"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcSmFpbWVcXFxcRGVza3RvcFxcXFxwYWNrYWdlcy1saWJyYXJpZXNcXFxcdHJlcy1ncm91cFxcXFxjaWVudG9zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxKYWltZVxcXFxEZXNrdG9wXFxcXHBhY2thZ2VzLWxpYnJhcmllc1xcXFx0cmVzLWdyb3VwXFxcXGNpZW50b3NcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0phaW1lL0Rlc2t0b3AvcGFja2FnZXMtbGlicmFyaWVzL3RyZXMtZ3JvdXAvY2llbnRvcy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5cclxuaW1wb3J0IGJhbm5lciBmcm9tICd2aXRlLXBsdWdpbi1iYW5uZXInXHJcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJ1xyXG5pbXBvcnQgYW5hbHl6ZSBmcm9tICdyb2xsdXAtcGx1Z2luLWFuYWx5emVyJ1xyXG4vKiBpbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJyAqL1xyXG5cclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGhlJ1xyXG5cclxuaW1wb3J0IHsgbGlnaHRHcmVlbiwgeWVsbG93LCBncmF5LCBib2xkIH0gZnJvbSAna29sb3Jpc3QnXHJcblxyXG5pbXBvcnQgcGtnIGZyb20gJy4vcGFja2FnZS5qc29uJ1xyXG5cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcclxuY29uc29sZS5sb2coYCR7bGlnaHRHcmVlbignXHUyNUIyJyl9ICR7Z3JheSgnXHUyNUEwJyl9ICR7eWVsbG93KCdcdTI2NjUnKX0gJHtib2xkKCdUcmVzL2NpZW50b3MnKX0gdiR7cGtnLnZlcnNpb259YClcclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnL0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXHJcbiAgICB9LFxyXG4gICAgZGVkdXBlOiBbJ0B0cmVzanMvY29yZSddLFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKHtcclxuICAgICAgdGVtcGxhdGU6IHtcclxuICAgICAgICBjb21waWxlck9wdGlvbnM6IHtcclxuICAgICAgICAgIGlzQ3VzdG9tRWxlbWVudDogdGFnID0+IHRhZy5zdGFydHNXaXRoKCdUcmVzJykgJiYgdGFnICE9PSAnVHJlc0NhbnZhcycsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0pLFxyXG4gICAgZHRzKHtcclxuICAgICAgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZSxcclxuICAgIH0pLFxyXG4gICAgYmFubmVyKHtcclxuICAgICAgY29udGVudDogYC8qKlxcbiAqIG5hbWU6ICR7cGtnLm5hbWV9XFxuICogdmVyc2lvbjogdiR7XHJcbiAgICAgICAgcGtnLnZlcnNpb25cclxuICAgICAgfVxcbiAqIChjKSAke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX1cXG4gKiBkZXNjcmlwdGlvbjogJHtwa2cuZGVzY3JpcHRpb259XFxuICogYXV0aG9yOiAke3BrZy5hdXRob3J9XFxuICovYCxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIGxpYjoge1xyXG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcclxuICAgICAgbmFtZTogJ3RyZXNjaWVudG9zJyxcclxuICAgICAgZmlsZU5hbWU6ICd0cmVzY2llbnRvcycsXHJcbiAgICB9LFxyXG4gICAgY29weVB1YmxpY0RpcjogZmFsc2UsXHJcbiAgICB3YXRjaDoge1xyXG4gICAgICBpbmNsdWRlOiBbcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKV0sXHJcbiAgICB9LFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgYW5hbHl6ZSgpLFxyXG4gICAgICAgIC8qIHZpc3VhbGl6ZXIoe1xyXG4gICAgICAgICAgZ3ppcFNpemU6IHRydWUsXHJcbiAgICAgICAgICBicm90bGlTaXplOiB0cnVlLFxyXG4gICAgICAgICAgb3BlbjogZmFsc2UsXHJcbiAgICAgICAgfSksICovXHJcbiAgICAgIF0sXHJcbiAgICAgIGV4dGVybmFsOiBbJ3RocmVlJywgJ3Z1ZScsICdAdHJlc2pzL2NvcmUnXSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgZXhwb3J0czogJ25hbWVkJyxcclxuICAgICAgICAvLyBQcm92aWRlIGdsb2JhbCB2YXJpYWJsZXMgdG8gdXNlIGluIHRoZSBVTUQgYnVpbGRcclxuICAgICAgICAvLyBmb3IgZXh0ZXJuYWxpemVkIGRlcHNcclxuICAgICAgICBnbG9iYWxzOiB7XHJcbiAgICAgICAgICAnQHRyZXNqcy9jb3JlJzogJ1RyZXNqc0NvcmUnLFxyXG4gICAgICAgICAgdGhyZWU6ICdUaHJlZScsXHJcbiAgICAgICAgICB2dWU6ICdWdWUnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBleGNsdWRlOiBbJ3RocmVlJywgJ3Z1ZScsICdAdHJlc2pzL2NvcmUnXSxcclxuICB9LFxyXG59KVxyXG4iLCAie1xyXG4gIFwibmFtZVwiOiBcIkB0cmVzanMvY2llbnRvc1wiLFxyXG4gIFwiZGVzY3JpcHRpb25cIjogXCJDb2xsZWN0aW9uIG9mIHVzZWZ1bCBoZWxwZXJzIGFuZCBmdWxseSBmdW5jdGlvbmFsLCByZWFkeS1tYWRlIGFic3RyYWN0aW9ucyBmb3IgVHJlc1wiLFxyXG4gIFwidmVyc2lvblwiOiBcIjIuMC4wLXJjLjNcIixcclxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcclxuICBcInBhY2thZ2VNYW5hZ2VyXCI6IFwicG5wbUA4LjQuMFwiLFxyXG4gIFwiYXV0aG9yXCI6IFwiQWx2YXJvIFNhYnVyaWRvIDxob2xhQGFsdmFyb3NhYnVyaWRvLmRldj4gKGh0dHBzOi8vZ2l0aHViLmNvbS9hbHZhcm9zYWJ1LylcIixcclxuICBcImZpbGVzXCI6IFtcclxuICAgIFwiZGlzdFwiXHJcbiAgXSxcclxuICBcImxpY2Vuc2VcIjogXCJNSVRcIixcclxuICBcIm1haW5cIjogXCIuL2Rpc3QvdHJlc2NpZW50b3MudW1kLmNqc1wiLFxyXG4gIFwibW9kdWxlXCI6IFwiLi9kaXN0L3RyZXNjaWVudG9zLmpzXCIsXHJcbiAgXCJ0eXBlc1wiOiBcIi4vZGlzdC9pbmRleC5kLnRzXCIsXHJcbiAgXCJleHBvcnRzXCI6IHtcclxuICAgIFwiLlwiOiB7XHJcbiAgICAgIFwiaW1wb3J0XCI6IFwiLi9kaXN0L3RyZXNjaWVudG9zLmpzXCIsXHJcbiAgICAgIFwicmVxdWlyZVwiOiBcIi4vZGlzdC90cmVzY2llbnRvcy51bWQuY2pzXCJcclxuICAgIH0sXHJcbiAgICBcIi4vc3R5bGVzXCI6IFwiLi9kaXN0L3N0eWxlLmNzc1wiLFxyXG4gICAgXCIuLypcIjogXCIuL2Rpc3QvdHJlc2NpZW50b3MuanNcIlxyXG4gIH0sXHJcbiAgXCJwdWJsaXNoQ29uZmlnXCI6IHtcclxuICAgIFwiYWNjZXNzXCI6IFwicHVibGljXCJcclxuICB9LFxyXG4gIFwia2V5d29yZHNcIjogW1xyXG4gICAgXCJ2dWVcIixcclxuICAgIFwiM2RcIixcclxuICAgIFwidGhyZWVqc1wiLFxyXG4gICAgXCJ0aHJlZVwiLFxyXG4gICAgXCJ0aHJlZWpzLXZ1ZVwiXHJcbiAgXSxcclxuICBcInNjcmlwdHNcIjoge1xyXG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXHJcbiAgICBcInBsYXlncm91bmRcIjogXCJjZCBwbGF5Z3JvdW5kICYmIG5yIGRldlwiLFxyXG4gICAgXCJidWlsZFwiOiBcInZpdGUgYnVpbGRcIixcclxuICAgIFwicHJldmlld1wiOiBcInZpdGUgcHJldmlld1wiLFxyXG4gICAgXCJyZWxlYXNlXCI6IFwicmVsZWFzZS1pdFwiLFxyXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IC4gLS1leHQgLmpzLC5qc3gsLnRzLC50c3gsLnZ1ZVwiLFxyXG4gICAgXCJkb2NzOmRldlwiOiBcInZpdGVwcmVzcyBkZXYgZG9jc1wiLFxyXG4gICAgXCJkb2NzOmJ1aWxkXCI6IFwidml0ZXByZXNzIGJ1aWxkIGRvY3NcIixcclxuICAgIFwiZG9jczpwcmV2aWV3XCI6IFwidml0ZXByZXNzIHByZXZpZXcgZG9jc1wiXHJcbiAgfSxcclxuICBcInBlZXJEZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAdHJlc2pzL2NvcmVcIjogXCIyLjAuMC1yYy4yXCIsXHJcbiAgICBcInRocmVlXCI6IFwibGF0ZXN0XCIsXHJcbiAgICBcInZ1ZVwiOiBcIl4zLjIuNDdcIlxyXG4gIH0sXHJcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAYWx2YXJvc2FidS9wcmV0dGllci1jb25maWdcIjogXCJeMS4zLjBcIixcclxuICAgIFwiQHJlbGVhc2UtaXQvY29udmVudGlvbmFsLWNoYW5nZWxvZ1wiOiBcIl41LjEuMVwiLFxyXG4gICAgXCJAdHdlYWtwYW5lL3BsdWdpbi1lc3NlbnRpYWxzXCI6IFwiXjAuMS44XCIsXHJcbiAgICBcIkB0eXBlcy90aHJlZVwiOiBcIl4wLjE1Mi4wXCIsXHJcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiXjUuNTkuMlwiLFxyXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjUuNTkuMlwiLFxyXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNC4yLjFcIixcclxuICAgIFwiZXNsaW50XCI6IFwiXjguMzkuMFwiLFxyXG4gICAgXCJlc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6IFwiXjguOC4wXCIsXHJcbiAgICBcImVzbGludC1wbHVnaW4tdnVlXCI6IFwiXjkuMTEuMFwiLFxyXG4gICAgXCJnc2FwXCI6IFwiXjMuMTEuNVwiLFxyXG4gICAgXCJrb2xvcmlzdFwiOiBcIl4xLjguMFwiLFxyXG4gICAgXCJwYXRoZVwiOiBcIl4xLjEuMFwiLFxyXG4gICAgXCJwcmV0dGllclwiOiBcIl4yLjguOFwiLFxyXG4gICAgXCJyZWxlYXNlLWl0XCI6IFwiXjE1LjEwLjNcIixcclxuICAgIFwicm9sbHVwLXBsdWdpbi1hbmFseXplclwiOiBcIl40LjAuMFwiLFxyXG4gICAgXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjogXCJeNS45LjBcIixcclxuICAgIFwidHdlYWtwYW5lXCI6IFwiXjMuMS45XCIsXHJcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS4wLjRcIixcclxuICAgIFwidW5vY3NzXCI6IFwiXjAuNTEuOFwiLFxyXG4gICAgXCJ2aXRlXCI6IFwiXjQuMy40XCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLWJhbm5lclwiOiBcIl4wLjcuMFwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1kdHNcIjogXCIyLjMuMFwiLFxyXG4gICAgXCJ2aXRlLXN2Zy1sb2FkZXJcIjogXCJeNC4wLjBcIixcclxuICAgIFwidml0ZXByZXNzXCI6IFwiMS4wLjAtYWxwaGEuNzVcIlxyXG4gIH0sXHJcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAdHJlc2pzL2NvcmVcIjogXCIyLjAuMC1yYy40XCIsXHJcbiAgICBcIkB2dWV1c2UvY29yZVwiOiBcIl4xMC4xLjJcIixcclxuICAgIFwidGhyZWVcIjogXCJeMC4xNTIuMlwiLFxyXG4gICAgXCJ0aHJlZS1zdGRsaWJcIjogXCJeMi4yMS4xMFwiLFxyXG4gICAgXCJ2dWVcIjogXCJeMy4yLjQ3XCJcclxuICB9XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvWCxPQUFPLFNBQVM7QUFDcFksU0FBUyxvQkFBb0I7QUFFN0IsT0FBTyxZQUFZO0FBQ25CLE9BQU8sU0FBUztBQUNoQixPQUFPLGFBQWE7QUFHcEIsU0FBUyxlQUFlO0FBRXhCLFNBQVMsWUFBWSxRQUFRLE1BQU0sWUFBWTs7O0FDVi9DO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixhQUFlO0FBQUEsRUFDZixTQUFXO0FBQUEsRUFDWCxNQUFRO0FBQUEsRUFDUixnQkFBa0I7QUFBQSxFQUNsQixRQUFVO0FBQUEsRUFDVixPQUFTO0FBQUEsSUFDUDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVc7QUFBQSxFQUNYLE1BQVE7QUFBQSxFQUNSLFFBQVU7QUFBQSxFQUNWLE9BQVM7QUFBQSxFQUNULFNBQVc7QUFBQSxJQUNULEtBQUs7QUFBQSxNQUNILFFBQVU7QUFBQSxNQUNWLFNBQVc7QUFBQSxJQUNiO0FBQUEsSUFDQSxZQUFZO0FBQUEsSUFDWixPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsZUFBaUI7QUFBQSxJQUNmLFFBQVU7QUFBQSxFQUNaO0FBQUEsRUFDQSxVQUFZO0FBQUEsSUFDVjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFXO0FBQUEsSUFDVCxLQUFPO0FBQUEsSUFDUCxZQUFjO0FBQUEsSUFDZCxPQUFTO0FBQUEsSUFDVCxTQUFXO0FBQUEsSUFDWCxTQUFXO0FBQUEsSUFDWCxNQUFRO0FBQUEsSUFDUixZQUFZO0FBQUEsSUFDWixjQUFjO0FBQUEsSUFDZCxnQkFBZ0I7QUFBQSxFQUNsQjtBQUFBLEVBQ0Esa0JBQW9CO0FBQUEsSUFDbEIsZ0JBQWdCO0FBQUEsSUFDaEIsT0FBUztBQUFBLElBQ1QsS0FBTztB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
