import { router } from '@inertiajs/react';
import { useState } from 'react';

export function useDeleteComment(commentId: number) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        if (!confirm('Are you sure you want to delete this comment?')) return;

        setIsDeleting(true);

        router.delete(`/tickets/comments/${commentId}`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleting(false);
            },
            onError: () => {
                setIsDeleting(false);
            },
        });
    };

    return {
        isDeleting,
        handleDelete,
    };
}
