import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusCount } from '@/types/analytics';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface TicketStatusChartProps {
    data: StatusCount[];
}

const COLORS = {
    'Todo': '#94a3b8',
    'In Progress': '#3b82f6',
    'In Review': '#f59e0b',
    'Done': '#10b981',
};

export function TicketStatusChart({ data }: TicketStatusChartProps) {
    const chartData = data.map(item => ({
        name: item.status,
        value: item.count,
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tickets by Status</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) =>
                                `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`
                            }
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#64748b'} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
