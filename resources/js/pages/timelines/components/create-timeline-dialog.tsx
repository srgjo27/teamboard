import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Project, Timeline, TimelineFormData } from '@/types/timeline';
import { router } from '@inertiajs/react';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { TimelineTypeInfo } from './timeline-type-info';

interface CreateTimelineDialogProps {
    projects: Project[];
    timelines: Timeline[];
}

const initialFormData: TimelineFormData = {
    project_id: '',
    type: 'sprint',
    phase: '',
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    status: 'pending',
    sprint_number: '',
    deliverables: [''],
};

export function CreateTimelineDialog({
    projects,
    timelines,
}: CreateTimelineDialogProps) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<TimelineFormData>(initialFormData);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const existingSprints = useMemo(() => {
        if (!formData.project_id) return [];
        const projectTimelines = timelines.filter(
            (t) => t.project.id.toString() === formData.project_id,
        );
        const sprints = projectTimelines
            .map((t) => t.sprint_number)
            .filter((num): num is number => num !== null && num !== undefined);
        return Array.from(new Set(sprints)).sort((a, b) => a - b);
    }, [timelines, formData.project_id]);

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

    const handleDeliverableChange = (index: number, value: string) => {
        const newDeliverables = [...formData.deliverables];
        newDeliverables[index] = value;
        setFormData((prev) => ({ ...prev, deliverables: newDeliverables }));
    };

    const addDeliverable = () => {
        setFormData((prev) => ({
            ...prev,
            deliverables: [...prev.deliverables, ''],
        }));
    };

    const removeDeliverable = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            deliverables: prev.deliverables.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        const filteredDeliverables = formData.deliverables.filter(
            (d) => d.trim() !== '',
        );

        const submitData: any = {
            project_id: formData.project_id,
            type: formData.type,
            title: formData.title,
            status: formData.status,
        };

        if (formData.phase) submitData.phase = formData.phase;
        if (formData.description) submitData.description = formData.description;
        if (formData.start_date) submitData.start_date = formData.start_date;
        if (formData.end_date) submitData.end_date = formData.end_date;
        if (formData.sprint_number)
            submitData.sprint_number = parseInt(formData.sprint_number);
        if (filteredDeliverables.length > 0)
            submitData.deliverables = filteredDeliverables;

        router.post('/timelines', submitData, {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
                setFormData(initialFormData);
                setIsSubmitting(false);
            },
            onError: (errors) => {
                setErrors(errors as Record<string, string>);
                setIsSubmitting(false);
            },
        });
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setOpen(false);
            setErrors({});
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <IconPlus className="mr-2 h-4 w-4" />
                    New Project Timeline
                </Button>
            </DialogTrigger>
            <DialogContent
                className="max-h-[90vh] max-w-xl"
                onPointerDownOutside={(e) => isSubmitting && e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>Create Project Timeline</DialogTitle>
                    <DialogDescription>
                        Set up a new project with SDLC phases and timeline
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="max-h-[calc(90vh-180px)] overflow-y-auto px-1">
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="project">
                                    Project{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    value={formData.project_id}
                                    onValueChange={(value) =>
                                        handleInputChange('project_id', value)
                                    }
                                    disabled={isSubmitting}
                                >
                                    <SelectTrigger
                                        id="project"
                                        className={
                                            errors.project_id
                                                ? 'border-destructive'
                                                : ''
                                        }
                                    >
                                        <SelectValue placeholder="Select project" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {projects.map((project) => (
                                            <SelectItem
                                                key={project.id}
                                                value={project.id.toString()}
                                            >
                                                {project.name} (
                                                {project.team.name})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.project_id && (
                                    <p className="text-sm text-destructive">
                                        {errors.project_id}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <div className="flex items-center gap-1">
                                        <Label htmlFor="type">
                                            Type{' '}
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </Label>

                                        <TimelineTypeInfo />
                                    </div>
                                    <Select
                                        value={formData.type}
                                        onValueChange={(value: any) =>
                                            handleInputChange('type', value)
                                        }
                                        disabled={isSubmitting}
                                    >
                                        <SelectTrigger
                                            id="type"
                                            className={
                                                errors.type
                                                    ? 'border-destructive'
                                                    : ''
                                            }
                                        >
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sprint">
                                                Sprint
                                            </SelectItem>
                                            <SelectItem value="phase">
                                                Phase
                                            </SelectItem>
                                            <SelectItem value="milestone">
                                                Milestone
                                            </SelectItem>
                                            <SelectItem value="event">
                                                Event
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.type && (
                                        <p className="text-sm text-destructive">
                                            {errors.type}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="phase">SDLC Phase</Label>
                                    <Select
                                        value={formData.phase}
                                        onValueChange={(value) =>
                                            handleInputChange('phase', value)
                                        }
                                        disabled={isSubmitting}
                                    >
                                        <SelectTrigger
                                            id="phase"
                                            className={
                                                errors.phase
                                                    ? 'border-destructive'
                                                    : ''
                                            }
                                        >
                                            <SelectValue placeholder="Select phase (optional)" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="planning">
                                                Planning
                                            </SelectItem>
                                            <SelectItem value="backlog_refinement">
                                                Backlog Refinement
                                            </SelectItem>
                                            <SelectItem value="analysis">
                                                Analysis
                                            </SelectItem>
                                            <SelectItem value="design">
                                                Design
                                            </SelectItem>
                                            <SelectItem value="development">
                                                Development
                                            </SelectItem>
                                            <SelectItem value="testing">
                                                Testing
                                            </SelectItem>
                                            <SelectItem value="code_review">
                                                Code Review
                                            </SelectItem>
                                            <SelectItem value="deployment">
                                                Deployment
                                            </SelectItem>
                                            <SelectItem value="release">
                                                Release
                                            </SelectItem>
                                            <SelectItem value="retrospective">
                                                Retrospective
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.phase && (
                                        <p className="text-sm text-destructive">
                                            {errors.phase}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="title">
                                    Title{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'title',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="e.g., User Authentication & Authorization"
                                    className={
                                        errors.title ? 'border-destructive' : ''
                                    }
                                    disabled={isSubmitting}
                                    maxLength={255}
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'description',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Describe the timeline objectives and goals..."
                                    className={
                                        errors.description
                                            ? 'border-destructive'
                                            : ''
                                    }
                                    disabled={isSubmitting}
                                    rows={3}
                                    maxLength={1000}
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="start-date">
                                        Start Date
                                    </Label>
                                    <Input
                                        id="start-date"
                                        type="date"
                                        value={formData.start_date}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'start_date',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.start_date
                                                ? 'border-destructive'
                                                : ''
                                        }
                                        disabled={isSubmitting}
                                    />
                                    {errors.start_date && (
                                        <p className="text-sm text-destructive">
                                            {errors.start_date}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="end-date">End Date</Label>
                                    <Input
                                        id="end-date"
                                        type="date"
                                        value={formData.end_date}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'end_date',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.end_date
                                                ? 'border-destructive'
                                                : ''
                                        }
                                        disabled={isSubmitting}
                                    />
                                    {errors.end_date && (
                                        <p className="text-sm text-destructive">
                                            {errors.end_date}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="status">
                                    Status{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value: any) =>
                                        handleInputChange('status', value)
                                    }
                                    disabled={isSubmitting}
                                >
                                    <SelectTrigger
                                        id="status"
                                        className={
                                            errors.status
                                                ? 'border-destructive'
                                                : ''
                                        }
                                    >
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">
                                            Pending
                                        </SelectItem>
                                        <SelectItem value="in_progress">
                                            In Progress
                                        </SelectItem>
                                        <SelectItem value="completed">
                                            Completed
                                        </SelectItem>
                                        <SelectItem value="delayed">
                                            Delayed
                                        </SelectItem>
                                        <SelectItem value="cancelled">
                                            Cancelled
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <p className="text-sm text-destructive">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="sprint-number">
                                        Sprint Number
                                    </Label>
                                    <Input
                                        id="sprint-number"
                                        type="number"
                                        min="1"
                                        value={formData.sprint_number}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'sprint_number',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="e.g., 1"
                                        className={
                                            errors.sprint_number
                                                ? 'border-destructive'
                                                : ''
                                        }
                                        disabled={isSubmitting}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {existingSprints.length > 0
                                            ? `Existing sprints for this project: ${existingSprints.join(', ')}`
                                            : 'Multiple timelines can share the same sprint number'}
                                    </p>
                                    {errors.sprint_number && (
                                        <p className="text-sm text-destructive">
                                            {errors.sprint_number}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <Separator />

                            <div className="grid gap-3">
                                <div className="flex items-center justify-between">
                                    <Label>Deliverables</Label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addDeliverable}
                                        disabled={isSubmitting}
                                    >
                                        <IconPlus className="mr-1 h-3 w-3" />
                                        Add
                                    </Button>
                                </div>
                                {formData.deliverables.map(
                                    (deliverable, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                value={deliverable}
                                                onChange={(e) =>
                                                    handleDeliverableChange(
                                                        index,
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="e.g., User authentication module"
                                                disabled={isSubmitting}
                                            />
                                            {formData.deliverables.length >
                                                1 && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() =>
                                                            removeDeliverable(index)
                                                        }
                                                        disabled={isSubmitting}
                                                    >
                                                        <IconTrash className="h-4 w-4" />
                                                    </Button>
                                                )}
                                        </div>
                                    ),
                                )}
                                {errors.deliverables && (
                                    <p className="text-sm text-destructive">
                                        {errors.deliverables}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 border-t pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Creating...' : 'Create Timeline'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
