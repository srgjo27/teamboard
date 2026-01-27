import { useState } from 'react';
import { AttachmentItem } from '@/types/ticket';

interface UseFileUploadProps {
    currentFiles: AttachmentItem[];
    onFilesChange: (files: AttachmentItem[]) => void;
}

export function useFileUpload({ currentFiles, onFilesChange }: UseFileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            onFilesChange([...currentFiles, ...files]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            onFilesChange([...currentFiles, ...files]);
        }
    };

    const removeFile = (index: number) => {
        const newFiles = currentFiles.filter((_, i) => i !== index);
        onFilesChange(newFiles);
    };

    return {
        isDragging,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
        handleFileSelect,
        removeFile,
    };
}
