import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "base-app",
      remotes: {
        librariesApp: "http://localhost:5001/assets/remoteEntry.js",
      },
      exposes: {
        "./base": "./App",
      },
      shared: [
        "react",
        "react-dom",
        "react-router-dom",
        "antd-msb",
        "i18next",
        "react-i18next",
        "recoil",
        "recoil-persist",
        "@ant-design/icons",
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        match: "always",
        relativeUrls: true,
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: "",
      },
    ],
  },
  server: {
    port: 3003,
  },
  build: {
    target: "esnext",
    modulePreload: false,
    minify: false,
    cssCodeSplit: false,
  },
  preview: {
    port: 5003,
    host: "localhost",
    strictPort: true,
  },
});
