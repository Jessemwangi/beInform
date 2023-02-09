
import './App.css';
import './style.scss';
import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Write from './pages/Write';
import Single from './pages/Single';
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Login from './pages/Login';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import NotFound from './pages/NotFound';
import BackToTop from './pages/BackToTop';


const Layout = () =>{
  return(
    <>
    <Navbar></Navbar>
    <Outlet/>
    <Footer/>
    </>
  )
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />}></Route>
      <Route path="/register" element={<Register />}>
        New 
      </Route>
      <Route path="/write" element={<Write/>}></Route>
      <Route path="/post/:id" element={<Single />}>
        View post
      </Route>
      <Route path="/login" element={<Login/>}>
        View login
      </Route>
      <Route path="*" element={<NotFound/>}>
        View login
      </Route>
    </Route>
  )
);

function App() {
  return (
    <div className="app">
      <div className='container'>

 <RouterProvider router={router} />
 <BackToTop>
        <Fab size="large" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </BackToTop>
      </div>
    </div>
  );
}

export default App;
