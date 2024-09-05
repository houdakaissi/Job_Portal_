import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

import './addjob.css';

function AddJob() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [storedId, setStoredId] = useState('');
  const [storedCity, setStoredCity] = useState('');
  const [formData, setFormData] = useState({
    company_id: '',
    jobname: '',
    description: '',
    salary_level: '',
    city: '',
    country: '',
    education_level: '',
    language_levels: []
  });
  const [message, setMessage] = useState('');

  const salaryLevels = ['Entry', 'Mid', 'Senior', 'Lead'];
  const educationLevels = ['High School', 'Associate Degree', 'Bachelor’s Degree', 'Master’s Degree', 'PhD'];
  const availableLanguages = ['English', 'Spanish', 'French', 'German', 'Chinese'];

  useEffect(() => {
    const id = localStorage.getItem('id');
    const city = localStorage.getItem('city');

    if (id) {
      setStoredId(id);
      setFormData(prevData => ({
        ...prevData,
        company_id: id
      }));
    }

    if (city) {
      setStoredCity(city);
      setFormData(prevData => ({
        ...prevData,
        city: city
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      const updatedFormData = { ...prevData, [name]: value };

      if (name === 'city') {
        localStorage.setItem('city', value);
      }

      return updatedFormData;
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prevData => {
      const updatedLanguages = checked
        ? [...prevData.language_levels, value]
        : prevData.language_levels.filter(lang => lang !== value);

      return { ...prevData, language_levels: updatedLanguages };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      language_levels: formData.language_levels
    };

    try {
     // const response = await fetch('http://localhost:3005/addjob', {
      const response = await fetch('http://localhost:/addjob.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      const result = await response.text();
      setMessage(result);
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    }
  };


  return (
    <div>
      <Navbar />
      <div  >
        <div >
          <h1>Submit Job Advertisement</h1>
         
            <div>
              <label htmlFor="company_id">Company ID</label>
              <input
                type="number"
                id="company_id"
                name="company_id"
                value={formData.company_id}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="jobname">Job Name</label>
              <input
                id="jobname"
                name="jobname"
                value={formData.jobname}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="salary_level">Salary Level</label>
              <select
                id="salary_level"
                name="salary_level"
                value={formData.salary_level}
                onChange={handleChange}
                required
              >
                <option value="">Select Salary Level</option>
                {salaryLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="education_level">Education Level</label>
              <select
                id="education_level"
                name="education_level"
                value={formData.education_level}
                onChange={handleChange}
                required
              >
                <option value="">Select Education Level</option>
                {educationLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Language Levels</label>
              <div >
                {availableLanguages.map(language => (
                  <label key={language}>
                    <input
                      type="checkbox"
                      value={language}
                      checked={formData.language_levels.includes(language)}
                      onChange={handleCheckboxChange}
                    />
                    {language}
                    <span className="formbold-checkbox-checkmark"></span>
                  </label>
                ))}
              </div>
            </div>
            <div>
            <button onClick={handleSubmit}>Submit</button>
              <button type="submit" className="formbold-btn">Submit</button>
            </div>
            <div>
              <p>{message}</p>
            </div>
    
        </div>
      </div>
    </div>
  );
}

export default AddJob;
