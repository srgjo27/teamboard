import { router } from '@inertiajs/react';
import { useState } from 'react';

export function useNotificationActions() {
    const [isProcessing, setIsProcessing] = useState(false);

    const markAsRead = (id: string) => {
        setIsProcessing(true);
        router.post(`/notifications/${id}/read`, {}, {
            preserveScroll: true,
            onFinish: () => setIsProcessing(false),
        });
    };

    const markAllAsRead = () => {
        setIsProcessing(true);
        router.post('/notifications/read-all', {}, {
            preserveScroll: true,
            onFinish: () => setIsProcessing(false),
        });
    };

    const deleteNotification = (id: string) => {
        if (confirm('Are you sure you want to delete this notification?')) {
            setIsProcessing(true);
            router.delete(`/notifications/${id}`, {
                preserveScroll: true,
                onFinish: () => setIsProcessing(false),
            });
        }
    };

    const clearAll = () => {
        if (confirm('Are you sure you want to clear all notifications?')) {
            setIsProcessing(true);
            router.delete('/notifications/clear-all', {
                preserveScroll: true,
                onFinish: () => setIsProcessing(false),
            });
        }
    };

    return {
        isProcessing,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
    };
}
