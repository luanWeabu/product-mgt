import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    const tokenString = sessionStorage.getItem("token");

    if (!tokenString) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex">
      <Header />
      <SideBar />
      <Outlet />
    </div>
  );
}
