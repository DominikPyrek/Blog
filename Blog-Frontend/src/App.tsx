import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Registerform";
import Nav from "./components/Nav";
import Post from "./components/CreatePost";
import { CookiesProvider } from 'react-cookie';

function App() {

  return (
    <>
    <CookiesProvider>
     <Router>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post" element={<Post />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} /> 
            </Routes>
        </Router>
    </CookiesProvider>
    </>
  )
}

export default App
