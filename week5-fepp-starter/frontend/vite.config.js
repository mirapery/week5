import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {                                // Object that defines proxy rules for the development derver
      "/api": {                             // Define a path of requests that should be proxied
        target: "http://localhost:4000",    // The target backend server where requests should be forwarded
        changeOrigin: true,                 // Adjust the Origin header of the request to match the target
      },
    },
  },
});

// Explanation: proxy
// Proxy is used to redirect API requests from the frontend development server to a backend server
// Extremely useful when the frontend and backend run on different port or domains
// A proxy eliminates the need for backend CORS configuration during development by hiding the cross-origin nature of the request
// With a proxy you can simplify your API requests by using paths like /api/users in your frontend code instead of hardcoding the full backend URL
