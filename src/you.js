import React, { useState } from 'react';

const AddEmployeeForm = () => {
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
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('image', formData.image);
    formDataToSend.append('presentation_text', formData.presentation_text);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('zip_code', formData.zip_code);
    formDataToSend.append('city', formData.city);
    formDataToSend.append('country', formData.country);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);

    fetch('http://localhost/you.php', {
      method: 'POST',
      body: formDataToSend
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message); // Show success message
      // Optionally, reset the form fields
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
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="Username" required />
      <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" required />
      <input type="file" name="image" onChange={handleImageChange} required />
      <textarea name="presentation_text" value={formData.presentation_text} onChange={handleInputChange} placeholder="Presentation Text" required />
      <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" required />
      <input type="text" name="zip_code" value={formData.zip_code} onChange={handleInputChange} placeholder="Zip Code" required />
      <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" required />
      <input type="text" name="country" value={formData.country} onChange={handleInputChange} placeholder="Country" required />
      <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" required />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployeeForm;
