import 'bootstrap' ;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from './Banner/Banner';
import Login from './loginForm/login';
import Posts from './posts/post';
import SignUp from './signUpForm/signUp';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Banner/>}>
          <Route path="connexion" element={<Login />} />
          <Route path="inscription" element={<SignUp />} />
          <Route path="posts" element={<Posts />}/>
        </Route>
      </Routes>
    </BrowserRouter>    
  )
}

export default App;
