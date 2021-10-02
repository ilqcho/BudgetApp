import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Home.jsx';
import AddOperation from './components/operations/AddOperation.jsx';
import ListsPage from './components/operations/ListsPage'
import EditOperation from './components/operations/EditOperation.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path = '/' component = {Home}/>
        <Route exact path = '/operation/add' component = {AddOperation}/>
        <Route exact path = '/operations/lists' component = {ListsPage}/>
        <Route exact path = '/operation/edit/:id' component = {EditOperation}/>
      </Router>
    </div>
  );
}

export default App;
