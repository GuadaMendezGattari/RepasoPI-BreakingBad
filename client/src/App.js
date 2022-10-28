import './App.css';
import {Route} from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import Home from './components/Home.jsx';
import Detail from './components/Detail.jsx';
import CharacterCreate from './components/CharacterCreate.jsx';

function App() {
  return (
    <div className="App">
      <Route exact path='/'>
        <LandingPage/>
      </Route>
      <Route path='/home'>
        <Home/>
      </Route>
      <Route path='/characters/:id'>
        <Detail/>
      </Route>
      <Route path='/createCharacter'>
        <CharacterCreate/>
      </Route>
    </div>
  );
}

export default App;
