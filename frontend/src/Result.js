import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Result({ data }) {
  const sentimentScore = {
    positive: [70, 20, 10],
    neutral: [30, 40, 30],
    negative: [10, 20, 70],
  }[data.sentiment] || [33, 33, 34];

  const chartData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        data: sentimentScore,
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
      },
    ],
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h3>📝 Summary</h3>
      <p>{data.summary}</p>

      <h3>📊 Sentiment Analysis</h3>
      <div style={{ width: "300px", marginBottom: "20px" }}>
        <Pie data={chartData} />
      </div>

      <h3>🔑 Keywords</h3>
      <div>
        {data.keywords.map((k) => (
          <span
            key={k}
            style={{
              padding: "6px 12px",
              background: "#e5e7eb",
              margin: "6px",
              display: "inline-block",
              borderRadius: "20px",
              fontSize: "14px"
            }}
          >
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}
