# AI Smart Task Manager

AI Smart Task Manager is a modern, responsive task management application built with Next.js 15+, TypeScript, and Ant Design, leveraging the Google Gemini API for AI-powered subtask suggestions. Designed for simplicity and efficiency, it allows users to create, edit, delete, and manage tasks with a clean, user-friendly interface that works seamlessly on both mobile and desktop devices. The app prioritizes quality, robust error handling, and a lightweight architecture, making it ideal for personal productivity.

## 🌐 Live Demo

🔗 **[Try AI Smart Task Manager Live](https://ai-smart-task-manager-2gyu.vercel.app/)**

## 🚀 Features

### Core Task Management

- ✅ **Add/Edit/Delete tasks** with full CRUD operations
- ✅ **Task fields**: Title, description, status (pending/completed), due date
- ✅ **Responsive design** that works seamlessly on mobile and desktop
- ✅ **Real-time updates** with Redux state management
- ✅ **Data persistence** using Redux Persist

### AI-Powered Subtask Suggestions

- 🤖 **"Suggest Subtasks" button** on each task
- 🧠 **Google Gemini AI integration** for intelligent task breakdown
- 📋 **3-5 actionable subtasks** generated per task
- 🔄 **Fallback suggestions** when AI is unavailable
- ⚡ **Real-time generation** with loading states

### User Experience

- 🎨 **Modern UI** with Ant Design components
- 📱 **Mobile-first responsive design**
- 🌈 **Beautiful gradients**
- ⚠️ **Error handling** with graceful fallbacks
- 🔄 **Loading states** and skeleton screens

## 🛠️ Technologies Used

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 19** - Latest React features
- **Ant Design** - UI component library
- **Tailwind CSS** - Utility-first CSS framework

### State Management

- **Redux Toolkit** - Modern Redux with RTK
- **Redux Persist** - Data persistence
- **React Redux** - React bindings

### AI Integration

- **Google Gemini API** - AI-powered subtask generation
- **Next.js API Routes** - Backend API endpoints

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Day.js** - Date manipulation
- **React Hot Toast** - Notifications
- **UUID** - Unique ID generation

## 📁 Project Structure

```
ai-smart-task-manager/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── suggest-subtasks/
│   │   │       └── route.ts   # Gemini AI integration
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── providers.tsx      # Redux providers
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── HeaderActions.tsx
│   │   │   └── HeaderTitle.tsx
│   │   ├── tasks/             # Task-related components
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskActions.tsx
│   │   │   ├── TaskCheckbox.tsx
│   │   │   ├── TaskDetails.tsx
│   │   │   ├── TaskFormActions.tsx
│   │   │   ├── TaskFormFields.tsx
│   │   │   ├── TaskFormModal.tsx
│   │   │   ├── TaskList.tsx
│   │   │   ├── TaskSection.tsx
│   │   │   ├── SuggestSubtasksButton.tsx
│   │   │   └── SubtasksList.tsx
│   │   └── ui/                # Reusable UI components
│   │       ├── ClientOnly.tsx
│   │       ├── ErrorBoundary.tsx
│   │       ├── HydrationSafe.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── NoSSR.tsx
│   │       └── NoTasksPlaceholder.tsx
│   ├── hooks/                 # Custom React hooks
│   │   ├── useTasks.ts
│   │   └── useUI.ts
│   ├── store/                 # Redux store
│   │   ├── index.ts
│   │   └── slices/
│   │       ├── taskSlice.ts
│   │       └── uiSlice.ts
│   └── types/                 # TypeScript type definitions
│       └── task.ts
├── public/                    # Static assets
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Google Gemini API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/AbhikThosan/ai-smart-task-manager.git
   cd ai-smart-task-manager
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Add your Gemini API key to `.env.local`:

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Get a Gemini API key**

   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key
   - Copy the key to your `.env.local` file

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Required: Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

```

## 📱 Usage

### Creating Tasks

1. Click the "Add New Task" button in the header
2. Fill in the task title and description
3. Optionally set a due date
4. Click "Create Task"

### AI Subtask Suggestions

1. Click the "Suggest Subtasks" button on any task
2. Wait for AI to generate 3-5 actionable subtasks
3. Review and use the suggested subtasks

### Managing Tasks

- **Edit**: Click the edit icon on any task
- **Delete**: Click the delete icon and confirm
- **Complete**: Check the checkbox to mark as completed
- **Filter**: Use the task filters to organize your view

## 🧪 Testing Examples

### Sample Task for Testing

- **Title**: "Prepare for job interview"
- **Description**: "Technical interview for React developer position"

### Expected AI Suggestions

- Research company
- Practice coding questions
- Prepare questions to ask
- Review resume
- Choose appropriate outfit

## 🐛 Troubleshooting

### Common Issues

1. **Gemini API not working**

   - Verify your API key is correct
   - Check if you have sufficient quota
   - Ensure the API key is in `.env.local`

2. **Tasks not persisting**

   - Check browser storage permissions
   - Clear browser cache and try again

3. **Build errors**
   - Delete `node_modules` and reinstall
   - Clear Next.js cache: `rm -rf .next`

### Error Handling

The application includes comprehensive error handling:

- Network errors with retry mechanisms
- API timeout handling (30 seconds)
- Graceful fallbacks for AI failures
- User-friendly error messages
