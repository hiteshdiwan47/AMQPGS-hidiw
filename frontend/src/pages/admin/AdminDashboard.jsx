import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/admindashboard.css";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

export default function AdminDashboard() {

  const [counts, setCounts] = useState({
    teachers: 0,
    subjects: 0,
    questions: 0,
    classes: 0
  });

  const [activity, setActivity] = useState([]);
  const [topSubjects, setTopSubjects] = useState([]);
  const [filter, setFilter] = useState("today");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/admin/analytics?filter=${filter}`
      );

      setCounts(res.data.counts || {});
      setActivity(res.data.activity?.slice(0, 10) || []); // 🔥 LIMIT
      setTopSubjects(res.data.topSubjects?.slice(0, 5) || []);

    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div className="admin-dashboard">

      <h2>📊 Admin Analytics Dashboard</h2>

      {/* FILTER */}
      <div className="filters">
        <button className={filter==="today" ? "active" : ""} onClick={() => setFilter("today")}>Today</button>
        <button className={filter==="week" ? "active" : ""} onClick={() => setFilter("week")}>Week</button>
        <button className={filter==="month" ? "active" : ""} onClick={() => setFilter("month")}>Month</button>
      </div>

      {/* LOADING */}
      {loading && <p>Loading data...</p>}

      {/* CARDS */}
      <div className="cards">
        <div className="card">👨‍🏫 Teachers <h1>{counts.teachers}</h1></div>
        <div className="card">📚 Subjects <h1>{counts.subjects}</h1></div>
        <div className="card">❓ Questions <h1>{counts.questions}</h1></div>
        <div className="card">🏫 Classes <h1>{counts.classes}</h1></div>
      </div>

      {/* CHARTS */}
      <div className="charts-grid">

        {/* BAR CHART */}
        <div className="chart-box">
          <h3>📅 Daily Activity</h3>

          {activity.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activity}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>No Data</p>
          )}
        </div>

        {/* PIE CHART */}
        <div className="chart-box">
          <h3>📚 Top Subjects</h3>

          {topSubjects.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topSubjects}
                  dataKey="count"
                  nameKey="subject"
                  outerRadius={100}
                  label
                >
                  {topSubjects.map((entry, index) => (
                    <Cell key={index} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p>No Data</p>
          )}
        </div>

      </div>

    </div>
  );
}