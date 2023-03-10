import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Homepage from "../pages/Homepage/Homepage";
import Login from "../pages/LoginRegister/Login";
import Register from "../pages/LoginRegister/Register";
import MyWriteUp from "../pages/MyWriteUp/MyWriteUp";
import PostScreen from "../pages/Posts/PostScreen";
import SavedPost from "../pages/SavedPost/SavedPost";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Homepage />
            },
            {
                path: '/posts/:id',
                loader: async ({ params }) => await fetch(`http://localhost:5000/posts/${params.id}`),
                element: <PostScreen />
            },
            {
                path: '/saved-post',
                element: <PrivateRoute><SavedPost /></PrivateRoute>
            },
            {
                path: '/my-write-up',
                element: <PrivateRoute><MyWriteUp /></PrivateRoute>
            },
            {
                path: '/admin',
                element: <AdminRoute><AdminDashboard /></AdminRoute>,
            },
        ]
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/Register',
        element: <Register />,
    }
])