import { router } from '@inertiajs/react';
import { Ticket } from '@/types/ticket';

interface UseTicketActionsProps {
    ticket: Ticket;
    onDeleteSuccess?: () => void;
}

export function useTicketActions({ ticket, onDeleteSuccess }: UseTicketActionsProps) {
    const handleDelete = () => {
        router.delete(`/tikets/${ticket.id}`, {
            onSuccess: () => {
                onDeleteSuccess?.();
            },
        });
    };

    return {
        handleDelete,
    };
}
