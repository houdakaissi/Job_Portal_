import './App.css'; // Import your CSS file
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Employee from './Employee'; 
import Employeee from './Employeee'; 
import Candidate from './Candidate';
import Candidatee from './Candidatee';
import Pro from './Pro';
import Home from './home';
 import Applicationlist from './Applicationlist';
import Details from './Details';
import Profilecandidate from './ProfileCandidate';
import Profile from './Profile';
import AddJob from './AddJob';
import SeeJob from './seejob';
import You from './you';
import Applications from './applications';
import { AuthProvider } from './AuthContext';
import UserProfile from './UserProfile';
// Assuming Employee component is imported
import Admin from './Admine';
import LoginAdmin from './LoginAdmin';
import ProtectedRoute from './ProtectedRoute';
import ReactDOM from 'react-dom';
import Companieslist from './Companieslist';
import Profilecompany from './Profilecompany';
import Candidateslist from './Candidateslist'; 
import Joblist from './Joblist';
 
function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
     
      <Route path="/admin" element={<LoginAdmin />} />
        <Route path="/Company" element={<Employee />} />
        <Route path="/Company/register" element={<Employeee />} />
        <Route path="/Candidate" element={<Candidate />} />
        <Route path="/Candidate/register" element={<Candidatee />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/profile" element={<Profilecompany />} />
        <Route path="/details" element={<Details />} />
        <Route path="/addjob" element={<AddJob />} />
        <Route path="/seejob" element={<SeeJob />} />
        
        <Route path="/details/:id" element={<Details />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/you" element={<You />} />
       
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Admin />} />
        </Route>
        <Route path="/home/:username" element={<UserProfile />} />
        <Route path="/dashboard/Applications" element={<Applicationlist />} />
        <Route path="/dashboard/Jobs" element={<Joblist />} />
        <Route path="/dashboard/Candidates" element={<Candidateslist />} />
        <Route path="/dashboard/Companies" element={<Companieslist />} />
        <Route path="/home/profile1" element={<Profilecandidate />} />
        <Route path="/Pro" element={<Pro />} />
        {/* Add more routes as needed */}
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
