import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import * as XLSX from "xlsx";

const AdminPanel = () => {
  const [studentResults, setStudentResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const db = getFirestore();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const resultsCollection = collection(db, "testResults");
        const resultsSnapshot = await getDocs(resultsCollection);

        if (resultsSnapshot.empty) {
          console.log("No results found in Firestore");
        }

        const resultsData = resultsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Mapped Data:", resultsData);
        setStudentResults(resultsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchResults();
  }, [db]);

  const handleDownload = async () => {
    setLoading(true);
    try {
      if (studentResults.length === 0) {
        alert("No records available to download.");
        setLoading(false);
        return;
      }

      const reorderedData = studentResults.map((student) => ({
        Name: student.name,
        Standard: student.standard,
        College: student.collegeName,
        Email: student.email,
        City: student.city,
        "Self-Confidence Score": student.selfConfidenceScore,
        "Leadership Quality Score": student.leadershipQualityScore,
        "Emotional Intelligence Score": student.emotionalIntelligenceScore,
        "Telephonic Counselling": student.counsellingPreference,
        "Submission Time": student.timestamp,
      }));

      const worksheet = XLSX.utils.json_to_sheet(reorderedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Student Results");

      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "student_results.xlsx";
      link.click();

      window.URL.revokeObjectURL(url);
      setLoading(false);
    } catch (error) {
      console.error("Error downloading records:", error);
      alert("Failed to download records.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, "testResults", id);
      await deleteDoc(docRef);
      setStudentResults((prevResults) => prevResults.filter((result) => result.id !== id));
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Failed to delete record.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "'Arial', sans-serif",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        maxWidth: "100%",
        margin: "20px auto",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        Admin Panel - Student Results
      </h2>

      <button
        onClick={handleDownload}
        disabled={loading}
        style={{
          display: "block",
          margin: "0 auto 20px auto",
          padding: "10px 20px",
          backgroundColor: loading ? "#ccc" : "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s",
        }}
      >
        {loading ? "Downloading..." : "Download Excel"}
      </button>

      <div
        style={{
          overflowX: "auto",
          border: "1px solid #ddd",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "white",
            minWidth: "1200px",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#6e91ff",
                color: "white",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "10px" }}>Name</th>
              <th style={{ padding: "10px" }}>City</th>
              <th style={{ padding: "10px" }}>College</th>
              <th style={{ padding: "10px" }}>Email</th>
              <th style={{ padding: "10px" }}>Standard</th>
              <th style={{ padding: "10px" }}>Self Confidence Score</th>
              <th style={{ padding: "10px" }}>Leadership Quality Score</th>
              <th style={{ padding: "10px" }}>Emotional Intelligence Score</th>
              <th style={{ padding: "10px" }}>Telephonic Counselling</th>
              <th style={{ padding: "10px" }}>Submission Time</th>
              <th style={{ padding: "10px" }}>Actions</th> {/* Add Actions column */}
            </tr>
          </thead>
          <tbody>
            {studentResults.length > 0 ? (
              studentResults.map((testResults) => (
                <tr key={testResults.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px" }}>{testResults.name}</td>
                  <td style={{ padding: "10px" }}>{testResults.city}</td>
                  <td style={{ padding: "10px" }}>{testResults.collegeName}</td>
                  <td style={{ padding: "10px" }}>{testResults.email}</td>
                  <td style={{ padding: "10px" }}>{testResults.standard}</td>
                  <td style={{ padding: "10px" }}>{testResults.selfConfidenceScore}</td>
                  <td style={{ padding: "10px" }}>{testResults.leadershipQualityScore}</td>
                  <td style={{ padding: "10px" }}>{testResults.emotionalIntelligenceScore}</td>
                  <td style={{ padding: "10px" }}>{testResults.counsellingPreference}</td>
                  <td style={{ padding: "10px" }}>{testResults.timestamp}</td>
                  <td style={{ padding: "10px", cursor: "pointer" }}>
                    <span
                      onClick={() => handleDelete(testResults.id)}
                      style={{
                        fontSize: "20px",
                        color: "#ff0000",
                        cursor: "pointer",
                      }}
                    >
                      🗑️
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                  No results available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
