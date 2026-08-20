import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base:"/kirtipur/",
  server: {
    watch: {
      // Large source GLBs may be locked by 3D editors on Windows.
      ignored: ["**/3D/**", "**/public/models/**", "**/images/**"],
    },
  },
  build: {
    // The temple GLBs are large even after compression — raise the
    // warning threshold instead of pretending they're small assets.
    chunkSizeWarningLimit: 4000,
  },
});
