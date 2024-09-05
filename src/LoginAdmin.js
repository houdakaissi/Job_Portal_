import React, { useState } from 'react';
import './LoginAdmin.css'; // Import the CSS styles
import { useNavigate } from 'react-router-dom';
function LoginAdmin() {
  const defaultUsername = process.env.REACT_APP_USERNAME || '';
  const defaultPassword = process.env.REACT_APP_PASSWORD || '';

  const [username, setUsername] = useState(defaultUsername);
  const [password, setPassword] = useState(defaultPassword);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = {
      username,
      password
    };

    try {
      const response = await fetch('http://localhost:80/loginadmin.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const token = data.token;

      // Store the token in localStorage
     
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      console.log(username);
      // Redirect or update the UI as needed
      console.log('Login successful');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{minHeight:'500px',position:'absolute',bottom:'800px'}} className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <form style={{height:'500px'}}className="fo" onSubmit={handleLogin}>
        <h3>Login Here</h3>
           <div style={{position:'absolute',top:'720px',left:'220px',width:'480px',height:'500px',backgroundColor:'white',
 border: '2px solid rgba(0, 0, 0, 0.1)',
 boxShadow: '0 0 40px rgba(8, 7, 16, 0.6)'


           }}> 
           <h3>Login Here</h3>
        <label  htmlFor="username" style={{marginLeft:'40px'}}>Username</label>
        <input
        style={{width:'400px',backgroundColor:'#E8E8E8',marginLeft:'40px'}}
          type="text"
          placeholder="Email or Phone"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password" style={{marginLeft:'40px'}}>Password</label>
        <input
         style={{width:'400px',backgroundColor:'#E8E8E8',marginLeft:'40px'}}
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={{backgroundColor:'blue',width:'400px',color:'white',marginLeft:'40px'}}type="submit">Log In</button>
        </div>
        <div className="social"></div>
      </form>
    </div>
  );
}

export default LoginAdmin;
