import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

export default function Reminder({ appointment }) {
  useEffect(() => {
    const schedule = async () => {
      const now = new Date();
      const delay = (new Date(appointment.dateTime) - now) / 1000;
      if (delay > 0) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Appointment Reminder',
            body: `You have an appointment at ${new Date(appointment.dateTime).toLocaleString()}`,
          },
          trigger: { seconds: delay },
        });
      }
    };
    schedule();
  }, [appointment]);
  return null;
}
