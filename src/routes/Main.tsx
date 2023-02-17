import React from "react";
import { createBrowserRouter, 
    RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { NotFound } from "../components/NotFound";
import { Navbar } from "./Navbar";
import { Home } from "../pages/Home";
import { AddEdit } from "../pages/AddEdit";
import { Detail } from "../pages/Detail";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Navbar />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />,
                errorElement: <NotFound />
            },
            {
                path: "/create",
                element: <AddEdit />,
                errorElement: <NotFound />
            },
            {
                path: "/update/:id",
                element: <AddEdit />,
                errorElement: <NotFound />
            },
            {
                path: "/detail/:id",
                element: <Detail />,
                errorElement: <NotFound />
            }
        ]
    }
]);

export const Main = () => {
    return (
        <React.Fragment>
            <ToastContainer position="top-center" />
            <RouterProvider router={Router} />
        </React.Fragment>
    );
};


