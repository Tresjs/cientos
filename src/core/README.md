# @tres/cientos core

Directories here hold Cientos components and related data.

## Required files

Each directory must contain at least:

* `component.vue` – Vue SFC containing the component. Exported as [directory name]
* `index.md` – component docs for https://cientos.tresjs.org/core/[directory name]. Details below.

## Optional files

* `playground{optionalName}.vue` – Vue SFC playground for testing component functionality. Viewable locally with `$ pnpm run dev`
* `index.ts` – composable related to the component functionality. E.g. `CubeCamera` can be used as a composable in `<script setup>` with `useCubeCamera`. Exported as use[directory name].

### Docs `index.md`

Docs are viewable locally with `$ pnpm run docs:dev` and publically at https://cientos.tresjs.org/

`index.md` contains the docs page for a particular component. This is a markdown file and *must* begin with markdown front-matter.

#### Minimal front-matter

`index.md` front-matter *must* contain the component category. E.g.:

```md
---
category: shapes
---
```

* category: string – Used to group components in docs and playgrounds listings

#### Optional front-matter keys/values

`index.md` front-matter *may* contain:

* alias: string – Component and `use` function will also be exported using this name.
* related: string or string[] – Related components, displayed on the docs page.
