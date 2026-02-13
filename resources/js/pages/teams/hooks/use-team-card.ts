import { Team } from '@/types/team';
import { User } from '@/types/user';
import { useMemo, useState } from 'react';

export function useTeamCard(team: Team, allUsers: User[]) {
    const [isOpen, setIsOpen] = useState(false);

    const availableUsers = useMemo(
        () =>
            allUsers.filter(
                (user) => !team.members.some((member) => member.id === user.id),
            ),
        [allUsers, team.members],
    );

    return {
        isOpen,
        setIsOpen,
        availableUsers,
    };
}
