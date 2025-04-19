interface ProgressProps {
    value: number;
    max: number;
    className?: string;
  }

const Progress = ({ value, max }: ProgressProps) => {
  return (
    <div className="progress-bar">
      <div className="progress-bar-fill" style={{ width: `${(value / max) * 100}%` }} />
    </div>
  );
};

export default Progress;