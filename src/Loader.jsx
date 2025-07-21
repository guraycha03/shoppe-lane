// Loader.jsx


// Loader.jsx

function Loader() {
    return (
      <div
        id="splash"
        className="splash-screen"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1050,
          backgroundImage: "url('/images/loader-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: "'Cormorant Garamond', serif",
        }}
      >
        {/* Logo */}
        <img
          src="/images/logo.png"
          className="splash-logo"
          alt="Mini Boutique Logo"
          style={{
            width: '100px',
            height: '100px',
            objectFit: 'cover',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            marginBottom: '1.5rem',
          }}
        />
  
        {/* Ribbon Wrapper */}
        <div className="ribbon-wrapper" style={{
          position: 'relative',
          width: '100%',
          height: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}>
          {/* Ribbon Background */}
          <div className="ribbon-bg" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '200px',
            backgroundColor: '#e7d7c7',
            zIndex: 1,
          }}></div>
  
          {/* SVG Bow */}
          <img
            src="/images/gift-bow.svg"
            alt="Bow"
            className="svg-bow"
            style={{
              position: 'absolute',
              top: '-50px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '300px',
              maxWidth: '80%',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />
  
          {/* Title */}
          <h1 className="splash-title" style={{
            position: 'relative',
            zIndex: 2,
            fontSize: '2.2rem',
            fontWeight: 700,
            color: '#4b392b',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            margin: 0,
            backgroundColor: '#e7d7c7',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
          }}>
            Mini Boutique
          </h1>
        </div>
      </div>
    );
  }
  

  
export default Loader;

  