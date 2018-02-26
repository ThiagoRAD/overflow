export const useTaskColor = (task) => {

  const baseColor = '#ffffff'
  const targetColor = task.color || baseColor
  const percentage = (task.timesCompleted ?? 0) / 100

  const getAverage = (a, b, percentage) => {
    return Math.round(a + (b - a) * percentage)
  }

  const getColorComponent = (component) => {
    const base = parseInt(baseColor.slice(component, component + 2), 16)
    const target = parseInt(targetColor.slice(component, component + 2), 16)
    return getAverage(base, target, percentage)
  }

  const currentColor = `rgba(${getColorComponent(1)}, 
                             ${getColorComponent(3)}, 
                             ${getColorComponent(5)})`
  return currentColor
}
