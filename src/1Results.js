import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf'; // Import jsPDF library
import Header from './components/Header';
import { db } from './services/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';


const Results = () => {
  const [selfConfidenceScore, setSelfConfidenceScore] = useState(0);
  const [leadershipQualityScore, setLeadershipQualityScore] = useState(0);
  const [emotionalIntelligenceScore, setEmotionalIntelligenceScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    collegeName: '',
    standard: '',
    whatsappNumber: '',
    city: '',
  });

  useEffect(() => {
    const calculateScore = (responses) => {
      return Object.values(responses).reduce((sum, value) => sum + Number(value), 0);
    };

    const selfConfidenceResponses = JSON.parse(localStorage.getItem('selfConfidenceScore') || '{}');
    const leadershipQualityResponses = JSON.parse(localStorage.getItem('leadershipQualityScore') || '{}');
    const emotionalIntelligenceResponses = JSON.parse(localStorage.getItem('emotionalIntelligenceScore') || '{}');

    setSelfConfidenceScore(calculateScore(selfConfidenceResponses));
    setLeadershipQualityScore(calculateScore(leadershipQualityResponses));
    setEmotionalIntelligenceScore(calculateScore(emotionalIntelligenceResponses));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'whatsappNumber') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prevData => ({
        ...prevData,
        [name]: numericValue
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.whatsappNumber.length === 10) {
      setShowResults(true);
      
      // Data to be stored in Firebase
      const resultData = {
        name: formData.name,
        collegeName: formData.collegeName,
        standard: formData.standard,
        whatsappNumber: formData.whatsappNumber,
        city: formData.city,
        selfConfidenceScore: selfConfidenceScore,
        leadershipQualityScore: leadershipQualityScore,
        emotionalIntelligenceScore: emotionalIntelligenceScore,
        dateCompleted: new Date().toISOString(), // Store date when the result was submitted
      };

      try {
        // Add data to Firestore collection
        const docRef = await addDoc(collection(db, 'testResults'), resultData);
        console.log('Document written with ID: ', docRef.id);
        alert('Your results have been submitted successfully!');
      } catch (e) {
        console.error('Error adding document: ', e);
        alert('There was an error submitting your results.');
      }
    } else {
      alert('Please enter a valid 10-digit WhatsApp number.');
    }
  };
  const handleDownloadCertificate = () => {
    const doc = new jsPDF('landscape'); // Set the PDF to landscape mode
    const certificateImage = '/Certificate.png'; // Path to your certificate image
  
    doc.addImage(certificateImage, 'PNG', 10, 10, 270, 190); // Adjust dimensions to fit the PDF
    doc.setFontSize(24);
    doc.setTextColor(0, 0, 0);
  
    // Adjust the position of the student's name to the bottom left
    const nameX = 95; // X-coordinate (closer to the left)
    const nameY = 125; // Y-coordinate (closer to the bottom)
    doc.text(formData.name, nameX, nameY);
  
    doc.save('certificate.pdf'); // Trigger download
  };
  

  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#f0f8ff',
      color: '#333',
      borderRadius: '15px',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
    },
    title: {
      color: '#3498db',
      fontSize: '2.5rem',
      marginBottom: '10px',
    },
    description: {
      fontSize: '1rem',
      color: '#34495e',
      lineHeight: '1.6',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '5px',
      fontWeight: '600',
      color: '#2c3e50',
    },
    input: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #bdc3c7',
      fontSize: '1rem',
      backgroundColor: '#ffffff',
      color: '#2c3e50',
    },
    submitButton: {
      backgroundColor: '#3498db',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'background-color 0.3s ease',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    th: {
      backgroundColor: '#e8f4fd',
      color: '#2c3e50',
      padding: '12px',
      textAlign: 'left',
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #e8f4fd',
    },
    image: {
      width: '100%',
      maxWidth: '400px',
      margin: '20px auto',
      display: 'block',
    },
    button: {
      backgroundColor: '#28a745',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      textAlign: 'center',
      display: 'block',
      margin: '20px auto 0',
    },
    '@media (max-width: 768px)': {
      container: {
        padding: '20px',
      },
      title: {
        fontSize: '2rem',
      },
      description: {
        fontSize: '0.9rem',
      },
      button: {
        padding: '10px 20px',
        fontSize: '0.9rem',
      },
    },
    image: {
      width: '100%', // Image takes up 100% of its container's width
      maxWidth: '400px', // Set a maximum width for larger screens
      height: 'auto', // Maintains the aspect ratio
      margin: '20px auto', // Center the image
      display: 'block',
    },
  };
  
  

  return (
    <>
      <Header />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Your Test Results</h1>
          {!showResults && (
            <p style={styles.description}>
              To view your results, please fill in the information below.
            </p>
          )}
        </div>
        {!showResults ? (
          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Existing form fields */}
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="collegeName" style={styles.label}>College Name</label>
              <input
                type="text"
                id="collegeName"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="standard" style={styles.label}>Standard</label>
              <input
                type="text"
                id="standard"
                name="standard"
                value={formData.standard}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="whatsappNumber" style={styles.label}>WhatsApp Number (10 digits)</label>
              <input
                type="tel"
                id="whatsappNumber"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleInputChange}
                required
                pattern="[0-9]{10}"
                maxLength="10"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="city" style={styles.label}>City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
            </div>
        
            <button type="submit" style={styles.submitButton}>Submit</button>
          </form>
        ) : (
          <>
            <p style={styles.description}>
              Here are your scores for the three tests you've completed. These results provide insights into your self-actualization, leadership qualities, and emotional intelligence.
            </p>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Test</th>
                  <th style={styles.th}>Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.td}>Self-Actualization Test</td>
                  <td style={styles.td}>{selfConfidenceScore}</td>
                </tr>
                <tr>
                  <td style={styles.td}>Leadership Quality Test</td>
                  <td style={styles.td}>{leadershipQualityScore}</td>
                </tr>
                <tr>
                  <td style={styles.td}>Emotional Intelligence Test</td>
                  <td style={styles.td}>{emotionalIntelligenceScore}</td>
                </tr>
              </tbody>
            </table>

            <img 
 
        src="/Summary.png" 
        alt="Summary" 
        style={styles.image} // Updated style for responsiveness
      />
      
   
      <button style={styles.button} onClick={handleDownloadCertificate}>
              Download Certificate
            </button>
          </>
        )}
        
      </div>
    </>
  );
};

export default Results;
