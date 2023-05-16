import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import useTaskStore from './store/useTaskStore'
import './SelectedTask.css'

const SelectedTask = () => {
  const id = useParams().id
  const { tasks } = useTaskStore()
  const task = tasks.find((t) => t.id === id)
  
  const [isRunning, setIsRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(task.duration * 60) // Convert to seconds
  const intervalRef = useRef(null)

  const totalSeconds = task.duration * 60
  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft])

  const handleStart = () => {
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(task.duration * 60)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const circumference = 2 * Math.PI * 120 // radius = 120
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="selected-task">
      <h2>{task.icon} {task.name}</h2>
      
      <div className="pomodoro-container">
        <svg className="pomodoro-circle" viewBox="0 0 280 280">
          {/* Background circle */}
          <circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="20"
          />
          {/* Progress circle */}
          <circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke={timeLeft === 0 ? '#28a745' : isRunning ? '#007bff' : '#dc3545'}
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 140 140)"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        
        <div className="timer-display">
          <div className="time">{formatTime(timeLeft)}</div>
          <div className="duration">/ {task.duration}m</div>
        </div>
      </div>

      <div className="controls">
        {!isRunning && timeLeft === totalSeconds && (
          <button className="btn btn-start" onClick={handleStart}>
            Start Task
          </button>
        )}
        
        {isRunning && (
          <button className="btn btn-pause" onClick={handlePause}>
            Pause
          </button>
        )}
        
        {!isRunning && timeLeft < totalSeconds && timeLeft > 0 && (
          <>
            <button className="btn btn-resume" onClick={handleStart}>
              Resume
            </button>
            <button className="btn btn-reset" onClick={handleReset}>
              Reset
            </button>
          </>
        )}

        {timeLeft === 0 && (
          <button className="btn btn-reset" onClick={handleReset}>
            Start Again
          </button>
        )}
      </div>
    </div>
  )
}

export default SelectedTask
