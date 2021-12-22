import 'bootstrap' ;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from './Banner/Banner';
import Login from './loginForm/login';
import Post from './posts/post';
import SignUp from './signUpForm/signUp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Banner/>}>
          <Route path="login" element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="posts" element={<Post />}/>
        </Route>
      </Routes>
    </BrowserRouter>    
  )
}

export default App;
