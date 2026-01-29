import { Ticket } from '@/types/ticket';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface UseAssignQaProps {
    ticket: Ticket;
    onSuccess?: () => void;
}

export function useAssignQa({ ticket, onSuccess }: UseAssignQaProps) {
    const [selectedQaId, setSelectedQaId] = useState(
        ticket.qa_assigned_user?.id.toString() || '',
    );
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
        if (!selectedQaId) {
            onSuccess?.();
            return;
        }

        setIsSubmitting(true);

        router.put(
            `/tickets/${ticket.id}`,
            { qa_assigned_to: parseInt(selectedQaId) },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSubmitting(false);
                    onSuccess?.();
                },
                onError: () => {
                    setIsSubmitting(false);
                },
            },
        );
    };

    return {
        selectedQaId,
        setSelectedQaId,
        isSubmitting,
        handleSubmit,
    };
}
