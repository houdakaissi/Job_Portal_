/*
import React, { useState, useEffect } from 'react';
import './Admine.css';
import Sidebar from './Sidebar';
import Header from './Header';
import './Applicationlist.css';

function Joblist() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    // Fetch job data from backend
    useEffect(() => {
        fetch('http://localhost/Jobslist.php') // Replace with the correct URL
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setJobs(data);
                } else {
                    setError('Unexpected response format');
                }
            })
            .catch(error => {
                console.error('Error fetching job data:', error);
                setError('Failed to fetch job data');
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="grid-container">
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <Header OpenSidebar={OpenSidebar} />

            <main style={{backgroundColor:'white'}} className='main-container'>
                <div className='main-title'>
                    <h3>DASHBOARD</h3>
                </div>

                <div className='main-cards'>
                    <table>
                        <thead>
                            <tr>
                                <th>Job ID</th>
                                <th>Company ID</th>
                                <th>Description</th>
                                <th>Salary Level</th>
                                <th>City</th>
                                <th>Country</th>
                                <th>Education Level</th>
                                <th>Language Levels</th>
                                <th>Job name</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map(job => (
                                <tr key={job.job_id}>
                                    <td>{job.job_id}</td>
                                    <td>{job.company_id}</td>
                                    <td>{job.description}</td>
                                    <td>{job.salary_level}</td>
                                    <td>{job.city}</td>
                                    <td>{job.country}</td>
                                    <td>{job.education_level}</td>
                                    <td>{job.language_levels}</td>
                                    <td>{job.jobname}</td>
                                    <td><button>delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default Joblist;
*/

import React, { useState, useEffect } from 'react';
import './Admine.css';
import Sidebar from './Sidebar';
import Header from './Header';
import './Applicationlist.css';
import axios from 'axios';

function Joblist() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    // Fetch job data from backend
    useEffect(() => {
        fetch('http://localhost/Jobslist.php') // Replace with the correct URL
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setJobs(data);
                } else {
                    setError('Unexpected response format');
                }
            })
            .catch(error => {
                console.error('Error fetching job data:', error);
                setError('Failed to fetch job data');
            });
    }, []);

    const handleDelete = (jobId) => {
        if (window.confirm("Are you sure you want to delete this job?")) {
            axios.post('http://localhost/DeleteJob.php', { job_id: jobId })
                .then(response => {
                    if (response.data.success) {
                        // Remove the deleted job from the list
                        setJobs(jobs.filter(job => job.job_id !== jobId));
                    } else {
                        alert('Failed to delete job: ' + response.data.message);
                    }
                })
                .catch(error => {
                    console.error('There was an error deleting the job!', error);
                    alert('Failed to delete job');
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

            <main  className='main-container'>
                <div className='main-title'>
                    <h3>Jobs list</h3>
                </div>

                <div className='main-cards'>
                    <table>
                        <thead>
                            <tr>
                                <th>Job ID</th>
                                <th>Company ID</th>
                                <th>Description</th>
                                <th>Salary Level</th>
                                <th>City</th>
                                <th>Country</th>
                                <th>Education Level</th>
                                <th>Language Levels</th>
                                <th>Job name</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map(job => (
                                <tr key={job.job_id}>
                                    <td>{job.job_id}</td>
                                    <td>{job.company_id}</td>
                                    <td>{job.description}</td>
                                    <td>{job.salary_level}</td>
                                    <td>{job.city}</td>
                                    <td>{job.country}</td>
                                    <td>{job.education_level}</td>
                                    <td>{job.language_levels}</td>
                                    <td>{job.jobname}</td>
                                    <td className="delete-cell">
                                        <button  className="delete-button" onClick={() => handleDelete(job.job_id)}>Delete</button>
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

export default Joblist;
