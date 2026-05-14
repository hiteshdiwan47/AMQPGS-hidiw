import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/adminreport.css";

export default function AdminReports() {

  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [previewType, setPreviewType] = useState(null); // pdf / csv / excel

  useEffect(() => {
    axios.get("http://localhost:5000/api/report")
      .then(res => setReports(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🔍 FILTER
  const filteredReports = reports.filter(r =>
    (r.subject || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-main">

      {/* HEADER */}
      <div className="page-header">
        <h2>📊 Reports Dashboard</h2>

        <input
          type="text"
          placeholder="Search subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
      </div>

      {/* EXPORT + PREVIEW */}
      <div className="export-buttons">

        <button onClick={() => setPreviewType("csv")}>
          👀 Preview CSV
        </button>

        <button onClick={() => setPreviewType("excel")}>
          👀 Preview Excel
        </button>

      </div>

      {/* REPORT CARDS (NO TABLE) */}
      <div className="report-grid">

        {filteredReports.map(r => (
          <div className="report-card" key={r._id}>

            <h4>{r.subject}</h4>
            <p>{r.course} | {r.branch}</p>
            <p>Sem {r.semester}</p>

            <button onClick={() => {
              setSelectedReport(r);
              setPreviewType("pdf");
            }}>
              👀 Preview
            </button>

          </div>
        ))}

      </div>

      {/* 🔥 MODAL */}
      {(selectedReport || previewType) && (
        <div className="modal">
          <div className="modal-content">

            {/* ================= PDF PREVIEW ================= */}
            {previewType === "pdf" && selectedReport && (
              <>
                <h3>📄 Report Preview</h3>

                <p><b>Teacher:</b> {selectedReport.teacherId?.name}</p>
                <p><b>Subject:</b> {selectedReport.subject}</p>
                <p><b>Course:</b> {selectedReport.course}</p>
                <p><b>Branch:</b> {selectedReport.branch}</p>
                <p><b>Semester:</b> {selectedReport.semester}</p>

                {/* 🔥 PDF VIEW */}
                <iframe
                  src={`http://localhost:5000/api/report/pdf/${selectedReport._id}`}
                  width="100%"
                  height="300px"
                />

                <button
                  onClick={() =>
                    window.open(`http://localhost:5000/api/report/pdf/${selectedReport._id}`)
                  }
                >
                  ⬇ Download PDF
                </button>
              </>
            )}

            {/* ================= CSV PREVIEW ================= */}
            {previewType === "csv" && (
              <>
                <h3>📊 CSV Preview</h3>

                <iframe
                  src="http://localhost:5000/api/report/export/csv"
                  width="100%"
                  height="300px"
                />

                <button
                  onClick={() =>
                    window.open("http://localhost:5000/api/report/export/csv")
                  }
                >
                  ⬇ Download CSV
                </button>
              </>
            )}

            {/* ================= EXCEL PREVIEW ================= */}
            {previewType === "excel" && (
              <>
                <h3>📊 Excel Preview</h3>

                <iframe
                  src="http://localhost:5000/api/report/export/excel"
                  width="100%"
                  height="300px"
                />

                <button
                  onClick={() =>
                    window.open("http://localhost:5000/api/report/export/excel")
                  }
                >
                  ⬇ Download Excel
                </button>
              </>
            )}

            {/* CLOSE */}
            <button onClick={() => {
              setSelectedReport(null);
              setPreviewType(null);
            }}>
              ❌ Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}