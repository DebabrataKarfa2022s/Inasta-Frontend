import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
export default defineConfig({
  plugins: [react()],
  server:{
    open:true,
    hmr: true,
    historyApiFallback: true,
    // proxy:{
    //   // "/api": "http://localhost:6080",
    //   "/api": "https://insta-backend-za7q.onrender.com",
    // },
  },
  

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})