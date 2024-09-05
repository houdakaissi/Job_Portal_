import './Employeee.css';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';

const allLanguages = [
  'English', 'Spanish', 'Chinese', 'Hindi', 'Arabic', // Add all 55 languages here
];

const levelsList = [
  'Beginner', 'Intermediate', 'Advanced'
];

function Candidatee() {
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    password:'',
    email: '',
    password: '',
    dob: '',
    sex: '',
    phone: '',
    countryCode: '',
    jobInterest: '',
    educationLevel: '',
    nationality: '',
    image_path: null,
    candidate_id: '',
    languages: [] // Initialize with an empty array
  });

  const [availableLanguages, setAvailableLanguages] = useState(allLanguages);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image_path: e.target.files[0] });
  };

  const handleLanguageChange = (index, field) => (e) => {
    const { value } = e.target;
    const newLanguages = [...formData.languages];
    newLanguages[index] = { ...newLanguages[index], [field]: value };
    setFormData({ ...formData, languages: newLanguages });
  };

  const addLanguage = (language) => {
    if (!formData.languages.some(lang => lang.language === language)) {
      setFormData({
        ...formData,
        languages: [...formData.languages, { language, level: '' }]
      });
      setAvailableLanguages(availableLanguages.filter(lang => lang !== language));
    }
  };

  const removeLanguage = (index) => {
    const removedLanguage = formData.languages[index].language;
    setFormData({
      ...formData,
      languages: formData.languages.filter((_, i) => i !== index)
    });
    setAvailableLanguages([...availableLanguages, removedLanguage].sort());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'languages') {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    fetch('http://localhost/registerCandidate.php', {
      method: 'POST',
      body: formDataToSend
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        setFormData({
          id: '',
          username: '',
          email: '',
          password: '',
          dob: '',
          sex: '',
          phone: '',
          countryCode: '',
          jobInterest: '',
          educationLevel: '',
          nationality: '',
          image_path: null,
          candidate_id: '',
          languages: [] // Reset languages array
        });
        setAvailableLanguages(allLanguages); // Reset available languages
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to add candidate');
      });
  };

  return (
    <div className="parent">
      <div className="form-container">
        <form style={{backgroundColor:'white',overflowX: 'auto'}} onSubmit={handleSubmit} className="forme">
          <h2>Create your account</h2>

          <input className="input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            style={{ width: '310px', backgroundColor: 'white' }}
          />
          <input className="input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            style={{ width: '310px', backgroundColor: 'white' }}
          />
             <input className="input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            style={{ width: '310px', backgroundColor: 'white' }}
          />
          <input className="input"
            type="file"
            name="image_path"
            onChange={handleImageChange}
          />
         
         
          <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputDob">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    style={{ width: '310px', backgroundColor: 'white' }}
                  />
                </div>
          <input className="input"
            type="text"
            name="sex"
            value={formData.sex}
            onChange={handleInputChange}
            placeholder="Sex"
            style={{ width: '310px', backgroundColor: 'white' }}
          />
          <input className="input"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            style={{ width: '310px', backgroundColor: 'white' }}
          />
          <input className="input"
            type="text"
            name="countryCode"
            value={formData.countryCode}
            onChange={handleInputChange}
            placeholder="Country Code"
            style={{ width: '310px', backgroundColor: 'white' }}
          />
          <input className="input"
            type="text"
            name="jobInterest"
            value={formData.jobInterest}
            onChange={handleInputChange}
            placeholder="Job Interest"
            style={{ width: '310px', backgroundColor: 'white' }}
          />
          <select
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleInputChange}
            style={{ width: '310px', backgroundColor: 'white' }}
          >
            <option value="">Select Education Level</option>
            <option value="High School">High School</option>
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="PhD">PhD</option>
          </select>
          <input className="input"
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
            placeholder="Nationality"
            style={{ width: '310px', backgroundColor: 'white' }}
          />

          {/* Language section */}
          <div>
            <h3>Languages</h3>
            {formData.languages.map((lang, index) => (
              <div key={index} className="language-item">
                <span>{lang.language}</span>
                <select
                  value={lang.level}
                  onChange={handleLanguageChange(index, 'level')}
                  style={{ width: '150px', backgroundColor: 'white' }}
                >
                  <option value="">Select Level</option>
                  {levelsList.map((level, i) => (
                    <option key={i} value={level}>{level}</option>
                  ))}
                </select>
                <button type="button" onClick={() => removeLanguage(index)}>Remove</button>
              </div>
            ))}
          <div style={{ display: 'flex', alignItems: 'center' }}>
  <select
    onChange={(e) => addLanguage(e.target.value)}
    style={{ width: '150px', backgroundColor: 'white', marginRight: '10px' }}
  >
    <option value="">Select Language</option>
    {availableLanguages.map((language, i) => (
      <option key={i} value={language}>{language}</option>
    ))}
  </select>
  <button
    type="button"
    onClick={() => addLanguage(document.querySelector('select').value)}
    style={{ backgroundColor: 'blue',color:'white' }}
  >
    Add Language
  </button>
</div>

          </div>

          <button type="submit" style={{ backgroundColor: 'blue',color:'white' }}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Candidatee;

