import './App.css';
import NavBar from'./components/Navbar';
import Header from './components/Header';
import MainContent from './components/home/HomeMainContent';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <NavBar/>
      <MainContent/>
      <Footer/>
    </div>
  );
}

export default App;
