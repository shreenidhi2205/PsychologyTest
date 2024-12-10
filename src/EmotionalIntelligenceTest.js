import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';

const EmotionalIntelligenceTest = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState({});
  const [showWarning, setShowWarning] = useState(false);

  const questions = [
    {
      id: 1,
      text: 'I can recognize my emotions as I experience them.',
      translation: 'मी माझ्या भावना अनुभवत असताना त्या ओळखू शकतो.',
    },
    {
      id: 2,
      text: 'I lose my temper when I feel frustrated.',
      translation: 'मला निराशा वाटते तेव्हा मी माझा राग अनावर होतो.',
    },
    {
      id: 3,
      text: 'I know how to calm myself down when I feel anxious or upset.',
      translation: 'मला चिंता वाटते किंवा मी अस्वस्थ असतो तेव्हा मला स्वतःला कसे शांत करायचे हे माहित आहे.',
    },
    {
      id: 4,
      text: 'I find it hard to focus on something over the long term.',
      translation: 'मला दीर्घकाळासाठी एखाद्या गोष्टीवर लक्ष केंद्रित करणे कठीण वाटते.',
    },
    {
      id: 5,
      text: 'I can \'read\' people\'s emotions by looking at their facial expressions.',
      translation: 'मी लोकांच्या चेहऱ्यावरील भाव पाहून त्यांच्या भावना \'वाचू\' शकतो.',
    },
    {
      id: 6,
      text: 'I am aware of the non-verbal messages other people send.',
      translation: 'इतर लोक पाठवत असलेल्या अशाब्दिक संदेशांची मला जाणीव असते.',
    },
    {
      id: 7,
      text: 'When I am faced with a challenge, I give up because I believe I will fail.',
      translation: 'जेव्हा मला आव्हानाचा सामना करावा लागतो, तेव्हा मी अपयशी होईन असे वाटून मी सोडून देतो.',
    },
    {
      id: 8,
      text: 'I help other people feel better when they are down.',
      translation: 'इतर लोक नाराज असतात तेव्हा मी त्यांना बरे वाटण्यास मदत करतो.',
    },
    {
      id: 9,
      text: 'I use good moods to help myself keep trying in the face of obstacles.',
      translation: 'अडथळ्यांना तोंड देताना मी स्वतःला प्रयत्न करत राहण्यास मदत करण्यासाठी चांगल्या मनःस्थितीचा वापर करतो.',
    },
    {
      id: 10,
      text: 'I can tell how people are feeling by listening to the tone of their voice.',
      translation: 'लोकांच्या आवाजाचा सूर ऐकून ते कसे वाटत आहेत हे मी सांगू शकतो.',
    },
  ];

  const handleChange = (questionId, value) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
    setShowWarning(false);
  };

  const allAnswered = Object.keys(responses).length === questions.length;

  const handleViewResults = () => {
    if (allAnswered) {
      localStorage.setItem('emotionalIntelligenceScore', JSON.stringify(responses));
      navigate('/results');
    } else {
      setShowWarning(true);
    }
  };

  const styles = {
    container: {
      fontFamily: "'Poppins', sans-serif",
      padding: '40px',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#ded1fc',
      color: '#333',
      borderRadius: '15px',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
    },
    title: {
      color: '#2c3e50',
      fontSize: '2.5rem',
      marginBottom: '10px',
    },
    description: {
      fontSize: '1rem',
      color: '#34495e',
      lineHeight: '1.6',
      marginBottom: '20px',
    },
    instructions: {
      backgroundColor: '#e8f4fd',
      padding: '15px',
      borderRadius: '8px',
      marginBottom: '30px',
      fontSize: '0.9rem',
      color: '#2980b9',
      lineHeight: '1.6',
    },
    questionCard: {
      backgroundColor: '#ffffff',
      padding: '20px',
      marginBottom: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    questionText: {
      fontWeight: '600',
      marginBottom: '10px',
      color: '#2c3e50',
    },
    questionTranslation: {
      fontSize: '0.9rem',
      color: '#7f8c8d',
      marginBottom: '15px',
      fontStyle: 'italic',
    },
    options: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
    },
    option: {
      display: 'flex',
      alignItems: 'center',
      marginRight: '15px',
      cursor: 'pointer',
      color: '#333',
    },
    radio: {
      marginRight: '5px',
      accentColor: '#2c3e50',
    },
    warning: {
      backgroundColor: '#ff6b6b',
      color: '#fff',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '20px',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    nextButton: {
      backgroundColor: '#3498db',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      display: 'block',
      margin: '30px auto 0',
      transition: 'background-color 0.3s ease, transform 0.1s ease',
    },
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Emotional Intelligence Test</h1>
          <p style={styles.description}>
            This test will help you understand your level of emotional intelligence. Answer honestly to get the most accurate results.
          </p>
          <div style={styles.instructions}>
            <strong>Important Instructions:</strong>
            <br />
            Please answer all questions carefully and honestly. Your results will be used to provide insights into your emotional intelligence.
          </div>
        </div>
        {questions.map((q) => (
          <div 
            key={q.id} 
            style={{
              ...styles.questionCard,
              transform: responses[q.id] ? 'scale(1.02)' : 'scale(1)',
              boxShadow: responses[q.id] ? '0 6px 8px rgba(0, 0, 0, 0.2)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <p style={styles.questionText}>{q.id}. {q.text}</p>
            <p style={styles.questionTranslation}>{q.translation}</p>
            <div style={styles.options}>
              {['Strongly Disagree', 'Disagree', 'Neither Agree nor Disagree', 'Agree', 'Strongly Agree'].map((option, index) => (
                <label key={index} style={styles.option}>
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    value={index + 1}
                    onChange={() => handleChange(q.id, index + 1)}
                    checked={responses[q.id] === index + 1}
                    style={styles.radio}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        {showWarning && (
          <div style={styles.warning}>
            Please answer all questions before viewing your results.
          </div>
        )}
        <button
          onClick={handleViewResults}
          style={{
            ...styles.nextButton,
            backgroundColor: allAnswered ? '#3498db' : '#bdc3c7',
            cursor: allAnswered ? 'pointer' : 'not-allowed',
          }}
          onMouseEnter={(e) => {
            if (allAnswered) {
              e.target.style.backgroundColor = '#2980b9';
              e.target.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (allAnswered) {
              e.target.style.backgroundColor = '#3498db';
              e.target.style.transform = 'scale(1)';
            }
          }}
        >
          View Results
        </button>
      </div>
    </>
  );
};

export default EmotionalIntelligenceTest;
