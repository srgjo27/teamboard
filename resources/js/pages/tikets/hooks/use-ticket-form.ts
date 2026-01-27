import { Ticket, TicketFormData } from '@/types/ticket';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const initialFormData: TicketFormData = {
    project_id: '',
    timeline_id: '',
    title: '',
    description: '',
    type: 'task',
    priority: 'low',
    status: 'todo',
    assigned_to: '',
    due_date: '',
    estimated_hours: '',
    story_points: '',
    tags: [],
    attachments: [],
};

interface UseTicketFormProps {
    ticket?: Ticket;
}

export function useTicketForm({ ticket }: UseTicketFormProps = {}) {
    const [formData, setFormData] = useState<TicketFormData>(initialFormData);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isEditMode = !!ticket;

    useEffect(() => {
        if (ticket) {
            setFormData({
                project_id: ticket.project_id.toString(),
                timeline_id: ticket.timeline_id?.toString() || '',
                title: ticket.title,
                description: ticket.description || '',
                type: ticket.type,
                priority: ticket.priority,
                status: ticket.status,
                assigned_to: ticket.assigned_to?.toString() || '',
                due_date: ticket.due_date
                    ? ticket.due_date.split('T')[0]
                    : '',
                estimated_hours: ticket.estimated_hours?.toString() || '',
                story_points: ticket.story_points?.toString() || '',
                tags: ticket.tags || [],
                attachments: ticket.attachments || [],
            });
        }
    }, [ticket]);

    const handleInputChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const removeAttachment = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index),
        }));
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setErrors({});
    };

    const handleSubmit = (e: React.FormEvent, onSuccess?: () => void) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        const submitData: any = {
            project_id: formData.project_id,
            title: formData.title,
            type: formData.type,
            priority: formData.priority,
        };

        if (isEditMode) {
            submitData.timeline_id = formData.timeline_id || null;
            submitData.description = formData.description;
            submitData.status = formData.status;
            submitData.assigned_to = formData.assigned_to || null;
            submitData.due_date = formData.due_date || null;
            submitData.estimated_hours = formData.estimated_hours || null;
            submitData.story_points = formData.story_points || null;
            submitData.tags = formData.tags;
            const newAttachments = formData.attachments.filter((a: any) => a instanceof File);
            if (newAttachments.length) submitData.attachments = newAttachments;
        } else {
            if (formData.timeline_id) submitData.timeline_id = formData.timeline_id;
            if (formData.description) submitData.description = formData.description;
            if (formData.status) submitData.status = formData.status;
            if (formData.assigned_to) submitData.assigned_to = formData.assigned_to;
            if (formData.due_date) submitData.due_date = formData.due_date;
            if (formData.estimated_hours) submitData.estimated_hours = formData.estimated_hours;
            if (formData.story_points) submitData.story_points = formData.story_points;
            if (formData.tags && formData.tags.length > 0) submitData.tags = formData.tags;
            if (formData.attachments && formData.attachments.length > 0) submitData.attachments = formData.attachments;
        }

        const url = isEditMode ? `/tikets/${ticket!.id}` : '/tikets';
        const method = isEditMode ? 'put' : 'post';

        router[method](url, submitData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                if (!isEditMode) {
                    resetForm();
                }
                setIsSubmitting(false);
                onSuccess?.();
            },
            onError: (errors) => {
                setErrors(errors);
                setIsSubmitting(false);
            },
        });
    };

    return {
        formData,
        errors,
        isSubmitting,
        isEditMode,
        handleInputChange,
        handleSubmit,
        resetForm,
        removeAttachment,
    };
}
