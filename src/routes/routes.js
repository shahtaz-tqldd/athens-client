import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AllPosts from "../pages/Admin/AllPosts/AllPosts";
import Users from "../pages/Admin/Users/Users";
import Homepage from "../pages/Homepage/Homepage";
import Login from "../pages/LoginRegister/Login";
import Register from "../pages/LoginRegister/Register";
import MyWriteUp from "../pages/MyWriteUp/MyWriteUp";
import PostScreen from "../pages/Posts/PostScreen";
import SavedPost from "../pages/SavedPost/SavedPost";

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
                element: <SavedPost />
            },
            {
                path: '/my-write-up',
                element: <MyWriteUp />
            },
            {
                path: '/admin',
                element: <AdminDashboard />,
                children: [
                    {
                        path: '/admin',
                        element: <AllPosts />
                    },
                    {
                        path: '/admin/users',
                        element: <Users />
                    },
                ]
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