import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Project } from '@/types/project';
import {
    IconCalendar,
    IconDownload,
    IconFile,
} from '@tabler/icons-react';
import { statusColors } from '../../projects/constants';

interface ArchivedProjectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    project: Project | null;
}

export function ArchivedProjectDialog({
    open,
    onOpenChange,
    project,
}: ArchivedProjectDialogProps) {
    if (!project) return null;

    const statusConfig = statusColors[project.status];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] max-w-4xl overflow-hidden p-0">
                <div className="flex flex-col h-full max-h-[90vh]">
                    <DialogHeader className="p-6 pb-2">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-1">
                                <DialogTitle className="text-2xl">
                                    {project.name}
                                </DialogTitle>
                                <DialogDescription className="mt-2">
                                    Archived on {project.updated_at} by{' '}
                                    {project.creator}
                                </DialogDescription>
                            </div>
                            <Badge
                                variant="outline"
                                className={`${statusConfig.bgColor} ${statusConfig.color}`}
                            >
                                {statusConfig.label}
                            </Badge>
                        </div>
                    </DialogHeader>

                    <Tabs defaultValue="overview" className="flex-1 flex flex-col overflow-hidden">
                        <div className="px-6">
                            <TabsList className="w-full justify-start">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="tickets">Tickets ({project.tickets?.length || 0})</TabsTrigger>
                                <TabsTrigger value="timeline">Timeline ({project.timelines?.length || 0})</TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            <div className="p-4">
                                <TabsContent value="overview" className="mt-0 space-y-6">
                                    {/* Description */}
                                    <div>
                                        <Label className="text-base font-semibold">
                                            Description
                                        </Label>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {project.description || 'No description provided.'}
                                        </p>
                                    </div>

                                    <Separator />

                                    {/* Files & Image */}
                                    {(project.file_path || project.image_path) && (
                                        <>
                                            <div>
                                                <Label className="text-base font-semibold">
                                                    Attachments
                                                </Label>
                                                <div className="mt-3 grid gap-3">
                                                    {project.file_path && (
                                                        <div className="flex items-center justify-between rounded-lg border p-3">
                                                            <div className="flex items-center gap-3">
                                                                <div className="rounded-lg bg-primary/10 p-2">
                                                                    <IconFile className="h-5 w-5 text-primary" />
                                                                </div>
                                                                <div>
                                                                    <div className="font-medium">
                                                                        {project.file_name}
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground">
                                                                        Document file
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <a
                                                                href={`/storage/${project.file_path}`}
                                                                download
                                                            >
                                                                <Button
                                                                    size="sm"
                                                                    className="gap-1"
                                                                >
                                                                    <IconDownload className="h-4 w-4" />
                                                                    Download
                                                                </Button>
                                                            </a>
                                                        </div>
                                                    )}

                                                    {project.image_path && (
                                                        <div className="rounded-lg block max-w-lg border p-3">
                                                            <img
                                                                src={`/storage/${project.image_path}`}
                                                                alt={project.name}
                                                                className="w-full rounded object-cover"
                                                            />
                                                            <div className="mt-2 text-sm text-muted-foreground">
                                                                {project.image_name}
                                                            </div>
                                                        </div>
                                                    )}

                                                </div>
                                            </div>
                                        </>
                                    )}
                                </TabsContent>

                                <TabsContent value="tickets" className="mt-0">
                                    <div className="space-y-4">
                                        {project.tickets && project.tickets.length > 0 ? (
                                            project.tickets.map(ticket => (
                                                <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-mono text-xs text-muted-foreground">{ticket.ticket_number}</span>
                                                            <span className="font-medium">{ticket.title}</span>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Badge variant="secondary" className="text-xs">{ticket.status}</Badge>
                                                            <Badge variant="outline" className="text-xs">{ticket.priority}</Badge>
                                                            <Badge variant="outline" className="text-xs">{ticket.type}</Badge>
                                                        </div>
                                                    </div>
                                                    {ticket.assigned_user ? (
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <Avatar className="h-6 w-6">
                                                                <AvatarFallback className="text-[10px]">
                                                                    {ticket.assigned_user.name.substring(0, 2)}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <span>{ticket.assigned_user.name}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-muted-foreground">Unassigned</span>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8 text-muted-foreground">
                                                No tickets found for this project.
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>

                                <TabsContent value="timeline" className="mt-0">
                                    <div className="space-y-4">
                                        {project.timelines && project.timelines.length > 0 ? (
                                            project.timelines.map(timeline => (
                                                <div key={timeline.id} className="p-4 border rounded-lg bg-card">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="font-medium">{timeline.title}</div>
                                                        <Badge variant={timeline.status === 'completed' ? 'default' : 'secondary'}>
                                                            {timeline.status}
                                                        </Badge>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-2">
                                                            <IconCalendar className="h-4 w-4" />
                                                            {timeline.start_date ? new Date(timeline.start_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''} - {timeline.end_date ? new Date(timeline.end_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                                                        </div>
                                                        <div className="capitalize">
                                                            Type: {timeline.type}
                                                        </div>
                                                    </div>

                                                    {timeline.description && (
                                                        <p className="mt-2 text-sm text-muted-foreground border-t pt-2">
                                                            {timeline.description}
                                                        </p>
                                                    )}

                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8 text-muted-foreground">
                                                No timelines found for this project.
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>
                            </div>
                        </div>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    );
}
