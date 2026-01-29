import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { TicketPageProps } from '@/types/ticket';
import { Head } from '@inertiajs/react';
import { IconSearch } from '@tabler/icons-react';
import { CreateTicketDialog } from './components/create-ticket-dialog';
import { KanbanColumn } from './components/kanban-column';
import { TicketLegends } from './components/ticket-legends';
import { TicketStats } from './components/ticket-stats';
import { TICKET_STATUSES } from './constants/ticket-statuses';
import { useTicketFilter } from './hooks/use-ticket-filter';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tickets',
        href: '#',
    },
];

export default function TicketsPage({
    tickets,
    projects,
    timelines,
}: TicketPageProps) {
    const { stats, handleProjectChange, handleSearchChange } =
        useTicketFilter(tickets);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tickets" />

            <div className="p-6">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Ticket Board
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Agile sprint board for all projects
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {/* Project Filter */}
                        <Select onValueChange={handleProjectChange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select project" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Projects
                                </SelectItem>
                                {projects.map((project) => (
                                    <SelectItem
                                        key={project.id}
                                        value={project.id.toString()}
                                    >
                                        {project.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Search */}
                        <div className="relative">
                            <IconSearch className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search tickets..."
                                className="w-[200px] pl-8"
                                onChange={(e) =>
                                    handleSearchChange(e.target.value)
                                }
                            />
                        </div>

                        <CreateTicketDialog
                            projects={projects}
                            timelines={timelines}
                        />
                    </div>
                </div>

                {/* Stats Cards */}
                <TicketStats
                    totalTickets={stats.totalTickets}
                    totalStoryPoints={stats.totalStoryPoints}
                    inProgressTickets={stats.inProgressTickets}
                    doneTickets={stats.doneTickets}
                />

                {/* Kanban Board */}
                <div className="overflow-x-auto pb-4">
                    <div className="flex gap-4">
                        {TICKET_STATUSES.map((status) => (
                            <KanbanColumn
                                key={status.id}
                                status={status}
                                tickets={tickets}
                                projects={projects}
                                timelines={timelines}
                            />
                        ))}
                    </div>
                </div>

                {/* Legends */}
                <TicketLegends />
            </div>
        </AppLayout>
    );
}
