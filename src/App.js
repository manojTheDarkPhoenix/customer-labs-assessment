import { useState } from 'react';
import './App.css';
import backIcon from './assets/back-icon.png';
import PopupWindow from './components/PopupWindow';

// Main APP function - Root of the component tree
function App() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Toggle the visibility of the popup window
  const togglePopupVisibility = () => {
    setIsPopupVisible(prev => !prev);
  };

  return (
      <div className="App">
        <header className="App-header">
          <section className="header-section">
            <img src={backIcon} alt="Back" className='back-icon' />
            <p className='header-text'>
              View Audience
            </p>          
          </section>        
        </header>  
        <section className='btn-popup-container'>
          <button className='btn-popup' onClick={togglePopupVisibility}>
            Save segment
          </button>
          {/* Overlay for the popup */}
          {isPopupVisible && (
            <div className="popup-overlay">
              <div className="popup-content">
                <PopupWindow hidePopup = {togglePopupVisibility}/>
              </div>
            </div>
          )}
        </section>        
      </div>
  );
}

export default App;
