import TeacherSidebar from "./TeacherSidebar";
import TeacherTopbar from "./TeacherTopbar";
import { Outlet } from "react-router-dom";
//import "../styles/layout.css";

export default function TeacherLayout() {
  return (
    <div className="layout">
      <TeacherSidebar />

      <div className="main-area">
        <TeacherTopbar />

        <div className="content">
          <Outlet />
        </div>

      </div>
    </div>
  );
}