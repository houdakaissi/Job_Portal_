
/*
import React from 'react';
import './List.css';
import { Link } from 'react-router-dom'; 
function List() {
const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:80/alljobs.php') // Ensure this URL matches your PHP script's location
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON from the response
      })
      .then(data => {
        setJobList(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const jobList = [
    {
      id: 1,
      image: 'data:image/jpeg;base64,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',
      jobTitle: 'Software Developer',
      jobDescription: 'Develop software applications and solutions.',
      educationLevel: 'Bachelor\'s Degree',
      salary: '$80,000 - $120,000 per year',
    },
    {
      id: 2,
      image: 'https://i0.wp.com/www.engineeringandleadership.com/wp-content/uploads/2019/02/Engineer.png?fit=975%2C651&ssl=1',
      jobTitle: 'Data Analyst',
      jobDescription: 'Analyze data to provide insights and recommendations.',
      educationLevel: 'Bachelor\'s Degree',
      salary: '$60,000 - $100,000 per year',
    },
    {
      id: 3,
      image: 'https://res.cloudinary.com/people-matters/image/upload/q_auto,f_auto/v1655916908/1655916907.jpg',
      jobTitle: 'UX/UI Designer',
      jobDescription: 'Design user interfaces and user experiences.',
      educationLevel: 'Bachelor\'s Degree',
      salary: '$70,000 - $110,000 per year',
    },
  ];

  return (

    <div className="list-container">
       
      {jobList.map(job => (
         
        <div key={job.id} className="card">
         
          <img src={job.image} alt={job.jobTitle} className="card-image" />
          <div className="card-content">
            <h2 className="job-title">{job.description}</h2>
            <p className="job-description">{job.salary_level}</p>
            <p className="education-level"><strong>Education Level:</strong> {job.education_level}</p>
            
            
            <Link style={{marginBottom:'20px',color:'red'}}to="/details" className="more-buttonn">
        ..More
      </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default List;



*/

 /*
 
  
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:80/alljobs.php') // Ensure this URL matches your PHP script's location
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON from the response
      })
      .then(data => {
        console.log('Fetched job data:', data); 
        setJobList(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
       
      <p className="big-text">vvvvvvvvvvvv</p>
      <img  className="big-textt" src=" https://media.jamf.com/images/Industries/macbook-pro-office-53-full-bleed.jpg?q=80&w=2000" alt="Image 1" />

       
      {jobList.length > 0 ? (
        jobList.map(job => (
          <div key={job.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <p className="text-lg font-semibold">{job.company_id}</p>
            <p className="text-lg font-semibold">{job.username}</p>
            <p className="text-gray-600 mb-2"><strong>Description:</strong> {job.description}</p>
            <p className="text-gray-600 mb-2"><strong>Salary Level:</strong> {job.salary_level}</p>
            <p className="text-gray-600 mb-2"><strong>Education Level:</strong> {job.education_level}</p>
            <div className="flex justify-end">
              <Link to={`/details/${job.job_id}`} className="text-blue-500 hover:underline">More</Link>
            </div>
          </div>
        ))
      ) : (
        <p>No job advertisements found.</p>
      )}
    </div>
  );
  */

  

  import React, { useState, useEffect } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import moment from 'moment';
  import { FaClock } from 'react-icons/fa';
  import './List.css';
  
    function List() {
      const [currentPage, setCurrentPage] = useState(1);
     
      const navigate = useNavigate();
      const [visibleJobId, setVisibleJobId] = useState(null);
      const [jobList, setJobList] = useState([]);
      const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const handleDetailsClick = (jobId,companyId) => {
      localStorage.setItem('job_id',jobId);
      localStorage.setItem('company_id',companyId);
     console.log("houdddddddda"+localStorage.getItem('company_id'));
     
      const userType = localStorage.getItem('userType');
      if (!userType) {
        alert('Please log in first.');
      } else {
        navigate(`/details/${jobId}`);
      }
    };
    /*
    useEffect(() => {
      fetch('http://localhost:80/get_job_data.php') // Ensure the URL is correct and matches your PHP script location
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // Parse JSON from the response
        })
        .then(data => {
          console.log('Fetched job data:', data); // Log the fetched data for debugging
          setJobList(data);
          const userType = localStorage.getItem('userType');
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching job data:', err); // Log any errors
          setError(err);
          setLoading(false);
        });
    }, []);
       
  */
    useEffect(() => {
      fetch('http://localhost:80/get_job_data.php') // Ensure the URL is correct and matches your PHP script location
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // Parse JSON from the response
        })
        .then(data => {
          console.log('Fetched job data:', data); // Log the fetched data for debugging
         
          setJobList(data);
          setFilteredJobs(data); // Initialize filteredJobs with fetched data
          localStorage.setItem('company_id',data.company_id);
          console.log("rrrrrrrrrrrrrrrrrr"+localStorage.getItem('company_id'));
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching job data:', err); // Log any errors
          setError(err);
          setLoading(false);
        });
    }, []);
 


      const handleDetailsClickk = (jobId) => {
        // Toggle visibility of job details
        setVisibleJobId(prevId => (prevId === jobId ? null : jobId));
    };
    const JOBS_PER_PAGE = 10;
   
   

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
 const handleSearch = () => {
    if (searchTerm) {
      const filtered = jobList.filter(job => {
        const jobName = job.jobname ? job.jobname.toLowerCase() : '';
        return jobName.includes(searchTerm.toLowerCase());
      });
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(jobList); // Show all jobs if searchTerm is empty
    }
  };

  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    return (
     <div clssName="c">
       
       <img className="big-textt" src="https://media.jamf.com/images/Industries/macbook-pro-office-53-full-bleed.jpg?q=80&w=2000" alt="Header Image" />
        <div style={{marginBottom:'2250px'}} className="search-container">
          
        <input
          style={{ width: '300px' }}
          type="text"
          placeholder="Search by job name..."
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <button style={{ width: '200px' }} onClick={handleSearch} className="search-button">
          Search
        </button>
              </div>
      
         
     <div   className="listt">
      

       
           
      

            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
        
            <div   key={job.job_id} className="list">
                 
              {job.image_path && (
                <img
                  className="company-image"
                  src={job.image_path}
                  alt="Company"
                  style={{ width: '100px', height: '110px', objectFit: 'cover', objectPosition: 'center' }}
                />
              )}
              
              <p className=" username text-lg font-semibold ">  {job.jobname || 'N/A'}</p>
              
              <p className=" description text-gray-600 mb-2  truncate-four-lines"><strong> </strong>
               {job.description || 'N/A'}</p>
              <p className=" salary "><strong> </strong> {job.salary_level || 'N/A'} /Month</p>
              <p className="  education text-gray-600 mb-2"><strong> </strong> {job.education_level || 'N/A'}</p>
              
             
           
              <div className="more flex justify-end">
              <button style={{marginBottom:'60px'}} onClick={() => handleDetailsClick(job.job_id,
                job.company_id)} className="more-button">
                     {visibleJobId === job.job_id ? 'Details' : 'Details'}
                </button>
              </div>
            
             
              {visibleJobId === job.job_id && (
          <div  className="job-details">
             hiiii
          </div>
      )}




              <p classNamme="p"> <FaClock />  {moment(job.created_at).fromNow()}</p>
             
            </div>
        
          ))
         
        ) : (
         <div className="pp"> <p>No job advertisements found.</p></div>
        )}
        </div>
     
      </div>
    
    );
    




  }
  
  export default List;

  












