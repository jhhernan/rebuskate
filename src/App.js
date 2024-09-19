import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import CustomHome from './CustomHome';
import CreatePost from './CreatePost';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import Register2 from './Register2';
import RegisterExpert from './RegisterExpert';
import PreRegister from './PreRegister';
import Post from './Post';
import LightRegister from './LightRegister';
import Register3 from './Register3';
import SignUp from './SignUp';
import RequireAuth from '@auth-kit/react-router/RequireAuth';


const App = () => {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         {/* <Route path="/custom" element={<CustomHome />} /> */}
         <Route path={'/custom'} element={
            <RequireAuth fallbackPath={'/login?redirect=/custom'}>
               <CustomHome />
            </RequireAuth>
         } />
         <Route path="/register" element={<Register />} />
         {/* <Route path="/create" element={<CreatePost />} /> */}
         <Route path={'/create'} element={
            <RequireAuth fallbackPath={'/login?redirect=/create'}>
               <CreatePost />
            </RequireAuth>
         } />
         <Route path="/register2" element={<Register2 />} />
         <Route path="/register3" element={<Register3 />} />
         <Route path="/registerexpert" element={<RegisterExpert />} />
         <Route path="/preregister" element={<PreRegister />} />
         <Route path="/post/:id" element={<Post />} />
         <Route path="/lightregister" element={<LightRegister />} />
         <Route path="/login" element={<Login />} />
         <Route path="/logout" element={<Logout />} />
         <Route path="/signup" element={<SignUp />} />
         <Route path="/about" element={<Home />} />
      </Routes>
   );
};

export default App;
