import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock } from 'lucide-react';

interface TimelineStatsProps {
    stats: {
        activeProjects: number;
        completedTimelines: number;
        inDevelopment: number;
        planningSprints: number;
    };
}

export function TimelineStats({ stats }: TimelineStatsProps) {
    return (
        <div className="mb-6 grid gap-4 md:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Active Projects
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {stats.activeProjects}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Currently running
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Completed Timelines
                    </CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {stats.completedTimelines}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Successfully finished
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        In Development
                    </CardTitle>
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {stats.inDevelopment}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Development phase
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Pending Sprints
                    </CardTitle>
                    <div className="h-3 w-3 rounded-full bg-slate-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {stats.planningSprints}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Not yet started
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
