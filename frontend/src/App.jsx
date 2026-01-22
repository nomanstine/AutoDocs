import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Toaster } from "sonner";

import Layout from "./Layout";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Services from "./pages/Services";
import Payment from "./pages/Payment";
import Certificate from "./pages/Certificate";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import ProfileUpdate from "./pages/ProfileUpdate";
import AdminDashboard from "./pages/AdminDashboard";
import VerifyCertificate from "./pages/VerifyCertificate";
import AboutFounders from "./pages/Team";

const App = () => {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors closeButton />
      <Router>
        <Routes>

        <Route path="/" element={<Layout />} >
          <Route index element={<Services />} />
          <Route path="login" element={<Login />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="credits" element={<AboutFounders />} />
          <Route path="verify" element={<VerifyCertificate />} />

          <Route element={<ProtectedRoute />}>
            <Route path="payment/:serviceId" element={<Payment />} />
            <Route path="certificate/:serviceId" element={<Certificate />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/update" element={<ProfileUpdate />} />
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
          
        </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;