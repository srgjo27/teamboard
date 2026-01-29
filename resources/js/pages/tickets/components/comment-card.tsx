import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { TicketComment } from '@/types/ticket';
import { usePage } from '@inertiajs/react';
import {
    IconEdit,
    IconLock,
    IconPaperclip,
    IconTrash,
} from '@tabler/icons-react';
import { useDeleteComment } from '../hooks/use-delete-comment';
import { useEditComment } from '../hooks/use-edit-comment';

interface CommentCardProps {
    comment: TicketComment;
}

export function CommentCard({ comment }: CommentCardProps) {
    const { auth } = usePage().props as any;
    const isOwner = auth.user.id === comment.user_id;

    const { isDeleting, handleDelete } = useDeleteComment(comment.id);

    const {
        isEditing,
        setIsEditing,
        editedComment,
        setEditedComment,
        isInternal,
        setIsInternal,
        isSubmitting,
        handleUpdate,
        handleCancel,
    } = useEditComment(comment);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="flex gap-3 rounded-lg border bg-card p-4">
            <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                    {comment.user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">
                            {comment.user.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {formatDate(comment.created_at)}
                        </span>
                        {comment.is_internal && (
                            <Badge variant="secondary" className="h-5 text-xs">
                                <IconLock className="mr-1 h-3 w-3" />
                                Internal
                            </Badge>
                        )}
                    </div>

                    {isOwner && !isEditing && (
                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => setIsEditing(true)}
                            >
                                <IconEdit className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-destructive hover:text-destructive"
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                <IconTrash className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    )}
                </div>

                {isEditing ? (
                    <div className="space-y-2">
                        <Textarea
                            value={editedComment}
                            onChange={(e) => setEditedComment(e.target.value)}
                            className="min-h-[80px]"
                            disabled={isSubmitting}
                        />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id={`internal-${comment.id}`}
                                    checked={isInternal}
                                    onCheckedChange={(checked) =>
                                        setIsInternal(checked as boolean)
                                    }
                                    disabled={isSubmitting}
                                />
                                <Label
                                    htmlFor={`internal-${comment.id}`}
                                    className="text-sm font-normal"
                                >
                                    Internal note
                                </Label>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleCancel}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={handleUpdate}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Saving...' : 'Save'}
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {comment.comment}
                    </p>
                )}

                {comment.attachments && comment.attachments.length > 0 && (
                    <div className="mt-2 space-y-2">
                        {comment.attachments.map((attachment, index) => {
                            const isImage = attachment.mime_type.startsWith('image/');

                            return isImage ? (
                                <a
                                    key={index}
                                    href={`/storage/${attachment.path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block max-w-md overflow-hidden rounded-lg border border-border transition-all hover:border-primary"
                                >
                                    <img
                                        src={`/storage/${attachment.path}`}
                                        alt={attachment.name}
                                        className="max-h-50 w-full object-contain"
                                        loading="lazy"
                                    />
                                    <div className="bg-muted/50 px-3 py-2">
                                        <p className="text-xs text-muted-foreground">
                                            {attachment.name} ({(attachment.size / 1024).toFixed(1)} KB)
                                        </p>
                                    </div>
                                </a>
                            ) : (
                                <a
                                    key={index}
                                    href={`/storage/${attachment.path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2 text-xs transition-all hover:border-primary hover:bg-muted/50"
                                >
                                    <IconPaperclip className="h-4 w-4 text-muted-foreground" />
                                    <span className="flex-1 font-medium">{attachment.name}</span>
                                    <span className="text-muted-foreground">
                                        ({(attachment.size / 1024).toFixed(1)} KB)
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
