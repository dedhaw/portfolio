import { BrowserRouter, Route, Routes } from 'react-router';

import PageNotFound from './views/PNF';
import Home from './views/Home';

import Navbar from './components/Navbar';
import useDarkMode from './hooks/useDarkMode';

import './App.css';

const navItems = [
  { 
    label: 'Home', 
    path: '/'
  },
  { 
    label: 'About', 
    path: '/about' 
  },
  { 
    label: 'Contact', 
    path: '/contact'
  },
];

function App() {
  useDarkMode();

  return (
    <BrowserRouter>
    <Navbar logoText={"/logo.png"} navItems={navItems} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
