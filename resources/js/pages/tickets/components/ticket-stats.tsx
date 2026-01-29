import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Circle, ListTodo, Target } from 'lucide-react';

interface TicketStatsProps {
    totalTickets: number;
    totalStoryPoints: number;
    inProgressTickets: number;
    doneTickets: number;
}

export function TicketStats({
    totalTickets,
    totalStoryPoints,
    inProgressTickets,
    doneTickets,
}: TicketStatsProps) {
    return (
        <div className="mb-6 grid gap-4 md:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Tickets
                    </CardTitle>
                    <ListTodo className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalTickets}</div>
                    <p className="text-xs text-muted-foreground">
                        Across all sprints
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Story Points
                    </CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalStoryPoints}</div>
                    <p className="text-xs text-muted-foreground">
                        Total estimated effort
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        In Progress
                    </CardTitle>
                    <Circle className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {inProgressTickets}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Currently being worked on
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Completed
                    </CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{doneTickets}</div>
                    <p className="text-xs text-muted-foreground">
                        Sprint velocity
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
