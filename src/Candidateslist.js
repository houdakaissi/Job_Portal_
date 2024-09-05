/*

import React, { useState, useEffect } from 'react';
import './Admine.css';
import Sidebar from './Sidebar';
import Header from './Header';
import EditPopup from './EditPopup';
import './Candidateslist.css';

function Candidateslist() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    useEffect(() => {
        fetch('http://localhost:80/Candidateslist.php')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCandidates(data);
                } else {
                    console.error('Unexpected response format:', data);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleEdit = (candidate) => {
        setSelectedCandidate(candidate);
        setIsEditing(true);
    };

    const handleSave = (updatedCandidate) => {
        setCandidates(candidates.map(candidate =>
            candidate.id === updatedCandidate.id ? updatedCandidate : candidate
        ));
    };

    return (
        <div className="grid-container">
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <Header OpenSidebar={OpenSidebar} />
            <main className='main-container'>
                <div className='main-title'>
                    <h3>DASHBOARD</h3>
                </div>

                <div className='main-cards'>
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>DOB</th>
                                <th>Sex</th>
                                <th>Phone</th>
                                <th>Job Interest</th>
                                <th>Education Level</th>
                                <th>Nationality</th>
                                <th>Languages</th>
                                <th>Resume</th>
                                <th>Delete</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map(candidate => (
                                <tr key={candidate.id}>
                                    <td>{candidate.username}</td>
                                    <td>{candidate.email}</td>
                                    <td>{candidate.password}</td>
                                    <td>{candidate.dob}</td>
                                    <td>{candidate.sex}</td>
                                    <td>{candidate.phone}</td>
                                    <td>{candidate.jobInterest}</td>
                                    <td>{candidate.educationLevel}</td>
                                    <td>{candidate.nationality}</td>
                                    <td>
                                        {candidate.languages.map((lang, index) => (
                                            <div key={index}>
                                                {lang.language} ({lang.level})
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        <a href={`http://localhost:80/${candidate.image_path}`} download>
                                            <button>Download Resume</button>
                                        </a>
                                    </td>
                                    <td>
                                        <button>Delete</button>
                                    </td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {isEditing && (
                    <EditPopup
                        candidate={selectedCandidate}
                        onClose={() => setIsEditing(false)}
                        onSave={handleSave}
                    />
                )}
            </main>
        </div>
    );
}

export default Candidateslist;




*/

import React, { useState, useEffect } from 'react';
import './Admine.css';
import Sidebar from './Sidebar';
import Header from './Header';
import EditPopup from './EditPopup';
import './Candidateslist.css';
import axios from 'axios';

function Candidateslist() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    useEffect(() => {
        fetch('http://localhost:80/Candidateslist.php')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCandidates(data);
                } else {
                    console.error('Unexpected response format:', data);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleEdit = (candidate) => {
        setSelectedCandidate(candidate);
        setIsEditing(true);
    };

    const handleSave = (updatedCandidate) => {
        setCandidates(candidates.map(candidate =>
            candidate.id === updatedCandidate.id ? updatedCandidate : candidate
        ));
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this candidate?")) {
            axios.post('http://localhost/DeleteCandidate.php', { id })
                .then(response => {
                    if (response.data.success) {
                        // Update the state to remove the deleted candidate
                        setCandidates(candidates.filter(candidate => candidate.id !== id));
                    } else {
                        alert('Failed to delete candidate: ' + response.data.message);
                    }
                })
                .catch(error => {
                    console.error('Error deleting candidate:', error);
                    alert('Failed to delete candidate');
                });
        }
    };
    

    return (
        <div className="grid-container">
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <Header OpenSidebar={OpenSidebar} />
            <main className='main-container'>
                <div className='main-title'>
                    <h3>Candidates list</h3>
                </div>

                <div className='main-cards'>
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>DOB</th>
                                <th>Sex</th>
                                <th>Phone</th>
                                <th>Job Interest</th>
                                <th>Education Level</th>
                                <th>Nationality</th>
                                <th>Languages</th>
                                <th>Resume</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map(candidate => (
                                <tr key={candidate.id}>
                                    <td>{candidate.username}</td>
                                    <td>{candidate.email}</td>
                                    <td>{candidate.password}</td>
                                    <td>{candidate.dob}</td>
                                    <td>{candidate.sex}</td>
                                    <td>{candidate.phone}</td>
                                    <td>{candidate.jobInterest}</td>
                                    <td>{candidate.educationLevel}</td>
                                    <td>{candidate.nationality}</td>
                                    <td>
                                        {candidate.languages.map((lang, index) => (
                                            <div key={index}>
                                                {lang.language} ({lang.level})
                                            </div>
                                        ))}
                                    </td>
                                    <td className="resume-cell">
    <a href={`http://localhost:80/${candidate.image_path}`} download className="download-link">
        <button className="download-button">Download Resume</button>
    </a>
</td>
<td className="delete-cell">
    <button className="delete-button" onClick={() => handleDelete(candidate.id)}>Delete</button>
</td>

                                    </tr>
                            ))}
                       </tbody>
                    </table>
                </div>

                {isEditing && (
                    <EditPopup
                        candidate={selectedCandidate}
                        onClose={() => setIsEditing(false)}
                        onSave={handleSave}
                    />
                )}
            </main>
        </div>
    );
}

export default Candidateslist;
