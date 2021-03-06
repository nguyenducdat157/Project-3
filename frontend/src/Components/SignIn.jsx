import React, { useState } from 'react';
import '../Pages/LoginPage/LoginPage.css';
import { signIn } from '../redux/auth/auth.slice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const SignIn = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const body = {
      email: email,
      password: password,
    };
    const res = await dispatch(signIn(body));
    if (res?.payload?.data?.code === 0) {
      await localStorage.setItem('token', res.payload.data.token);
      await history.push('/');
    }
  };

  return (
    <div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="logipage__text"
        placeholder="Phone number, username, or email"
        type="email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="logipage__text"
        type="password"
        placeholder="Password"
      />
      <button style={{ cursor: 'pointer' }} onClick={handleLogin} className="login__button">
        Log In
      </button>
    </div>
  );
};
export default SignIn;
