import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PrivateRoute from "./components/PrivateRoute";

import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import SubjectPage from "./pages/teacher/SubjectPage";
import Report from "./pages/teacher/Report";
import ChangePassword from "./pages/teacher/ChangePassword";
import ForgotPassword from "./pages/teacher/ForgotPassword";
import ResetPassword from "./pages/teacher/ResetPassword";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageTeacher from "./pages/admin/ManageTeacher";
import ManageClass from "./pages/admin/ManageClass";
import AdminReport from "./pages/admin/AdminReport";
import ManageSubject from "./pages/admin/ManageSubject";
import ManageQuestions from "./pages/admin/ManageQuestions";

import HomePage from "./pages/auth/HomePage";

import TeacherLayout from "./components/TeacherLayout";
import AdminLayout from "./components/AdminLayout";
import api from "./api";

import { initTheme } from "./utils/theme";

// CSS
import "./styles/main.css";
import "./styles/admin.css";
import "./styles/home.css";
import "./styles/login.css";
import "./styles/register.css";
import "./styles/teachersidebar.css";
//import "./styles/main.css";
import "./styles/admindashboard.css";
import "./styles/adminsidebar.css";
import "./styles/teachertopbar.css";
import "./styles/admintopbar.css";
import "./styles/subjectpage.css";
import "./styles/manageQuestions.css"; 
import "./styles/manageSubject.css";
import "./styles/layout.css";
import "./styles/adminlayout.css";
import "./styles/ForgotPassword.css";
import "./styles/ResetPassword.css";

function App() {

  useEffect(() => {
    initTheme();
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        {/* HOME */}
        <Route path="/" element={<HomePage />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* TEACHER */}
        <Route
          path="/teacher"
          element={
            <PrivateRoute>
              <TeacherLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="subject/:id" element={<SubjectPage />} />
          <Route path="report" element={<Report />} />
          <Route path="change-password" element={<ChangePassword />} />
     
        </Route>
     <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/reset-password/:email"
  element={<ResetPassword />}
/>
        {/* ✅ ADMIN (FIXED WITH LAYOUT) */}
       <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="teachers" element={<ManageTeacher />} />
          <Route path="classes" element={<ManageClass />} />
          <Route path="reports" element={<AdminReport />} />
          <Route path="subjects" element={<ManageSubject />} />
          <Route path="questions" element={<ManageQuestions />} />
           <Route path="change-password" element={<ChangePassword />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;