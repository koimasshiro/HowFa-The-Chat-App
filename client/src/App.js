import './App.css';
import { Route, Routes } from 'react-router-dom';
import homePage from './Pages/HomePage/HomePage';
import ChatPage from './Pages/Chat/ChatPage';
import AuthPage from './Pages/AuthPage/AuthPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={homePage} exact/>
        <Route path='/chats' Component={ChatPage} />
        <Route path='/auth' Component={AuthPage} />
      </Routes>
    </div>
  );
}

export default App;
