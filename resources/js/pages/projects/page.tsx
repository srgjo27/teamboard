import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    IconCalendar,
    IconDotsVertical,
    IconEdit,
    IconEye,
    IconFilter,
    IconPlus,
    IconSearch,
    IconTrash,
    IconUsers,
} from '@tabler/icons-react';
import {
    Briefcase,
    CheckCircle2,
    FolderKanban,
    TrendingUp,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects',
        href: '#',
    },
];

// Mock projects data
const mockProjects = [
    {
        id: 1,
        name: 'Project Alpha - Web Platform',
        description:
            'Main web application for customer management and analytics dashboard',
        status: 'in-progress',
        priority: 'high',
        team: 'Team Alpha',
        teamMembers: [
            'Alice Johnson',
            'Bob Smith',
            'Charlie Brown',
            'David Wilson',
            'Emma Davis',
            'Frank Miller',
        ],
        startDate: '2026-01-01',
        endDate: '2026-02-15',
        progress: 65,
        totalTickets: 24,
        completedTickets: 18,
        totalStoryPoints: 89,
        completedStoryPoints: 58,
    },
    {
        id: 2,
        name: 'Project Beta - Mobile App',
        description:
            'Cross-platform mobile application with offline support and push notifications',
        status: 'in-progress',
        priority: 'high',
        team: 'Team Beta',
        teamMembers: ['Grace Lee', 'Henry Wang', 'Isabel Chen', 'Jack Taylor'],
        startDate: '2026-01-08',
        endDate: '2026-03-01',
        progress: 42,
        totalTickets: 18,
        completedTickets: 9,
        totalStoryPoints: 72,
        completedStoryPoints: 30,
    },
    {
        id: 3,
        name: 'Project Gamma - API Services',
        description:
            'RESTful API development and microservices architecture implementation',
        status: 'planning',
        priority: 'medium',
        team: 'Team Gamma',
        teamMembers: ['Kate Brown', 'Liam Green', 'Mia White', 'Noah Black'],
        startDate: '2026-02-01',
        endDate: '2026-03-15',
        progress: 15,
        totalTickets: 12,
        completedTickets: 2,
        totalStoryPoints: 55,
        completedStoryPoints: 8,
    },
];

const statusColors: Record<
    string,
    { label: string; color: string; bgColor: string }
> = {
    planning: {
        label: 'Planning',
        color: 'text-blue-700',
        bgColor: 'bg-blue-100',
    },
    'in-progress': {
        label: 'In Progress',
        color: 'text-green-700',
        bgColor: 'bg-green-100',
    },
    'on-hold': {
        label: 'On Hold',
        color: 'text-yellow-700',
        bgColor: 'bg-yellow-100',
    },
    completed: {
        label: 'Completed',
        color: 'text-gray-700',
        bgColor: 'bg-gray-100',
    },
};

const priorityColors: Record<string, { color: string; bgColor: string }> = {
    high: { color: 'text-red-700', bgColor: 'bg-red-100' },
    medium: { color: 'text-orange-700', bgColor: 'bg-orange-100' },
    low: { color: 'text-green-700', bgColor: 'bg-green-100' },
};

