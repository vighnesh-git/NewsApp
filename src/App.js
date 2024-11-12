import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


const App = () => {
  const apikey = process.env.REACT_APP_API_KEY
  const [progress, setProgress] = useState(0)
  
  return (
    <>
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<News setProgress={setProgress} apikey={apikey}key="general" pageSize={6} country="us" category="general" />} />
        <Route exact path="/business" element={<News setProgress={setProgress} apikey={apikey}key="business" pageSize={6} country="us" category="business" />} />
        <Route exact path="/entertainment" element={<News setProgress={setProgress} apikey={apikey}key="entertainment" pageSize={6} country="us" category="entertainment" />} />
        <Route exact path="/general" element={<News setProgress={setProgress} apikey={apikey}key="general" pageSize={6} country="us" category="general" />} />
        <Route exact path="/health" element={<News setProgress={setProgress} apikey={apikey}key="health" pageSize={6} country="us" category="health" />} />
        <Route exact path="/science" element={<News setProgress={setProgress} apikey={apikey}key="science" pageSize={6} country="us" category="science" />} />
        <Route exact path="/sports" element={<News setProgress={setProgress} apikey={apikey}key="sports" pageSize={6} country="us" category="sports" />} />
        <Route exact path="/technology" element={<News setProgress={setProgress} apikey={apikey}key="technology" pageSize={6} country="us" category="technology" />} />
      </Routes>
    </>
  );
  
}
export default App;