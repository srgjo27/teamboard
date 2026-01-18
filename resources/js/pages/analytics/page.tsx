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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    IconCalendar,
    IconDownload,
    IconFilter,
    IconRefresh,
    IconTrendingUp,
} from '@tabler/icons-react';
import {
    Activity,
    AlertCircle,
    BarChart3,
    CheckCircle2,
    Clock,
    FolderKanban,
    Target,
    TrendingUp,
    Users,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Analytics',
        href: '#',
    },
];

const mockStats = {
    overview: {
        totalProjects: 12,
        activeProjects: 8,
        completedProjects: 4,
        totalTickets: 156,
        completedTickets: 89,
        inProgressTickets: 45,
        totalStoryPoints: 678,
        completedStoryPoints: 412,
        teamMembers: 24,
        averageVelocity: 52,
    },
    projectStats: [
        {
            name: 'Project Alpha',
            progress: 75,
            tickets: { total: 45, completed: 34, inProgress: 8, pending: 3 },
            storyPoints: { total: 189, completed: 142 },
            team: 'Team Alpha',
            status: 'on-track',
        },
        {
            name: 'Project Beta',
            progress: 58,
            tickets: { total: 38, completed: 22, inProgress: 12, pending: 4 },
            storyPoints: { total: 156, completed: 91 },
            team: 'Team Beta',
            status: 'at-risk',
        },
        {
            name: 'Project Gamma',
            progress: 25,
            tickets: { total: 28, completed: 7, inProgress: 10, pending: 11 },
            storyPoints: { total: 134, completed: 34 },
            team: 'Team Gamma',
            status: 'delayed',
        },
    ],
    teamPerformance: [
        {
            team: 'Team Alpha',
            members: 6,
            velocity: 58,
            completionRate: 87,
            activeTickets: 15,
        },
        {
            team: 'Team Beta',
            members: 4,
            velocity: 42,
            completionRate: 72,
            activeTickets: 12,
        },
        {
            team: 'Team Gamma',
            members: 4,
            velocity: 38,
            completionRate: 65,
            activeTickets: 18,
        },
        {
            team: 'Team Delta',
            members: 5,
            velocity: 48,
            completionRate: 79,
            activeTickets: 10,
        },
    ],
    velocityTrend: [
        { week: 'Week 1', points: 45 },
        { week: 'Week 2', points: 52 },
        { week: 'Week 3', points: 48 },
        { week: 'Week 4', points: 56 },
        { week: 'Week 5', points: 51 },
        { week: 'Week 6', points: 58 },
    ],
};

