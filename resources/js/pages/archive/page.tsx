import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Project } from '@/types/project';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { EmptyState } from '../projects/components/empty-state';
import { ProjectCard } from '../projects/components/project-card';
import { ProjectStats } from '../projects/components/project-stats';
import { useProjectFilters } from '../projects/hooks/use-project-data';
import { ArchiveFilters } from './components/archive-filters';
import { ArchiveStats } from './components/archive-stats';
import { ArchivedProjectDialog } from './components/archived-project-dialog';

interface ArchivePageProps {
    projects: Project[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Archive',
        href: '#',
    },
];

export default function ArchivePage({ projects }: ArchivePageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filteredProjects = useProjectFilters(
        projects,
        searchQuery,
        selectedStatus,
    );

    const stats = {
        totalProjects: filteredProjects.length,
        completedProjects: filteredProjects.filter(p => p.status === 'completed').length,
        cancelledProjects: filteredProjects.filter(p => p.status === 'cancelled').length,
    };

    const handleViewClick = (project: Project) => {
        setSelectedProject(project);
        setViewDialogOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Archive" />

            <div className="p-6">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Archived Projects
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            View completed and cancelled projects history
                        </p>
                    </div>

                    <ArchiveFilters
                        searchQuery={searchQuery}
                        selectedStatus={selectedStatus}
                        onSearchChange={setSearchQuery}
                        onStatusChange={setSelectedStatus}
                    />
                </div>

                {/* Stats Cards */}
                <ArchiveStats {...stats} />

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                canActions={false}
                                onView={handleViewClick}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        onCreateClick={() => { }}
                        canCreate={false}
                    />
                )}

                {/* View Project Dialog */}
                <ArchivedProjectDialog
                    open={viewDialogOpen}
                    onOpenChange={setViewDialogOpen}
                    project={selectedProject}
                />
            </div>
        </AppLayout>
    );
}
