import React, { useState } from 'react';
import '../Pages/LoginPage/LoginPage.css';
import { useDispatch } from 'react-redux';
import { signUp } from '../redux/auth/auth.slice';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const body = {
      fullName: fullName,
      userName: userName,
      email: email,
      password: password,
    };
    const res = await dispatch(signUp(body));
    if (res?.payload?.data?.code === 0) {
      history.push('/login');
    }
  };

  return (
    <div>
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="logipage__text"
        type="text"
        placeholder="Mobile number or Email"
      />
      <input
        value={fullName}
        onChange={(e) => {
          setFullName(e.target.value);
        }}
        className="logipage__text"
        type="text"
        placeholder="Full Name"
      />
      <input
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
        className="logipage__text"
        type="text"
        placeholder="Username"
      />
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="logipage__text"
        type="password"
        placeholder="Password"
      />
      <button className="login__button" onClick={handleSignUp}>
        Sign up
      </button>
    </div>
  );
};
export default SignUp;
