import { createBrowserRouter, Navigate } from "react-router"
import Login from "../features/auth/pages/Login"
import Register from "../features/auth/pages/Register"
import CreateProduct from "../features/product/pages/CreateProduct"
import Dashboard from "../features/product/pages/Dashboard"

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <h1>Home</h1>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/seller",
        children: [
            {
                path: "/seller/create-product",
                element: <CreateProduct />
            },
            {
                path: "/seller/dashboard",
                element: <Dashboard />
            }
        ]
    }
])