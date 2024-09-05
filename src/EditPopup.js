import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditPopup.css';

function EditPopup({ candidate, onClose, onSave }) {
    const [formData, setFormData] = useState(candidate);

    useEffect(() => {
        setFormData(candidate);
    }, [candidate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:80/UpdateCandidate.php', formData)
            .then(response => {
                if (response.data.success) {
                    onSave(formData); // Update the candidate data in the parent component
                    onClose(); // Close the popup
                } else {
                    alert('Failed to update candidate');
                }
            })
            .catch(error => alert('Error updating candidate'));
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Edit Candidate</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Date of Birth:
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Sex:
                        <input
                            type="text"
                            name="sex"
                            value={formData.sex}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Phone:
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Job Interest:
                        <input
                            type="text"
                            name="jobInterest"
                            value={formData.jobInterest}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Education Level:
                        <input
                            type="text"
                            name="educationLevel"
                            value={formData.educationLevel}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Nationality:
                        <input
                            type="text"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default EditPopup;
