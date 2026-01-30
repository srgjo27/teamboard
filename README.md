# Teamboard

Teamboard is a modern Project Management Application designed to streamline team collaboration, task tracking, and performance analytics. Built with the latest web technologies, it offers a seamless and responsive user experience.

![Teamboard Dashboard](public/screenshots/projects.png)

## 🚀 Key Features

*   **Project & Task Management**: Create projects, assign tasks, and track progress with intuitive boards and lists.
*   **Team Collaboration**: Manage team members, roles (Product Owner, Scrum Master, Developer), and permissions.
*   **AI-Powered Analytics**: Generate intelligent insights on project health and team performance using Google Gemini AI.
*   **Interactive Timelines**: Visualize project roadmaps and deadlines.
*   **Real-time Updates**: Stay in sync with your team.

## 🛠️ Tech Stack

This project leverages a robust and modern technology stack:

### Backend
*   **[Laravel 12](https://laravel.com)**: The PHP framework for web artisans.
*   **[Inertia.js 2.0](https://inertiajs.com)**: Build modern single-page apps using classic server-side routing.
*   **[Google Gemini PHP](https://github.com/google-gemini-php/client)**: Integration with Google's Generative AI.
*   **Database**: PostgreSQL.

### Frontend
*   **[React 19](https://react.dev)**: The library for web and native user interfaces.
*   **[Tailwind CSS 4.0](https://tailwindcss.com)**: A utility-first CSS framework for rapid UI development.
*   **[Shadcn/ui](https://ui.shadcn.com)**: Reusable components built with Radix UI and Tailwind CSS.
*   **[Recharts](https://recharts.org)**: Composable charting library for React.
*   **[Tabler Icons](https://tabler.io/icons)** & **[Lucide React](https://lucide.dev)**: Beautiful and consistent icons.

## ⚙️ Installation

Follow these steps to set up the project locally:

### Prerequisites
*   PHP >= 8.2
*   Composer
*   Node.js & NPM
*   PostgreSQL

### Steps

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/yourusername/teamboard.git
    cd teamboard
    ```

2.  **Install PHP Dependencies**
    ```bash
    composer install
    ```

3.  **Install Node Dependencies**
    ```bash
    npm install
    ```

4.  **Environment Configuration**
    Copy the example environment file and configure your database and API keys.
    ```bash
    cp .env.example .env
    ```
    
    Open `.env` and set your configuration:
    ```ini
    DB_CONNECTION=pgsql
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_DATABASE=teamboard
    DB_USERNAME=postgres
    DB_PASSWORD=your_password

    # Google Gemini API Key for AI Insights
    GEMINI_API_KEY=your_api_key_here
    ```

5.  **Generate Application Key**
    ```bash
    php artisan key:generate
    ```

6.  **Run Migrations & Seeders**
    Create the database structure and populate it with initial data (Roles, etc).
    ```bash
    php artisan migrate --seed
    ```

7.  **Run the Application**
    Start the local development server (Vite + Laravel).
    ```bash
    composer run dev
    ```
    Alternatively, run them separately:
    ```bash
    npm run dev
    php artisan serve
    ```

    Access the application at `http://localhost:8000`.

## 📸 Screenshots

| Projects | Analytics |
|----------|-----------|
| ![Projects](public/screenshots/projects.png) | ![Analytics](public/screenshots/analytics.png) |

| Tickets | Timelines |
|---------|-----------|
| ![Tickets](public/screenshots/tickets.png) | ![Timelines](public/screenshots/timelines.png) |

| Teams | Manage Users |
|-------|--------------|
| ![Teams](public/screenshots/teams.png) | ![Manage Users](public/screenshots/manage_users.png) |

### Notifications
![Notifications](public/screenshots/notifications.png)

## 📄 License

The Teamboard project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
