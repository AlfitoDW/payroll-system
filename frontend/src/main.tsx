import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import "./index.css"
import router from "@/router"
import { Toaster } from "sonner"
import { AuthProvider } from "@/contexts/AuthContext"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          className: "bg-neutral-900 border border-neutral-800 text-white",
        }}
      />
    </AuthProvider>
  </StrictMode>
)