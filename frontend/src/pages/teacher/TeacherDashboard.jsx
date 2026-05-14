import { useEffect, useState } from "react";
import axios from "axios";
import DashboardChart from "../../components/DashboardChart";
import SubjectCard from "../../components/SubjectCard";
import "../../styles/main.css";
import TeacherTopbar from "../../components/TeacherTopbar";
export default function TeacherDashboard() {

  const [subjects, setSubjects] = useState([]);
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({
    downloads: 0,
    subjects: 0,
    teachers: 0,
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {

    // 📚 SUBJECTS
    axios.get("${API_URL}/api/subject")
      .then(res => {
        setSubjects(res.data);
        setStats(prev => ({ ...prev, subjects: res.data.length }));
      });

    // 📊 REPORTS
    axios.get("${API_URL}/api/report")
      .then(res => {
        setReports(res.data);
        setStats(prev => ({ ...prev, downloads: res.data.length }));

        const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
        const count = [0, 0, 0, 0, 0];

        res.data.forEach(r => {
          const d = new Date(r.createdAt).getDay();
          if (d >= 1 && d <= 5) count[d - 1]++;
        });

        setChartData(
          days.map((d, i) => ({
            name: d,
            value: count[i]
          }))
        );
      });

    // 👨‍🏫 TEACHERS
    axios.get("${API_URL}/api/teacher")
      .then(res => {
        setStats(prev => ({ ...prev, teachers: res.data.length }));
      });

  }, []);
  <TeacherTopbar />
  return (
    
    <div className="dashboardContainer">

      <h2>📊 Dashboard</h2>

      {/* STATS */}
      <div className="stats">
        <div className="stat">{stats.downloads}<span>Downloads</span></div>
        <div className="stat">{stats.subjects}<span>Subjects</span></div>
        <div className="stat">{stats.teachers}<span>Teachers</span></div>
      </div>

{/* SUBJECTS */}
<h3>📚 Subjects</h3>

<div className="grid">
  {subjects.map(s => (
    <SubjectCard key={s._id} {...s} />
  ))}
</div>

     
   

      {/* BOTTOM */}
      <div className="dashboard-bottom">

        <div className="box">
          <h4>📈 Weekly Activity</h4>
          <DashboardChart data={chartData} />
        </div>

        <div className="box">
          <h4>📥 Recent Downloads</h4>

          {reports.slice(0,5).map(r => (
            <p key={r._id}>
              📄 {r.subjectId?.name} - {new Date(r.createdAt).toLocaleDateString()}
            </p>
          ))}

        </div>

      </div>

    </div>
  );
}