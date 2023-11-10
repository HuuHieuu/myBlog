import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./components/home/home"
import Post from './components/post/post'
import AllPost from './components/allPosts/allposts'
import Author from './components/authors/Author';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/onepost' element={<Post/>}/>
        <Route path='/allposts' element={<AllPost/>}/>
        <Route path='/author' element={<Author/>}/>
      </Routes>
    </Router>
  );
}

export default App;
