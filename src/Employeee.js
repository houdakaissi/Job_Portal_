import './Employeee.css';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';

function Employeee() {
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
        window.location.href = '/Company';
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

  return (
    <div className="parent">
      <div className="form-container">
        <form style={{backgroundColor:'white'}} onSubmit={handleSubmit} className="forme">
          <h2>Create your account</h2>
       
          <input className="input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            style={{ width: '310px'  , backgroundColor: 'white'}}
          />
          <input
            type="password" className="input"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            style={{ width: '310px'  , backgroundColor: 'white'}}
          />
          <input   className="input"
            type="file"
            name="image"
            onChange={handleImageChange}
            required
          />
          <textarea   className="textarea"
            name="presentation_text"
            value={formData.presentation_text}
            onChange={handleInputChange}
            placeholder="Presentation Text"
            style={{ height: '200px', width: '300px', padding: '10px' , backgroundColor: 'white' }}
          />
          <input className="input"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            style={{ width: '310px' , backgroundColor: 'white' }}
          />
          <div className="phone-input">
            <input className="input"
              type="text"
              name="zip_code"
              value={formData.zip_code}
              onChange={handleInputChange}
              placeholder="Zip Code"
              style={{ width: '310px' , backgroundColor: 'white' }}
            />
            <input className="input"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              style={{ width: '310px'  , backgroundColor: 'white'}}
            />
          </div>
          <input className="input"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Country"
            style={{ width: '310px'  , backgroundColor: 'white'}}
          />
          <input className="input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            style={{ width: '310px' , backgroundColor: 'white' }}
          />
          <input className="input"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            style={{ width: '310px' , backgroundColor: 'white' }}
          />
          <button type="submit" style={{ backgroundColor: 'blue',color:'white' }}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Employeee;
