import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import Home from "../pages/home"
import Login from "../pages/Login"
import ForgotPassword from "../pages/ForgotPassword"
import Signup from "../pages/SIgnup"
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
        ]
    }
])

export default router;