import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admine.css';
import Sidebar from './Sidebar';
import Header from './Header';
import './Candidateslist.css';

function JobCompaniesList() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState(null);

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    useEffect(() => {
        axios.get('http://localhost/Companieslistt.php')  // Update the endpoint URL if necessary
            .then(response => {
                if (Array.isArray(response.data)) {
                    setCompanies(response.data);
                } else {
                    setError('Unexpected response format');
                }
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
                setError('Failed to fetch data');
            });
    }, []);
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this company?")) {
            axios.post('http://localhost/DeleteCompany.php', { id })
                .then(response => {
                    console.log("Response:", response.data); // Log response for debugging
                    if (response.data.success) {
                        setCompanies(companies.filter(company => company.id !== id));
                    } else {
                        alert('Failed to delete company: ' + response.data.message);
                    }
                })
                .catch(error => {
                    console.error('There was an error deleting the company!', error);
                    alert('Failed to delete company');
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
            <main className="main-container">
                <div className="main-title">
                    <h3>Company Details</h3>
                </div>

                <div className="main-cards">
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Presentation</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Country</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Company Logo</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map(company => (
                                <tr key={company.id}>
                                    <td>{company.username}</td>
                                    <td>{company.password}</td>
                                    <td>{company.presentation_text}</td>
                                    <td>{company.address}</td>
                                    <td>{company.city}</td>
                                    <td>{company.country}</td>
                                    <td>{company.email}</td>
                                    <td>{company.phone}</td>
                                    <td className="resume-cell">
                                        <a href={`http://localhost:80/${company.image_path}`} download className="download-link">
                                            <button className="download-button">Download Logo</button>
                                        </a>
                                    </td>
                                    <td className="delete-cell">
                                        <button className="delete-button" onClick={() => handleDelete(company.id)}>Delete</button>
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

export default JobCompaniesList;
