export const useTaskColor = (task) => {
  
  const baseColor = task.color || "#ffffff"
  const targetColor = '#000000'
  // const percentage = (Math.min(task.timesCompleted ?? 0, 100)) / 100
  const percentage = 0

  const getAverage = (a, b, percentage) => {
    return Math.round(a + (b - a) * percentage)
  }
  const getColorComponent = (component) => {
    const base = parseInt(baseColor.slice(component, component + 2), 16)
    const target = parseInt(targetColor.slice(component, component + 2), 16)
    return getAverage(base, target, percentage)
  }

  const color = () => {
    const currentColor = `rgba(${getColorComponent(1)}, 
                               ${getColorComponent(3)}, 
                               ${getColorComponent(5)})`
    return currentColor
  }

  const shadow = () => {
    const shadow = `1px 1px 2px rgba(255, 255, 255, ${percentage})`;
    return shadow
  }

  const pomodoroShadow = () => {
    const shadow = `0px 0px 2px ${color()}`;
    return shadow
  }

  const outlinePomodoroShadow = () => {
    const shadow = `0px 0px 2px ${color()}`;
    return shadow
  }

  return {
    color: color(),
    shadow: shadow(),
    pomodoroShadow: pomodoroShadow(),
    outlinePomodoroShadow: outlinePomodoroShadow()
  }
}
