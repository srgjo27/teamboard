import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { IconPaperclip, IconSend } from '@tabler/icons-react';
import { useAddComment } from '../hooks/use-add-comment';

interface AddCommentFormProps {
    ticketId: number;
}

export function AddCommentForm({ ticketId }: AddCommentFormProps) {
    const {
        comment,
        setComment,
        attachments,
        isInternal,
        setIsInternal,
        isSubmitting,
        handleSubmit,
        handleFileChange,
    } = useAddComment({ ticketId });

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div>
                <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="min-h-[100px]"
                    disabled={isSubmitting}
                />
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Input
                            type="file"
                            multiple
                            onChange={(e) => handleFileChange(e.target.files)}
                            className="hidden"
                            id="comment-attachments"
                            disabled={isSubmitting}
                        />
                        <Label
                            htmlFor="comment-attachments"
                            className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                            <IconPaperclip className="h-4 w-4" />
                            Attach files
                            {attachments.length > 0 && (
                                <span className="text-xs">
                                    ({attachments.length})
                                </span>
                            )}
                        </Label>
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="internal-note"
                            checked={isInternal}
                            onCheckedChange={(checked) =>
                                setIsInternal(checked as boolean)
                            }
                            disabled={isSubmitting}
                        />
                        <Label
                            htmlFor="internal-note"
                            className="text-sm font-normal"
                        >
                            Internal note
                        </Label>
                    </div>
                </div>

                <Button type="submit" disabled={isSubmitting || !comment.trim()}>
                    <IconSend className="mr-2 h-4 w-4" />
                    {isSubmitting ? 'Sending...' : 'Send'}
                </Button>
            </div>

            {attachments.length > 0 && (
                <div className="text-xs text-muted-foreground">
                    Files: {attachments.map((f) => f.name).join(', ')}
                </div>
            )}
        </form>
    );
}
