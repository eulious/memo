import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  build: {
    sourcemap: true,
    target: "esnext"
  },
  server: {
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:6547/api",
        changeOrigin: true
      }
    }
  },
  plugins: [
    solidPlugin(),
    VitePWA({
      mode: "production",
      base: "/",
      includeAssets: ["favicon.ico"],
      manifest: {
        name: "PWA Router",
        short_name: "PWA Router",
        theme_color: "#ffffff",
        icons: [
          {
            src: "thumb.png",
            sizes: "256x256",
            type: "image/png"
          }
        ]
      },
      devOptions: {
        enabled: false,
        type: "module",
        navigateFallback: "index.html"
      }
    })
  ]
});
