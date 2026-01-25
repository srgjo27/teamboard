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
import { Textarea } from '@/components/ui/textarea';
import { Project, Timeline } from '@/types/ticket';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { useFilteredTimelines } from '../hooks/use-filtered-timelines';
import { useProjectTeamMembers } from '../hooks/use-project-team-members';
import { useTicketForm } from '../hooks/use-ticket-form';

interface CreateTicketDialogProps {
    projects: Project[];
    timelines: Timeline[];
}

export function CreateTicketDialog({
    projects,
    timelines,
}: CreateTicketDialogProps) {
    const [open, setOpen] = useState(false);

    const {
        formData,
        errors,
        isSubmitting,
        handleInputChange,
        handleSubmit: submitForm,
    } = useTicketForm();

    const filteredTimelines = useFilteredTimelines(
        timelines,
        formData.project_id,
    );

    const { teamMembers } = useProjectTeamMembers(
        projects,
        formData.project_id,
    );

    const handleSubmit = (e: React.FormEvent) => {
        submitForm(e, () => setOpen(false));
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <IconPlus className="mr-2 h-4 w-4" />
                    Create Ticket
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Ticket</DialogTitle>
                    <DialogDescription>
                        Add a new ticket to your sprint backlog
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
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
                                                {project.name}
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

                            <div className="grid gap-2">
                                <Label htmlFor="timeline">Timeline</Label>
                                <Select
                                    value={formData.timeline_id}
                                    onValueChange={(value) =>
                                        handleInputChange('timeline_id', value)
                                    }
                                    disabled={
                                        isSubmitting || !formData.project_id
                                    }
                                >
                                    <SelectTrigger id="timeline">
                                        <SelectValue placeholder="Select timeline (optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filteredTimelines.map((timeline) => (
                                            <SelectItem
                                                key={timeline.id}
                                                value={timeline.id.toString()}
                                            >
                                                {timeline.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="title">
                                Title{' '}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="title"
                                placeholder="e.g., Implement user authentication"
                                value={formData.title}
                                onChange={(e) =>
                                    handleInputChange('title', e.target.value)
                                }
                                disabled={isSubmitting}
                                className={
                                    errors.title ? 'border-destructive' : ''
                                }
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
                                placeholder="Describe the ticket requirements..."
                                rows={4}
                                value={formData.description}
                                onChange={(e) =>
                                    handleInputChange(
                                        'description',
                                        e.target.value,
                                    )
                                }
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="ticket-type">
                                    Type{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(value: any) =>
                                        handleInputChange('type', value)
                                    }
                                    disabled={isSubmitting}
                                >
                                    <SelectTrigger id="ticket-type">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bug">Bug</SelectItem>
                                        <SelectItem value="feature">
                                            Feature
                                        </SelectItem>
                                        <SelectItem value="task">
                                            Task
                                        </SelectItem>
                                        <SelectItem value="improvement">
                                            Improvement
                                        </SelectItem>
                                        <SelectItem value="documentation">
                                            Documentation
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="priority">
                                    Priority{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    value={formData.priority}
                                    onValueChange={(value: any) =>
                                        handleInputChange('priority', value)
                                    }
                                    disabled={isSubmitting}
                                >
                                    <SelectTrigger id="priority">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="highest">
                                            Highest
                                        </SelectItem>
                                        <SelectItem value="high">
                                            High
                                        </SelectItem>
                                        <SelectItem value="medium">
                                            Medium
                                        </SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="lowest">
                                            Lowest
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value: any) =>
                                        handleInputChange('status', value)
                                    }
                                    disabled={isSubmitting}
                                >
                                    <SelectTrigger id="status">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="backlog">
                                            Backlog
                                        </SelectItem>
                                        <SelectItem value="todo">
                                            To Do
                                        </SelectItem>
                                        <SelectItem value="inprogress">
                                            In Progress
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="assignee">Assignee</Label>
                                <Select
                                    value={formData.assigned_to}
                                    onValueChange={(value) =>
                                        handleInputChange('assigned_to', value)
                                    }
                                    disabled={
                                        isSubmitting ||
                                        !formData.project_id ||
                                        teamMembers.length === 0
                                    }
                                >
                                    <SelectTrigger id="assignee">
                                        <SelectValue placeholder="Select assignee (optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teamMembers.map((member) => (
                                            <SelectItem
                                                key={member.id}
                                                value={member.id.toString()}
                                            >
                                                {member.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {!formData.project_id && (
                                    <p className="text-xs text-muted-foreground">
                                        Select a project first
                                    </p>
                                )}
                                {formData.project_id &&
                                    teamMembers.length === 0 && (
                                        <p className="text-xs text-muted-foreground">
                                            No team members available
                                        </p>
                                    )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="story-points">
                                    Story Points
                                </Label>
                                <Select
                                    value={formData.story_points}
                                    onValueChange={(value) =>
                                        handleInputChange('story_points', value)
                                    }
                                    disabled={isSubmitting}
                                >
                                    <SelectTrigger id="story-points">
                                        <SelectValue placeholder="Select SP" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1</SelectItem>
                                        <SelectItem value="2">2</SelectItem>
                                        <SelectItem value="3">3</SelectItem>
                                        <SelectItem value="5">5</SelectItem>
                                        <SelectItem value="8">8</SelectItem>
                                        <SelectItem value="13">13</SelectItem>
                                        <SelectItem value="21">21</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="due-date">Due Date</Label>
                                <Input
                                    id="due-date"
                                    type="date"
                                    value={formData.due_date}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'due_date',
                                            e.target.value,
                                        )
                                    }
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="estimated-hours">
                                Estimated Hours
                            </Label>
                            <Input
                                id="estimated-hours"
                                type="number"
                                step="0.5"
                                placeholder="e.g., 8"
                                value={formData.estimated_hours}
                                onChange={(e) =>
                                    handleInputChange(
                                        'estimated_hours',
                                        e.target.value,
                                    )
                                }
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Creating...' : 'Create Ticket'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
