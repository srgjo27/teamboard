<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ticket extends Model
{
    protected $fillable = [
        'project_id',
        'timeline_id',
        'reporter_id',
        'assigned_to',
        'qa_assigned_to',
        'title',
        'description',
        'ticket_number',
        'type',
        'priority',
        'status',
        'due_date',
        'estimated_hours',
        'actual_hours',
        'tags',
        'attachments',
        'story_points',
        'resolved_at',
        'closed_at',
    ];

    protected $casts = [
        'tags' => 'array',
        'attachments' => 'array',
        'due_date' => 'date',
        'resolved_at' => 'datetime',
        'closed_at' => 'datetime',
        'estimated_hours' => 'decimal:2',
        'actual_hours' => 'decimal:2',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function timeline(): BelongsTo
    {
        return $this->belongsTo(ProjectTimeline::class, 'timeline_id');
    }

    public function reporter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reporter_id');
    }

    public function assignedUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function qaAssignedUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'qa_assigned_to');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(TicketComment::class);
    }
}
