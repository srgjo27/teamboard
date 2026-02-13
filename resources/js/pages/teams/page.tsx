import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Team } from '@/types/team';
import { User } from '@/types/user';
import { Head } from '@inertiajs/react';
import { UserCheck, Users } from 'lucide-react';
import CreateTeamDialog from './components/create-team-dialog';
import { TeamCard } from './components/team-card';
import { useTeamsPage } from './hooks/use-teams-page';

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

export default function TeamsPage({ teams, allUsers }: TeamsProps) {
    const { stats, canActions } = useTeamsPage(teams);

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

                    {canActions && <CreateTeamDialog />}
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
                                {stats.totalTeams}
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
                                {stats.totalMembers}
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
                            canActions={canActions}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
