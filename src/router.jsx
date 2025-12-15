import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/create", element: <CreateRoom /> },
  { path: "/join/:roomId", element: <JoinRoom /> },
  { path: "/dashboard/:roomId", element: <Dashboard /> },
  { path: "/join", element: <JoinRoom /> },
  { path: "/join/:roomId", element: <JoinRoom /> },

]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
