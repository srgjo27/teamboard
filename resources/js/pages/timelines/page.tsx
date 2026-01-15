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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    IconCalendar,
    IconChevronLeft,
    IconChevronRight,
    IconDotsVertical,
    IconEdit,
    IconEye,
    IconFilter,
    IconPlus,
    IconTrash,
} from '@tabler/icons-react';
import { Calendar, Clock } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Timelines',
        href: '#',
    },
];

const mockProjects = [
    {
        id: 1,
        name: 'Project Alpha - Web Platform',
        team: 'Team Alpha',
        duration: 5,
        startWeek: 1,
        status: 'in-progress',
        phases: [
            {
                name: 'Requirements',
                startWeek: 1,
                duration: 1,
                color: 'bg-blue-500',
                status: 'completed',
            },
            {
                name: 'Development',
                startWeek: 2,
                duration: 2.5,
                color: 'bg-green-500',
                status: 'in-progress',
            },
            {
                name: 'Testing',
                startWeek: 4.5,
                duration: 1,
                color: 'bg-orange-500',
                status: 'pending',
            },
            {
                name: 'Deployment',
                startWeek: 5.5,
                duration: 0.5,
                color: 'bg-purple-500',
                status: 'pending',
            },
        ],
    },
    {
        id: 2,
        name: 'Project Beta - Mobile App',
        team: 'Team Beta',
        duration: 8,
        startWeek: 2,
        status: 'in-progress',
        phases: [
            {
                name: 'Requirements',
                startWeek: 2,
                duration: 1.5,
                color: 'bg-blue-500',
                status: 'completed',
            },
            {
                name: 'Development',
                startWeek: 3.5,
                duration: 4,
                color: 'bg-green-500',
                status: 'in-progress',
            },
            {
                name: 'Testing',
                startWeek: 7.5,
                duration: 1.5,
                color: 'bg-orange-500',
                status: 'pending',
            },
            {
                name: 'Deployment',
                startWeek: 9,
                duration: 1,
                color: 'bg-purple-500',
                status: 'pending',
            },
        ],
    },
    {
        id: 3,
        name: 'Project Gamma - API Services',
        team: 'Team Gamma',
        duration: 6,
        startWeek: 4,
        status: 'planning',
        phases: [
            {
                name: 'Requirements',
                startWeek: 4,
                duration: 1,
                color: 'bg-blue-500',
                status: 'pending',
            },
            {
                name: 'Development',
                startWeek: 5,
                duration: 3,
                color: 'bg-green-500',
                status: 'pending',
            },
            {
                name: 'Testing',
                startWeek: 8,
                duration: 1.5,
                color: 'bg-orange-500',
                status: 'pending',
            },
            {
                name: 'Deployment',
                startWeek: 9.5,
                duration: 0.5,
                color: 'bg-purple-500',
                status: 'pending',
            },
        ],
    },
];

const phaseColors: Record<string, string> = {
    Requirements: 'bg-blue-500',
    Development: 'bg-green-500',
    Testing: 'bg-orange-500',
    Deployment: 'bg-purple-500',
};

const statusColors: Record<string, { variant: string; label: string }> = {
    'in-progress': { variant: 'default', label: 'In Progress' },
    planning: { variant: 'secondary', label: 'Planning' },
    completed: { variant: 'outline', label: 'Completed' },
    pending: { variant: 'outline', label: 'Pending' },
};

