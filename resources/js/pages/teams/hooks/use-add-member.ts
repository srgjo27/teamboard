import { User } from '@/types/user';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useMemo, useState } from 'react';

const RESTRICTED_ROLES = ['admin', 'product_owner', 'scrum_master'];

export function useAddMember(teamId: number, availableUsers: User[]) {
    const [open, setOpen] = useState(false);

    const filteredUsers = useMemo(
        () =>
            availableUsers.filter(
                (user) =>
                    !user.role || !RESTRICTED_ROLES.includes(user.role.name),
            ),
        [availableUsers],
    );

    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/teams/${teamId}/members`, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    return {
        open,
        setOpen,
        filteredUsers,
        data,
        setData,
        processing,
        errors,
        handleSubmit,
        handleClose,
    };
}
