import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TeamWorkload } from '@/types/analytics';
import { Ticket, Users } from 'lucide-react';

interface TeamWorkloadChartProps {
    data: TeamWorkload[];
}

export function TeamWorkloadChart({ data }: TeamWorkloadChartProps) {
    const enrichedData = data
        .map((item) => ({
            ...item,
            ticketsPerMember:
                item.members > 0 ? (item.tickets / item.members).toFixed(1) : 0,
        }))
        .sort(
            (a, b) => Number(b.ticketsPerMember) - Number(a.ticketsPerMember),
        );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Team Workload Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {enrichedData.length > 0 ? (
                        enrichedData.map((team, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between rounded-lg border p-4 transition-all hover:shadow-md"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-semibold">
                                            {team.team}
                                        </h4>
                                    </div>
                                    <div className="mt-2 flex gap-4">
                                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                            <Ticket className="h-4 w-4" />
                                            <span>{team.tickets} tickets</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                            <Users className="h-4 w-4" />
                                            <span>{team.members} members</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold">
                                        {team.ticketsPerMember}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        tickets/member
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-8 text-center text-muted-foreground">
                            No team workload data available
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
