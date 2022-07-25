import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import Signin from './Components/Signin/Signin';
import AdminPanel from './Components/Admin/AdminPanel';
import UserPanel from './Components/User/UserPanel';
import Game from './Components/Game/Game';

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
