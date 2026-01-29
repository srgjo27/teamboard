import { Ticket } from '@/types/ticket';
import { router } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export function useTicketFilter(tickets: Ticket[]) {
    const [, setSelectedProject] = useState('all');
    const [, setSearchQuery] = useState('');

    const stats = useMemo(() => {
        return {
            totalTickets: tickets.length,
            totalStoryPoints: tickets.reduce(
                (sum, t) => sum + (t.story_points || 0),
                0,
            ),
            inProgressTickets: tickets.filter((t) => t.status === 'inprogress')
                .length,
            doneTickets: tickets.filter((t) => t.status === 'done').length,
        };
    }, [tickets]);

    const handleProjectChange = (value: string) => {
        setSelectedProject(value);
        if (value === 'all') {
            router.get('/tickets', {}, { preserveState: true });
        } else {
            router.get(
                '/tickets',
                { project_id: value },
                { preserveState: true },
            );
        }
    };

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        if (value) {
            router.get(
                '/tickets',
                { search: value },
                { preserveState: true, preserveScroll: true },
            );
        }
    };

    return {
        stats,
        handleProjectChange,
        handleSearchChange,
    };
}
