import { BrowserRouter, Route, Routes } from 'react-router';

import PageNotFound from './views/PNF';
import Home from './views/Home';

import Navbar from './components/Navbar';
import useDarkMode from './hooks/useDarkMode';

import './App.css';
import WorkExperience from './views/WorkExperience';
import Projects from './views/Projects';

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

  return (
    <BrowserRouter>
    <Navbar navItems={navItems} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/work-experience' element={<WorkExperience />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
