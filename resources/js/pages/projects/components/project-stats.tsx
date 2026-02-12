import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Briefcase,
    FolderKanban,
    TrendingUp,
} from 'lucide-react';

interface ProjectStatsProps {
    totalProjects: number;
    inProgressProjects: number;
    completedProjects: number;
    totalMembers: number;
}

export function ProjectStats({
    totalProjects,
    inProgressProjects,
    totalMembers,
}: ProjectStatsProps) {
    return (
        <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Projects
                    </CardTitle>
                    <FolderKanban className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalProjects}</div>
                    <p className="text-xs text-muted-foreground">
                        Active projects
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        In Progress
                    </CardTitle>
                    <Briefcase className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {inProgressProjects}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Currently active
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Team Members
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalMembers}</div>
                    <p className="text-xs text-muted-foreground">
                        Across all projects
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
