/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEO_API: string
  readonly VITE_MAPBOX_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
