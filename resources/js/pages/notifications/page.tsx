import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { NotificationsPageProps } from "@/types/notification";
import { Head } from "@inertiajs/react";
import { NotificationEmptyState } from "./components/notification-empty-state";
import { NotificationHeader } from "./components/notification-header";
import { NotificationList } from "./components/notification-list";
import { NotificationStats } from "./components/notification-stats";
import { useNotificationActions } from "./hooks/use-notification-actions";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Notifications',
        href: "#"
    },
];

export default function NotificationsPage({ notifications }: NotificationsPageProps) {
    const unreadCount = notifications.filter(n => !n.read).length;
    const readCount = notifications.length - unreadCount;

    const {
        isProcessing,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
    } = useNotificationActions();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications" />

            <div className="p-6">
                <NotificationHeader
                    unreadCount={unreadCount}
                    totalCount={notifications.length}
                    onMarkAllAsRead={markAllAsRead}
                    onClearAll={clearAll}
                    isProcessing={isProcessing}
                />

                <NotificationStats
                    total={notifications.length}
                    unread={unreadCount}
                    read={readCount}
                />

                {notifications.length > 0 ? (
                    <NotificationList
                        notifications={notifications}
                        onMarkAsRead={markAsRead}
                        onDelete={deleteNotification}
                        isProcessing={isProcessing}
                    />
                ) : (
                    <NotificationEmptyState />
                )}
            </div>
        </AppLayout>
    );
}