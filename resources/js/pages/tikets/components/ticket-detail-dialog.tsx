import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Ticket } from '@/types/ticket';
import {
    IconCalendar,
    IconClock,
    IconFileText,
    IconFlag,
    IconPaperclip,
    IconTag,
    IconUser,
} from '@tabler/icons-react';
import { TICKET_PRIORITIES } from '../constants/ticket-priorities';
import { TICKET_STATUSES } from '../constants/ticket-statuses';
import { TICKET_TYPES } from '../constants/ticket-types';

interface TicketDetailDialogProps {
    ticket: Ticket;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function TicketDetailDialog({
    ticket,
    open,
    onOpenChange,
}: TicketDetailDialogProps) {
    const priorityConfig = TICKET_PRIORITIES[ticket.priority];
    const statusConfig = TICKET_STATUSES.find((status) => status.id === ticket.status);
    const typeConfig = TICKET_TYPES[ticket.type]

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[85vh] max-w-6xl overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <DialogTitle className="text-xl">
                                <Badge
                                    variant="outline"
                                    className="font-mono text-sm mr-2"
                                >
                                    {ticket.ticket_number}
                                </Badge>
                                {ticket.title}
                            </DialogTitle>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-4 no-scrollbar -mx-4 max-h-[70vh] overflow-y-auto px-4">
                    <div className="flex flex-wrap gap-2">
                        <Badge
                            variant="secondary"
                            className={typeConfig.className}
                        >
                            <typeConfig.icon className="mr-1 h-3 w-3" />
                            {typeConfig.label}
                        </Badge>
                        <Badge
                            variant="secondary"
                            className={priorityConfig.badgeClassName}
                        >
                            <IconFlag className="mr-1 h-3 w-3" />
                            {priorityConfig.label}
                        </Badge>
                        <Badge
                            variant="secondary"
                            className={statusConfig?.color + ' text-white'}
                        >
                            {statusConfig?.label}
                        </Badge>
                        {ticket.story_points && (
                            <Badge variant="outline">
                                {ticket.story_points} SP
                            </Badge>
                        )}
                    </div>

                    <Separator />

                    <div className="grid gap-6 lg:grid-cols-12">
                        <div className="space-y-4 lg:col-span-8">
                            {ticket.description && (
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-sm font-semibold">
                                        <IconFileText className="h-4 w-4" />
                                        Description
                                    </Label>
                                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                        {ticket.description}
                                    </p>
                                </div>
                            )}

                            {ticket.attachments && ticket.attachments.length > 0 && (
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-sm font-semibold">
                                        <IconPaperclip className="h-4 w-4" />
                                        Attachments
                                    </Label>
                                    <div className="grid gap-2 sm:grid-cols-2">
                                        {ticket.attachments.map(
                                            (attachment, index) => {
                                                const isImage = attachment.mime_type.startsWith('image/');

                                                return (
                                                    <a
                                                        key={index}
                                                        href={`/storage/${attachment.path}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group relative overflow-hidden rounded-lg border border-border bg-muted/50 transition-all"
                                                    >
                                                        {isImage ? (
                                                            <div className="space-y-2">
                                                                <div className="aspect-video w-full overflow-hidden bg-muted">
                                                                    <img
                                                                        src={`/storage/${attachment.path}`}
                                                                        alt={attachment.name}
                                                                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                                                    />
                                                                </div>
                                                                <div className="px-3 pb-3">
                                                                    <p className="truncate text-sm font-medium">
                                                                        {attachment.name}
                                                                    </p>
                                                                    <p className="text-xs text-muted-foreground">
                                                                        {(attachment.size / 1024).toFixed(1)} KB
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-3 p-3">
                                                                <IconPaperclip className="h-8 w-8 text-muted-foreground" />
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="truncate font-medium">
                                                                        {attachment.name}
                                                                    </p>
                                                                    <p className="text-xs text-muted-foreground">
                                                                        {(attachment.size / 1024).toFixed(1)} KB
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </a>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-4">
                            {/* People Section */}
                            <div className="mb-4">
                                <Label className="text-sm font-semibold">
                                    People
                                </Label>
                                <div className="mt-2">
                                    {/* Reporter */}
                                    <div className="mb-2">
                                        <Label className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <IconUser className="h-3 w-3" />
                                            Reporter
                                        </Label>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Avatar className="h-7 w-7">
                                                <AvatarFallback className="text-xs">
                                                    {ticket.reporter.name
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm">
                                                {ticket.reporter.name}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Assignee */}
                                    <div className="mb-2">
                                        <Label className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <IconUser className="h-3 w-3" />
                                            Assignee
                                        </Label>
                                        {ticket.assigned_user ? (
                                            <div className="flex items-center gap-2 mt-2">
                                                <Avatar className="h-7 w-7">
                                                    <AvatarFallback className="text-xs">
                                                        {ticket.assigned_user.name
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm">
                                                    {ticket.assigned_user.name}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-muted-foreground">
                                                Unassigned
                                            </span>
                                        )}
                                    </div>

                                    {/* QA Assignee */}
                                    {ticket.qa_assigned_user && (
                                        <div className="mb-2">
                                            <Label className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <IconUser className="h-3 w-3" />
                                                QA Tester
                                            </Label>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Avatar className="h-7 w-7">
                                                    <AvatarFallback className="bg-orange-100 text-xs text-orange-700">
                                                        {ticket.qa_assigned_user.name
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm">
                                                    {ticket.qa_assigned_user.name}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Timeline & Dates */}
                            {(ticket.timeline || ticket.due_date) && (
                                <div className="mb-4">
                                    <Label className="text-sm font-semibold">
                                        Timeline & Dates
                                    </Label>
                                    <div className="mt-2">
                                        {ticket.timeline && (
                                            <div className="mb-2">
                                                <Label className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <IconCalendar className="h-3 w-3" />
                                                    Timeline
                                                </Label>
                                                <p className="text-sm">
                                                    {ticket.timeline.title}
                                                </p>
                                            </div>
                                        )}

                                        {ticket.due_date && (
                                            <div className="mb-2">
                                                <Label className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <IconCalendar className="h-3 w-3" />
                                                    Due Date
                                                </Label>
                                                <p className="text-sm">
                                                    {new Date(
                                                        ticket.due_date,
                                                    ).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    })}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Tags */}
                            {ticket.tags && ticket.tags.length > 0 && (
                                <div className="mb-4">
                                    <Label className="flex items-center gap-2 text-sm font-semibold">
                                        <IconTag className="h-4 w-4" />
                                        Tags
                                    </Label>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {ticket.tags.map((tag, index) => (
                                            <Badge
                                                key={index}
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Effort Tracking */}
                            {(ticket.estimated_hours || ticket.actual_hours) && (
                                <div className="mb-4">
                                    <Label className="text-sm font-semibold">
                                        Effort Tracking
                                    </Label>
                                    <div className="mt-2 grid gap-3 sm:grid-cols-2">
                                        {ticket.estimated_hours && (
                                            <div className="mb-2">
                                                <Label className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <IconClock className="h-3 w-3" />
                                                    Estimated Hours
                                                </Label>
                                                <p className="text-sm">
                                                    {ticket.estimated_hours} hours
                                                </p>
                                            </div>
                                        )}

                                        {ticket.actual_hours && (
                                            <div className="mb-2">
                                                <Label className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <IconClock className="h-3 w-3" />
                                                    Actual Hours
                                                </Label>
                                                <p className="text-sm">
                                                    {ticket.actual_hours} hours
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
