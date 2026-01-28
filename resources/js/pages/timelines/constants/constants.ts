export const phaseColors: Record<string, string> = {
    planning: 'bg-blue-500',
    backlog_refinement: 'bg-indigo-500',
    analysis: 'bg-cyan-500',
    design: 'bg-purple-500',
    development: 'bg-green-500',
    testing: 'bg-orange-500',
    code_review: 'bg-yellow-500',
    deployment: 'bg-pink-500',
    release: 'bg-red-500',
    retrospective: 'bg-slate-500',
};

export const phaseLabels: Record<string, string> = {
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

export const statusColors: Record<string, { variant: string; label: string }> =
{
    in_progress: { variant: 'default', label: 'In Progress' },
    pending: { variant: 'secondary', label: 'Pending' },
    completed: { variant: 'outline', label: 'Completed' },
    delayed: { variant: 'destructive', label: 'Delayed' },
    cancelled: { variant: 'outline', label: 'Cancelled' },
};

export const typeColors: Record<string, string> = {
    sprint: 'bg-blue-500',
    phase: 'bg-green-500',
    milestone: 'bg-purple-500',
    event: 'bg-orange-500',
};

export const typeLabels: Record<string, string> = {
    sprint: 'Sprint',
    phase: 'Phase',
    milestone: 'Milestone',
    event: 'Event',
};


export const timelineTypeInfo = [
    {
        type: 'Sprint',
        description:
            'Iterasi pengembangan berdurasi tetap (biasanya 1-4 minggu) dalam metodologi Agile/Scrum.',
        usage: 'Digunakan untuk siklus pengembangan berkelanjutan dengan deliverable yang jelas.',
        example: {
            title: 'Sprint 15',
            phase: 'Development',
            duration: '2 weeks',
            deliverables: [
                'User authentication feature',
                'Dashboard UI implementation',
                'API integration for reports',
            ],
        },
        color: 'bg-blue-500',
    },
    {
        type: 'Phase',
        description:
            'Tahap besar dalam siklus pengembangan proyek (SDLC) yang memiliki fokus dan tujuan spesifik.',
        usage: 'Digunakan untuk menandai fase utama proyek seperti Planning, Development, Testing, atau Deployment.',
        example: {
            title: 'UAT Testing Phase',
            phase: 'Testing',
            duration: '3 weeks',
            deliverables: [
                'Complete UAT test scenarios',
                'User acceptance documentation',
                'Bug fixes and refinements',
            ],
        },
        color: 'bg-purple-500',
    },
    {
        type: 'Milestone',
        description:
            'Titik pencapaian penting dalam proyek yang menandai penyelesaian deliverable atau target signifikan.',
        usage: 'Digunakan untuk menandai pencapaian kunci, go-live, atau penyelesaian fase major.',
        example: {
            title: 'MVP Release',
            phase: 'Release',
            duration: '1 day',
            deliverables: [
                'Production deployment completed',
                'MVP features launched',
                'User documentation published',
            ],
        },
        color: 'bg-green-500',
    },
    {
        type: 'Event',
        description:
            'Aktivitas atau kegiatan spesifik yang terjadwal, seperti meeting, review, atau training.',
        usage: 'Digunakan untuk menandai event penting seperti sprint review, retrospective, atau client presentation.',
        example: {
            title: 'Sprint Review & Demo',
            phase: 'Retrospective',
            duration: '2 hours',
            deliverables: [
                'Sprint achievements presentation',
                'Demo to stakeholders',
                'Feedback collection',
            ],
        },
        color: 'bg-orange-500',
    },
];
