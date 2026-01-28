import { router } from '@inertiajs/react';
import { useState } from 'react';

interface UseAddCommentProps {
    ticketId: number;
    onSuccess?: () => void;
}

export function useAddComment({ ticketId, onSuccess }: UseAddCommentProps) {
    const [comment, setComment] = useState('');
    const [attachments, setAttachments] = useState<File[]>([]);
    const [isInternal, setIsInternal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('comment', comment);
        formData.append('is_internal', isInternal ? '1' : '0');

        attachments.forEach((file) => {
            formData.append('attachments[]', file);
        });

        router.post(`/tikets/${ticketId}/comments`, formData, {
            preserveScroll: true,
            onSuccess: () => {
                setComment('');
                setAttachments([]);
                setIsInternal(false);
                setIsSubmitting(false);
                onSuccess?.();
            },
            onError: () => {
                setIsSubmitting(false);
            },
        });
    };

    const handleFileChange = (files: FileList | null) => {
        if (files) {
            setAttachments(Array.from(files));
        }
    };

    return {
        comment,
        setComment,
        attachments,
        setAttachments,
        isInternal,
        setIsInternal,
        isSubmitting,
        handleSubmit,
        handleFileChange,
    };
}
