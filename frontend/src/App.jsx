import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"
import SignUp from "./pages/signup/SignUp"
import SignIn from "./pages/signin/SignIn"
import Dashboard from "./pages/dashboard/Dashboard"
import Send from "./pages/send/Send"
import { ThemeProvider } from "@/components/theme-provider"
import { useAuthContext } from "./context/AuthContext"
import { Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"

function App() {
  const { authUser } = useAuthContext();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={authUser ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />} />
          <Route path="/signup" element={authUser ? <Navigate to="/dashboard" /> : <SignUp />} />
          <Route path="/signin" element={authUser ? <Navigate to="/dashboard" /> : <SignIn />} />
          <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to="/signin" />} />
          <Route path="/send" element={authUser ? <Send /> : <Navigate to="/signin" />} />
        </Routes>
        <Toaster />
      </div>
    </ThemeProvider>
  )
}

export default App
