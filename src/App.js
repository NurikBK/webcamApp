import { useState } from "react";
import "./App.css";
import CustomWebcam from "./components/CustomWebCam";


const App = () => {
  const [isOpen, setIsOpen] = useState(false)

  return <div className="App">
    {!isOpen &&
    <button onClick={()=> setIsOpen(true)}>Take a photo</button> }
    {isOpen && 
     <CustomWebcam />
    }
  </div>;
};

export default App;
