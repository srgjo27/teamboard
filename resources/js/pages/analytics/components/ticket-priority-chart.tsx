import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PriorityCount } from '@/types/analytics';
import { AlertCircle, AlertTriangle, Info, Zap } from 'lucide-react';

interface TicketPriorityChartProps {
    data: PriorityCount[];
}

const PRIORITY_CONFIG = {
    'Low': {
        color: 'bg-green-500',
        icon: Info,
        gradient: 'from-green-400 to-green-600',
        badgeVariant: 'default' as const,
    },
    'Medium': {
        color: 'bg-blue-500',
        icon: AlertCircle,
        gradient: 'from-blue-400 to-blue-600',
        badgeVariant: 'default' as const,
    },
    'High': {
        color: 'bg-amber-500',
        icon: AlertTriangle,
        gradient: 'from-amber-400 to-amber-600',
        badgeVariant: 'secondary' as const,
    },
    'Critical': {
        color: 'bg-red-500',
        icon: Zap,
        gradient: 'from-red-400 to-red-600',
        badgeVariant: 'destructive' as const,
    },
};

export function TicketPriorityChart({ data }: TicketPriorityChartProps) {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    const maxCount = Math.max(...data.map(item => item.count));

    // Sort by priority order: Critical, High, Medium, Low
    const sortOrder = ['Critical', 'High', 'Medium', 'Low'];
    const sortedData = [...data].sort((a, b) => 
        sortOrder.indexOf(a.priority) - sortOrder.indexOf(b.priority)
    );

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Tickets by Priority</CardTitle>
                    <Badge variant="outline" className="text-sm">
                        {total} Total
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {sortedData.map((item, index) => {
                        const config = PRIORITY_CONFIG[item.priority as keyof typeof PRIORITY_CONFIG];
                        const Icon = config?.icon || Info;
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
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold">{item.priority}</h4>
                                                <Badge variant={config?.badgeVariant} className="text-xs">
                                                    {item.priority}
                                                </Badge>
                                            </div>
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
