import 'bootstrap' ;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from './Banner/Banner';
import Login from './loginForm/Login';
import Posts from './ListofPosts/ListOfPosts';
import SignUp from './signUpForm/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewPost from './NewPost/NewPost';
import MyProfil from './MyProfil/MyProfil';
import Profil from './profil/Profil'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Banner/>} >
          <Route index element={<Login />} />
          <Route path="connexion" element={<Login />} />
          <Route path="inscription" element={<SignUp />} />
          <Route path="posts" element={<Posts />} />
          <Route path="nouveauPost" element={<NewPost />} />
          <Route path="monProfil" element={<MyProfil />} />
          <Route path="profil/:id" element={<Profil />} />
        </Route>
      </Routes>
      <h2>footer</h2>
    </BrowserRouter>  
  )
}

export default App;
