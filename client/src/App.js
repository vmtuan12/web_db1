import React from "react";
import {
	createBrowserRouter,
	RouterProvider,
	Route,
    Outlet,
} from "react-router-dom";
import Register from "./pages/Register"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Single from "./pages/Single"
import Write from "./pages/Write"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import "./style.scss"
import UserInfo from "./pages/UserInfo";

const Layout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}

// pages link
const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/post/:id",
                element: <Single/>
            },
            {
                path: "/write",
                element: <Write/>
            },
            {
                path: "/userinfo/:id",
                element: <UserInfo/>
            }
        ]
	},
	{
		path: "/login",
		element: <Login/>,
	},
	{
		path: "/register",
		element: <Register/>,
	},

]);

function App() {
    return (
        <div className="app">
            <div className="container">
                <RouterProvider router={router}/>
            </div>
        </div>
    );
}

export default App;
