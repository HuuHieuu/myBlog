import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./pages/home/home"
import Post from './pages/post/post'
import AllPost from './pages/allPosts/allposts'
import Author from './pages/authors/Author';
import Login from './pages/login/login';
import SignUp from './pages/signup/SignUp';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/onepost' element={<Post/>}/>
        <Route path='/allposts' element={<AllPost/>}/>
        <Route path='/author' element={<Author/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </Router>
  );
}

export default App;
