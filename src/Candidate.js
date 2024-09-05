
import './Candidate.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
 
function Candidate() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginObj, setLoginObj] = useState({ email: '', password: '' });
  const [userId, setUserType] = useState(null);
  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = (type) => {
    fetch('http://localhost:80/loginCandidate.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginObj),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        setUserType(type);
    // Optionally store userType in local storage
    localStorage.setItem('userType', type);
        localStorage.setItem('id', data.id);
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', data.email);
        localStorage.setItem('dob', data.dob);
        localStorage.setItem('sex', data.sex);
        localStorage.setItem('phone', data.phone);
        localStorage.setItem('countryCode', data.countryCode);
        localStorage.setItem('jobInterest', data.jobInterest);
        localStorage.setItem('educationLevel', data.educationLevel);
        localStorage.setItem('nationality', data.nationality);
        localStorage.setItem('languages', JSON.stringify(data.languages));
        login(data.username);
        navigate('/home');
      } else {
        console.error('Login failed:', data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div style={{ maxHeight: '700px', maxWidth: '400px', overflow: 'hidden' }} className="parent">
  <div style={{ minHeight: '600px', maxWidth: '400px' , overflow: 'hidden' }} className="container">
    <div style={{ minHeight: '70px', maxWidth: '400px' , overflow: 'hidden' }} className="form-container sign-in">
      <form style={{ minHeight: '700px', maxWidth: '400px' , overflow: 'hidden' }}>
            <h1>Connection</h1>
            <input style={{width:'350px'}}
              type="email"
              name="email"
              value={loginObj.email}
              onChange={handleInputChange(setLoginObj)}
              placeholder="Email"
            />
            <input
            style={{width:'350px'}}
              type="password"
              name="password"
              value={loginObj.password}
              onChange={handleInputChange(setLoginObj)}
              placeholder="Password"
            />
           
           <button style={{backgroundColor:'blue',color:'white',width:'200px'}}type="button" onClick={() => onLogin('candidate')}>
  Se connecter
</button>
<h2><Link to='/Candidate/register'>You don't have an account?</Link></h2>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Candidate;




