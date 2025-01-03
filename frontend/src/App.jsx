import { Navigate, Route, Routes } from "react-router-dom"
import { useAuthContext } from "./context/AuthContext";

import Landing from "./pages/landing/Landing";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import Upload from "./pages/upload/Upload";
import Capture from "./pages/upload/Capture";
import History from "./pages/history/History";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <Navigate to={"/home"} /> : <Landing />} />
        <Route path="/login" element={authUser ? <Navigate to={"/home"} /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to={"/home"} /> : <SignUp />} />
        <Route path="/home" element={authUser ? <Home /> : <Navigate to={"/"} />} />
        <Route path="/capture" element={authUser ? <Capture /> : <Navigate to={"/"} />} />
        <Route path="/upload" element={authUser ? <Upload /> : <Navigate to={"/"} />} />
        <Route path="/history" element={authUser ? <History /> : <Navigate to={"/"} />} />
        <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to={"/"} />} />
      </Routes>
    </>
  )
}

export default App
