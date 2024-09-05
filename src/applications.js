
/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './applications.css'; // Ensure you import your CSS file
import Navbar from './Navbar';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost/jobapplications.php?company_id=1'); // Adjust company_id as needed
        setApplications(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="aa">
      <Navbar />
      <div className="ag-format-container">
        <div className="ag-courses_box">
          {applications.map((app) => (
            <div className="ag-courses_item" key={app.jobapplication_id}>
                 
              <a href="#" className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>
                <div className="ag-courses-item_title">
                <h2>Job Application {app.jobapplication_id}</h2>
                        <p><strong>Job ID:</strong> {app.job_id}</p>
                        <p><strong>Company ID:</strong> {app.company_id}</p>
                  {app.jobname}
                  <br />
                  {app.username}
                  <br />
                  <a href={app.cv_path} download={${app.candidate_name}_CV.pdf}>
                    Download CV
                  </a>
                </div>
                <div className="ag-courses-item_date-box">
                  Start: {app.phone} {app.email}
                  <br />
                  <span className="ag-courses-item_date">
                    Date when sent: {app.date_sent}
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Applications;
*/

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import './applications.css'; // Ensure you import your CSS file
import Navbar from './Navbar';

function Applications() {

   
    const [clickedLinks, setClickedLinks] = useState({}); // State to track clicked links
  
    const handleClick = (username) => {
      setClickedLinks((prevClickedLinks) => ({
        ...prevClickedLinks,
        [username]: true,
      }));
    };
    const [popup, setPopup] = useState({ show: false, message: '' });

    const handleDelete = async (appId) => {
      try {
        // Delete the application from the server
        const response = await axios.post('http://localhost/delete_app.php', { id: appId });
        if (response.data.success) {
          // Remove the application from the state
          setApplications((prevApplications) =>
            prevApplications.filter((app) => app.jobapplication_id !== appId)
          );
  
          // Show success popup
          setPopup({ show: true, message: 'Application was deleted successfully!' });
  
          // Hide popup after 3 seconds
          setTimeout(() => setPopup({ show: false, message: '' }), 3000);
        } else {
          console.error('Failed to delete application:', response.data.error);
        }
      } catch (error) {
        console.error('Error deleting application:', error.message);
      }
    };
  


  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const company_id = localStorage.getItem('id');
        console.log("jjjjjjjjjjjjj",company_id);
        //try with 1${company_id}
        const response = await axios.get(`http://localhost/jobapplications.php?company_id=${company_id}`);
        console.log('Response data:', response.data); // Log response data
        if (Array.isArray(response.data)) {
          setApplications(response.data);
     
         
        } else {
          setError("Unexpected data format");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchApplications();
  }, []);
  /*
  const handleDownload = async (relativePath, filename, appId) => {
    const baseUrl = 'http://localhost/';
    const url = new URL(relativePath, baseUrl).href;
    console.log("Downloading from URL:", url);
  
    // Update seen state in database
    try {
      const response = await fetch('http://localhost/update_seen.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: appId }), // Ensure 'appId' is correctly passed
      });
      const data = await response.json();
      if (data.success) {
        console.log('Seen state updated successfully.');
        
        // Now trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.download = filename || 'downloaded-file.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error('Failed to update seen state:', data.error);
      }
    } catch (error) {
      console.error('Error updating seen state:', error.message);
    }
  };
  */
  
  
  
  const handleDownload = (relativePath, filename) => {
    const baseUrl = 'http://localhost/'; // Adjust this to match your server's base URL
    const url = new URL(relativePath, baseUrl).href;
    console.log("Downloading from URL:", url);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'downloaded-file.pdf'; // Fallback filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="aa">
      <Navbar />
      <div  className="ag-format-container">
      <div style={{fontSize:'30px',marginBottom:'-38px',textAlign:'center'}}>Applications </div>
        <div style={{ marginBottom: '800px'
     }} className="ag-courses_box">
    
          {applications.map((app) => (
            <div   className="ag-courses_item" key={app.jobapplication_id}>
                
              <a href="#" className="ag-courses-item_link">
                <div className="ag-courses-item_bg">
             
                </div>
                <div className="ag-courses-item_title">
                 
               
                  <br />
                 
                  <div  className="info-container">
                
  <div className="job-name" style={{fontSize:'20px'}}> Job name: {app.jobname}</div>
  <div className="candidate-name"  style={{fontSize:'20px'}}>Candidate name:  {app.username}</div>
  <div className="email"  style={{fontSize:'20px'}}>Email:  {app.email}</div>
  <div className="phone"  style={{fontSize:'20px'}}>Phone:  {app.phone}</div>
  <div className="email"  style={{fontSize:'20px'}}>
  <Link onClick={() => handleDownload(app.image_path, `${app.username}.pdf`)}>
                        Download the CV
                      </Link>
                    </div>
</div>
               

                
                </div>
                <div className="ag-courses-item_date-box">
                <button style={{backgroundColor:'white'}}onClick={() => handleDelete(app.jobapplication_id)} className="delete-button">X</button>
              
                </div>
                {popup.show && (
        <div className="popup">
          {popup.message}
        </div>
      )}

              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Applications;
