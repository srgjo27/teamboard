<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'admin',
                'display_name' => 'Admin/Super Admin',
                'description' => 'Administrator with full system access',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'scrum_master',
                'display_name' => 'Scrum Master',
                'description' => 'Facilitates Scrum process and removes impediments',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'project_manager',
                'display_name' => 'Project Manager',
                'description' => 'Manages project execution and team coordination',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'product_owner',
                'display_name' => 'Product Owner',
                'description' => 'Defines product vision and prioritizes backlog',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'frontend_developer',
                'display_name' => 'Front End Developer',
                'description' => 'Develops user interface and client-side functionality',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'backend_developer',
                'display_name' => 'Back End Developer',
                'description' => 'Develops server-side logic and database management',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'fullstack_developer',
                'display_name' => 'Full Stack Developer',
                'description' => 'Develops both frontend and backend functionality',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'quality_assurance',
                'display_name' => 'Quality Assurance',
                'description' => 'Tests and ensures product quality',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'designer',
                'display_name' => 'Designer',
                'description' => 'Creates UI/UX design and visual assets',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('roles')->insert($roles);
    }
}
