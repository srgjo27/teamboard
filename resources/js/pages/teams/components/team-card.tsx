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
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Team } from '@/types/team';
import { User } from '@/types/user';
import {
    IconChevronDown,
    IconChevronUp,
    IconDotsVertical,
    IconEdit,
    IconTrash,
} from '@tabler/icons-react';
import { useTeamCard } from '../hooks/use-team-card';
import AddMemberDialog from './add-member-dialog';
import DeleteTeamDialog from './delete-team-dialog';
import EditTeamDialog from './edit-team-dialog';
import RemoveMemberDialog from './remove-member-dialog';

interface TeamCardProps {
    team: Team;
    allUsers: User[];
    canActions: boolean;
}

export function TeamCard({ team, allUsers, canActions }: TeamCardProps) {
    const { isOpen, setIsOpen, availableUsers } = useTeamCard(team, allUsers);

    return (
        <Card className="overflow-hidden">
            <CardHeader className="bg-muted/30 pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">
                                {team.name}
                            </CardTitle>
                            <Badge
                                variant="outline"
                                className="border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400"
                            >
                                Active
                            </Badge>
                        </div>
                        <CardDescription className="mt-1">
                            {team.description}
                        </CardDescription>
                    </div>

                    {canActions && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                >
                                    <IconDotsVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    Team Actions
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <EditTeamDialog
                                    team={team}
                                    trigger={
                                        <DropdownMenuItem
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <IconEdit className="mr-2 h-4 w-4" />
                                            Edit Details
                                        </DropdownMenuItem>
                                    }
                                />
                                <DropdownMenuSeparator />
                                <DeleteTeamDialog
                                    team={team}
                                    trigger={
                                        <DropdownMenuItem
                                            variant="destructive"
                                            className="text-destructive"
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <IconTrash className="mr-2 h-4 w-4" />
                                            Delete Team
                                        </DropdownMenuItem>
                                    }
                                />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </CardHeader>

            <CardContent className="p-4">
                <div className="mb-4 grid grid-cols-2 gap-4 text-center">
                    <div className="rounded-lg bg-muted/50 p-3">
                        <div className="text-2xl font-bold">
                            {team.members_count}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            Members
                        </div>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3">
                        <div className="text-xs text-muted-foreground">
                            Product Manager
                        </div>
                        <div className="text-sm font-medium">
                            {team.product_manager?.name || 'Not assigned'}
                        </div>
                    </div>
                </div>

                <Separator className="my-4" />

                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                    <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Team Members</div>
                        <CollapsibleTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                            >
                                {isOpen ? 'Show Less' : 'Show All'}
                                {isOpen ? (
                                    <IconChevronUp className="ml-1 h-4 w-4" />
                                ) : (
                                    <IconChevronDown className="ml-1 h-4 w-4" />
                                )}
                            </Button>
                        </CollapsibleTrigger>
                    </div>

                    {!isOpen && (
                        <div className="mt-3 flex -space-x-3">
                            {team.members.slice(0, 5).map((member) => (
                                <Avatar
                                    key={member.id}
                                    className="h-10 w-10 border-2 border-background"
                                >
                                    <AvatarFallback
                                        className="text-xs font-semibold"
                                        style={{
                                            backgroundColor: `${team.color}20`,
                                            color: team.color,
                                        }}
                                    >
                                        {member.name
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </AvatarFallback>
                                </Avatar>
                            ))}
                            {team.members_count > 5 && (
                                <div
                                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background text-xs font-semibold"
                                    style={{
                                        backgroundColor: `${team.color}20`,
                                        color: team.color,
                                    }}
                                >
                                    +{team.members_count - 5}
                                </div>
                            )}
                        </div>
                    )}

                    <CollapsibleContent className="mt-3 space-y-2">
                        {team.members.map((member) => (
                            <div
                                key={member.id}
                                className="flex items-center gap-3 rounded-lg border p-2 transition-colors hover:bg-muted/50"
                            >
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback className="text-xs">
                                        {member.name
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="text-sm font-medium">
                                        {member.name}
                                    </div>
                                    <div className="text-xs">{member.role}</div>
                                    <div className="text-xs text-muted-foreground">
                                        {member.email}
                                    </div>
                                </div>

                                {canActions && (
                                    <RemoveMemberDialog
                                        teamId={team.id}
                                        userId={member.id}
                                        userName={member.name}
                                    />
                                )}
                            </div>
                        ))}
                    </CollapsibleContent>
                </Collapsible>

                <div className="mt-4">
                    {canActions && (
                        <AddMemberDialog
                            teamId={team.id}
                            availableUsers={availableUsers}
                        />
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
