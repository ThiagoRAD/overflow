import { useEffect } from 'react'
import notificationStore from './tasks/store/useNotificationStore'

const useNotification = () => {
  const {result, setResult} = notificationStore()

  const requestPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setResult(permission);
    } else {
      setResult('unsupported');
    }
  }

  useEffect(() => {
    requestPermission();
  }, []);

  const notify = (text) => {
    new Notification('Overflow', { body: text })
  }

  return { notify, result, setResult }
}

export default useNotification
