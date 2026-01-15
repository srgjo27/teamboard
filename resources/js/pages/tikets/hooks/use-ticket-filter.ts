import { useMemo, useState } from 'react';
import { Ticket } from '../constants/mock-tickets';

export function useTicketFilter(tickets: Ticket[]) {
    const [selectedProject, setSelectedProject] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter tickets based on project and search
    const filteredTickets = useMemo(() => {
        return tickets.filter((ticket) => {
            const matchProject =
                selectedProject === 'all' ||
                ticket.projectId === selectedProject;
            const matchSearch =
                searchQuery === '' ||
                ticket.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
            return matchProject && matchSearch;
        });
    }, [tickets, selectedProject, searchQuery]);

    // Calculate statistics
    const stats = useMemo(() => {
        return {
            totalTickets: filteredTickets.length,
            totalStoryPoints: filteredTickets.reduce(
                (sum, t) => sum + t.storyPoints,
                0,
            ),
            inProgressTickets: filteredTickets.filter(
                (t) => t.status === 'inprogress',
            ).length,
            doneTickets: filteredTickets.filter((t) => t.status === 'done')
                .length,
        };
    }, [filteredTickets]);

    return {
        filteredTickets,
        selectedProject,
        setSelectedProject,
        searchQuery,
        setSearchQuery,
        stats,
    };
}
