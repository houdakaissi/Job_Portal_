/*
import React, { useState, useEffect } from 'react';
import './Admine.css';
import Sidebar from './Sidebar';
import Header from './Header';
import './Applicationlist.css';

function Applicationlist() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    useEffect(() => {
        fetch('http://localhost/Applicationlist.php') // Ensure this URL is correct
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setApplications(data);
                } else {
                    console.error('Unexpected response format:', data);
                    setError('Unexpected response format');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                                <th>Company Name</th>
                                <th>Job Description</th>
                                <th>Candidate Name</th>
                                <th>Candidate Email</th>
                                <th>Resume</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.company_username}</td>
                                    <td>{row.job_description}</td>
                                    <td>{row.candidate_username}</td>
                                    <td>{row.candidate_email}</td>
                                    <td>
                                        <a href={`http://localhost/${row.candidate_image_path}`} download>
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
            </main>
        </div>
    );
}

export default Applicationlist;
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admine.css';
import Sidebar from './Sidebar';
import Header from './Header';
import './Applicationlist.css';

function Applicationlist() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    useEffect(() => {
        fetch('http://localhost/Applicationlist.php')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setApplications(data);
                } else {
                    console.error('Unexpected response format:', data);
                    setError('Unexpected response format');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
            });
    }, []);

    const handleDelete = (applicationId) => {
        if (window.confirm("Are you sure you want to delete this application?")) {
            axios.post('http://localhost/DeleteApplication.php', { id: applicationId })
                .then(response => {
                    if (response.data.success) {
                        setApplications(applications.filter(application => application.id !== applicationId));
                    } else {
                        alert('Failed to delete application: ' + (response.data.message || 'Unknown error'));
                    }
                })
                .catch(error => {
                    console.error('Error deleting application:', error);
                    alert('Failed to delete application');
                });
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                                <th>Company Name</th>
                                <th>Job Description</th>
                                <th>Candidate Name</th>
                                <th>Candidate Email</th>
                                <th>Resume</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map(row => (
                                <tr key={row.id}>
                                    <td>{row.company_username}</td>
                                    <td>{row.job_description}</td>
                                    <td>{row.candidate_username}</td>
                                    <td>{row.candidate_email}</td>
                                    <td>
                                        <a href={`http://localhost/${row.candidate_image_path}`} download>
                                            <button>Download Resume</button>
                                        </a>
                                    </td>
                                    <td className="delete-cell">
                                        <button  className="delete-button" onClick={() => handleDelete(row.application_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default Applicationlist;
