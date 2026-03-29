import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import JobDetails from './pages/JobDetails';
import CreateJob from './pages/CreateJob';
import EditJob from './pages/EditJob';
import MyJobs from './pages/MyJobs';
import MyApplications from './pages/MyApplications';
import EmployerApplications from './pages/EmployerApplications';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="jobs/:id" element={<JobDetails />} />
          
          {/* Protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path="profile" element={<Profile />} />
          </Route>
          
          <Route element={<PrivateRoute requiredRole="employer" />}>
            <Route path="jobs/create" element={<CreateJob />} />
            <Route path="jobs/edit/:id" element={<EditJob />} />
            <Route path="my-jobs" element={<MyJobs />} />
            <Route path="employer/jobs/:jobId/applications" element={<EmployerApplications />} />
          </Route>
          
          <Route element={<PrivateRoute requiredRole="candidate" />}>
            <Route path="my-applications" element={<MyApplications />} />
          </Route>
          
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-email/:id/:hash" element={<VerifyEmail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;