import { useEnrollmentContext } from "./context/EnrollmentContext";
import { Navigate, Route, Routes } from "react-router-dom"
import { useAuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

import Landing from "./pages/landing/Landing";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import Upload from "./pages/upload/Upload";
import Capture from "./pages/upload/Capture";
import History from "./pages/history/History";
import Dashboard from "./pages/dashboard/Dashboard";
import PersonalDashboard from "./pages/dashboard/PersonalDashboard";
import RegionalDashboard from "./pages/dashboard/RegionalDashboard";
import Profile from "./pages/profile/Profile";
import MarketPlace from "./pages/marketplace/Marketplace";
import MarketplaceBuy from "./pages/marketplace/MarketplaceBuy";
import CompletePayment from "./pages/payment/CompletePayment";
import CancelPayment from "./pages/payment/CancelPayment";
import Gratitude from "./pages/gratitude/Gratitude";
import Orders from "./pages/marketplace/Orders";
import MyListings from "./pages/marketplace/MyListings";
import MarketplaceSell from "./pages/marketplace/MarketplaceSell";
import Contribute from "./pages/elevatedUser/gamify/Contribute";
import GamePage from "./pages/elevatedUser/gamify/GamePage";
import ImagePage from "./pages/elevatedUser/gamify/ImagePage";

function App() {
  const { authUser } = useAuthContext();
  const {enrolledUser} = useEnrollmentContext();

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
        <Route path="/dashboard/personal" element={authUser ? <PersonalDashboard /> : <Navigate to={"/"} />} />
        <Route path="/dashboard/:district" element={authUser ? <RegionalDashboard /> : <Navigate to={"/"} />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to={"/"} />} />
        <Route path="/marketplace" element={authUser ? <MarketPlace /> : <Navigate to={"/"} />} />
        <Route path="/marketplace/buy/:id" element={authUser ? <MarketplaceBuy /> : <Navigate to={"/"} />} exact />
        <Route path="/marketplace/sell" element={authUser ? <MarketplaceSell /> : <Navigate to={"/"} />} />
        <Route path="/marketplace/my-listings" element={authUser ? <MyListings /> : <Navigate to={"/"} />} />
        <Route path="/marketplace/orders" element={authUser ? <Orders /> : <Navigate to={"/"} />} />
        <Route path="/complete-order" element={authUser ? <CompletePayment /> : <Navigate to={"/"} />} />
        <Route path="/cancel-order" element={authUser ? <CancelPayment /> : <Navigate to={"/"} />} />
        <Route path="/gratitude" element={authUser ? <Gratitude /> : <Navigate to={"/"} />} />
        <Route path="/elevated-user/contribute" element={authUser ? <Contribute /> : <Navigate to={"/"} />} />
          <Route
            path="/elevated-user/play"
            element={authUser ? (enrolledUser ? <GamePage /> : <Navigate to="/elevated-user/contribute" />) : <Navigate to="/" />}
          />
          <Route
            path="/elevated-user/images"
            element={authUser ? (enrolledUser ? <ImagePage /> : <Navigate to="/elevated-user/contribute" />) : <Navigate to="/" />}
          />

        <Route path="*" element={authUser ? <Navigate to="/home" /> : <Navigate to="/" />} />
      </Routes>

      <Toaster />
    </>
  )
}

export default App