export default function AnalyticsPage() {
    const [selectedPeriod, setSelectedPeriod] = useState('30days');
    const [selectedTeam, setSelectedTeam] = useState('all');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics" />

            <div className="p-6">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Team Board Analytics
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Comprehensive statistics and insights for your
                            projects and teams
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {/* Period Filter */}
                        <Select
                            value={selectedPeriod}
                            onValueChange={setSelectedPeriod}
                        >
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7days">
                                    Last 7 Days
                                </SelectItem>
                                <SelectItem value="30days">
                                    Last 30 Days
                                </SelectItem>
                                <SelectItem value="90days">
                                    Last 90 Days
                                </SelectItem>
                                <SelectItem value="year">This Year</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Team Filter */}
                        <Select
                            value={selectedTeam}
                            onValueChange={setSelectedTeam}
                        >
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Select team" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Teams</SelectItem>
                                <SelectItem value="alpha">
                                    Team Alpha
                                </SelectItem>
                                <SelectItem value="beta">Team Beta</SelectItem>
                                <SelectItem value="gamma">
                                    Team Gamma
                                </SelectItem>
                                <SelectItem value="delta">
                                    Team Delta
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <Button variant="outline" size="icon">
                            <IconRefresh className="h-4 w-4" />
                        </Button>

                        <Button variant="outline">
                            <IconDownload className="mr-2 h-4 w-4" />
                            Export
                        </Button>

                        <Button variant="outline">
                            <IconFilter className="mr-2 h-4 w-4" />
                            Advanced
                        </Button>
                    </div>
                </div>

                {/* Overview Stats Cards */}
                <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Projects
                            </CardTitle>
                            <FolderKanban className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {mockStats.overview.totalProjects}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-green-600">
                                    {mockStats.overview.activeProjects} active
                                </span>
                                , {mockStats.overview.completedProjects}{' '}
                                completed
                            </p>
                            <div className="mt-2 flex items-center text-xs text-green-600">
                                <IconTrendingUp className="mr-1 h-3 w-3" />
                                +12% from last month
                            </div>
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
                                {mockStats.overview.totalTickets}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {mockStats.overview.completedTickets} completed,{' '}
                                {mockStats.overview.inProgressTickets} in
                                progress
                            </p>
                            <div className="mt-2 flex items-center text-xs text-green-600">
                                <IconTrendingUp className="mr-1 h-3 w-3" />
                                +8% completion rate
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Story Points
                            </CardTitle>
                            <Target className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {mockStats.overview.totalStoryPoints}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {mockStats.overview.completedStoryPoints}{' '}
                                completed (
                                {Math.round(
                                    (mockStats.overview.completedStoryPoints /
                                        mockStats.overview.totalStoryPoints) *
                                        100,
                                )}
                                %)
                            </p>
                            <Progress
                                value={
                                    (mockStats.overview.completedStoryPoints /
                                        mockStats.overview.totalStoryPoints) *
                                    100
                                }
                                className="mt-2 h-1"
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Team Velocity
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {mockStats.overview.averageVelocity}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Story points per sprint
                            </p>
                            <div className="mt-2 flex items-center text-xs text-green-600">
                                <IconTrendingUp className="mr-1 h-3 w-3" />
                                +15% from last sprint
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs for different views */}
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                        <TabsTrigger value="teams">Teams</TabsTrigger>
                        <TabsTrigger value="velocity">Velocity</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            {/* Ticket Status Distribution */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Ticket Status Distribution
                                    </CardTitle>
                                    <CardDescription>
                                        Current sprint overview
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        <div>
                                            <div className="mb-1 flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <span>Completed</span>
                                                </div>
                                                <span className="font-semibold">
                                                    89 (57%)
                                                </span>
                                            </div>
                                            <Progress
                                                value={57}
                                                className="h-2"
                                            />
                                        </div>

                                        <div>
                                            <div className="mb-1 flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-4 w-4 text-blue-500" />
                                                    <span>In Progress</span>
                                                </div>
                                                <span className="font-semibold">
                                                    45 (29%)
                                                </span>
                                            </div>
                                            <Progress
                                                value={29}
                                                className="h-2"
                                            />
                                        </div>

                                        <div>
                                            <div className="mb-1 flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <AlertCircle className="h-4 w-4 text-orange-500" />
                                                    <span>Pending</span>
                                                </div>
                                                <span className="font-semibold">
                                                    22 (14%)
                                                </span>
                                            </div>
                                            <Progress
                                                value={14}
                                                className="h-2"
                                            />
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="pt-2">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold">
                                                156
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Total Tickets
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Team Members Overview */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Team Members Overview
                                    </CardTitle>
                                    <CardDescription>
                                        Active contributors
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between rounded-lg border p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                                <Users className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="font-semibold">
                                                    {
                                                        mockStats.overview
                                                            .teamMembers
                                                    }
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    Total Members
                                                </div>
                                            </div>
                                        </div>
                                        <Badge variant="secondary">
                                            Active
                                        </Badge>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                Team Alpha
                                            </span>
                                            <span className="font-semibold">
                                                6 members
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                Team Beta
                                            </span>
                                            <span className="font-semibold">
                                                4 members
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                Team Gamma
                                            </span>
                                            <span className="font-semibold">
                                                4 members
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">
                                                Team Delta
                                            </span>
                                            <span className="font-semibold">
                                                5 members
                                            </span>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            Avg. tasks per member
                                        </span>
                                        <span className="font-semibold">
                                            6.5
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Velocity Chart Placeholder */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Velocity Trend
                                </CardTitle>
                                <CardDescription>
                                    Story points completed per week
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex h-[200px] items-end justify-between gap-2">
                                    {mockStats.velocityTrend.map(
                                        (item, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-1 flex-col items-center gap-2"
                                            >
                                                <div
                                                    className="w-full rounded-t-md bg-primary/80 transition-all hover:bg-primary"
                                                    style={{
                                                        height: `${(item.points / 60) * 100}%`,
                                                    }}
                                                    title={`${item.points} points`}
                                                />
                                                <div className="text-xs text-muted-foreground">
                                                    {item.week.replace(
                                                        'Week ',
                                                        'W',
                                                    )}
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <div className="h-3 w-3 rounded bg-primary/80" />
                                        <span>Story Points</span>
                                    </div>
                                    <span>•</span>
                                    <span>Average: 51.7 points/week</span>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Projects Tab */}
                    <TabsContent value="projects" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Project Performance
                                </CardTitle>
                                <CardDescription>
                                    Progress and status of all projects
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {mockStats.projectStats.map(
                                        (project, index) => (
                                            <div
                                                key={index}
                                                className="rounded-lg border p-4"
                                            >
                                                <div className="mb-3 flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-semibold">
                                                            {project.name}
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            {project.team}
                                                        </p>
                                                    </div>
                                                    <Badge
                                                        variant={
                                                            project.status ===
                                                            'on-track'
                                                                ? 'default'
                                                                : project.status ===
                                                                    'at-risk'
                                                                  ? 'secondary'
                                                                  : 'destructive'
                                                        }
                                                    >
                                                        {project.status ===
                                                        'on-track'
                                                            ? 'On Track'
                                                            : project.status ===
                                                                'at-risk'
                                                              ? 'At Risk'
                                                              : 'Delayed'}
                                                    </Badge>
                                                </div>

                                                <div className="mb-2 flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">
                                                        Progress
                                                    </span>
                                                    <span className="font-semibold">
                                                        {project.progress}%
                                                    </span>
                                                </div>
                                                <Progress
                                                    value={project.progress}
                                                    className="mb-3 h-2"
                                                />

                                                <div className="grid grid-cols-3 gap-4 text-sm">
                                                    <div>
                                                        <div className="text-muted-foreground">
                                                            Tickets
                                                        </div>
                                                        <div className="font-semibold">
                                                            {
                                                                project.tickets
                                                                    .completed
                                                            }
                                                            /
                                                            {
                                                                project.tickets
                                                                    .total
                                                            }
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-muted-foreground">
                                                            Story Points
                                                        </div>
                                                        <div className="font-semibold">
                                                            {
                                                                project
                                                                    .storyPoints
                                                                    .completed
                                                            }
                                                            /
                                                            {
                                                                project
                                                                    .storyPoints
                                                                    .total
                                                            }
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="text-muted-foreground">
                                                            In Progress
                                                        </div>
                                                        <div className="font-semibold">
                                                            {
                                                                project.tickets
                                                                    .inProgress
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Teams Tab */}
                    <TabsContent value="teams" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Team Performance Comparison
                                </CardTitle>
                                <CardDescription>
                                    Velocity and completion rates
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {mockStats.teamPerformance.map(
                                        (team, index) => (
                                            <div
                                                key={index}
                                                className="rounded-lg border p-4"
                                            >
                                                <div className="mb-3 flex items-center justify-between">
                                                    <div>
                                                        <h3 className="font-semibold">
                                                            {team.team}
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            {team.members}{' '}
                                                            members
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="flex items-center gap-1 text-sm font-semibold">
                                                            <BarChart3 className="h-4 w-4" />
                                                            {team.velocity} pts
                                                        </div>
                                                        <p className="text-xs text-muted-foreground">
                                                            Velocity
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <div>
                                                        <div className="mb-1 flex items-center justify-between text-sm">
                                                            <span className="text-muted-foreground">
                                                                Completion Rate
                                                            </span>
                                                            <span className="font-semibold">
                                                                {
                                                                    team.completionRate
                                                                }
                                                                %
                                                            </span>
                                                        </div>
                                                        <Progress
                                                            value={
                                                                team.completionRate
                                                            }
                                                            className="h-2"
                                                        />
                                                    </div>

                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-muted-foreground">
                                                            Active Tickets
                                                        </span>
                                                        <Badge variant="secondary">
                                                            {team.activeTickets}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Velocity Tab */}
                    <TabsContent value="velocity" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Sprint Velocity
                                    </CardTitle>
                                    <CardDescription>
                                        Story points per sprint
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="text-center">
                                            <div className="text-4xl font-bold">
                                                52
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Average Velocity
                                            </p>
                                        </div>

                                        <Separator />

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    Current Sprint
                                                </span>
                                                <span className="font-semibold">
                                                    58 pts
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    Last Sprint
                                                </span>
                                                <span className="font-semibold">
                                                    51 pts
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    Best Sprint
                                                </span>
                                                <span className="font-semibold">
                                                    64 pts
                                                </span>
                                            </div>
                                        </div>

                                        <div className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
                                            <div className="flex items-center gap-2">
                                                <IconTrendingUp className="h-4 w-4" />
                                                <span className="font-medium">
                                                    Velocity increasing by 15%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Prediction
                                    </CardTitle>
                                    <CardDescription>
                                        Based on current velocity
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="rounded-lg border-2 border-dashed p-4 text-center">
                                            <div className="text-3xl font-bold">
                                                156
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Story points remaining
                                            </p>
                                        </div>

                                        <Separator />

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    Est. Completion
                                                </span>
                                                <span className="font-semibold">
                                                    3 sprints
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    Target Date
                                                </span>
                                                <span className="font-semibold">
                                                    Apr 15, 2026
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    Confidence
                                                </span>
                                                <Badge variant="secondary">
                                                    High
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
                                            <div className="flex items-center gap-2">
                                                <IconCalendar className="h-4 w-4" />
                                                <span>
                                                    On track to meet deadline
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Burndown Chart Placeholder */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Burndown Chart
                                </CardTitle>
                                <CardDescription>
                                    Work remaining over time
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex h-[250px] items-end justify-between gap-2 border-b border-l pb-0 pl-4">
                                    {/* Simple burndown visualization */}
                                    <div className="relative h-full flex-1">
                                        <div className="absolute bottom-0 left-0 h-[90%] w-px border-l-2 border-dashed border-muted-foreground/30" />
                                        <div className="absolute bottom-0 left-0 h-[80%] w-px border-l-2 border-dashed border-muted-foreground/30" />
                                        <div className="absolute bottom-0 left-0 h-[70%] w-px border-l-2 border-dashed border-muted-foreground/30" />
                                        <div className="absolute bottom-0 left-0 h-[60%] w-px border-l-2 border-dashed border-muted-foreground/30" />
                                        <div className="absolute bottom-0 left-0 h-[50%] w-px border-l-2 border-dashed border-muted-foreground/30" />

                                        {/* Ideal line */}
                                        <svg className="absolute inset-0 h-full w-full">
                                            <line
                                                x1="0"
                                                y1="0"
                                                x2="100%"
                                                y2="100%"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeDasharray="5,5"
                                                className="text-muted-foreground/50"
                                            />
                                        </svg>

                                        {/* Actual line - curved downward */}
                                        <svg className="absolute inset-0 h-full w-full">
                                            <polyline
                                                points="0,0 20%,15% 40%,35% 60%,60% 80%,80% 100%,95%"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                className="text-primary"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <div className="h-0.5 w-4 border-t-2 border-dashed border-muted-foreground/50" />
                                        <span>Ideal Burndown</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-0.5 w-4 bg-primary" />
                                        <span>Actual Burndown</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
