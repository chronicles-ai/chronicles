import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CounterPage from './pages/development/counter-page.tsx';
import TanstackPage from './pages/development/tanstack-page.tsx';
import ErrorPage from './pages/error-page.tsx';
import HomePage from './pages/home-page.tsx';
import ReadStoryLighthousePage from './pages/read-story-lighthouse-page.tsx';
import ReadStoryPage from './pages/read-story-page.tsx';
import Root from './pages/root.tsx';
import DevSimilarityPage from './pages/students/dev-similarity-page.tsx';
import HistoryPage from './pages/students/history-page.tsx';
import TaskPage from './pages/students/task/task-page.tsx';
import ClassAssignmentDetailsPage from './pages/teacher/assignments/assignment-details-page.tsx';
import AssignmentDiscussionPage from './pages/teacher/assignments/assignment-discussion-page.tsx';
import AssignmentLayout from './pages/teacher/assignments/assignment-layout.tsx';
import ClassAssignmentPage from './pages/teacher/class-assignment-page.tsx';
import ClassLayout from './pages/teacher/class-layout.tsx';
import ClassListPage from './pages/teacher/class-list-page.tsx';
import ClassOverviewPage from './pages/teacher/class-overview-page.tsx';
import ClassTeamsPage from './pages/teacher/class-teams-page.tsx';
import store from './states/stores';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route path="/" element={<HomePage />} />

      {/* Dev features */}
      <Route path="/dev-similarity" element={<DevSimilarityPage />} />
      <Route path="/dev-query" element={<TanstackPage />} />

      {/* Student */}
      <Route path="/task" element={<TaskPage />} />
      <Route path="/counter" element={<CounterPage />} />
      <Route path="/sample-story" element={<ReadStoryLighthousePage />} />

      <Route path="/story/:id" element={<ReadStoryPage />} />

      <Route path="/history" element={<HistoryPage />} />

      {/* Teacher */}
      <Route path="/class" element={<ClassListPage />} />
      <Route element={<ClassLayout />}>
        <Route path="/class/:id/" element={<ClassOverviewPage />} />
        <Route path="/class/:id/teams" element={<ClassTeamsPage />} />
        <Route
          path="/class/:id/assignments"
          element={<ClassAssignmentPage />}
        />
      </Route>

      {/* Teacher - Assignment */}
      <Route
        path="/class/:id/assignments/:genapId/:ganjilId"
        element={<AssignmentLayout />}
      >
        <Route
          path="/class/:id/assignments/:genapId/:ganjilId"
          element={<ClassAssignmentDetailsPage />}
        />
        <Route
          path="/class/:id/assignments/:genapId/:ganjilId/discussion"
          element={<AssignmentDiscussionPage />}
        />
      </Route>
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
