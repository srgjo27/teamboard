import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PriorityCount } from '@/types/analytics';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface TicketPriorityChartProps {
    data: PriorityCount[];
}

const COLORS = {
    'Low': '#10b981',
    'Medium': '#3b82f6',
    'High': '#f59e0b',
    'Critical': '#ef4444',
};

export function TicketPriorityChart({ data }: TicketPriorityChartProps) {
    const chartData = data.map(item => ({
        priority: item.priority,
        count: item.count,
        fill: COLORS[item.priority as keyof typeof COLORS] || '#64748b',
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tickets by Priority</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="priority" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
