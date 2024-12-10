const styles = {
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    marginBottom: '20px',
    position: 'relative',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: 'calc(100% - 60px)',
  },
  logo: {
    height: '50px',
    marginRight: '20px',
  },
};

const MyComponent = () => {
  return (
    <div style={styles.headerContainer}>
      <div style={styles.logoContainer}>
        <img 
          src="/WhatsApp Image 2024-12-07 at 14.38.48_d1e2c5bf (2).jpg" 
          alt="PCET Logo" 
          style={styles.logo}
        />
        <img 
          src="/S-Brainiac.png" 
          alt="Brainiac Logo" 
          style={styles.logo}
        />
        <img 
          src="/WhatsApp Image 2024-12-07 at 14.37.53_a807a9fd (1).jpg" 
          alt="NMIET Logo" 
          style={styles.logo}
        />
      </div>
    </div>
  );
};

export default MyComponent;