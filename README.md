AI Smart Task Manager

AI Smart Task Manager is a modern, responsive task management application built with Next.js 15+, TypeScript, and Ant Design, leveraging the Google Gemini API for AI-powered subtask suggestions. Designed for simplicity and efficiency, it allows users to create, edit, delete, and manage tasks with a clean, user-friendly interface that works seamlessly on both mobile and desktop devices. The app prioritizes quality, robust error handling, and a lightweight architecture, making it ideal for personal productivity.

Features

Task Management: Add, edit, and delete tasks with fields for title, description, status (pending/completed), and due date.

AI Subtask Suggestions: Click the "Suggest Subtasks" button to generate 3-5 actionable subtasks using the Google Gemini API (e.g., "Plan birthday party" → "Book venue, Send invitations, Order cake").

Responsive Design: Built with Ant Design and Tailwind CSS for a polished, mobile-friendly experience.

Error Handling: Comprehensive error boundaries and user feedback for API failures (e.g., Gemini API errors) and task operations.

Type-Safe: Fully written in TypeScript for reliable, maintainable code.

Tech Stack

Next.js 15+ (App Router): Utilizes React Server Components, Server Actions, and optimized caching for efficient data handling.

TypeScript: Ensures type safety across the app.

Ant Design: Provides a clean, responsive UI with components like forms, modals, and cards.

React Context: Manages task state without the overhead of Redux.

Google Gemini API: Powers AI-driven subtask suggestions via a secure Next.js API route.

Setup

Clone the repository: git clone <repo-url>

Install dependencies: npm install

Copy .env.example to .env.local and add your Google Gemini API key from AI Studio.

Run the app: npm run dev

Project Structure

Organized for scalability:

src/app/: Next.js App Router with pages and API routes.

src/components/: Reusable UI components (TaskCard, TaskForm, etc.).

src/context/: TaskContext for state management.

src/lib/types/: TypeScript type definitions.

Error Handling

Graceful handling of Gemini API failures with user-friendly messages.

Error boundaries in src/app/tasks/error.tsx catch rendering issues.

Form validation and mutation errors are managed with Ant Design’s message component.

Future Improvements

Add a database for persistent storage.

Implement user authentication.

Enhance AI features with more advanced prompts.

Explore the code and contribute to make task management smarter!
