import { Route, Routes, useLocation } from 'react-router';

import PageNotFound from './views/PNF';
import Home from './views/Home';

import Navbar from './components/Navbar';
import useDarkMode from './hooks/useDarkMode';
import { scrollToTop } from './utils/ScrollToSection';

import './App.css';
import WorkExperience from './views/WorkExperience';
import Projects from './views/Projects';
import VoiceAgent from './views/VoiceAgent';
import { useEffect } from 'react';

const navItems = [
  { 
    label: 'about', 
    path: '/'
  },
  { 
    label: 'experience', 
    path: '/work-experience' 
  },
  { 
    label: 'projects', 
    path: '/projects'
  },
  // { 
  //   label: 'education', 
  //   path: '/education'
  // },
];

function App() {
  useDarkMode();
  const location = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  return (
    <>
      <Navbar navItems={navItems} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/work-experience' element={<WorkExperience />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/voicechat' element={<VoiceAgent />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
