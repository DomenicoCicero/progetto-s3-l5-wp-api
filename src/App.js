import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostDetails from "./components/PostDetails";
import MyNavbar from "./components/MyNavbar";
import CreateNewPost from "./components/CreateNewPost";
import ModifiedPost from "./components/ModifiedPost";
import Page from "./components/Page";
import PageDetails from "./components/PageDetails";
import CreateNewPage from "./components/CreateNewPage";
import ModifiedPage from "./components/ModifiedPage";
import Categories from "./components/Categories";
import CategoryDetails from "./components/CategoryDetails";
import CreateNewCategory from "./components/CreateNewCategory";
import ModifiedCategory from "./components/ModifiedCategory";

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/newpost" element={<CreateNewPost />} />
        <Route path="/modifiedpost/:id" element={<ModifiedPost />} />
        <Route path="/page" element={<Page />} />
        <Route path="/page/pagedetails/:id" element={<PageDetails />} />
        <Route path="/newpage" element={<CreateNewPage />} />
        <Route path="/modifiedpage/:id" element={<ModifiedPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/categorydetails/:id" element={<CategoryDetails />} />
        <Route path="/newcategory" element={<CreateNewCategory />} />
        <Route path="/modifiedcategory/:id" element={<ModifiedCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// zWNz oY6Y EW33 nJfA aHtl 2Maj
