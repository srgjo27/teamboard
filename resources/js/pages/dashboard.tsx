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
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    IconArrowRight,
    IconCalendar,
    IconFlag,
    IconPlus,
    IconTrendingUp,
    IconUsers,
} from '@tabler/icons-react';
import {
    Activity,
    AlertCircle,
    Briefcase,
    CheckCircle2,
    Clock,
    FolderKanban,
    Rocket,
    Target,
    TrendingUp,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Board',
        href: dashboard().url,
    },
];

// Mock data untuk dashboard
const mockDashboardData = {
    stats: {
        activeProjects: 8,
        totalTickets: 156,
        completedTickets: 89,
        teamMembers: 24,
        velocity: 52,
    },
    recentProjects: [
        {
            id: 1,
            name: 'Project Alpha',
            progress: 75,
            status: 'on-track',
            team: 'Team Alpha',
            dueDate: '2026-02-15',
            activeTickets: 12,
        },
        {
            id: 2,
            name: 'Project Beta',
            progress: 58,
            status: 'at-risk',
            team: 'Team Beta',
            dueDate: '2026-03-01',
            activeTickets: 18,
        },
        {
            id: 3,
            name: 'Project Gamma',
            progress: 25,
            status: 'planning',
            team: 'Team Gamma',
            dueDate: '2026-03-15',
            activeTickets: 8,
        },
    ],
    upcomingDeadlines: [
        {
            project: 'Project Alpha',
            task: 'API Integration Phase',
            dueDate: '2026-01-25',
            priority: 'high',
        },
        {
            project: 'Project Beta',
            task: 'User Testing Sprint',
            dueDate: '2026-01-28',
            priority: 'medium',
        },
        {
            project: 'Project Delta',
            task: 'Deployment Preparation',
            dueDate: '2026-02-02',
            priority: 'high',
        },
    ],
    myTasks: [
        {
            id: 'ALPHA-101',
            title: 'Implement authentication',
            project: 'Project Alpha',
            priority: 'highest',
            status: 'in-progress',
        },
        {
            id: 'BETA-205',
            title: 'Fix mobile layout',
            project: 'Project Beta',
            priority: 'high',
            status: 'in-progress',
        },
        {
            id: 'ALPHA-112',
            title: 'Update API documentation',
            project: 'Project Alpha',
            priority: 'medium',
            status: 'todo',
        },
    ],
    recentActivity: [
        {
            user: 'Alice Johnson',
            action: 'completed ticket',
            target: 'ALPHA-98',
            time: '5 mins ago',
        },
        {
            user: 'Bob Smith',
            action: 'commented on',
            target: 'BETA-204',
            time: '12 mins ago',
        },
        {
            user: 'Emma Davis',
            action: 'moved ticket to QA',
            target: 'ALPHA-104',
            time: '23 mins ago',
        },
        {
            user: 'David Wilson',
            action: 'created new ticket',
            target: 'ALPHA-115',
            time: '35 mins ago',
        },
    ],
};

