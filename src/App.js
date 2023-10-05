import { useState } from 'react';
import './App.css';
import CustomWebcam from './components/CustomWebCam';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      {!isOpen && (
        <div className="btn-container">
          <button onClick={() => setIsOpen(true)}>Take a photo</button>
        </div>
      )}
      {isOpen && <CustomWebcam />}
    </div>
  );
};

export default App;
