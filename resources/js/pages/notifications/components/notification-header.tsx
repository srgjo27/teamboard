import { Button } from '@/components/ui/button';
import { IconBellOff, IconCheck } from '@tabler/icons-react';

interface NotificationHeaderProps {
    unreadCount: number;
    totalCount: number;
    onMarkAllAsRead: () => void;
    onClearAll: () => void;
    isProcessing: boolean;
}

export function NotificationHeader({
    unreadCount,
    totalCount,
    onMarkAllAsRead,
    onClearAll,
    isProcessing,
}: NotificationHeaderProps) {
    return (
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    Notifications
                </h1>
                <p className="text-sm text-muted-foreground">
                    Stay updated with your latest activities
                </p>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onMarkAllAsRead}
                    disabled={unreadCount === 0 || isProcessing}
                >
                    <IconCheck className="mr-2 h-4 w-4" />
                    Mark all as read
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onClearAll}
                    disabled={totalCount === 0 || isProcessing}
                >
                    <IconBellOff className="mr-2 h-4 w-4" />
                    Clear all
                </Button>
            </div>
        </div>
    );
}