const priorityColors: Record<string, { color: string; bgColor: string }> = {
    highest: { color: 'text-red-600', bgColor: 'bg-red-50' },
    high: { color: 'text-orange-600', bgColor: 'bg-orange-50' },
    medium: { color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    low: { color: 'text-green-600', bgColor: 'bg-green-50' },
};

const statusColors: Record<string, { color: string; label: string }> = {
    'on-track': { color: 'bg-green-500', label: 'On Track' },
    'at-risk': { color: 'bg-orange-500', label: 'At Risk' },
    planning: { color: 'bg-blue-500', label: 'Planning' },
    delayed: { color: 'bg-red-500', label: 'Delayed' },
};

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="p-6">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Welcome back! 👋
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Here's what's happening with your projects today
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline">
                            <IconCalendar className="mr-2 h-4 w-4" />
                            This Week
                        </Button>
                        <Button>
                            <IconPlus className="mr-2 h-4 w-4" />
                            New Project
                        </Button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Active Projects
                            </CardTitle>
                            <FolderKanban className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {mockDashboardData.stats.activeProjects}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-green-600">+2</span> from
                                last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Tickets
                            </CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {mockDashboardData.stats.totalTickets}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {mockDashboardData.stats.completedTickets}{' '}
                                completed
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Completion Rate
                            </CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {Math.round(
                                    (mockDashboardData.stats.completedTickets /
                                        mockDashboardData.stats.totalTickets) *
                                        100,
                                )}
                                %
                            </div>
                            <Progress
                                value={
                                    (mockDashboardData.stats.completedTickets /
                                        mockDashboardData.stats.totalTickets) *
                                    100
                                }
                                className="mt-2 h-1"
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Team Members
                            </CardTitle>
                            <IconUsers className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {mockDashboardData.stats.teamMembers}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Across all teams
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Sprint Velocity
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {mockDashboardData.stats.velocity}
                            </div>
                            <p className="text-xs text-green-600">
                                <IconTrendingUp className="mr-1 inline h-3 w-3" />
                                +15% from last sprint
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column - 2/3 width */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Recent Projects */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-base">
                                            Active Projects
                                        </CardTitle>
                                        <CardDescription>
                                            Your current project pipeline
                                        </CardDescription>
                                    </div>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href="/projects">
                                            View All
                                            <IconArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {mockDashboardData.recentProjects.map(
                                        (project) => (
                                            <div
                                                key={project.id}
                                                className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
                                            >
                                                <div className="mb-3 flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold">
                                                            {project.name}
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            {project.team} •{' '}
                                                            {
                                                                project.activeTickets
                                                            }{' '}
                                                            active tickets
                                                        </p>
                                                    </div>
                                                    <Badge
                                                        className={`${
                                                            statusColors[
                                                                project.status
                                                            ].color
                                                        } text-white`}
                                                    >
                                                        {
                                                            statusColors[
                                                                project.status
                                                            ].label
                                                        }
                                                    </Badge>
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-muted-foreground">
                                                            Progress
                                                        </span>
                                                        <span className="font-semibold">
                                                            {project.progress}%
                                                        </span>
                                                    </div>
                                                    <Progress
                                                        value={project.progress}
                                                        className="h-2"
                                                    />

                                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <IconCalendar className="h-3 w-3" />
                                                            Due:{' '}
                                                            {new Date(
                                                                project.dueDate,
                                                            ).toLocaleDateString(
                                                                'en-US',
                                                                {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                },
                                                            )}
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-6 text-xs"
                                                        >
                                                            View Details
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* My Tasks */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-base">
                                            My Tasks
                                        </CardTitle>
                                        <CardDescription>
                                            Tickets assigned to you
                                        </CardDescription>
                                    </div>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href="/tickets">
                                            View All
                                            <IconArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {mockDashboardData.myTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                                        >
                                            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10">
                                                <Target className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        variant="outline"
                                                        className="font-mono text-xs"
                                                    >
                                                        {task.id}
                                                    </Badge>
                                                    <span className="text-sm font-medium">
                                                        {task.title}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    {task.project}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <IconFlag
                                                    className={`h-4 w-4 ${
                                                        priorityColors[
                                                            task.priority
                                                        ].color
                                                    }`}
                                                />
                                                <Badge
                                                    variant={
                                                        task.status ===
                                                        'in-progress'
                                                            ? 'default'
                                                            : 'secondary'
                                                    }
                                                    className="text-xs"
                                                >
                                                    {task.status ===
                                                    'in-progress'
                                                        ? 'In Progress'
                                                        : 'To Do'}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Activity */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Recent Activity
                                </CardTitle>
                                <CardDescription>
                                    Latest updates from your team
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {mockDashboardData.recentActivity.map(
                                        (activity, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3"
                                            >
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback className="text-xs">
                                                        {activity.user
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 space-y-1">
                                                    <p className="text-sm">
                                                        <span className="font-medium">
                                                            {activity.user}
                                                        </span>{' '}
                                                        <span className="text-muted-foreground">
                                                            {activity.action}
                                                        </span>{' '}
                                                        <span className="font-medium text-primary">
                                                            {activity.target}
                                                        </span>
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {activity.time}
                                                    </p>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - 1/3 width */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                <Button className="w-full justify-start">
                                    <IconPlus className="mr-2 h-4 w-4" />
                                    Create Ticket
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                >
                                    <Briefcase className="mr-2 h-4 w-4" />
                                    New Project
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                >
                                    <IconUsers className="mr-2 h-4 w-4" />
                                    View Teams
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                >
                                    <Rocket className="mr-2 h-4 w-4" />
                                    Sprint Planning
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Upcoming Deadlines */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Upcoming Deadlines
                                </CardTitle>
                                <CardDescription>
                                    Important dates this week
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {mockDashboardData.upcomingDeadlines.map(
                                        (deadline, index) => (
                                            <div
                                                key={index}
                                                className="rounded-lg border p-3"
                                            >
                                                <div className="mb-2 flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium">
                                                            {deadline.task}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {deadline.project}
                                                        </p>
                                                    </div>
                                                    <IconFlag
                                                        className={`h-4 w-4 ${
                                                            priorityColors[
                                                                deadline
                                                                    .priority
                                                            ].color
                                                        }`}
                                                    />
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Clock className="h-3 w-3" />
                                                    {new Date(
                                                        deadline.dueDate,
                                                    ).toLocaleDateString(
                                                        'en-US',
                                                        {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                        },
                                                    )}
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Sprint Progress */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Current Sprint
                                </CardTitle>
                                <CardDescription>Sprint 12</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            Story Points
                                        </span>
                                        <span className="font-semibold">
                                            42 / 65
                                        </span>
                                    </div>
                                    <Progress value={65} className="h-2" />
                                </div>

                                <Separator />

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            <span>Completed</span>
                                        </div>
                                        <span className="font-semibold">
                                            28
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-blue-500" />
                                            <span>In Progress</span>
                                        </div>
                                        <span className="font-semibold">
                                            15
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4 text-orange-500" />
                                            <span>Pending</span>
                                        </div>
                                        <span className="font-semibold">
                                            22
                                        </span>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">
                                        Days remaining
                                    </span>
                                    <span className="font-semibold">
                                        5 days
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
