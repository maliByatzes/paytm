import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import SignUp from "./pages/signup/SignUp"
import SignIn from "./pages/signin/SignIn"
import Dashboard from "./pages/dashboard/Dashboard"
import Send from "./pages/send/Send"
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex items-center justify-center">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<Send />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
