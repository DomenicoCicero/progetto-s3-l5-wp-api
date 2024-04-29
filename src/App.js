import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostDetails from "./components/PostDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// zWNz oY6Y EW33 nJfA aHtl 2Maj
