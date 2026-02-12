import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
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
import { Team } from '@/types/project';
import { User } from '@/types/user';
import { useForm, usePage } from '@inertiajs/react';
import { IconFile } from '@tabler/icons-react';
import { FormEventHandler, useState } from 'react';

interface CreateProjectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    teams: Team[];
}

export function CreateProjectDialog({
    open,
    onOpenChange,
    teams,
}: CreateProjectDialogProps) {
    const { allUsers } = usePage<{ allUsers?: User[] }>().props;

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        team_id: '',
        project_manager_id: '',
        status: 'planning',
        start_date: '',
        end_date: '',
        file: null as File | null,
        image: null as File | null,
    });

    const projectManagers =
        allUsers?.filter((user) => user.role?.name === 'product_manager') || [];

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/projects', {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                reset();
                setSelectedFile(null);
                setSelectedImage(null);
                onOpenChange(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl flex flex-col max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Create New Project</DialogTitle>
                    <DialogDescription>
                        Set up a new project with team and timeline
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto -mx-4 p-4">
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="project-name">
                                Project Name{' '}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="project-name"
                                placeholder="e.g., E-commerce Platform"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className={
                                    errors.name ? 'border-destructive' : ''
                                }
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="project-description">
                                Description
                            </Label>
                            <Textarea
                                id="project-description"
                                placeholder="Describe the project goals and scope..."
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                className={
                                    errors.description
                                        ? 'border-destructive'
                                        : ''
                                }
                                rows={3}
                            />
                            {errors.description && (
                                <p className="text-sm text-destructive">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="team">
                                    Team{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    value={data.team_id}
                                    onValueChange={(value) =>
                                        setData('team_id', value)
                                    }
                                >
                                    <SelectTrigger
                                        id="team"
                                        className={
                                            errors.team_id
                                                ? 'border-destructive'
                                                : ''
                                        }
                                    >
                                        <SelectValue placeholder="Select team" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teams.map((team) => (
                                            <SelectItem
                                                key={team.id}
                                                value={team.id.toString()}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="h-3 w-3 rounded-full"
                                                        style={{
                                                            backgroundColor:
                                                                team.color,
                                                        }}
                                                    />
                                                    {team.name}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.team_id && (
                                    <p className="text-sm text-destructive">
                                        {errors.team_id}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="project-manager">
                                    Project Manager{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    value={data.project_manager_id}
                                    onValueChange={(value) =>
                                        setData('project_manager_id', value)
                                    }
                                >
                                    <SelectTrigger
                                        id="project-manager"
                                        className={
                                            errors.project_manager_id
                                                ? 'border-destructive'
                                                : ''
                                        }
                                    >
                                        <SelectValue placeholder="Select manager" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {projectManagers.length > 0 ? (
                                            projectManagers.map((user) => (
                                                <SelectItem
                                                    key={user.id}
                                                    value={user.id.toString()}
                                                >
                                                    {user.name}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <div className="p-2 text-sm text-muted-foreground">
                                                No project managers available
                                            </div>
                                        )}
                                    </SelectContent>
                                </Select>
                                {errors.project_manager_id && (
                                    <p className="text-sm text-destructive">
                                        {errors.project_manager_id}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={data.status}
                                onValueChange={(value) =>
                                    setData('status', value)
                                }
                            >
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="planning">
                                        Planning
                                    </SelectItem>
                                    <SelectItem value="in_progress">
                                        In Progress
                                    </SelectItem>
                                    <SelectItem value="on_hold">
                                        On Hold
                                    </SelectItem>
                                    <SelectItem value="completed">
                                        Completed
                                    </SelectItem>
                                    <SelectItem value="cancelled">
                                        Cancelled
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="start-date">Start Date</Label>
                                <Input
                                    id="start-date"
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) =>
                                        setData('start_date', e.target.value)
                                    }
                                    className={
                                        errors.start_date
                                            ? 'border-destructive'
                                            : ''
                                    }
                                />
                                {errors.start_date && (
                                    <p className="text-sm text-destructive">
                                        {errors.start_date}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="end-date">
                                    Target End Date
                                </Label>
                                <Input
                                    id="end-date"
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) =>
                                        setData('end_date', e.target.value)
                                    }
                                    className={
                                        errors.end_date
                                            ? 'border-destructive'
                                            : ''
                                    }
                                />
                                {errors.end_date && (
                                    <p className="text-sm text-destructive">
                                        {errors.end_date}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* File Upload */}
                        <div className="grid gap-2">
                            <Label htmlFor="file">
                                Document File (Optional)
                            </Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="file"
                                    type="file"
                                    accept=".doc,.docx,.pdf"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setSelectedFile(file);
                                            setData('file', file);
                                        }
                                    }}
                                    className={
                                        errors.file ? 'border-destructive' : ''
                                    }
                                />
                            </div>
                            {selectedFile && (
                                <div className="flex items-center gap-2 rounded-lg border p-2 text-sm">
                                    <IconFile className="h-4 w-4" />
                                    <span className="flex-1 truncate">
                                        {selectedFile.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {(selectedFile.size / 1024).toFixed(1)}{' '}
                                        KB
                                    </span>
                                </div>
                            )}
                            {errors.file && (
                                <p className="text-sm text-destructive">
                                    {errors.file}
                                </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                                Allowed: .doc, .docx, .pdf (max 20MB)
                            </p>
                        </div>

                        {/* Image Upload */}
                        <div className="grid gap-2">
                            <Label htmlFor="image">
                                Project Image (Optional)
                            </Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="image"
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setSelectedImage(file);
                                            setData('image', file);
                                        }
                                    }}
                                    className={
                                        errors.image ? 'border-destructive' : ''
                                    }
                                />
                            </div>
                            {selectedImage && (
                                <div className="rounded-lg border p-2">
                                    <img
                                        src={URL.createObjectURL(selectedImage)}
                                        alt="Preview"
                                        className="h-32 w-full rounded object-cover"
                                    />
                                    <p className="mt-2 text-sm">
                                        {selectedImage.name} -{' '}
                                        {(selectedImage.size / 1024).toFixed(1)}{' '}
                                        KB
                                    </p>
                                </div>
                            )}
                            {errors.image && (
                                <p className="text-sm text-destructive">
                                    {errors.image}
                                </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                                Allowed: .jpg, .jpeg, .png (max 10MB)
                            </p>
                        </div>
                    </div>
                </form>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            reset();
                            onOpenChange(false);
                        }}
                        disabled={processing}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={processing}
                        onClick={handleSubmit}
                    >
                        {processing ? 'Creating...' : 'Create Project'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
