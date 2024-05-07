import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/login';
import Signup from './components/signup';
import Alert from './components/Alert';
import { useState } from 'react';
import UserInfo from './components/UserInfo';

function App() {
  const [alert , setAlert] = useState(null)
  const showAlert =(message, type)=>{
   setAlert({
    msg:message,
    type:type
   })
   setTimeout(()=>{
     setAlert(null);
   },1500)
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} msg='this is amezing code'/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
              <Route exact path="/userinfo" element={<UserInfo showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  )
}

export default App