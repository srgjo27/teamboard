import { Ticket } from '@/types/ticket';
import { router } from '@inertiajs/react';

interface UseTicketActionsProps {
    ticket: Ticket;
    onDeleteSuccess?: () => void;
}

export function useTicketActions({
    ticket,
    onDeleteSuccess,
}: UseTicketActionsProps) {
    const handleDelete = () => {
        router.delete(`/tickets/${ticket.id}`, {
            onSuccess: () => {
                onDeleteSuccess?.();
            },
        });
    };

    return {
        handleDelete,
    };
}
