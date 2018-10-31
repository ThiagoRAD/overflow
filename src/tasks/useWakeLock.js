import {useEffect, useRef} from 'react';

export const useWakeLock = () => {
  const wakeLockRef = useRef(null);

  const requestWakeLock = async () => {
    if (!('wakeLock' in navigator)) return;
    wakeLockRef.current = await navigator.wakeLock.request('screen');
  };

  const releaseWakeLock = async () => {
    if (!wakeLockRef.current) return;

    try {
      await wakeLockRef.current.release();
    } finally {
      wakeLockRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      releaseWakeLock();
    };
  }, []);

  return {
    requestWakeLock,
    releaseWakeLock,
  };
};
