/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEO_API: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
