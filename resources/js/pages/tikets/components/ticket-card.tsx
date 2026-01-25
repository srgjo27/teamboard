import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Ticket } from '@/types/ticket';
import { User } from '@/types/user';
import { usePage } from '@inertiajs/react';
import {
    IconArrowRight,
    IconDotsVertical,
    IconEdit,
    IconFlag,
    IconTrash,
    IconUserPlus,
} from '@tabler/icons-react';
import { useState } from 'react';
import { TICKET_PRIORITIES } from '../constants/ticket-priorities';

interface TicketCardProps {
    ticket: Ticket;
}

export function TicketCard({ ticket }: TicketCardProps) {
    const priorityConfig = TICKET_PRIORITIES[ticket.priority];
    const [showAssignQA, setShowAssignQA] = useState(false);

    const { allUsers } = usePage<{ allUsers?: User[] }>().props;

    const allQa =
        allUsers?.filter((user) => user.role?.name === 'quality_assurance') ||
        [];

    return (
        <Card className="group cursor-pointer transition-all hover:shadow-sm">
            <CardHeader className="p-4 pb-3">
                <div className="mb-2 flex items-start justify-between">
                    <Badge variant="outline" className="font-mono text-xs">
                        {ticket.ticket_number}
                    </Badge>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <IconDotsVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <IconEdit className="mr-2 h-4 w-4" />
                                Edit Ticket
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => setShowAssignQA(true)}
                            >
                                <IconUserPlus className="mr-2 h-4 w-4" />
                                Assign QA
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <IconArrowRight className="mr-2 h-4 w-4" />
                                Move to...
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                variant="destructive"
                                className="text-destructive"
                            >
                                <IconTrash className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <CardTitle className="text-sm leading-tight font-semibold">
                    {ticket.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-xs">
                    {ticket.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                    {/* Priority */}
                    <div className="flex items-center gap-2">
                        <IconFlag
                            className={`h-3 w-3 ${priorityConfig.color}`}
                        />
                        <span className={`text-xs ${priorityConfig.color}`}>
                            {priorityConfig.label}
                        </span>
                    </div>

                    <Separator />

                    {/* Assignee & Story Points */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {ticket.assigned_user ? (
                                <div className="flex items-center gap-1.5">
                                    <Avatar className="h-6 w-6">
                                        <AvatarFallback className="text-[10px]">
                                            {ticket.assigned_user.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs text-muted-foreground">
                                        {
                                            ticket.assigned_user.name.split(
                                                ' ',
                                            )[0]
                                        }
                                    </span>
                                </div>
                            ) : (
                                <span className="text-xs text-muted-foreground">
                                    Unassigned
                                </span>
                            )}

                            {/* QA Assignee for qa-ready and qa-test status */}
                            {(ticket.status === 'qa-ready' ||
                                ticket.status === 'qa-test') &&
                                ticket.qa_assigned_user && (
                                    <>
                                        <span className="text-xs text-muted-foreground">
                                            •
                                        </span>
                                        <div className="flex items-center gap-1.5">
                                            <Avatar className="h-6 w-6 border-2 border-orange-500">
                                                <AvatarFallback className="bg-orange-100 text-[10px] text-orange-700">
                                                    {ticket.qa_assigned_user.name
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-xs font-medium text-orange-600">
                                                QA:{' '}
                                                {
                                                    ticket.qa_assigned_user.name.split(
                                                        ' ',
                                                    )[0]
                                                }
                                            </span>
                                        </div>
                                    </>
                                )}
                        </div>

                        <Badge
                            variant="secondary"
                            className="h-5 w-5 rounded-full p-0 text-[10px]"
                        >
                            {ticket.story_points}
                        </Badge>
                    </div>
                </div>
            </CardContent>

            {/* Assign QA Dialog */}
            <Dialog open={showAssignQA} onOpenChange={setShowAssignQA}>
                <DialogContent className="max-h-[85vh] max-w-lg p-6">
                    <DialogHeader>
                        <DialogTitle>Assign QA Tester</DialogTitle>
                        <DialogDescription>
                            Assign a QA tester to ticket {ticket.ticket_number}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="qa-assignee">QA Tester</Label>
                            <Select
                                defaultValue={
                                    ticket.qa_assigned_user?.name || ''
                                }
                            >
                                <SelectTrigger id="qa-assignee">
                                    <SelectValue placeholder="Select QA tester" />
                                </SelectTrigger>
                                {/* <SelectContent>
                                    <SelectItem value="Bob Smith">
                                        Bob Smith (QA)
                                    </SelectItem>
                                    <SelectItem value="Charlie Brown">
                                        Charlie Brown (QA)
                                    </SelectItem>
                                    <SelectItem value="Noah Black">
                                        Noah Black (QA)
                                    </SelectItem>
                                </SelectContent> */}
                                <SelectContent>
                                    {allQa.length > 0 ? (
                                        allQa.map((qa) => (
                                            <SelectItem
                                                key={qa.id}
                                                value={qa.id.toString()}
                                            >
                                                {qa.name}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <div className="p-2 text-sm text-muted-foreground">
                                            No QA testers available.
                                        </div>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="rounded-lg border border-orange-200 bg-orange-50 p-3">
                            <p className="text-xs text-orange-800">
                                <strong>Note:</strong> QA assignee will be
                                displayed when ticket status is &quot;QA
                                Ready&quot; or &quot;QA Test&quot;.
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setShowAssignQA(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={() => setShowAssignQA(false)}>
                            Assign QA
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </Card>
    );
}
