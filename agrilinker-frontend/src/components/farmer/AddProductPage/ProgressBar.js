// ProgressBar.jsx
const ProgressBar = ({ step }) => {
  const steps = ["Product Info", "Media", "Pricing"];
  return (
    <div className="progress-stepper">
      {steps.map((label, index) => (
        <div
          key={index}
          className={`step-item ${step >= index + 1 ? "active" : ""}`}
        >
          <div className="circle">{index + 1}</div>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};
export default ProgressBar;
