import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { UserActivity } from '@/types/analytics';
import { Award, Medal, Trophy } from 'lucide-react';

interface UserActivityTableProps {
    data: UserActivity[];
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

export function UserActivityTable({ data }: UserActivityTableProps) {
    const topUsers = data.slice(0, 10);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Top User Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">Rank</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">
                                Assigned
                            </TableHead>
                            <TableHead className="text-right">
                                In Progress
                            </TableHead>
                            <TableHead className="text-right">
                                Completed
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topUsers.length > 0 ? (
                            topUsers.map((user, index) => {
                                const rankBadge = getRankBadge(index);
                                const RankIcon = rankBadge?.icon;

                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {rankBadge && RankIcon ? (
                                                <div className="flex items-center justify-center">
                                                    <div
                                                        className={`flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br ${rankBadge.gradient}`}
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
                                            <div className="flex items-center gap-2">
                                                {user.user}
                                                {rankBadge && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="text-xs"
                                                    >
                                                        {rankBadge.label}
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {user.assigned}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {user.inProgress}
                                        </TableCell>
                                        <TableCell className="text-right font-semibold text-green-600">
                                            {user.completed}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="text-center text-muted-foreground"
                                >
                                    No user activity data available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
