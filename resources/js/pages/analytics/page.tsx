import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { AnalyticsPageProps } from '@/types/analytics';
import { Head } from '@inertiajs/react';
import { AIInsights } from './components/ai-insights';
import { OverviewStatsCards } from './components/overview-stats';
import { TeamPerformanceTable } from './components/team-performance-table';
import { TeamWorkloadChart } from './components/team-workload-chart';
import { TicketPriorityChart } from './components/ticket-priority-chart';
import { TicketStatusChart } from './components/ticket-status-chart';
import { UserActivityTable } from './components/user-activity-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Analytics',
        href: '#',
    },
];

export default function AnalyticsPage({ analytics }: AnalyticsPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Analytics Dashboard
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Comprehensive insights into your team's performance and
                        productivity
                    </p>
                </div>

                {/* Overview Stats */}
                <OverviewStatsCards stats={analytics.overview} />

                {/* AI Insights */}
                <AIInsights />

                {/* Ticket Analytics Section */}
                <div>
                    <h2 className="mb-4 text-lg font-semibold">
                        Ticket Analytics
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        <TicketStatusChart data={analytics.tickets.byStatus} />
                        <TicketPriorityChart
                            data={analytics.tickets.byPriority}
                        />
                    </div>
                </div>

                {/* Team Performance Section */}
                <div>
                    <h2 className="mb-4 text-lg font-semibold">
                        Team Performance
                    </h2>
                    <div className="grid gap-4 lg:grid-cols-2">
                        <TeamWorkloadChart data={analytics.teams.workload} />
                        <TeamPerformanceTable
                            data={analytics.teams.completionRate}
                        />
                    </div>
                </div>

                {/* User Activity Section */}
                <div>
                    <h2 className="mb-4 text-lg font-semibold">
                        User Activity
                    </h2>
                    <UserActivityTable data={analytics.users.userActivity} />
                </div>
            </div>
        </AppLayout>
    );
}