function TimelineRow({ project }: { project: (typeof mockProjects)[0] }) {
    const totalWeeks = 12;
    const weekWidth = 100 / totalWeeks;

    return (
        <div className="group border-b transition-colors last:border-b-0 hover:bg-muted/30">
            <div className="flex items-center gap-4 border-b bg-muted/20 p-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{project.name}</h3>
                        <Badge
                            variant={
                                statusColors[project.status]
                                    .variant as 'default'
                            }
                            className="text-xs"
                        >
                            {statusColors[project.status].label}
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {project.team} • {project.duration} weeks
                    </p>
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
                        <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <IconEye className="mr-2 h-4 w-4" />
                            View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <IconEdit className="mr-2 h-4 w-4" />
                            Edit Timeline
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
            <div className="p-4">
                <div className="relative h-16">
                    <div className="absolute inset-0 flex">
                        {Array.from({ length: totalWeeks }).map((_, i) => (
                            <div
                                key={i}
                                className="flex-1 border-r border-dashed border-muted-foreground/20 last:border-r-0"
                            />
                        ))}
                    </div>
                    <div className="relative flex h-full items-center">
                        {project.phases.map((phase, index) => {
                            const left = (phase.startWeek - 1) * weekWidth;
                            const width = phase.duration * weekWidth;

                            return (
                                <div
                                    key={index}
                                    className="absolute h-10 rounded-md shadow-sm transition-all hover:shadow-md"
                                    style={{
                                        left: `${left}%`,
                                        width: `${width}%`,
                                    }}
                                >
                                    <div
                                        className={`h-full rounded-md ${phase.color} ${
                                            phase.status === 'completed'
                                                ? 'opacity-60'
                                                : phase.status === 'pending'
                                                  ? 'opacity-40'
                                                  : 'opacity-90'
                                        } flex items-center justify-center px-2`}
                                    >
                                        <span className="truncate text-xs font-medium text-white">
                                            {phase.name}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                    {project.phases.map((phase, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 text-xs"
                        >
                            <div
                                className={`h-3 w-3 rounded-sm ${phase.color}`}
                            />
                            <span className="font-medium">{phase.name}:</span>
                            <span className="text-muted-foreground">
                                Week {phase.startWeek} -{' '}
                                {phase.startWeek + phase.duration} (
                                {phase.duration}w)
                            </span>
                            <Badge
                                variant="outline"
                                className="h-5 text-[10px]"
                            >
                                {phase.status}
                            </Badge>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function TimelinePage() {
    const [currentView, setCurrentView] = useState<'month' | 'quarter'>(
        'month',
    );
    const totalWeeks = 12;

    const generateWeekLabels = () => {
        const labels: string[] = [];
        const startDate = new Date(2026, 0, 1);
        const monthNames = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];

        for (let i = 0; i < totalWeeks; i++) {
            const weekDate = new Date(startDate);
            weekDate.setDate(startDate.getDate() + i * 7);

            const month = monthNames[weekDate.getMonth()];
            const weekOfMonth = Math.ceil(weekDate.getDate() / 7);

            labels.push(`${month} W${weekOfMonth}`);
        }

        return labels;
    };

    const weekLabels = generateWeekLabels();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Timelines" />
            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Project Timelines
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Manage and visualize project schedules and SDLC
                            phases
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline">
                            <IconFilter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>
                                    <IconPlus className="mr-2 h-4 w-4" />
                                    New Project Timeline
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>
                                        Create Project Timeline
                                    </DialogTitle>
                                    <DialogDescription>
                                        Set up a new project with SDLC phases
                                        and timeline
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
                                            <Label htmlFor="duration">
                                                Duration (weeks)
                                            </Label>
                                            <Input
                                                id="duration"
                                                type="number"
                                                placeholder="8"
                                            />
                                        </div>
                                    </div>
                                    <Separator />
                                    <div className="grid gap-2">
                                        <Label>SDLC Phases</Label>
                                        <div className="rounded-lg border p-3 text-sm text-muted-foreground">
                                            Phases will be automatically
                                            distributed based on duration. You
                                            can adjust them after creation.
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline">Cancel</Button>
                                    <Button>Create Timeline</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <div className="mb-6 grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Active Projects
                            </CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {
                                    mockProjects.filter(
                                        (p) => p.status === 'in-progress',
                                    ).length
                                }
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Currently running
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Duration
                            </CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {mockProjects.reduce(
                                    (sum, p) => sum + p.duration,
                                    0,
                                )}{' '}
                                weeks
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Across all projects
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                In Development
                            </CardTitle>
                            <div className="h-3 w-3 rounded-full bg-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {
                                    mockProjects.filter((p) =>
                                        p.phases.some(
                                            (phase) =>
                                                phase.name === 'Development' &&
                                                phase.status === 'in-progress',
                                        ),
                                    ).length
                                }
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Development phase
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Planning
                            </CardTitle>
                            <div className="h-3 w-3 rounded-full bg-slate-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {
                                    mockProjects.filter(
                                        (p) => p.status === 'planning',
                                    ).length
                                }
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Not yet started
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <Card className="mb-6">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Timeline View</CardTitle>
                                <CardDescription>
                                    3-month project timeline overview (12 weeks)
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon">
                                    <IconChevronLeft className="h-4 w-4" />
                                </Button>
                                <div className="flex items-center gap-2 rounded-md border px-3 py-2">
                                    <IconCalendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">
                                        Jan W1 - Mar W4 (Q1 2026)
                                    </span>
                                </div>
                                <Button variant="outline" size="icon">
                                    <IconChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 flex border-b">
                            {weekLabels.map((label, i) => (
                                <div
                                    key={i}
                                    className="flex-1 border-r border-dashed py-2 text-center text-xs font-medium text-muted-foreground last:border-r-0"
                                    title={`Week ${i + 1}: ${label}`}
                                >
                                    {label}
                                </div>
                            ))}
                        </div>
                        <div className="space-y-0 overflow-hidden rounded-lg border">
                            {mockProjects.map((project) => (
                                <TimelineRow
                                    key={project.id}
                                    project={project}
                                />
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            SDLC Phase Legend
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {Object.entries(phaseColors).map(
                                ([phase, color]) => (
                                    <div
                                        key={phase}
                                        className="flex items-center gap-3 rounded-lg border p-3"
                                    >
                                        <div
                                            className={`h-8 w-8 rounded ${color}`}
                                        />
                                        <div>
                                            <div className="font-medium">
                                                {phase}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {phase === 'Requirements' &&
                                                    'Analysis & Planning'}
                                                {phase === 'Development' &&
                                                    'Coding & Implementation'}
                                                {phase === 'Testing' &&
                                                    'QA & Bug Fixing'}
                                                {phase === 'Deployment' &&
                                                    'Release & Launch'}
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
