import { Badge } from '@/components/ui/badge';
import { Ticket } from '../constants/mock-tickets';
import { TICKET_STATUSES } from '../constants/ticket-statuses';
import { TicketCard } from './ticket-card';

interface KanbanColumnProps {
    status: (typeof TICKET_STATUSES)[number];
    tickets: Ticket[];
}

export function KanbanColumn({ status, tickets }: KanbanColumnProps) {
    const StatusIcon = status.icon;
    const columnTickets = tickets.filter((t) => t.status === status.id);
    const totalStoryPoints = columnTickets.reduce(
        (sum, t) => sum + t.storyPoints,
        0,
    );

    return (
        <div className="flex min-w-[280px] flex-col rounded-lg border bg-muted/30">
            {/* Column Header */}
            <div className="flex items-center justify-between border-b bg-background p-3">
                <div className="flex items-center gap-2">
                    <div className={`rounded p-1 ${status.color}`}>
                        <StatusIcon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">
                                {status.label}
                            </span>
                        </div>
                        <span className="text-[10px] text-muted-foreground">
                            {totalStoryPoints} SP
                        </span>
                    </div>
                </div>

                <Badge variant="secondary" className="h-5 text-xs">
                    {columnTickets.length}
                </Badge>
            </div>

            {/* Tickets */}
            <div className="flex-1 space-y-2 overflow-y-auto p-2">
                {columnTickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))}

                {columnTickets.length === 0 && (
                    <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed">
                        <p className="text-xs text-muted-foreground">
                            No tickets
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
