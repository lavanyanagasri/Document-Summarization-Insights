import React, { useState } from "react";
import axios from "axios";
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
        "https://document-summarization-insights.onrender.com/api/documents/upload",
        formData
      );

      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>📄 Document Summarization & Insights</h2>

      <input
        type="file"
        accept=".txt,.pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Analyzing..." : "Upload & Analyze"}
      </button>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result">
          <h3>Summary</h3>
          <p>{result.summary}</p>

          <h3>Insights</h3>
          <ul>
            {result.insights.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
