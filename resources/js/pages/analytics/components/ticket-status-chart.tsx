import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { StatusCount } from '@/types/analytics';
import { CheckCircle2, Circle, Clock, Eye } from 'lucide-react';

interface TicketStatusChartProps {
    data: StatusCount[];
}

const STATUS_CONFIG = {
    'Todo': {
        color: 'bg-slate-500',
        icon: Circle,
        gradient: 'from-slate-400 to-slate-600',
    },
    'In Progress': {
        color: 'bg-blue-500',
        icon: Clock,
        gradient: 'from-blue-400 to-blue-600',
    },
    'In Review': {
        color: 'bg-amber-500',
        icon: Eye,
        gradient: 'from-amber-400 to-amber-600',
    },
    'Done': {
        color: 'bg-green-500',
        icon: CheckCircle2,
        gradient: 'from-green-400 to-green-600',
    },
};

export function TicketStatusChart({ data }: TicketStatusChartProps) {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    const maxCount = Math.max(...data.map(item => item.count));

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Tickets by Status</CardTitle>
                    <Badge variant="outline" className="text-sm">
                        {total} Total
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {data.map((item, index) => {
                        const config = STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG];
                        const Icon = config?.icon || Circle;
                        const percentage = total > 0 ? (item.count / total) * 100 : 0;
                        const relativeWidth = maxCount > 0 ? (item.count / maxCount) * 100 : 0;

                        return (
                            <div
                                key={index}
                                className="group rounded-lg border p-4 transition-all hover:shadow-md"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${config?.gradient || 'from-gray-400 to-gray-600'}`}
                                        >
                                            <Icon className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">{item.status}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {percentage.toFixed(1)}% of total
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold">{item.count}</div>
                                        <div className="text-xs text-muted-foreground">tickets</div>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <Progress value={relativeWidth} className="h-2" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
