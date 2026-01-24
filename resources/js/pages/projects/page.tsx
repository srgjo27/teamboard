import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Project, ProjectsProps } from '@/types/project';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { CreateProjectDialog } from './components/create-project-dialog';
import { EditProjectDialog } from './components/edit-project-dialog';
import { EmptyState } from './components/empty-state';
import { ProjectCard } from './components/project-card';
import { ProjectFilters } from './components/project-filters';
import { ProjectStats } from './components/project-stats';
import { ProjectStatusLegend } from './components/project-status-legend';
import { ViewProjectDialog } from './components/view-project-dialog';
import { useProjectFilters, useProjectStats } from './hooks/use-project-data';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects',
        href: '#',
    },
];

export default function ProjectsPage({ projects, teams }: ProjectsProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null,
    );

    const { auth } = usePage().props as any;

    const filteredProjects = useProjectFilters(
        projects,
        searchQuery,
        selectedStatus,
    );
    const stats = useProjectStats(filteredProjects);

    const canCreateProject =
        auth?.user?.role?.name === 'scrum_master' ||
        auth?.user?.role?.name === 'product_owner' ||
        auth?.user?.role?.name === 'product_manager' ||
        auth?.user?.role?.name === 'admin';

    const handleCreateClick = () => {
        setCreateDialogOpen(true);
    };

    const handleEditClick = (project: Project) => {
        setSelectedProject(project);
        setEditDialogOpen(true);
    };

    const handleViewClick = (project: Project) => {
        setSelectedProject(project);
        setViewDialogOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />

            <div className="p-6">
                {/* Header */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Projects Management
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Manage and track all your projects
                        </p>
                    </div>

                    <ProjectFilters
                        searchQuery={searchQuery}
                        selectedStatus={selectedStatus}
                        onSearchChange={setSearchQuery}
                        onStatusChange={setSelectedStatus}
                        onCreateClick={handleCreateClick}
                        canCreate={canCreateProject}
                    />
                </div>

                {/* Stats Cards */}
                <ProjectStats {...stats} />

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                canActions={canCreateProject}
                                onEdit={handleEditClick}
                                onView={handleViewClick}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        onCreateClick={handleCreateClick}
                        canCreate={canCreateProject}
                    />
                )}

                {/* Project Status Legend */}
                <ProjectStatusLegend />

                {/* Create Project Dialog */}
                {canCreateProject && (
                    <CreateProjectDialog
                        open={createDialogOpen}
                        onOpenChange={setCreateDialogOpen}
                        teams={teams}
                    />
                )}

                {/* Edit Project Dialog */}
                {canCreateProject && (
                    <EditProjectDialog
                        open={editDialogOpen}
                        onOpenChange={setEditDialogOpen}
                        project={selectedProject}
                        teams={teams}
                    />
                )}

                {/* View Project Dialog */}
                <ViewProjectDialog
                    open={viewDialogOpen}
                    onOpenChange={setViewDialogOpen}
                    project={selectedProject}
                />
            </div>
        </AppLayout>
    );
}
