"use client"
import { useEffect, useState } from 'react';
import { Notification } from '@prisma/client';

interface NotificationListProps {
    userId: string;
}

export default function NotificationList({ userId }: NotificationListProps) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`/api/notifications/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch notifications');
                }
                const data = await response.json();
                setNotifications(data.notifications);
            } catch (error) {
                console.error('Error fetching notifications:', error);
                setError('Failed to load notifications. Please try again later.');
            }
        };

        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000); // Poll every 30 seconds

        return () => clearInterval(interval);
    }, [userId]);

    const markAsRead = async (notificationId: string) => {
        try {
            const response = await fetch(`/api/notifications/${notificationId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ read: true }),
            });
            if (!response.ok) {
                throw new Error('Failed to mark notification as read');
            }
            const updatedNotification = await response.json();
            setNotifications(notifications.map(n => 
                n.id === notificationId ? { ...n, read: true } : n
            ));
        } catch (error) {
            console.error('Error marking notification as read:', error);
            setError('Failed to mark notification as read. Please try again later.');
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Notifications</h2>
            {error && <p className="text-red-500">{error}</p>}
            {notifications.length === 0 ? (
                <p>No new notifications</p>
            ) : (
                <ul className="space-y-2">
                    {notifications.map((notification) => (
                        <li key={notification.id} className={`p-2 rounded ${notification.read ? 'bg-gray-100' : 'bg-blue-100'}`}>
                            <p>{notification.message}</p>
                            <p className="text-sm text-gray-500">{new Date(notification.createdAt).toLocaleString()}</p>
                            {!notification.read && (
                                <button 
                                    onClick={() => markAsRead(notification.id)}
                                    className="text-sm text-blue-500 hover:text-blue-700"
                                >
                                    Mark as read
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}