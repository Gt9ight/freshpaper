import MediaPost from "./components/mediaPost/MediaPost";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import AuthLog from "./components/auth/Auth";
import Login from "./components/auth/Login";
import Signup from "./components/auth/SignUp";
import ProtectedRoute from "./components/auth/ProtectedRoute";


function App() {
  return (
    <div>
      <BrowserRouter basename="/freshpaper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthLog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/postmedia"
            element={
              <ProtectedRoute>
                <MediaPost />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
