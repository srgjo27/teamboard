import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TeamCompletionRate } from '@/types/analytics';
import { Award, Medal, Trophy } from 'lucide-react';

interface TeamPerformanceTableProps {
    data: TeamCompletionRate[];
}

const getRankBadge = (index: number) => {
    if (index === 0) {
        return {
            icon: Trophy,
            gradient: 'from-yellow-400 to-yellow-600',
            label: '1st',
        };
    }
    if (index === 1) {
        return {
            icon: Medal,
            gradient: 'from-slate-400 to-slate-600',
            label: '2nd',
        };
    }
    if (index === 2) {
        return {
            icon: Award,
            gradient: 'from-amber-600 to-amber-800',
            label: '3rd',
        };
    }
    return null;
};

export function TeamPerformanceTable({ data }: TeamPerformanceTableProps) {
    // Sort teams by completion rate (highest first)
    const sortedData = [...data].sort((a, b) => b.rate - a.rate);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Team Completion Rates</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">Rank</TableHead>
                                <TableHead className="min-w-[120px]">Team</TableHead>
                                <TableHead className="w-[140px]">Progress</TableHead>
                                <TableHead className="w-16 text-right">Done</TableHead>
                                <TableHead className="w-16 text-right">Total</TableHead>
                                <TableHead className="w-20 text-right">Rate</TableHead>
                            </TableRow>
                        </TableHeader>
                    <TableBody>
                        {sortedData.length > 0 ? (
                            sortedData.map((team, index) => {
                                const rankBadge = getRankBadge(index);
                                const RankIcon = rankBadge?.icon;

                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {rankBadge && RankIcon ? (
                                                <div className="flex items-center justify-center">
                                                    <div
                                                        className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${rankBadge.gradient}`}
                                                    >
                                                        <RankIcon className="h-4 w-4 text-white" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                                                        {index + 1}
                                                    </div>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-1.5">
                                                <span className="truncate">{team.team}</span>
                                                {rankBadge && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="shrink-0 text-xs"
                                                    >
                                                        {rankBadge.label}
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Progress value={team.rate} className="w-20" />
                                        </TableCell>
                                        <TableCell className="text-right">{team.completed}</TableCell>
                                        <TableCell className="text-right">{team.total}</TableCell>
                                        <TableCell className="text-right">
                                            <Badge
                                                variant={team.rate >= 80 ? 'default' : team.rate >= 50 ? 'secondary' : 'outline'}
                                                className="font-semibold"
                                            >
                                                {team.rate}%
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-muted-foreground">
                                    No team data available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
