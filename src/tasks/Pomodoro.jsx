const Pomodoro = ({task}) => {

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalTime = task.duration * 60 * 1000;
  const circumference = 2 * Math.PI * 120; // radius = 120
  const progress = ((totalTime - task.timeRemaining) / totalTime) * 100;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className='pomodoro-container'>
      <svg className='pomodoro-circle' viewBox='0 0 280 280'>
        <circle cx='140' cy='140' r='120' fill='none' stroke='#e0e0e0' strokeWidth='20' />
        <circle
          cx='140'
          cy='140'
          r='120'
          fill='none'
          stroke='#007bff'
          strokeWidth='20'
          strokeLinecap='round'
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform='rotate(-90 140 140)'
          style={{transition: 'stroke-dashoffset 1s linear'}}
        />
        <text
          className='timer-text'
          x='140'
          y='140'
          textAnchor='middle'
          dominantBaseline='middle'
        >
          {formatTime(task.timeRemaining)}
        </text>
      </svg>
    </div>
  );
};

export default Pomodoro
