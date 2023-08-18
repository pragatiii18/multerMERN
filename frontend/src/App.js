import './App.css';
import { Route, Routes } from "react-router-dom";
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { UserList } from './components/UserList';

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/users" element={<UserList/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
