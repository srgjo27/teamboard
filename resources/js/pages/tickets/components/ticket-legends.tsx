import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconFlag } from '@tabler/icons-react';
import { TICKET_PRIORITIES } from '../constants/ticket-priorities';

export function TicketLegends() {
    return (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
            {/* Priority Levels */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Priority Levels</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4">
                        {Object.entries(TICKET_PRIORITIES).map(
                            ([key, priority]) => (
                                <div
                                    key={key}
                                    className="flex items-center gap-2"
                                >
                                    <IconFlag
                                        className={`h-4 w-4 ${priority.color}`}
                                    />
                                    <span className="text-sm font-medium">
                                        {priority.label}
                                    </span>
                                </div>
                            ),
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Story Points Guide */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">
                        Story Points Estimation
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="secondary"
                                    className="h-6 w-6 rounded-full p-0 text-xs"
                                >
                                    1
                                </Badge>
                                <span className="text-sm">Very Small</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                                &lt; 2 hours
                            </span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="secondary"
                                    className="h-6 w-6 rounded-full p-0 text-xs"
                                >
                                    2
                                </Badge>
                                <span className="text-sm">Small</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                                2-4 hours
                            </span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="secondary"
                                    className="h-6 w-6 rounded-full p-0 text-xs"
                                >
                                    3
                                </Badge>
                                <span className="text-sm">Medium</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                                4-8 hours
                            </span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="secondary"
                                    className="h-6 w-6 rounded-full p-0 text-xs"
                                >
                                    5
                                </Badge>
                                <span className="text-sm">Large</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                                1-2 days
                            </span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="secondary"
                                    className="h-6 w-6 rounded-full p-0 text-xs"
                                >
                                    8
                                </Badge>
                                <span className="text-sm">Very Large</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                                2-3 days
                            </span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="secondary"
                                    className="h-6 w-6 rounded-full p-0 text-xs"
                                >
                                    13
                                </Badge>
                                <span className="text-sm">Extra Large</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                                3-5 days
                            </span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2">
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="secondary"
                                    className="h-6 w-6 rounded-full p-0 text-xs"
                                >
                                    21
                                </Badge>
                                <span className="text-sm">Epic</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                                1+ week
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
