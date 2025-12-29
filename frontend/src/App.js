import React, { useState } from "react";
import axios from "axios";
import Result from "./Result";
import "./index.css";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a document");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const res = await axios.post(
        "http://localhost:5000/api/documents/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Upload or processing failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>📄 Document Summarization & Insights</h2>
      <p>Upload a PDF or TXT document to generate AI insights</p>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br /><br />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Analyzing..." : "Upload & Analyze"}
      </button>

      {error && <p className="error">{error}</p>}

      {result && <Result data={result} />}
    </div>
  );
}

export default App;
