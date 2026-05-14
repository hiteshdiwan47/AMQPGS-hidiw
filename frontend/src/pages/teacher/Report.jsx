import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/teacherReport.css";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function Report() {

  const [reports, setReports] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [previewUrl, setPreviewUrl] = useState(null);

  const teacherId = localStorage.getItem("userId");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const res = await axios.get("${API_URL}/api/report");

    const myReports = res.data.filter(
      r => r.teacherId?._id === teacherId
    );

    setReports(myReports);
    setFiltered(myReports);
  };

  // 🔍 FILTER FUNCTION
  useEffect(() => {
    let temp = [...reports];

    // search
    if (search) {
      temp = temp.filter(r =>
        r.subject?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // date filter
    if (fromDate && toDate) {
      temp = temp.filter(r => {
        const d = new Date(r.createdAt);
        return d >= new Date(fromDate) && d <= new Date(toDate);
      });
    }

    setFiltered(temp);
  }, [search, fromDate, toDate, reports]);

  // 📊 GRAPH DATA
  const groupByDate = () => {
    const map = {};

    filtered.forEach(r => {
      const d = new Date(r.createdAt).toLocaleDateString();

      map[d] = (map[d] || 0) + 1;
    });

    return {
      labels: Object.keys(map),
      datasets: [
        {
          label: "Reports Generated",
          data: Object.values(map)
        }
      ]
    };
  };

  // 👀 PREVIEW
  const handlePreview = (id) => {
    setPreviewUrl(`${API_URL}/api/report/pdf/${id}`);
  };

  return (
    <div className="teacher-report">

      <h2>📊 My Activity Dashboard</h2>

      {/* 🔍 FILTERS */}
      <div className="filters">

        <input
          placeholder="Search Subject"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

      </div>

      {/* 📊 STATS */}
      <div className="stat-ss">
        <div className="cards">
          <h3>{filtered.length}</h3>
          <p>Total Reports</p>
        </div>
      </div>

      {/* 📈 GRAPH */}
      <div className="graph-box">
        <Bar data={groupByDate()} />
      </div>

      {/* 📋 REPORT LIST */}
      <div className="report-grid">
        {filtered.map(r => (
          <div key={r._id} className="report-card">

            <h3>{r.subject}</h3>

            <p>📘 {r.course}</p>
            <p>🏫 {r.branch}</p>
            <p>🎓 Sem {r.semester}</p>

            <p>⚡ {r.action}</p>
            <p>📝 {r.marks}</p>

            <p>📅 {new Date(r.createdAt).toLocaleString()}</p>

            <button onClick={() => handlePreview(r._id)}>
              👀 Preview
            </button>

          </div>
        ))}
      </div>

      {/* 👀 PREVIEW MODAL */}
      {previewUrl && (
        <div className="preview-modal">

          <div className="preview-box">

            <h3>📄 Preview</h3>

            <iframe src={previewUrl} title="preview" />

            <button onClick={() => setPreviewUrl(null)}>
              ❌ Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}