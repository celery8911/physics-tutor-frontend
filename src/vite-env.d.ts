/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MASTRA_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
