import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Ticket } from '@/types/ticket';
import { TICKET_STATUSES } from '../constants/ticket-statuses';
import { cn } from '@/lib/utils';
import { useMoveStatus } from '../hooks/use-move-status';

interface MoveStatusDialogProps {
    ticket: Ticket;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function MoveStatusDialog({
    ticket,
    open,
    onOpenChange,
}: MoveStatusDialogProps) {
    const {
        selectedStatus,
        setSelectedStatus,
        isSubmitting,
        handleSubmit,
        canSubmit,
    } = useMoveStatus({
        ticket,
        onSuccess: () => onOpenChange(false),
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Move Ticket</DialogTitle>
                    <DialogDescription>
                        Change the status of{' '}
                        <span className="font-medium text-foreground">
                            {ticket.ticket_number}
                        </span>
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-2 py-4">
                    {TICKET_STATUSES.map((status) => {
                        const Icon = status.icon;
                        const isSelected = selectedStatus === status.id;
                        const isCurrent = ticket.status === status.id;
                        const shouldHighlight = isSelected || (!selectedStatus && isCurrent);

                        return (
                            <button
                                key={status.id}
                                type="button"
                                onClick={() => setSelectedStatus(status.id)}
                                disabled={isSubmitting}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg border p-3 text-left transition-all',
                                    shouldHighlight
                                        ? 'border-primary bg-primary/5'
                                        : 'border-border hover:border-primary/50 hover:bg-muted/50',
                                    isSubmitting && 'opacity-50 cursor-not-allowed'
                                )}
                            >
                                <div
                                    className={cn(
                                        'flex h-10 w-10 items-center justify-center rounded-md',
                                        status.color,
                                        'text-white'
                                    )}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium">{status.label}</p>
                                        {isCurrent && (
                                            <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                                Current
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {isSelected && (
                                    <div className="h-4 w-4 rounded-full border-2 border-primary bg-primary" />
                                )}
                            </button>
                        );
                    })}
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!canSubmit}
                    >
                        {isSubmitting ? 'Moving...' : 'Move Ticket'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