function ProjectCard({ project }: { project: (typeof mockProjects)[0] }) {
    const statusConfig = statusColors[project.status];
    const priorityConfig = priorityColors[project.priority];

    return (
        <Card className="group transition-all hover:shadow-md">
            <CardHeader className="pb-3">
                <div className="mb-2 flex items-start justify-between">
                    <div className="flex flex-wrap gap-2">
                        <Badge
                            variant="outline"
                            className={`${statusConfig.bgColor} ${statusConfig.color}`}
                        >
                            {statusConfig.label}
                        </Badge>
                        <Badge
                            variant="outline"
                            className={`${priorityConfig.bgColor} ${priorityConfig.color}`}
                        >
                            {project.priority.toUpperCase()} Priority
                        </Badge>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <IconDotsVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                                Project Actions
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <IconEye className="mr-2 h-4 w-4" />
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <IconEdit className="mr-2 h-4 w-4" />
                                Edit Project
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                variant="destructive"
                                className="text-destructive"
                            >
                                <IconTrash className="mr-2 h-4 w-4" />
                                Delete Project
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <CardTitle className="text-lg">{project.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                    {project.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">
                            {project.progress}%
                        </span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                </div>

                <Separator />

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-muted/50 p-3">
                        <div className="text-xs text-muted-foreground">
                            Tickets
                        </div>
                        <div className="mt-1 text-lg font-bold">
                            {project.completedTickets}/{project.totalTickets}
                        </div>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                        <div className="text-xs text-muted-foreground">
                            Story Points
                        </div>
                        <div className="mt-1 text-lg font-bold">
                            {project.completedStoryPoints}/
                            {project.totalStoryPoints}
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Team & Timeline */}
                <div className="space-y-3">
                    {/* Team */}
                    <div className="flex items-center gap-2">
                        <IconUsers className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                            {project.team}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            ({project.teamMembers.length} members)
                        </span>
                    </div>

                    {/* Team Members Preview */}
                    <div className="flex -space-x-2">
                        {project.teamMembers.slice(0, 5).map((member, idx) => (
                            <Avatar
                                key={idx}
                                className="h-8 w-8 border-2 border-background"
                            >
                                <AvatarFallback className="text-xs">
                                    {member
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                </AvatarFallback>
                            </Avatar>
                        ))}
                        {project.teamMembers.length > 5 && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-semibold">
                                +{project.teamMembers.length - 5}
                            </div>
                        )}
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <IconCalendar className="h-4 w-4" />
                        <span>
                            {new Date(project.startDate).toLocaleDateString(
                                'id-ID',
                                { month: 'short', day: 'numeric' },
                            )}{' '}
                            -{' '}
                            {new Date(project.endDate).toLocaleDateString(
                                'id-ID',
                                {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                },
                            )}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default function ProjectsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');

    // Filter projects
    const filteredProjects = mockProjects.filter((project) => {
        const matchSearch =
            searchQuery === '' ||
            project.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchStatus =
            selectedStatus === 'all' || project.status === selectedStatus;
        return matchSearch && matchStatus;
    });

    // Calculate stats
    const totalProjects = filteredProjects.length;
    const inProgressProjects = filteredProjects.filter(
        (p) => p.status === 'in-progress',
    ).length;
    const completedProjects = filteredProjects.filter(
        (p) => p.status === 'completed',
    ).length;
    const totalMembers = new Set(filteredProjects.flatMap((p) => p.teamMembers))
        .size;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />

            <div className="p-6">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Projects Management
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Manage and track all your projects
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {/* Status Filter */}
                        <Select
                            value={selectedStatus}
                            onValueChange={setSelectedStatus}
                        >
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="planning">
                                    Planning
                                </SelectItem>
                                <SelectItem value="in-progress">
                                    In Progress
                                </SelectItem>
                                <SelectItem value="on-hold">On Hold</SelectItem>
                                <SelectItem value="completed">
                                    Completed
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Search */}
                        <div className="relative">
                            <IconSearch className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search projects..."
                                className="w-[200px] pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <Button variant="outline">
                            <IconFilter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>

                        {/* Create Project Dialog */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>
                                    <IconPlus className="mr-2 h-4 w-4" />
                                    Create Project
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>
                                        Create New Project
                                    </DialogTitle>
                                    <DialogDescription>
                                        Set up a new project with team and
                                        timeline
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="project-name">
                                            Project Name
                                        </Label>
                                        <Input
                                            id="project-name"
                                            placeholder="e.g., E-commerce Platform"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description">
                                            Description
                                        </Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Describe the project goals and scope..."
                                            rows={3}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="team">Team</Label>
                                            <Select>
                                                <SelectTrigger id="team">
                                                    <SelectValue placeholder="Select team" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="alpha">
                                                        Team Alpha
                                                    </SelectItem>
                                                    <SelectItem value="beta">
                                                        Team Beta
                                                    </SelectItem>
                                                    <SelectItem value="gamma">
                                                        Team Gamma
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="priority">
                                                Priority
                                            </Label>
                                            <Select>
                                                <SelectTrigger id="priority">
                                                    <SelectValue placeholder="Select priority" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="high">
                                                        High
                                                    </SelectItem>
                                                    <SelectItem value="medium">
                                                        Medium
                                                    </SelectItem>
                                                    <SelectItem value="low">
                                                        Low
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="start-date">
                                                Start Date
                                            </Label>
                                            <Input
                                                id="start-date"
                                                type="date"
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="end-date">
                                                End Date
                                            </Label>
                                            <Input id="end-date" type="date" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline">Cancel</Button>
                                    <Button>Create Project</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="mb-6 grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Projects
                            </CardTitle>
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalProjects}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Active in organization
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                In Progress
                            </CardTitle>
                            <FolderKanban className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {inProgressProjects}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Currently running
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Completed
                            </CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {completedProjects}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Successfully delivered
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Team Members
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalMembers}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Across all projects
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Projects Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <Card className="py-12">
                        <CardContent className="flex flex-col items-center justify-center text-center">
                            <Briefcase className="mb-4 h-12 w-12 text-muted-foreground" />
                            <h3 className="mb-2 text-lg font-semibold">
                                No projects found
                            </h3>
                            <p className="mb-4 text-sm text-muted-foreground">
                                Try adjusting your filters or create a new
                                project
                            </p>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>
                                        <IconPlus className="mr-2 h-4 w-4" />
                                        Create First Project
                                    </Button>
                                </DialogTrigger>
                            </Dialog>
                        </CardContent>
                    </Card>
                )}

                {/* Project Status Legend */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle className="text-base">
                            Project Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {Object.entries(statusColors).map(
                                ([key, status]) => (
                                    <div
                                        key={key}
                                        className="flex items-center gap-3 rounded-lg border p-3"
                                    >
                                        <div
                                            className={`h-8 w-8 rounded ${status.bgColor}`}
                                        />
                                        <div>
                                            <div className="font-medium">
                                                {status.label}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {key === 'planning' &&
                                                    'Project setup phase'}
                                                {key === 'in-progress' &&
                                                    'Active development'}
                                                {key === 'on-hold' &&
                                                    'Temporarily paused'}
                                                {key === 'completed' &&
                                                    'Successfully delivered'}
                                            </div>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
