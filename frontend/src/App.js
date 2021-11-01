import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import HomePage from './Pages/HomePage/HomePage';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import RegisterPage from './Pages/LoginPage/RegisterPage';
import { store } from './store/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
        <BrowserRouter>
        <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/register' component={RegisterPage}/>
        <Route exact path='/login' component={LoginPage}/>
        </Switch>
      </BrowserRouter>
    </Provider>
    
  );
}

export default App;
