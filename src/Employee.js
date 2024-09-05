

import './Employee.css';
import { Link } from 'react-router-dom';
 
import 'react-datepicker/dist/react-datepicker.css';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import bcrypt from 'bcryptjs';

function Employee() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    image: null,
    presentation_text: '',
    address: '',
    zip_code: '',
    city: '',
    country: '',
    email: '',
    phone: ''
  });
 

  const [isSignUp, setIsSignUp] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [loginObj, setLoginObj] = useState({ email: '', password: '' });
  const [signUpObj, setSignUpObj] = useState({
    username: '',
    password: '',
    presentation_text: '',
    address: '',
    zip_code: '',
    city: '',
    country: '',
    email: '',
    phone: '',
    image_path: null
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));

    fetch('http://localhost/you.php', {
      method: 'POST',
      body: formDataToSend
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        setFormData({
          username: '',
          password: '',
          image: null,
          presentation_text: '',
          address: '',
          zip_code: '',
          city: '',
          country: '',
          email: '',
          phone: ''
        });
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to add employee');
      });
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginObj({ ...loginObj, [name]: value });
  };

  const onRegister = () => {
    const hashedPassword = bcrypt.hashSync(signUpObj.password, 10);
    const updatedSignUpObj = { ...signUpObj, password: hashedPassword };
    const formData = new FormData();
    formData.append('image_path', signUpObj.image_path);

    fetch('http://localhost:80/registerEmployee.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedSignUpObj)
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        setSignUpObj({
          username: '',
          password: '',
          presentation_text: '',
          address: '',
          zip_code: '',
          city: '',
          country: '',
          email: '',
          phone: '',
          image_path: null
        });
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Registration failed');
      });
  };

  const onLogin = (type) => {
    fetch('http://localhost:80/loginEmployee.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginObj)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('userType', type);
          localStorage.setItem('username', data.username);
          localStorage.setItem('id', data.id);
          localStorage.setItem('presentation_text', data.presentation_text);
          localStorage.setItem('password', data.password);
          localStorage.setItem('address', data.address);
          localStorage.setItem('zip_code', data.zip_code);
          localStorage.setItem('city', data.city);
          localStorage.setItem('country', data.country);
          localStorage.setItem('email', data.email);
          localStorage.setItem('phone', data.phone);
          localStorage.setItem('image_path', data.image_path);

          console.log("rrrrrrrrrr"+localStorage.getItem('city'));
          login(data.username);
          navigate("/home");
        } else {
          console.error('Login failed:', data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const toggleForm = () => {
    setIsSignUp(false);
    setIsSignIn(true);
  };

  const toggleForm1 = () => {
    setIsSignUp(true);
    setIsSignIn(false);
  };

  useEffect(() => {
    const storedData = localStorage.getItem('signUpObjInitialState');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log('Usernameeeeee:', parsedData.username);
    }
  }, []);
/*
  return (
    <div className="parent">
      <div className={`container ${isSignUp ? 'active' : ''}`} id="container">
        <div className={`form-container sign-up ${isSignUp ? 'active' : ''}`}>
          <form onSubmit={handleSubmit}>
            <h2>Create your account</h2>
            <span>Use your e-mail address for registration</span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
              style={{ width: '310px' }}
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              style={{ width: '310px' }}
            />
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              required
            />
            <textarea
              name="presentation_text"
              value={formData.presentation_text}
              onChange={handleInputChange}
              placeholder="Presentation Text"
              style={{ height: '200px', width: '300px', padding: '10px' }}
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
              style={{ width: '310px' }}
            />
            <div className="phone-input">
              <input
                type="text"
                name="zip_code"
                value={formData.zip_code}
                onChange={handleInputChange}
                placeholder="Zip Code"
                style={{ width: '310px' }}
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                style={{ width: '310px' }}
              />
            </div>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="Country"
              style={{ width: '310px' }}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              style={{ width: '310px' }}
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              style={{ width: '310px' }}
            />
            <button type="submit" style={{ backgroundColor: 'gray' }}>
              Register
            </button>
          </form>
        </div>
        <div className={`form-container sign-in ${isSignIn ? 'active' : ''}`}>
          <form>
            <h1>Connection</h1>
            <input
              type="email"
              name="email"
              value={loginObj.email}
              onChange={handleLoginInputChange}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={loginObj.password}
              onChange={handleLoginInputChange}
              placeholder="Password"
            />
            <button
              style={{ backgroundColor: 'gray' }}
              type="button"
              onClick={onLogin}
            >
              Log in
            </button>
            <Link to="/login/candidate">Login as a candidate?</Link>
          </form>
        </div>
        <div className="toggle-container" style={{ backgroundColor: 'gray' }}>
          <div className="toggle" style={{ backgroundColor: 'gray' }}>
            <div
              className={`toggle-panel toggle-left ${isSignIn ? 'active' : ''}`}
              style={{ backgroundColor: 'gray' ,width:'500px',marginright:'500px'}}
            >
              <h1>Welcome!</h1>
              <p>Enter your personal details to use all the features of the site</p>
              <button
                type="button"
                className="hidden"
                id="login"
                onClick={toggleForm}
              >
                Log in
              </button>
            </div>
            <div
              className={`toggle-panel toggle-right ${isSignUp ? 'active' : ''}`}
              style={{ backgroundColor: 'gray',width:'200px' }}
            >
              <h1>Hello!</h1>
              <p>Enter your personal details to use all the features of the site</p>
              <button
                type="button"
                className="hidden"
                id="register"
                onClick={toggleForm1}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  */

  return (
    <div  style={{maxHeight:'400px'}} className="parent">
      <div  style={{maxHeight:'400px'}} className="tab-container">
        <div className={`tab ${isSignUp ? 'active' : ''}`} onClick={() => setIsSignUp(true)}>
          Sign Up
        </div>
        <div className={`tab ${!isSignUp ? 'active' : ''}`} onClick={() => setIsSignUp(false)}>
          Sign In
        </div>
      </div>
      <div  style={{maxHeight:'1400px'}} className={`form-container ${isSignUp ? 'active' : ''}`} id="container">
        {isSignUp ? (
          <div className="form sign-up">
            <form onSubmit={handleSubmit}>
              <h2>Create your account</h2>
              <span>Use your e-mail address for registration</span>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                style={{ width: '310px' }}
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                style={{ width: '310px' }}
              />
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                required
              />
              <textarea
                name="presentation_text"
                value={formData.presentation_text}
                onChange={handleInputChange}
                placeholder="Presentation Text"
                style={{ height: '200px', width: '300px', padding: '10px' }}
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                style={{ width: '310px' }}
              />
              <div className="phone-input">
                <input
                  type="text"
                  name="zip_code"
                  value={formData.zip_code}
                  onChange={handleInputChange}
                  placeholder="Zip Code"
                  style={{ width: '310px' }}
                />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  style={{ width: '310px' }}
                />
              </div>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Country"
                style={{ width: '310px' }}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                style={{ width: '310px' }}
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                style={{ width: '310px' }}
              />
              <button type="submit" style={{ backgroundColor: 'gray' }}>
                Register
              </button>
            </form>
          </div>
        ) : (
          <div   style={{minHeight:'400px'}} className="form sign-in">
            <form   style={{backgroundColor:'white',minHeight:'500px',minWidth:'400px'}}>
              <h1 style={{textAlign:'center'}}>Connection</h1>
              <input   className="custom-placeholder"
                type="email"
               
                name="email"
                value={loginObj.email}
                onChange={handleLoginInputChange}
                placeholder="Email"
              />
              <input style={{backgroundColor:'white'}}  className="custom-placeholder"
                type="password"
                name="password"
                value={loginObj.password}
                onChange={handleLoginInputChange}
                placeholder="Password"
              />
                 
              <button 
                style={{ color:'white', backgroundColor: 'blue',margintop:'120px' }}
                type="button"
                onClick={() => onLogin('company')}
              >
                Log in
              </button>
              <Link style={{marginbottom:'120px'}} to="/Candidate">Login as a candidate?</Link>
             <div><Link to="/Company/register">You don't have an account?</Link></div>
            </form>
          </div>
        )}
        
      </div>
      {/* Example of using switchToRegister to change to the register tab */}
     
    </div>
  );
 
}

export default Employee;
