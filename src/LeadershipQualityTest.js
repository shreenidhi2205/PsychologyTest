import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';

const LeadershipQualityTest = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState({});
  const [showWarning, setShowWarning] = useState(false);

  const questions = [
    {
      id: 1,
      text: 'Enthusiasm: I have energy, a positive attitude, and I am motivated.',
      translation: 'उत्साह: माझ्यात ऊर्जा आहे, सकारात्मक दृष्टीकोन आहे आणि मी प्रेरित असतो.',
    },
    {
      id: 2,
      text: 'Preparation: I assess the situation, understand the audience, know how to prepare? How to report?',
      translation: 'तयारी करणे: मी परिस्थितीचे आकलन करतो, प्रेक्षक समजतो, तयारी कशी करावी हे मला माहीत आहे?, अहवाल कसा द्यावा?',
    },
    {
      id: 3,
      text: 'Communicate well with others: Effective speaker, able to work with all kinds of people, tactful, good listener.',
      translation: 'इतरांशी चांगला संवाद साधा: प्रभावी वक्ता, सर्व प्रकारच्या लोकांसोबत काम करण्यास सक्षम, कुशल, चांगला श्रोता आहे.',
    },
    {
      id: 4,
      text: 'Caring: I am sensitive to others, I accept others for who they are, compassionate, good sense of humor.',
      translation: 'काळजी घेणे: मी इतरांबद्दल संवेदनशील आहे, मी इतरांना स्वीकारतो, ते जसे आहेत तसे!, मी दयाळू, विनोदबुद्धी असणारा आहे.',
    },
    {
      id: 5,
      text: 'Creativity: I can express ideas, can come up with helpful suggestions, I try to brainstorm for new ideas.',
      translation: 'सर्जनशीलता: मी कल्पना व्यक्त करू शकतो, उपयुक्त सूचना देऊ शकतो, मी नवीन कल्पनांसाठी विचारमंथन करण्याचा प्रयत्न करतो.',
    },
    {
      id: 6,
      text: 'Problem-Solver: I can tackle problems, I am resourceful, I think through difficulties.',
      translation: 'समस्या - सोडवणारा: मी समस्यांना सामोरे जाऊ शकतो, मी साधनसंपन्न आहे, मी अडचणींचा विचार करतो.',
    },
    {
      id: 7,
      text: 'Character: I act in an ethical manner, honest, not led astray by peer pressure.',
      translation: 'चारित्र्य: मी नैतिक रीतीने वागतो, प्रामाणिकपणे वागतो, सम वयातील तुलनेला बळी पडत नाही.',
    },
    {
      id: 8,
      text: 'Adaptability: Can cope with unexpected, can accept change.',
      translation: 'अनुकूलता: अनपेक्षित गोष्टींचा सामना करू शकतो, बदल स्वीकारू शकतो.',
    },
    {
      id: 9,
      text: 'Dependability: I am reliable, others can trust me, I make good on my promises, keep on task.',
      translation: 'अवलंबित्व: मी विश्वासार्ह आहे, इतर माझ्यावर विश्वास ठेवू शकतात, मी माझ्या वचनांची पूर्तता करतो, कार्य करत रहतो.',
    },
    {
      id: 10,
      text: 'Cooperation: Work well with others. (Even those I may not like.)',
      translation: 'सहकार्य: इतरांसोबत चांगले काम करतो/करते. (अगदी मला ते लोक आवडत नसतील, तरीही मी उत्तम काम करतो/करते).',
    },
  ];

  const handleChange = (questionId, value) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
    setShowWarning(false);
  };

  const allAnswered = Object.keys(responses).length === questions.length;

  const handleNextTest = () => {
    if (allAnswered) {
      localStorage.setItem('leadershipQualityScore', JSON.stringify(responses));
      navigate('/emotional-intelligence-test');
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
      color: '#1e3a8a',
      fontSize: '2.5rem',
      marginBottom: '10px',
    },
    description: {
      fontSize: '1rem',
      color: '#4a5568',
      lineHeight: '1.6',
      marginBottom: '20px',
    },
    instructions: {
      backgroundColor: '#e0f2fe',
      padding: '15px',
      borderRadius: '8px',
      marginBottom: '30px',
      fontSize: '0.9rem',
      color: '#1e40af',
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
      color: '#2c5282',
    },
    questionTranslation: {
      fontSize: '0.9rem',
      color: '#4a5568',
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
    },
    radio: {
      marginRight: '5px',
    },
    warning: {
      backgroundColor: '#feb2b2',
      color: '#9b2c2c',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '20px',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    nextButton: {
      backgroundColor: '#3182ce',
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
          <h1 style={styles.title}>Leadership Quality Test</h1>
          <p style={styles.description}>
            How I rank Myself in Qualities of being a Leader? This test will give you the clarity of leadership quality as well as your actual state in the form of Leader.
          </p>
          <div style={styles.instructions}>
            <strong>Important Instructions:</strong>
            <br />
            May we request you to fill this form carefully and genuinely, so you will get accurate results. It will be useful for your personality development. Be Genuine, Careful, and Honest.
            <br />
            <br />
            Please note that the results will be shared with your college/school, so answer genuinely.
          </div>
        </div>
        {questions.map((q) => (
          <div 
            key={q.id} 
            style={{
              ...styles.questionCard,
              transform: responses[q.id] ? 'scale(1.02)' : 'scale(1)',
              boxShadow: responses[q.id] ? '0 6px 8px rgba(0, 0, 0, 0.15)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <p style={styles.questionText}>{q.id}. {q.text}</p>
            <p style={styles.questionTranslation}>{q.translation}</p>
            <div style={styles.options}>
            {[
  { label: 'I definitely have this quality', value: 2 },
  { label: "I'm pretty good at this", value: 4 },
  { label: 'I need to work on this', value: 6 },
  { label: 'I need help in how to do this', value: 8 }
].map((option, index) => (
  <label key={index} style={styles.option}>
    <input
      type="radio"
      name={`q${q.id}`}
      value={option.value}
      onChange={() => handleChange(q.id, option.value)}
      checked={responses[q.id] === option.value}
      style={styles.radio}
    />
    {option.label}
  </label>
))}

            </div>
          </div>
        ))}
        {showWarning && (
          <div style={styles.warning}>
            Please answer all questions before proceeding to the next test.
          </div>
        )}
        <button
          onClick={handleNextTest}
          style={{
            ...styles.nextButton,
            backgroundColor: allAnswered ? '#3182ce' : '#90cdf4',
            cursor: allAnswered ? 'pointer' : 'not-allowed',
          }}
          onMouseEnter={(e) => {
            if (allAnswered) {
              e.target.style.backgroundColor = '#2c5282';
              e.target.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (allAnswered) {
              e.target.style.backgroundColor = '#3182ce';
              e.target.style.transform = 'scale(1)';
            }
          }}
        >
          Next Test
        </button>
      </div>
    </>
  );
};

export default LeadershipQualityTest;

