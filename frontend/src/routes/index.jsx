import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import Home from "../pages/home"
import Login from "../pages/Login"
import ForgotPassword from "../pages/ForgotPassword"
import Signup from "../pages/SIgnup"
import AdminPanel from "../pages/AdminPanel"
import AllProducts from "../pages/AllProducts"
import AllUsers from "../pages/AllUsers"
const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"forgot-password",
                element:<ForgotPassword/>
            },
            {
                path:"signup",
                element:<Signup/>
            },
            {
                path:"admin-panel",
                element:<AdminPanel/>,
                children:[
                    {
                        path:"all-products",
                        element:<AllProducts/>
                    },
                    {
                        path:"all-users",
                        element:<AllUsers/>
                    }
                ]
            },
        ]
    }
])

export default router;