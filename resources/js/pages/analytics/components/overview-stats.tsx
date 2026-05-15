import { OverviewStats } from '@/types/analytics';
import { CheckCircle2, Clock, FolderKanban, Ticket, Users } from 'lucide-react';
import { StatCard } from './stat-card';

interface OverviewStatsProps {
    stats: OverviewStats;
}

export function OverviewStatsCards({ stats }: OverviewStatsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <StatCard
                title="Total Tickets"
                value={stats.totalTickets}
                icon={Ticket}
                iconColor="text-blue-600 dark:text-blue-400"
                iconBgColor="bg-blue-100 dark:bg-blue-900/20"
            />
            <StatCard
                title="Active Projects"
                value={stats.activeProjects}
                icon={FolderKanban}
                iconColor="text-purple-600 dark:text-purple-400"
                iconBgColor="bg-purple-100 dark:bg-purple-900/20"
            />
            <StatCard
                title="Total Teams"
                value={stats.totalTeams}
                icon={Users}
                iconColor="text-green-600 dark:text-green-400"
                iconBgColor="bg-green-100 dark:bg-green-900/20"
            />
            <StatCard
                title="Total Users"
                value={stats.totalUsers}
                icon={Users}
                iconColor="text-orange-600 dark:text-orange-400"
                iconBgColor="bg-orange-100 dark:bg-orange-900/20"
            />
            <StatCard
                title="Completed This Month"
                value={stats.completedThisMonth}
                icon={CheckCircle2}
                iconColor="text-emerald-600 dark:text-emerald-400"
                iconBgColor="bg-emerald-100 dark:bg-emerald-900/20"
            />
            <StatCard
                title="Avg Completion Time"
                value={`${stats.avgCompletionTime} days`}
                icon={Clock}
                iconColor="text-amber-600 dark:text-amber-400"
                iconBgColor="bg-amber-100 dark:bg-amber-900/20"
            />
        </div>
    );
}
