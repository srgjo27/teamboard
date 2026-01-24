import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { TimelinePageProps } from '@/types/timeline';
import { Head, usePage } from '@inertiajs/react';
import {
    IconCalendar,
    IconChevronLeft,
    IconChevronRight,
} from '@tabler/icons-react';
import { CreateTimelineDialog } from './components/create-timeline-dialog';
import { TimelineLegend } from './components/timeline-legend';
import { TimelineRow } from './components/timeline-row';
import { TimelineStats } from './components/timeline-stats';
import {
    useGroupedTimelines,
    useTimelineStats,
} from './hooks/use-timeline-data';
import { useTimelineNavigation } from './hooks/use-timeline-navigation';
import { useTimelineView } from './hooks/use-timeline-view';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Timelines',
        href: '#',
    },
];

const TOTAL_WEEKS = 12;

export default function TimelinePage({
    timelines,
    projects,
}: TimelinePageProps) {
    const { auth } = usePage().props as any;

    const { viewStart, navigatePrevious, navigateNext, navigateToToday } =
        useTimelineNavigation({
            totalWeeks: TOTAL_WEEKS,
            initialDate: new Date(2026, 0, 1),
        });

    const { viewEnd, weekLabels, ...timelineInfo } = useTimelineView({
        viewStart,
        totalWeeks: TOTAL_WEEKS,
    });

    const stats = useTimelineStats(timelines);
    const groupedTimelines = useGroupedTimelines(timelines);

    const canActions =
        auth?.user?.role?.name === 'scrum_master' ||
        auth?.user?.role?.name === 'product_owner' ||
        auth?.user?.role?.name === 'product_manager' ||
        auth?.user?.role?.name === 'admin';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Timelines" />
            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Project Timelines
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Manage and visualize project schedules and SDLC
                            phases
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        {canActions && (
                            <CreateTimelineDialog
                                projects={projects}
                                timelines={timelines}
                            />
                        )}
                    </div>
                </div>

                <TimelineStats stats={stats} />

                <Card className="mb-6">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Timeline View</CardTitle>
                                <CardDescription>
                                    {timelineInfo.months}-month project timeline
                                    overview ({timelineInfo.weeks} weeks)
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={navigatePrevious}
                                >
                                    <IconChevronLeft className="h-4 w-4" />
                                </Button>
                                <div
                                    className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 transition-colors hover:bg-accent"
                                    onClick={navigateToToday}
                                    title="Jump to current week"
                                >
                                    <IconCalendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">
                                        {timelineInfo.dateRange}
                                    </span>
                                </div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={navigateNext}
                                >
                                    <IconChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="mb-4 flex border-b">
                            {weekLabels.map((label, i) => (
                                <div
                                    key={i}
                                    className="flex-1 border-r border-dashed py-2 text-center text-xs font-medium text-muted-foreground last:border-r-0"
                                    title={`Week ${i + 1}: ${label}`}
                                >
                                    {label}
                                </div>
                            ))}
                        </div>
                        <div className="space-y-0 overflow-hidden rounded-lg border">
                            {groupedTimelines.length > 0 ? (
                                groupedTimelines.map((projectData) => (
                                    <TimelineRow
                                        key={projectData.project.id}
                                        projectData={projectData}
                                        projects={projects}
                                        allTimelines={timelines}
                                        viewStart={viewStart}
                                        viewEnd={viewEnd}
                                        canActions={canActions}
                                    />
                                ))
                            ) : (
                                <div className="p-8 text-center text-muted-foreground">
                                    No timelines found. Create your first
                                    project timeline to get started.
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <TimelineLegend timelines={timelines} />
            </div>
        </AppLayout>
    );
}
