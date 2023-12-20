import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './components/Context/UserContext';
import Home from "./pages/home/home"
import Post from './pages/post/post'
import AllPost from './pages/allPosts/allposts'
import Author from './pages/authors/Author';
import Login from './pages/login/login';
import SignUp from './pages/signup/SignUp';
import NewPostEditor from './pages/newPost';
import Admin from './pages/admin/admin';
import LoginRegister from './pages/login_register/index'
// import CardList from './components/PostCardList';
import PostContent from './pages/post/postContent';


const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/onepost' element={<Post/>}/>
          <Route path='/allposts' element={<AllPost/>}/>
          <Route path='/author' element={<Author/>}/>
          <Route path='/login' element={<LoginRegister/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='new-post' element={<NewPostEditor/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/posts/:postId' element={<PostContent/>}/>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
