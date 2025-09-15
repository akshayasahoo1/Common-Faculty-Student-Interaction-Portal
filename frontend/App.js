import { Routes, Route } from 'react-router-dom';
     import Home from './components/Home';
     import Login from './components/Login';
     import Register from './components/Register';
     import StudentDashboard from './components/StudentDashboard';
     import FacultyDashboard from './components/FacultyDashboard';
     import FAQs from './components/FAQs';

     function App() {
       return (
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/login/student" element={<Login role="student" />} />
           <Route path="/login/faculty" element={<Login role="faculty" />} />
           <Route path="/register/student" element={<Register role="student" />} />
           <Route path="/register/faculty" element={<Register role="faculty" />} />
           <Route path="/dashboard" element={<StudentDashboard />} />
           <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
           <Route path="/faqs" element={<FAQs />} />
         </Routes>
       );
     }

     export default App;