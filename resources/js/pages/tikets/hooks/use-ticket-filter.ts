import { Ticket } from '@/types/ticket';
import { useMemo } from 'react';

export function useTicketFilter(
    tickets: Ticket[],
    selectedProject: string,
    searchQuery: string,
) {
    // Filter tickets based on project and search
    const filteredTickets = useMemo(() => {
        return tickets.filter((ticket) => {
            const matchProject =
                selectedProject === 'all' ||
                ticket.project_id.toString() === selectedProject;
            const matchSearch =
                searchQuery === '' ||
                ticket.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                ticket.ticket_number
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                (ticket.description &&
                    ticket.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()));
            return matchProject && matchSearch;
        });
    }, [tickets, selectedProject, searchQuery]);

    // Calculate statistics
    const stats = useMemo(() => {
        return {
            totalTickets: filteredTickets.length,
            totalStoryPoints: filteredTickets.reduce(
                (sum, t) => sum + (t.story_points || 0),
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
        stats,
    };
}
