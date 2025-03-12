import MediaPost from "./components/mediaPost/MediaPost";
import MediaFeed from "./components/feed/MediaFeed";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import AuthLog from "./components/auth/Auth";
import Login from "./components/auth/Login";
import Signup from "./components/auth/SignUp";


function App() {
  return (
    <div>
      <BrowserRouter basename="/freshpaper">
        <Routes>
          <Route path="/">
            <Route index element={<Home/>} />
            <Route path="/postmedia" element={<MediaPost/>} />
            <Route path="/auth" element={<AuthLog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
