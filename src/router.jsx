import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/create", element: <CreateRoom /> },
  { path: "/join", element: <JoinRoom /> },        // ✅ for manual Room ID entry
  { path: "/join/:roomId", element: <JoinRoom /> }, // ✅ for direct invite link
  { path: "/dashboard/:roomId", element: <Dashboard /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
