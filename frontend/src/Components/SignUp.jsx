import React, { useEffect } from 'react';
import '../Pages/LoginPage/LoginPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { signUp } from '../redux/user/user.slice';
import axios from 'axios';

const SignUp = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const handleSignUp = async () => {
    const body = {
      fullName: 'hieu1',
      userName: 'hieu1',
      email: 'chihieu@1',
      password: '123',
    };
    await dispatch(signUp(body));
  };
  // useEffect( () => {
  //     const body = {
  //         fullName: "hieu1",
  //         userName: "hieu1",
  //         email: "chihieu@1",
  //         password: "123"
  //     }
  //     dispatch(signUp( body ));
  // })
  return (
    <div>
      <input className="logipage__text" type="text" placeholder="Mobile number or Email" />
      <input className="logipage__text" type="text" placeholder="Full Name" />
      <input className="logipage__text" type="text" placeholder="Username" />
      <input className="logipage__text" type="password" placeholder="Password" />
      <button className="login__button" onClick={handleSignUp}>
        Sign up
      </button>
    </div>
  );
};
export default SignUp;
