import './App.css';
import LoginPage from './Pages/LoginPage/LoginPage';
import HomePage from './Pages/HomePage/HomePage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RegisterPage from './Pages/LoginPage/RegisterPage';
import SuggestDetail from './Pages/SuggestDetail/SuggestDetail';
import Profile from './Pages/Profile/Profile';
import ModalMessage from './Components/ModalMessage/ModalMessage';
import { hideModalMessage } from './redux/message/message.slice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSocket } from './redux/socket/socket.slice';
import PostDetail from './Pages/PostDetail/PostDetail';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSocket(socket));
  }, []);

  useEffect(() => {
    dispatch(hideModalMessage());
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/suggest-detail" component={SuggestDetail} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/post" component={PostDetail} />
      </Switch>
      <ModalMessage />
    </BrowserRouter>
  );
}

export default App;
