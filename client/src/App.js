import './App.css';
import { Route, Routes } from 'react-router-dom';
import homePage from './Pages/HomePage/HomePage';
import ChatPage from './Pages/Chat/ChatPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={homePage} exact/>
        <Route path='/chats' Component={ChatPage} />
      </Routes>
    </div>
  );
}

export default App;
