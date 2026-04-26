import { BiPause, BiPlay } from 'react-icons/bi'
import { useTaskColor } from './useTaskColor'

const Pomodoro = ({task}) => {
  const showPlayIndicator = task.ongoing;
  const showPauseIndicator = !task.ongoing;
  const shouldRevealText = showPlayIndicator || showPauseIndicator;

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const result = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    if(result.startsWith('-')) return '00:00';
    return result;
  };

  const totalTime = task.duration * 60 * 1000;
  const circumference = 2 * Math.PI * 120; // radius = 120
  const progress = ((totalTime - task.timeRemaining) / totalTime) * 100;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const { color, pomodoroShadow, outlinePomodoroShadow, shadow } = useTaskColor(task)

  const shadowStyle = {
    filter: `drop-shadow(${pomodoroShadow}) `,
  }

  const shadowStyle2 = {
    filter: `drop-shadow(${outlinePomodoroShadow}) drop-shadow(${shadow})`,
  }

  return (
    <div className='pomodoro-container'>
      <svg className='pomodoro-circle' viewBox='0 0 280 280'> 
        <circle cx='140' cy='140' r='120' fill='none' stroke={color} strokeWidth='20' style={shadowStyle} />
        <circle
          cx='140'
          cy='140'
          r='120'
          fill='none'
          stroke='#111'
          strokeWidth='20'
          strokeLinecap='round'
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform='rotate(-90 140 140)'
          style={{transition: 'stroke-dashoffset 1s linear', ...shadowStyle2}}
        />
        {showPauseIndicator && (
          <g className='pause-indicator'>
            <foreignObject x='100' y='100' width='80' height='80'>
              <div className='state-indicator-icon-wrap'>
                <BiPause className='state-indicator-icon' />
              </div>
            </foreignObject>
          </g>
        )}
        {showPlayIndicator && (
          <g className='play-indicator'>
            <foreignObject x='100' y='100' width='80' height='80'>
              <div className='state-indicator-icon-wrap'>
                <BiPlay className='state-indicator-icon' />
              </div>
            </foreignObject>
          </g>
        )}
        <text
          key={task.ongoing ? 'timer-ongoing' : 'timer-paused'}
          className={`timer-text ${shouldRevealText ? 'timer-text-reveal' : ''}`}
          x='140'
          y='140'
          textAnchor='middle'
          dominantBaseline='middle'
          style={{ textShadow: shadow }}
        >
          {formatTime(task.timeRemaining)}
        </text>
      </svg>
    </div>
  );
};

export default Pomodoro
