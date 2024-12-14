import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';

const SelfConfidenceTest = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState({});
  const [showWarning, setShowWarning] = useState(false);

  const questions = [
    {
      id: 1,
      text: 'On the whole I am satisfied with myself.',
      translation: 'एकूणच मी स्वतःवर समाधानी आहे.',
    },
    {
      id: 2,
      text: 'At times I think I am no good at all.',
      translation: 'कधीकधी मला वाटते की मी अजिबात चांगला नाही.',
    },
    {
      id: 3,
      text: 'I feel that I have a number of good qualities.',
      translation: 'मला वाटते की माझ्यात अनेक चांगले गुण आहेत.',
    },
    {
      id: 4,
      text: 'I am able to do things as well as most other people.',
      translation: 'मी इतर लोकांप्रमाणेच गोष्टी करण्यास सक्षम आहे.',
    },
    {
      id: 5,
      text: 'I feel I do not have much to be proud of.',
      translation: 'मला असे वाटते की माझ्याकडे अभिमान बाळगण्यासारखे काही नाही.',
    },
    {
      id: 6,
      text: 'I certainly feel useless at times.',
      translation: 'मला कधीकधी निरुपयोगी वाटते.',
    },
    {
      id: 7,
      text: 'I feel that I am a person of worth, at least the equal of others.',
      translation: 'मला वाटते की मी योग्य व्यक्ती आहे, किमान इतरांच्या बरोबरीचा आहे.',
    },
    {
      id: 8,
      text: 'I wish I could have more respect for myself.',
      translation: 'माझी इच्छा आहे की मला स्वतःबद्दल अधिक आदर निर्माण करेल.',
    },
    {
      id: 9,
      text: 'All in all, I am not to believe that I am a failure.',
      translation: 'एकंदरीत, मी अयशस्वी आहे असे मानण्याकडे माझा कल नाही.',
    },
    {
      id: 10,
      text: 'I take a positive attitude toward myself.',
      translation: 'मी स्वतःबद्दल सकारात्मक दृष्टिकोन ठेवतो.',
    },
    {
      id: 11,
      text: 'I can always manage to solve difficult problems if I try hard enough.',
      translation: 'जर मी पुरेसा प्रयत्न केला तर मी नेहमीच कठीण समस्या सोडवू शकतो.',
    },
    {
      id: 12,
      text: 'If someone opposes me, I can find the means and other ways to get what I want.',
      translation: 'जर कोणी माझा विरोध करत असेल तर मला हवे ते मिळवण्यासाठी मी मार्ग आणि पर्याय शोधू शकतो.',
    },
    {
      id: 13,
      text: 'It is easy for me to stick to my aims and accomplish my goals.',
      translation: 'माझ्या उद्दिष्टांना चिकटून राहणे आणि माझे ध्येय साध्य करणे माझ्यासाठी सोपे आहे.',
    },
    {
      id: 14,
      text: 'I can speak in front of many people easily.',
      translation: 'मी अनेक लोकांसमोर सहज बोलू शकतो.',
    },
    {
      id: 15,
      text: 'I can remain calm when facing difficulties because I can rely on my coping abilities.',
      translation: 'अडचणींना तोंड देताना मी शांत राहू शकतो कारण मी माझ्या सामना करण्याच्या क्षमतेवर अवलंबून राहू शकतो.',
    },
    {
      id: 16,
      text: 'When I speak, I always think that am I saying right or wrong.',
      translation: 'मी बोलतो तेव्हा मला नेहमी वाटतं की मी बरोबर बोलतोय की चूक.',
    },
    {
      id: 17,
      text: 'I feel relaxed when I find myself alone.',
      translation: 'जेव्हा मी स्वतःला एकटे पाहतो तेव्हा मला आराम वाटतो.',
    },
    {
      id: 18,
      text: 'I can usually handle whatever comes my way.',
      translation: 'मला जे काही येईल ते मी सहसा हाताळू शकतो.',
    },
    {
      id: 19,
      text: 'I believe that I am more intelligent than most individuals.',
      translation: 'माझा विश्वास आहे की मी बहुतेक व्यक्तींपेक्षा अधिक हुशार आहे.',
    },
    {
      id: 20,
      text: 'Given time, I can figure out any complicated intellectual task.',
      translation: 'वेळ दिल्यास, मी कोणतेही गुंतागुंतीचे बौद्धिक कार्य शोधू शकतो.',
    },
    {
      id: 21,
      text: 'I enjoy playing games that involve thinking or solving puzzles.',
      translation: 'मला असे गेम खेळणे आवडते ज्यात विचार करणे किंवा कोडी सोडवणे समाविष्ट आहे.',
    },
    {
      id: 22,
      text: 'I don\'t enjoy discussing complex issues.',
      translation: 'मला गुंतागुंतीच्या मुद्द्यांवर चर्चा करायला आवडत नाही.',
    },
    {
      id: 23,
      text: 'I feel that I can make friends with almost anyone.',
      translation: 'मला वाटते की मी जवळजवळ कोणाशीही मैत्री करू शकतो.',
    },
    {
      id: 24,
      text: 'I never miss out opportunities that come to my way.',
      translation: 'माझ्या वाटेला आलेल्या संधी मी कधीही सोडत नाही.',
    },
    {
      id: 25,
      text: 'I\'ve never had difficulty finding ways to express myself.',
      translation: 'मला स्वतःला व्यक्त करण्याचे मार्ग शोधण्यात कधीही अडचण आली नाही.',
    },
  ];

  const handleChange = (questionId, value) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
    setShowWarning(false);
  };

  const allAnswered = Object.keys(responses).length === questions.length;

  const handleNextTest = () => {
    if (allAnswered) {
      localStorage.setItem('selfConfidenceScore', JSON.stringify(responses));
      navigate('/leadership-test');
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
    },
    radio: {
      marginRight: '5px',
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
          <h1 style={styles.title}>Self Confidence Test</h1>
          <p style={styles.description}>
            These are some questions which analyze your confidence level. You will get an exact scale of your Self-Confidence.
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
            Please answer all questions before proceeding to the next test.
          </div>
        )}
        <button
          onClick={handleNextTest}
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
          Next Test
        </button>
      </div>
    </>
  );
};

export default SelfConfidenceTest;

