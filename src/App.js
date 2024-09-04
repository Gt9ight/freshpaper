import MediaPost from "./components/mediaPost/MediaPost";
import MediaFeed from "./components/feed/MediaFeed";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";


function App() {
  return (
    <div>
      <BrowserRouter basename="/freshpaper">
        <Routes>
          <Route path="/">
            <Route index element={<Home/>} />
            <Route path="/postmedia" element={<MediaPost/>} />
            <Route path="/mediafeed" element={<MediaFeed />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
