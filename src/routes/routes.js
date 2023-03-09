import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Homepage from "../pages/Homepage/Homepage";
import Login from "../pages/LoginRegister/Login";
import Register from "../pages/LoginRegister/Register";

export const routes = createBrowserRouter([
    {
        path:'/',
        element: <Main/>,
        children: [
            {
                path:'/',
                element:<Homepage/>
            }
        ]
    },
    {
        path:'/login',
        element: <Login/>,
    },
    {
        path:'/Register',
        element: <Register/>,
    }
])