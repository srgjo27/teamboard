import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Project, Ticket, Timeline } from '@/types/ticket';
import {
    IconArrowRight,
    IconDotsVertical,
    IconEdit,
    IconFlag,
    IconTrash,
    IconUserPlus,
} from '@tabler/icons-react';
import { TICKET_PRIORITIES } from '../constants/ticket-priorities';
import { useTeamQaFilter } from '../hooks/use-team-qa-filter';
import { useTicketActions } from '../hooks/use-ticket-actions';
import { useTicketCardDialogs } from '../hooks/use-ticket-card-dialogs';
import { AssignQaDialog } from './assign-qa-dialog';
import { EditTicketDialog } from './edit-ticket-dialog';
import { MoveStatusDialog } from './move-status-dialog';
import { TicketDetailDialog } from './ticket-detail-dialog';

interface TicketCardProps {
    ticket: Ticket;
    projects: Project[];
    timelines: Timeline[];
}

export function TicketCard({ ticket, projects, timelines }: TicketCardProps) {
    const priorityConfig = TICKET_PRIORITIES[ticket.priority];

    const {
        showAssignQA,
        setShowAssignQA,
        showDetail,
        setShowDetail,
        showDeleteConfirm,
        setShowDeleteConfirm,
        showEditDialog,
        setShowEditDialog,
        showMoveStatus,
        setShowMoveStatus,
    } = useTicketCardDialogs();

    const teamQaTesters = useTeamQaFilter({
        projectId: ticket.project_id,
        projects,
    });

    const { handleDelete } = useTicketActions({
        ticket,
        onDeleteSuccess: () => setShowDeleteConfirm(false),
    });

    return (
        <>
            <Card
                className="group cursor-pointer transition-all hover:shadow-sm"
                onClick={() => setShowDetail(true)}
            >
                <CardHeader className="p-4">
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
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <IconDotsVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onSelect={(e) => {
                                        e.preventDefault();
                                        setShowEditDialog(true);
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <IconEdit className="mr-2 h-4 w-4" />
                                    Edit Ticket
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onSelect={(e) => {
                                        e.preventDefault();
                                        setShowAssignQA(true);
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <IconUserPlus className="mr-2 h-4 w-4" />
                                    Assign QA
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onSelect={(e) => {
                                        e.preventDefault();
                                        setShowMoveStatus(true);
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <IconArrowRight className="mr-2 h-4 w-4" />
                                    Move to...
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    variant="destructive"
                                    className="text-destructive"
                                    onSelect={(e) => {
                                        e.preventDefault();
                                        setShowDeleteConfirm(true);
                                    }}
                                    onClick={(e) => e.stopPropagation()}
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

                <CardContent className="p-4">
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
                                                <Avatar className="h-6 w-6">
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
            </Card>

            {/* Ticket Detail Dialog */}
            <TicketDetailDialog
                ticket={ticket}
                open={showDetail}
                onOpenChange={setShowDetail}
            />

            {/* Assign QA Dialog */}
            <AssignQaDialog
                ticket={ticket}
                open={showAssignQA}
                onOpenChange={setShowAssignQA}
                qaTesters={teamQaTesters}
            />

            {/* Edit Ticket Dialog */}
            <EditTicketDialog
                ticket={ticket}
                projects={projects}
                timelines={timelines}
                open={showEditDialog}
                onOpenChange={setShowEditDialog}
            />

            {/* Move Status Dialog */}
            <MoveStatusDialog
                ticket={ticket}
                open={showMoveStatus}
                onOpenChange={setShowMoveStatus}
            />

            {/* Delete Confirmation Dialog */}
            <AlertDialog
                open={showDeleteConfirm}
                onOpenChange={setShowDeleteConfirm}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete ticket{' '}
                            <strong>{ticket.ticket_number}</strong> (
                            {ticket.title}). This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
