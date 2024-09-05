import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import Navbar from './Navbar';
import SuccessModal from './SuccessModal'; // Import the SuccessModal component
import { Link } from 'react-router-dom';
function Details() {
  const a = localStorage.getItem('jobInterest');
  const { id } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
      
  const levelMap = {
    0: "Fluent",
    1: "itermediate",
    2: "Beginner"
  };
  useEffect(() => {
    fetch(`http://localhost:80/jobsdetails.php?job_id=${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setJob(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [id]);
/*
  const handleApply = () => {
    const company_id = localStorage.getItem('company_id');
    const job_id = localStorage.getItem('job_id');
    const candidate_id = localStorage.getItem('id');

    fetch('http://localhost:80/jobapplicationss.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        company_id,
        job_id,
        candidate_id,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setShowModal(true); // Show the modal on success
      })
      .catch(err => {
        console.error('Apply error:', err);
      });
  };
*/
const handleApply = () => {
  const company_id = localStorage.getItem('company_id');
  const job_id = localStorage.getItem('job_id');
  const candidate_id = localStorage.getItem('id');

  console.log({ company_id, job_id, candidate_id }); // Debugging

  fetch('http://localhost/jobapplicationss.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      company_id,
      job_id,
      candidate_id,
    }),
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text); });
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data); // Debugging
      setShowModal(true); // Show the modal on success
    })
    .catch(err => {
      console.error('Apply error:', err);
    });
};

  const closeModal = () => setShowModal(false); // Close the modal

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Navbar />
    <div className="d">
      {job ? (

        <div className="details-container">
            
            <table>
            <td>
            <Link to='/home'  style={{ textDecoration: 'none' }}>  <h3 className="pr" style={{ color: 'red' }}>  _ Previous annonce </h3> </Link>

             
            <br/>
            <br/>
        <div className="hi">
         <h1> {job.jobname || 'N/A'}</h1>
         <p>
  
  <span className="inline-info">{job.city}   |    {job.country}   |   Published:  {job.created_at || 'N/A'}</span> 
  
</p>
          <h3>{job.description || 'No Description Available'}
            kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
            jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
            jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
          </h3>
          <br/>
          <br/>
          <ul>
        <li><strong>Salary Level:</strong> {job.salary_level || 'N/A'}</li>
        <li><strong>Education Level:</strong> {job.education_level || 'N/A'}</li>
        <li>
          <strong>Language Levels:</strong> 
          {job.language_levels && typeof job.language_levels === 'object' 
            ? (
              <ul>
                {Object.entries(job.language_levels).map(([language, level]) => (
                  <li key={language}>: {level}</li>
                ))}
              </ul>
            ) 
            : 'N/A'}  

        </li>
      </ul>
      <br/>
      <br/>
     
          
          {a && (
            <button style={{backgroundColor:'green',color:'white'}} onClick={handleApply}>Apply</button>
          )}
          </div>
      </td>
      </table>
          <div>
     
    </div>
 
        </div>
            
      ) : (
        <p>No job details found.</p>
      )}
      </div>
      {showModal && <SuccessModal onClose={closeModal} />} {/* Render the modal if showModal is true */}
    </div>
  );
}

export default Details;
