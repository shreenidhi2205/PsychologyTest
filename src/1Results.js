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
    email: '',
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
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.includes('@')) {
      setShowResults(true);

      // Data to be stored in Firebase
      const resultData = {
        name: formData.name,
        collegeName: formData.collegeName,
        standard: formData.standard,
        email: formData.email,
        city: formData.city,
        selfConfidenceScore: selfConfidenceScore,
        leadershipQualityScore: leadershipQualityScore,
        emotionalIntelligenceScore: emotionalIntelligenceScore,
        counsellingPreference: formData.counselling,
        timestamp: new Date().toLocaleString('en-GB', { // Change this to format the date
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).replace(',', ''), // Store date and time when the result was submitted
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
      alert('Please enter a valid email address.');
    }
  };

  const handleDownloadCertificate = () => {
    const doc = new jsPDF('landscape'); // Set the PDF to landscape mode
    const certificateImage = '/Certificate.png'; // Path to your certificate image
  
    doc.addImage(certificateImage, 'PNG', 10, 10, 270, 190); // Adjust dimensions to fit the PDF
    doc.setFont('times', 'bold'); // Set font to Times New Roman and make it bold
    doc.setFontSize(24);
    doc.setTextColor(0, 0, 0);

    // Convert the name to uppercase
    const studentName = formData.name.toUpperCase();
    
    // Calculate the X-coordinate to center the name
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(studentName);
    const nameX = (pageWidth-10 - textWidth) / 2; // Center horizontally
    const nameY = 125; // Y-coordinate for the text

    // Add the text to the certificate
    doc.text(studentName, nameX, nameY);

    doc.save('certificate.pdf'); // Trigger download
};
const commentSelfConfidence = () => {
  if (selfConfidenceScore >= 0 && selfConfidenceScore <= 49) return "You are highly unconfident";
  if (selfConfidenceScore >= 50 && selfConfidenceScore <= 74) return "You are somewhat unconfident";
  if (selfConfidenceScore >= 75 && selfConfidenceScore <= 99) return "You are somewhat confident";
  return "You are highly confident";
};

const commentEmotionalTest = () => {
  if (emotionalIntelligenceScore >= 0 && emotionalIntelligenceScore <= 10) return "You are extremely poor in emotional intelligence";
  if (emotionalIntelligenceScore >= 11 && emotionalIntelligenceScore <= 20) return "You need improvement in emotional intelligence";
  if (emotionalIntelligenceScore >= 21 && emotionalIntelligenceScore <= 30) return "You have comparatively good emotional intelligence";
  if (emotionalIntelligenceScore >= 31 && emotionalIntelligenceScore <= 40) return "You have a very good emotional intelligence";
  return "You have excellent emotional intelligence";
};

const commentLogical = () => {
  if (leadershipQualityScore >= 0 && leadershipQualityScore <= 10) return "You need improvement in leadership qualities";
  if (leadershipQualityScore >= 11 && leadershipQualityScore <= 20) return "You have good leadership qualities";
  return "You have excellent leadership qualities";
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
      adContainer: {
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '5px',
        textAlign: 'center',
      },
      adTitle: {
        fontWeight: '700',
        color: '#2c3e50',
      },
      adText: {
        color: '#34495e',
      },
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
              <label htmlFor="email" style={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
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
            <div style={styles.formGroup}>
    <label style={styles.label}>
      Do you like to avail the facility of Telephonic Counselling for Psychological issues like Study pressure, Stress, Time Management, etc.?
    </label>
    <div>
      <label style={styles.radioLabel}>
        <input
          type="radio"
          name="counselling"
          value="YES"
          onChange={handleInputChange}
          required
          style={styles.radio}
        />
        YES
      </label>
      <br></br>
      <label style={styles.radioLabel}>
        <input
          type="radio"
          name="counselling"
          value="NO"
          onChange={handleInputChange}
          style={styles.radio}
        />
        NO
      </label>
    </div>
      
        </div>
        
            <button type="submit" style={styles.submitButton}>Submit</button>
            <div style={styles.adContainer}>
              <h2 style={styles.adTitle}>🎉 Exclusive Offer Just for You! 🎉</h2>
              <p style={styles.adText}>
                Ace your goals with our <strong>FREE Mock Tests</strong> for Maha-CET - Engineering, BCA, MCA, and MBA!
              </p>
              <p style={styles.adHighlight}>
                💰 Unlock a <strong>Scholarship of ₹10,000/-</strong> with expert counseling! 
              </p>
              <p style={styles.adText}>
                📞 Contact us now at <strong>+91-7424080910</strong> to claim your benefits. 
              </p>
              <p style={styles.adText}>⏳ Limited time offer! Don't miss out!</p>
            </div>
          </form>
        ) : (
          <>
            <p style={styles.description}>
              Here are your scores for the three tests you've completed. These results provide insights into your Self-Confidence, Leadership Qualities, and Emotional Intelligence.
            </p>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Test</th>
                  <th style={styles.th}>Score</th>
                  <th style={styles.th}>Comment</th>                  
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.td}>Self Confidence Test</td>
                  <td style={styles.td}>{selfConfidenceScore}</td>
                  <td style={styles.td}>{commentSelfConfidence()}</td>
                </tr>
                <tr>
                  <td style={styles.td}>Leadership Quality Test</td>
                  <td style={styles.td}>{leadershipQualityScore}</td>
                  <td style={styles.td}>{commentLogical()}</td>
                </tr>
                <tr>
                  <td style={styles.td}>Emotional Intelligence Test</td>
                  <td style={styles.td}>{emotionalIntelligenceScore}</td>
                  <td style={styles.td}>{commentEmotionalTest()}</td>
                </tr>
              </tbody>
            </table>

      
      
   
      <button style={styles.button} onClick={handleDownloadCertificate}>
              Download Certificate
            </button>
            <div style={styles.adContainer}>
              <h2 style={styles.adTitle}>🎉 Exclusive Offer Just for You! 🎉</h2>
              <p style={styles.adText}>
                Ace your goals with our <strong>FREE Mock Tests</strong> for Maha-CET - Engineering, BCA, MCA, and MBA!
              </p>
              <p style={styles.adHighlight}>
                💰 Unlock a <strong>Scholarship of ₹10,000/-</strong> with expert counseling! 
              </p>
              <p style={styles.adText}>
                📞 Contact us now at <strong>+91-7424080910</strong> to claim your benefits. 
              </p>
              <p style={styles.adText}>
  Check out our college website to know more about us{' '}
  <a href="https://www.nmiet.edu.in/" target="_blank" rel="noopener noreferrer">
    https://www.nmiet.edu.in/
  </a>
</p>

      </div>
          </>
        )}
      
      </div>
      
    </>
  );
};

export default Results;
