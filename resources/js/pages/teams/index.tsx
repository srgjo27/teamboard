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
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
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
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    IconChevronDown,
    IconChevronUp,
    IconDotsVertical,
    IconEdit,
    IconPlus,
    IconSettings,
    IconTrash,
    IconUserPlus,
    IconUsers,
} from '@tabler/icons-react';
import { TrendingUp, UserCheck, Users } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teams',
        href: '#',
    },
];

const mockTeams = [
    {
        id: 1,
        name: 'Team Alpha',
        description: 'Main Web Application Development',
        status: 'active',
        members: [
            { name: 'Alice Johnson', role: 'Project Manager' },
            { name: 'Bob Smith', role: 'Quality Assurance' },
            { name: 'Charlie Brown', role: 'Quality Assurance' },
            { name: 'David Wilson', role: 'Front End Developer' },
            { name: 'Emma Davis', role: 'Back End Developer' },
            { name: 'Frank Miller', role: 'Designer' },
        ],
        activeProjects: 3,
    },
    {
        id: 2,
        name: 'Team Beta',
        description: 'Mobile Applications & Cross Platform',
        status: 'active',
        members: [
            { name: 'Grace Lee', role: 'Scrum Master' },
            { name: 'Henry Wang', role: 'Full Stack Developer' },
            { name: 'Isabel Chen', role: 'Full Stack Developer' },
            { name: 'Jack Taylor', role: 'Designer' },
        ],
        activeProjects: 2,
    },
    {
        id: 3,
        name: 'Team Gamma',
        description: 'API Development & Microservices',
        status: 'active',
        members: [
            { name: 'Kate Brown', role: 'Product Owner' },
            { name: 'Liam Green', role: 'Back End Developer' },
            { name: 'Mia White', role: 'Back End Developer' },
            { name: 'Noah Black', role: 'Quality Assurance' },
        ],
        activeProjects: 1,
    },
    {
        id: 4,
        name: 'Team Delta',
        description: 'DevOps & Infrastructure Management',
        status: 'active',
        members: [
            { name: 'Olivia Harris', role: 'Project Manager' },
            { name: 'Paul Clark', role: 'Full Stack Developer' },
            { name: 'Quinn Lewis', role: 'Front End Developer' },
            { name: 'Ryan Walker', role: 'Back End Developer' },
            { name: 'Sophia Hall', role: 'Quality Assurance' },
        ],
        activeProjects: 4,
    },
];

const roleColors: Record<string, string> = {
    'Project Manager': 'bg-purple-500',
    'Scrum Master': 'bg-blue-500',
    'Product Owner': 'bg-indigo-500',
    'Front End Developer': 'bg-green-500',
    'Back End Developer': 'bg-teal-500',
    'Full Stack Developer': 'bg-cyan-500',
    'Quality Assurance': 'bg-orange-500',
    Designer: 'bg-pink-500',
};

function TeamCard({ team }: { team: (typeof mockTeams)[0] }) {
    const [isOpen, setIsOpen] = useState(false);

    const roleCount = team.members.reduce(
        (acc, member) => {
            acc[member.role] = (acc[member.role] || 0) + 1;
            return acc;
        },
        {} as Record<string, number>,
    );

    return (
        <Card className="overflow-hidden">
            <CardHeader className="bg-muted/30 pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">
                                {team.name}
                            </CardTitle>
                            <Badge
                                variant="outline"
                                className="border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400"
                            >
                                Active
                            </Badge>
                        </div>
                        <CardDescription className="mt-1">
                            {team.description}
                        </CardDescription>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                            >
                                <IconDotsVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Team Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <IconEdit className="mr-2 h-4 w-4" />
                                Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <IconUserPlus className="mr-2 h-4 w-4" />
                                Add Members
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <IconSettings className="mr-2 h-4 w-4" />
                                Team Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                variant="destructive"
                                className="text-destructive"
                            >
                                <IconTrash className="mr-2 h-4 w-4" />
                                Delete Team
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            <CardContent className="p-4">
                <div className="mb-4 grid grid-cols-3 gap-4 text-center">
                    <div className="rounded-lg bg-muted/50 p-3">
                        <div className="text-2xl font-bold">
                            {team.members.length}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            Members
                        </div>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                        <div className="text-2xl font-bold">
                            {Object.keys(roleCount).length}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            Roles
                        </div>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                        <div className="text-2xl font-bold">
                            {team.activeProjects}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            Projects
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="mb-2 text-sm font-medium">
                        Team Composition
                    </div>
                    <div className="space-y-2">
                        {Object.entries(roleCount).map(([role, count]) => (
                            <div key={role} className="flex items-center gap-2">
                                <div
                                    className={`h-2 w-2 rounded-full ${roleColors[role]}`}
                                />
                                <span className="flex-1 text-sm text-muted-foreground">
                                    {role}
                                </span>
                                <Badge variant="secondary" className="text-xs">
                                    {count}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator className="my-4" />

                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                    <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Team Members</div>
                        <CollapsibleTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                            >
                                {isOpen ? 'Show Less' : 'Show All'}
                                {isOpen ? (
                                    <IconChevronUp className="ml-1 h-4 w-4" />
                                ) : (
                                    <IconChevronDown className="ml-1 h-4 w-4" />
                                )}
                            </Button>
                        </CollapsibleTrigger>
                    </div>

                    {!isOpen && (
                        <div className="mt-3 flex -space-x-3">
                            {team.members.slice(0, 5).map((member, index) => (
                                <Avatar
                                    key={index}
                                    className="h-10 w-10 border-2 border-background"
                                >
                                    <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                                        {member.name
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </AvatarFallback>
                                </Avatar>
                            ))}
                            {team.members.length > 5 && (
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-semibold">
                                    +{team.members.length - 5}
                                </div>
                            )}
                        </div>
                    )}

                    <CollapsibleContent className="mt-3 space-y-2">
                        {team.members.map((member, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 rounded-lg border p-2 transition-colors hover:bg-muted/50"
                            >
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback className="text-xs">
                                        {member.name
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="text-sm font-medium">
                                        {member.name}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {member.role}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CollapsibleContent>
                </Collapsible>

                <div className="mt-4 flex gap-2">
                    <Button variant="outline" className="flex-1" size="sm">
                        <IconUsers className="mr-2 h-4 w-4" />
                        Manage
                    </Button>
                    <Button variant="outline" size="sm">
                        <IconUserPlus className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default function Teams() {
    const totalMembers = mockTeams.reduce(
        (sum, team) => sum + team.members.length,
        0,
    );
    const totalTeams = mockTeams.length;
    const totalProjects = mockTeams.reduce(
        (sum, team) => sum + team.activeProjects,
        0,
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Teams" />

            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Teams Management
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Organize and manage your project teams
                        </p>
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <IconPlus className="mr-2 h-4 w-4" />
                                Create Team
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create New Team</DialogTitle>
                                <DialogDescription>
                                    Set up a new team for your projects
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="team-name">Team Name</Label>
                                    <Input
                                        id="team-name"
                                        placeholder="e.g., Team Alpha"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="team-description">
                                        Description
                                    </Label>
                                    <Input
                                        id="team-description"
                                        placeholder="What does this team do?"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button variant="outline">Cancel</Button>
                                <Button>Create Team</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Stats Cards */}
                <div className="mb-6 grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Teams
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalTeams}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Active teams in organization
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Members
                            </CardTitle>
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalMembers}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Across all teams
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Active Projects
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalProjects}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Currently in progress
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {mockTeams.map((team) => (
                        <TeamCard key={team.id} team={team} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
