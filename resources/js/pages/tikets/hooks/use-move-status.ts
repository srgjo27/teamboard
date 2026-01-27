import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Ticket } from '@/types/ticket';

interface UseMoveStatusProps {
    ticket: Ticket;
    onSuccess?: () => void;
}

export function useMoveStatus({ ticket, onSuccess }: UseMoveStatusProps) {
    const [selectedStatus, setSelectedStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
        if (!selectedStatus || selectedStatus === ticket.status) {
            onSuccess?.();
            return;
        }

        setIsSubmitting(true);

        router.put(
            `/tikets/${ticket.id}`,
            { status: selectedStatus },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSubmitting(false);
                    onSuccess?.();
                },
                onError: () => {
                    setIsSubmitting(false);
                },
            }
        );
    };

    const canSubmit = !isSubmitting && selectedStatus && selectedStatus !== ticket.status;

    return {
        selectedStatus,
        setSelectedStatus,
        isSubmitting,
        handleSubmit,
        canSubmit,
    };
}
