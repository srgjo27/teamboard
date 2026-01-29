import { useState } from 'react';

export function useTicketCardDialogs() {
    const [showAssignQA, setShowAssignQA] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showMoveStatus, setShowMoveStatus] = useState(false);

    return {
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
    };
}
