<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectTimeline;
use App\Models\Team;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function index()
    {
        $analytics = [
            'overview' => $this->getOverviewStats(),
            'tickets' => $this->getTicketAnalytics(),
            'teams' => $this->getTeamPerformance(),
            'timelines' => $this->getTimelineAnalytics(),
            'users' => $this->getUserProductivity(),
        ];

        return Inertia::render('analytics/page', [
            'analytics' => $analytics,
        ]);
    }

    private function getOverviewStats()
    {
        $totalTickets = Ticket::count();
        $activeProjects = Project::count();
        $totalTeams = Team::count();
        $totalUsers = User::count();
        
        $completedThisMonth = Ticket::where('status', 'done')
            ->whereMonth('updated_at', now()->month)
            ->whereYear('updated_at', now()->year)
            ->count();

        $avgCompletionTime = Ticket::where('status', 'done')
            ->whereNotNull('updated_at')
            ->whereNotNull('created_at')
            ->selectRaw('AVG(EXTRACT(EPOCH FROM (updated_at - created_at)) / 86400) as avg_days')
            ->value('avg_days');

        return [
            'totalTickets' => $totalTickets,
            'activeProjects' => $activeProjects,
            'totalTeams' => $totalTeams,
            'totalUsers' => $totalUsers,
            'completedThisMonth' => $completedThisMonth,
            'avgCompletionTime' => round($avgCompletionTime ?? 0, 1),
        ];
    }

    private function getTicketAnalytics()
    {
        $byStatus = Ticket::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get()
            ->map(fn($item) => [
                'status' => ucfirst(str_replace('_', ' ', $item->status)),
                'count' => $item->count,
            ]);

        $byPriority = Ticket::select('priority', DB::raw('count(*) as count'))
            ->groupBy('priority')
            ->get()
            ->map(fn($item) => [
                'priority' => ucfirst($item->priority),
                'count' => $item->count,
            ]);

        $byType = Ticket::select('type', DB::raw('count(*) as count'))
            ->groupBy('type')
            ->get()
            ->map(fn($item) => [
                'type' => ucfirst($item->type),
                'count' => $item->count,
            ]);

        $byAssignee = Ticket::with('assignedUser:id,name')
            ->whereNotNull('assigned_to')
            ->select('assigned_to', DB::raw('count(*) as count'))
            ->groupBy('assigned_to')
            ->orderByDesc('count')
            ->limit(10)
            ->get()
            ->map(fn($item) => [
                'user' => $item->assignedUser->name ?? 'Unknown',
                'count' => $item->count,
            ]);

        $completionTrend = Ticket::where('status', 'done')
            ->where('updated_at', '>=', now()->subDays(30))
            ->selectRaw('DATE(updated_at) as date, count(*) as count')
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(fn($item) => [
                'date' => $item->date,
                'count' => $item->count,
            ]);

        return [
            'byStatus' => $byStatus,
            'byPriority' => $byPriority,
            'byType' => $byType,
            'byAssignee' => $byAssignee,
            'completionTrend' => $completionTrend,
        ];
    }

    private function getTeamPerformance()
    {
        $teams = Team::with('users:id')->withCount('users')->get();

        $workload = $teams->map(function ($team) {
            $userIds = $team->users->pluck('id');
            $ticketCount = Ticket::whereIn('assigned_to', $userIds)->count();

            return [
                'team' => $team->name,
                'tickets' => $ticketCount,
                'members' => $team->users_count,
            ];
        });

        $completionRate = $teams->map(function ($team) {
            $userIds = $team->users->pluck('id');
            $totalTickets = Ticket::whereIn('assigned_to', $userIds)->count();
            $completedTickets = Ticket::whereIn('assigned_to', $userIds)
                ->where('status', 'done')
                ->count();

            $rate = $totalTickets > 0 ? ($completedTickets / $totalTickets) * 100 : 0;

            return [
                'team' => $team->name,
                'rate' => round($rate, 1),
                'completed' => $completedTickets,
                'total' => $totalTickets,
            ];
        });

        return [
            'workload' => $workload,
            'completionRate' => $completionRate,
        ];
    }

    private function getTimelineAnalytics()
    {
        $byStatus = ProjectTimeline::select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->get()
            ->map(fn($item) => [
                'status' => ucfirst($item->status),
                'count' => $item->count,
            ]);

        $progress = ProjectTimeline::with('tickets')
            ->get()
            ->map(function ($timeline) {
                $totalTickets = $timeline->tickets->count();
                $completedTickets = $timeline->tickets->where('status', 'done')->count();
                $progressPercentage = $totalTickets > 0 ? ($completedTickets / $totalTickets) * 100 : 0;

                return [
                    'timeline' => $timeline->name,
                    'progress' => round($progressPercentage, 1),
                    'completed' => $completedTickets,
                    'total' => $totalTickets,
                ];
            });

        return [
            'byStatus' => $byStatus,
            'progress' => $progress,
        ];
    }

    private function getUserProductivity()
    {
        $excludedRoles = ['admin', 'product_owner', 'scrum_master', 'product_manager'];

        $topContributors = Ticket::where('status', 'done')
            ->whereHas('assignedUser.role', function ($q) use ($excludedRoles) {
                $q->whereNotIn('name', $excludedRoles);
            })
            ->with('assignedUser:id,name')
            ->whereNotNull('assigned_to')
            ->select('assigned_to', DB::raw('count(*) as completed'))
            ->groupBy('assigned_to')
            ->orderByDesc('completed')
            ->limit(10)
            ->get()
            ->map(fn($item) => [
                'user' => $item->assignedUser->name ?? 'Unknown',
                'completed' => $item->completed,
            ]);

        $byRole = User::whereHas('role', function ($q) use ($excludedRoles) {
                $q->whereNotIn('name', $excludedRoles);
            })
            ->with('role:id,name,display_name')
            ->get()
            ->groupBy('role.display_name')
            ->map(fn($users, $role) => [
                'role' => $role ?? 'No Role',
                'count' => $users->count(),
            ])
            ->values();

        $userActivity = User::whereHas('role', function ($q) use ($excludedRoles) {
                $q->whereNotIn('name', $excludedRoles);
            })
            ->with('role:id,display_name')
            ->get()
            ->map(function ($user) {
                $assigned = Ticket::where('assigned_to', $user->id)->count();
                $completed = Ticket::where('assigned_to', $user->id)->where('status', 'done')->count();
                $inProgress = Ticket::where('assigned_to', $user->id)->where('status', 'in_progress')->count();

                return [
                    'user' => $user->name,
                    'role' => $user->role->display_name ?? 'No Role',
                    'assigned' => $assigned,
                    'completed' => $completed,
                    'inProgress' => $inProgress,
                ];
            })
            ->sortByDesc('completed')
            ->values();

        return [
            'topContributors' => $topContributors,
            'byRole' => $byRole,
            'userActivity' => $userActivity,
        ];
    }
    public function generateAIAnalysis()
    {
        $data = [
            'overview' => $this->getOverviewStats(),
            'tickets' => $this->getTicketAnalytics(),
            'teams' => $this->getTeamPerformance(),
            'users' => $this->getUserProductivity(),
        ];

        $aiData = [
            'overview' => $data['overview'],
            'tickets' => $data['tickets'],
            'teams' => $data['teams'],
            'users' => [
                'topContributors' => $data['users']['topContributors'],
                'byRole' => $data['users']['byRole'],
                'userActivity' => array_slice($data['users']['userActivity']->toArray(), 0, 20),
            ],
        ];

        try {
            $prompt = "You are an expert Project Manager AI. Analyze the following project management data and provide key insights.
            Focus on:
            1. Overall Project Health
            2. High Performing Teams/Individuals
            3. Critical Bottlenecks (High priority tickets, delayed timelines)
            4. Recommendations for improvement
            
            Keep the response professional, concise, and formatted in Markdown.
            
            Data: " . json_encode($aiData);

            $apiKey = env('GEMINI_API_KEY');
            if (!$apiKey) {
                return response()->json(['error' => 'Google API Key not configured'], 500);
            }

            $client = \Gemini::client($apiKey);
            $result = $client->generativeModel('models/gemini-flash-latest')->generateContent($prompt);

            return response()->json([
                'analysis' => $result->text()
            ]);
        } catch (\Exception $e) {
            $statusCode = str_contains($e->getMessage(), '429') || str_contains($e->getMessage(), 'Quota') ? 429 : 500;
            return response()->json(['error' => 'Failed to generate analysis: ' . $e->getMessage()], $statusCode);
        }
    }
}
