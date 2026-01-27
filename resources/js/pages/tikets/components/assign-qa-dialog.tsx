import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Ticket } from '@/types/ticket';
import { User } from '@/types/user';
import { useAssignQa } from '../hooks/use-assign-qa';

interface AssignQaDialogProps {
    ticket: Ticket;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    qaTesters: User[];
}

export function AssignQaDialog({
    ticket,
    open,
    onOpenChange,
    qaTesters,
}: AssignQaDialogProps) {
    const { selectedQaId, setSelectedQaId, isSubmitting, handleSubmit } =
        useAssignQa({
            ticket,
            onSuccess: () => onOpenChange(false),
        });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
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
                            value={selectedQaId}
                            onValueChange={setSelectedQaId}
                            disabled={isSubmitting}
                        >
                            <SelectTrigger id="qa-assignee">
                                <SelectValue placeholder="Select QA tester" />
                            </SelectTrigger>
                            <SelectContent>
                                {qaTesters.length > 0 ? (
                                    qaTesters.map((qa) => (
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
                        onClick={() => onOpenChange(false)}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? 'Assigning...' : 'Assign QA'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
