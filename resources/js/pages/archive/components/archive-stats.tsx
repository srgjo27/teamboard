import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Ban,
    CheckCircle2,
    FolderArchive,
} from 'lucide-react';

interface ArchiveStatsProps {
    totalProjects: number;
    completedProjects: number;
    cancelledProjects: number;
}

export function ArchiveStats({
    totalProjects,
    completedProjects,
    cancelledProjects,
}: ArchiveStatsProps) {
    return (
        <div className="mb-6 grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Archived
                    </CardTitle>
                    <FolderArchive className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalProjects}</div>
                    <p className="text-xs text-muted-foreground">
                        All past projects
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Completed
                    </CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {completedProjects}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Successfully finished
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Cancelled
                    </CardTitle>
                    <Ban className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {cancelledProjects}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Terminated early
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
