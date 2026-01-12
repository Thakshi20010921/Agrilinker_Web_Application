import React from "react";

const polls = [
  {
    id: 1,
    question: "Should we increase the price of organic fertilizer?",
    responses: "5,822",
    icon: "🚜",
  },
  {
    id: 2,
    question: "Best time for paddy cultivation in 2025?",
    responses: "3,634",
    icon: "🌾",
  },
];

const PollList = () => {
  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h2 style={{ color: "#007bff" }}>Wimasuma - Farmer Opinion</h2>
      {polls.map((poll) => (
        <div key={poll.id} style={cardStyle}>
          <div style={{ fontSize: "24px", marginRight: "15px" }}>
            {poll.icon}
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: "0 0 5px 0" }}>{poll.question}</h4>
            <small style={{ color: "#888" }}>{poll.responses} Responses</small>
          </div>
          <button style={buttonStyle}>View</button>
        </div>
      ))}
    </div>
  );
};

const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: "10px",
  padding: "15px",
  marginBottom: "15px",
  display: "flex",
  alignItems: "center",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default PollList;
