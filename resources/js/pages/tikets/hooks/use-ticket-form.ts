import { TicketFormData } from '@/types/ticket';
import { router } from '@inertiajs/react';
import { useState } from 'react';

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
};

export function useTicketForm() {
    const [formData, setFormData] = useState<TicketFormData>(initialFormData);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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

        if (formData.timeline_id) submitData.timeline_id = formData.timeline_id;
        if (formData.description) submitData.description = formData.description;
        if (formData.status) submitData.status = formData.status;
        if (formData.assigned_to) submitData.assigned_to = formData.assigned_to;
        if (formData.due_date) submitData.due_date = formData.due_date;
        if (formData.estimated_hours)
            submitData.estimated_hours = formData.estimated_hours;
        if (formData.story_points)
            submitData.story_points = formData.story_points;
        if (formData.tags && formData.tags.length > 0)
            submitData.tags = formData.tags;

        router.post('/tikets', submitData, {
            preserveScroll: true,
            onSuccess: () => {
                resetForm();
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
        handleInputChange,
        handleSubmit,
        resetForm,
    };
}
