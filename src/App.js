import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import CreatePost from './CreatePost';
import Login from './Login';
import Register from './Register';
import Register2 from './Register2';
import Register3 from './Register3';
import SignUp from './SignUp';


const App = () => {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/register" element={<Register />} />
         <Route path="/create" element={<CreatePost />} />
         <Route path="/register2" element={<Register2 />} />
         <Route path="/register3" element={<Register3 />} />
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<SignUp />} />
         <Route path="/about" element={<Home />} />
      </Routes>
   );
};

export default App;
