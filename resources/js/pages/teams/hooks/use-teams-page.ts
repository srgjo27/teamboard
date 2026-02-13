import { Team } from '@/types/team';
import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';

const ALLOWED_ROLES = [
    'product_manager',
    'product_owner',
    'scrum_master',
    'admin',
];

export function useTeamsPage(teams: Team[]) {
    const { auth } = usePage().props as any;

    const stats = useMemo(
        () => ({
            totalMembers: teams.reduce(
                (sum, team) => sum + team.members_count,
                0,
            ),
            totalTeams: teams.length,
        }),
        [teams],
    );

    const canActions = useMemo(() => {
        const userRole = auth?.user?.role?.name;
        return userRole ? ALLOWED_ROLES.includes(userRole) : false;
    }, [auth?.user?.role?.name]);

    return {
        stats,
        canActions,
    };
}
