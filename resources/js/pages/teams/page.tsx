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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Team } from '@/types/team';
import { User } from '@/types/user';
import { Head, usePage } from '@inertiajs/react';
import {
    IconChevronDown,
    IconChevronUp,
    IconDotsVertical,
    IconEdit,
    IconSettings,
    IconTrash,
    IconUserPlus,
} from '@tabler/icons-react';
import { UserCheck, Users } from 'lucide-react';
import { useState } from 'react';
import AddMemberDialog from './components/add-member-dialog';
import CreateTeamDialog from './components/create-team-dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teams',
        href: '#',
    },
];

interface TeamsProps {
    teams: Team[];
    allUsers: User[];
}

function TeamCard({ team, allUsers }: { team: Team; allUsers: User[] }) {
    const [isOpen, setIsOpen] = useState(false);

    const availableUsers = allUsers.filter(
        (user) => !team.members.some((member) => member.id === user.id),
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
                            <AddMemberDialog
                                teamId={team.id}
                                availableUsers={availableUsers}
                                trigger={
                                    <DropdownMenuItem
                                        onSelect={(e) => e.preventDefault()}
                                    >
                                        <IconUserPlus className="mr-2 h-4 w-4" />
                                        Add Members
                                    </DropdownMenuItem>
                                }
                            />
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
                <div className="mb-4 grid grid-cols-2 gap-4 text-center">
                    <div className="rounded-lg bg-muted/50 p-3">
                        <div className="text-2xl font-bold">
                            {team.members_count}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            Members
                        </div>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                        <div className="text-xs text-muted-foreground">
                            Created by
                        </div>
                        <div className="text-sm font-medium">
                            {team.creator.name}
                        </div>
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
                            {team.members.slice(0, 5).map((member) => (
                                <Avatar
                                    key={member.id}
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
                            {team.members_count > 5 && (
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-semibold">
                                    +{team.members_count - 5}
                                </div>
                            )}
                        </div>
                    )}

                    <CollapsibleContent className="mt-3 space-y-2">
                        {team.members.map((member) => (
                            <div
                                key={member.id}
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
                                        {member.email}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CollapsibleContent>
                </Collapsible>

                <div className="mt-4">
                    <AddMemberDialog
                        teamId={team.id}
                        availableUsers={availableUsers}
                    />
                </div>
            </CardContent>
        </Card>
    );
}

export default function Teams({ teams, allUsers }: TeamsProps) {
    const { auth } = usePage().props as any;
    const totalMembers = teams.reduce(
        (sum, team) => sum + team.members_count,
        0,
    );
    const totalTeams = teams.length;

    const canCreateTeam =
        auth?.user?.role?.name === 'product_owner' ||
        auth?.user?.role?.name === 'scrum_master' ||
        auth?.user?.role?.name === 'project_manager' ||
        auth?.user?.role?.name === 'admin';

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

                    {canCreateTeam && <CreateTeamDialog />}
                </div>

                {/* Stats Cards */}
                <div className="mb-6 grid gap-4 md:grid-cols-2">
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
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {teams.map((team) => (
                        <TeamCard
                            key={team.id}
                            team={team}
                            allUsers={allUsers}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
