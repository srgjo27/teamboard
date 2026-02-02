import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Project, Timeline } from '@/types/ticket';
import { IconPlus, IconX, IconUpload, IconFile, IconTag } from '@tabler/icons-react';
import { useState } from 'react';
import { useFilteredTimelines } from '../hooks/use-filtered-timelines';
import { useProjectTeamMembers } from '../hooks/use-project-team-members';
import { useTicketForm } from '../hooks/use-ticket-form';
import { useFileUpload } from '../hooks/use-file-upload';
import { useTagsInput } from '../hooks/use-tags-input';

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

    const {
        isDragging,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
        handleFileSelect,
        removeFile,
    } = useFileUpload({
        currentFiles: formData.attachments,
        onFilesChange: (files) => handleInputChange('attachments', files),
    });

    const {
        tagInput,
        setTagInput,
        handleAddTag,
        handleTagKeyDown,
        removeTag,
    } = useTagsInput({
        currentTags: formData.tags,
        onTagsChange: (tags) => handleInputChange('tags', tags),
    });

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
            <DialogContent className="max-h-[80vh] max-w-4xl">

                <DialogHeader>
                    <DialogTitle>Create New Ticket</DialogTitle>
                    <DialogDescription>
                        Add a new ticket to your sprint backlog
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} id="create-ticket-form">
                    <div className="grid gap-6 no-scrollbar -mx-4 max-h-[60vh] overflow-y-auto px-4">
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
                                        {projects.length === 0 ? (
                                            <SelectItem value="no_projects" disabled>
                                                No active projects available
                                            </SelectItem>
                                        ) : (
                                            projects.map((project) => (
                                                <SelectItem
                                                    key={project.id}
                                                    value={project.id.toString()}
                                                >
                                                    {project.name}
                                                </SelectItem>
                                            ))
                                        )}
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

                        <div className="grid gap-2">
                            <Label htmlFor="tags">
                                Tags (Optional)
                            </Label>
                            <div className="space-y-2">
                                <div className="flex gap-2">
                                    <Input
                                        id="tags"
                                        placeholder="Add a tag..."
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleTagKeyDown}
                                        disabled={isSubmitting}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={handleAddTag}
                                        disabled={isSubmitting || !tagInput.trim()}
                                    >
                                        <IconTag className="h-4 w-4" />
                                    </Button>
                                </div>
                                {formData.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {formData.tags.map((tag, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                                className="gap-1"
                                            >
                                                {tag}
                                                <button
                                                    type="button"
                                                    onClick={() => removeTag(tag)}
                                                    className="ml-1 rounded-full hover:bg-muted"
                                                    disabled={isSubmitting}
                                                >
                                                    <IconX className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="attachments">
                                Attachments (Optional)
                            </Label>
                            <div className="space-y-3">
                                <div
                                    onDragEnter={handleDragEnter}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`relative rounded-lg border-2 border-dashed transition-colors ${isDragging
                                        ? 'border-primary bg-primary/5'
                                        : 'border-border bg-muted/30'
                                        }`}
                                >
                                    <input
                                        id="attachments"
                                        type="file"
                                        multiple
                                        onChange={handleFileSelect}
                                        disabled={isSubmitting}
                                        className="absolute inset-0 z-10 cursor-pointer opacity-0"
                                    />
                                    <div className="flex flex-col items-center justify-center gap-2 px-6 py-8 text-center">
                                        <div className={`rounded-full p-3 ${isDragging ? 'bg-primary/10' : 'bg-muted'
                                            }`}>
                                            <IconUpload className={`h-6 w-6 ${isDragging ? 'text-primary' : 'text-muted-foreground'
                                                }`} />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium">
                                                {isDragging ? (
                                                    <span className="text-primary">Drop files here</span>
                                                ) : (
                                                    <>
                                                        <span className="text-primary">Choose files</span>
                                                        {' or drag and drop'}
                                                    </>
                                                )}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Upload any file type
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {formData.attachments.length > 0 && (
                                    <div className="space-y-2">
                                        <p className="text-xs font-medium text-muted-foreground">
                                            {formData.attachments.length} file{formData.attachments.length > 1 ? 's' : ''} selected
                                        </p>
                                        <div className="space-y-2">
                                            {formData.attachments.map((file, index) => (
                                                <div
                                                    key={index}
                                                    className="group flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-2.5 transition-colors hover:bg-muted/50"
                                                >
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                                                        <IconFile className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="truncate text-sm font-medium">
                                                            {file.name}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {(file.size / 1024).toFixed(1)} KB
                                                        </p>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                                                        onClick={() => removeFile(index)}
                                                        disabled={isSubmitting}
                                                    >
                                                        <IconX className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </form>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting} form="create-ticket-form">
                        {isSubmitting ? 'Creating...' : 'Create Ticket'}
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}
