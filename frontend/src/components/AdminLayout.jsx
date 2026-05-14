import { Outlet } from "react-router-dom";
//import AdminSidebar from "../components/AdminSidebar";
import "../styles/adminlayout.css";
import AdminTopbar from "../components/AdminTopbar";
import AdminSidebar from "../components/AdminSidebar";
export default function AdminLayout() {
  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="main-content">

         <div className="top-bar">
                <AdminTopbar />
                </div>
        {/* 🔥 YAHAN PAGE CHANGE HOGA */}
        <div className="content">
          <Outlet />
        </div>

      </div>

    </div>
  );
}