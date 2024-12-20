import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import RecruitmentJobs from './components/RecruitmentJobs';
import JobDetail from './components/jobs/JobDetail';
import PublicJobPage from './components/jobs/public/PublicJobPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/job/:id"
          element={<PublicJobPage />}
        />
        <Route
          path="/*"
          element={
            <div className="flex h-screen bg-gray-50">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
                  <Routes>
                    <Route path="/" element={<RecruitmentJobs />} />
                    <Route path="/jobs" element={<RecruitmentJobs />} />
                    <Route path="/jobs/:id" element={<JobDetail />} />
                  </Routes>
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}