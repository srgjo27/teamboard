import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Timeline } from '@/types/timeline';
import { IconCalendar, IconUser } from '@tabler/icons-react';
import { phaseColors, statusColors, typeColors } from '../constants';

interface ViewTimelineDialogProps {
    timeline: Timeline | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const phaseLabels: Record<string, string> = {
    planning: 'Planning',
    backlog_refinement: 'Backlog Refinement',
    analysis: 'Analysis',
    design: 'Design',
    development: 'Development',
    testing: 'Testing',
    code_review: 'Code Review',
    deployment: 'Deployment',
    release: 'Release',
    retrospective: 'Retrospective',
};

const typeLabels: Record<string, string> = {
    sprint: 'Sprint',
    phase: 'Phase',
    milestone: 'Milestone',
    event: 'Event',
};

export function ViewTimelineDialog({
    timeline,
    open,
    onOpenChange,
}: ViewTimelineDialogProps) {
    if (!timeline) return null;

    const phaseColor = timeline.phase
        ? phaseColors[timeline.phase]
        : typeColors[timeline.type];

    const formatDate = (date: string | null) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const calculateDuration = () => {
        if (!timeline.start_date || !timeline.end_date) return null;
        const start = new Date(timeline.start_date);
        const end = new Date(timeline.end_date);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(diffDays / 7);
        const days = diffDays % 7;

        if (weeks > 0 && days > 0) {
            return `${weeks} minggu ${days} hari`;
        } else if (weeks > 0) {
            return `${weeks} minggu`;
        } else {
            return `${days} hari`;
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <DialogTitle className="text-2xl">
                                {timeline.title}
                            </DialogTitle>
                            <DialogDescription className="mt-2">
                                {timeline.project.name}
                            </DialogDescription>
                        </div>
                        <div className={`h-3 w-3 rounded-sm ${phaseColor}`} />
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">
                                Type
                            </Label>
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className="font-normal"
                                >
                                    {typeLabels[timeline.type]}
                                </Badge>
                                {timeline.sprint_number && (
                                    <span className="text-sm font-medium">
                                        Sprint #{timeline.sprint_number}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">
                                Status
                            </Label>
                            <Badge
                                variant={
                                    statusColors[timeline.status]
                                        ?.variant as 'outline'
                                }
                            >
                                {statusColors[timeline.status]?.label}
                            </Badge>
                        </div>

                        {timeline.phase && (
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground">
                                    SDLC Phase
                                </Label>
                                <p className="text-sm font-medium">
                                    {phaseLabels[timeline.phase]}
                                </p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">
                                Duration
                            </Label>
                            <p className="text-sm font-medium">
                                {calculateDuration()}
                            </p>
                        </div>
                    </div>

                    <Separator />

                    {/* Timeline Period */}
                    <div className="space-y-4">
                        <Label className="text-sm font-semibold">
                            Timeline Period
                        </Label>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-lg border bg-muted/50 p-4">
                                <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                                    <IconCalendar className="h-4 w-4" />
                                    Start Date
                                </div>
                                <p className="text-sm font-medium">
                                    {formatDate(timeline.start_date)}
                                </p>
                            </div>
                            <div className="rounded-lg border bg-muted/50 p-4">
                                <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                                    <IconCalendar className="h-4 w-4" />
                                    End Date
                                </div>
                                <p className="text-sm font-medium">
                                    {formatDate(timeline.end_date)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    {timeline.description && (
                        <>
                            <Separator />
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold">
                                    Description
                                </Label>
                                <p className="text-sm whitespace-pre-wrap text-muted-foreground">
                                    {timeline.description}
                                </p>
                            </div>
                        </>
                    )}

                    {/* Deliverables */}
                    {timeline.deliverables &&
                        timeline.deliverables.length > 0 &&
                        timeline.deliverables[0] !== '' && (
                            <>
                                <Separator />
                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold">
                                        Deliverables
                                    </Label>
                                    <ul className="space-y-2">
                                        {timeline.deliverables.map(
                                            (deliverable, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-2 text-sm"
                                                >
                                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                                    <span className="text-muted-foreground">
                                                        {deliverable}
                                                    </span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </div>
                            </>
                        )}

                    {/* Creator Info */}
                    {timeline.creator && (
                        <>
                            <Separator />
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground">
                                    Created By
                                </Label>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                        <IconUser className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {timeline.creator}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(
                                                timeline.created_at,
                                            ).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
