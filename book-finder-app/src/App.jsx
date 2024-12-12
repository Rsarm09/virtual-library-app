import { BrowserRouter, Route, Routes } from "react-router-dom"

//pages
import BookList from "./pages/BookList.jsx";
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/book/:id" element={<Details />} />
        <Route path="/booklist" element={<BookList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
