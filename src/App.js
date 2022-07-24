import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import AdminPanel from './components/Admin/AdminPanel';
import UserPanel from './components/User/UserPanel';

function App() {
  return (
    <ChakraProvider>

  <BrowserRouter>
      <Routes>
        <Route path='/signup' element= {<Signup/>} />
        <Route path='/' element= {<Signin/>} />
        <Route path='/admin' element= {<AdminPanel/>} />
        <Route path='/user' element= {<UserPanel/>} />
      </Routes>
    </BrowserRouter>

    </ChakraProvider>
  );
}

export default App;
