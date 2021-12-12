import React, { useState } from 'react';
import NavBar from '../../Components/NavBar/Navbar';
import Grid from '@material-ui/core/Grid';
import './EditProfile.css';
import { useSelector, useDispatch } from 'react-redux';
import { editProfile, replacePassword } from '../../redux/auth/auth.slice';
import { showModalMessage } from '../../redux/message/message.slice';
import { useHistory } from 'react-router';

const EditProfile = () => {
  const dispatch = useDispatch();
  const infoUser = useSelector((state) => state.auth.user.data.data);

  const [option, setOption] = useState(1);
  const [fullName, setFullName] = useState(infoUser.fullName);
  const [userName, setUserName] = useState(infoUser.userName);
  const [email, setEmail] = useState(infoUser.email);
  const [status, setStatus] = useState(0);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPass, setConfirmPass] = useState('');

  const history = useHistory();

  const handleUpdateProfile = async () => {
    const body = {
      fullName: fullName,
      userName: userName,
      email: email,
      status: status,
    };

    const res = await dispatch(editProfile(body));
    console.log('res: ', res);
    if (res?.payload?.status === 200) {
      dispatch(
        showModalMessage({
          type: 'SUCCESS',
          msg: 'Cập nhật thông tin cá nhân thành công!',
        }),
      );
    } else {
    }
  };

  const handleReplacePassword = async () => {
    const body = {
      password: oldPassword,
      newPassword: newPassword,
    };
    if (newPassword !== confirmNewPass) {
      dispatch(
        showModalMessage({
          type: 'ERROR',
          msg: 'Mật khẩu mới và xác nhận mật khẩu mới phải giống nhau!',
        }),
      );
      return;
    }
    if (newPassword === oldPassword) {
      dispatch(
        showModalMessage({
          type: 'ERROR',
          msg: 'Mật khẩu mới và mật khẩu cũ phải khác nhau!',
        }),
      );
      return;
    }
    if (newPassword.length < 6 || newPassword.length > 20) {
      dispatch(
        showModalMessage({
          type: 'ERROR',
          msg: 'Mật khẩu mới phải từ 6 đến 20 kí tự!',
        }),
      );
      return;
    }
    const res = await dispatch(replacePassword(body));
    if (res?.payload?.status === 404) {
      dispatch(
        showModalMessage({
          type: 'ERROR',
          msg: 'Mật khẩu cũ chưa đúng, vui long nhập lại!',
        }),
      );
      return;
    }
    if (res?.payload?.status === 200) {
      dispatch(
        showModalMessage({
          type: 'SUCCESS',
          msg: 'Thay đổi mật khẩu thành công, Vui lòng đăng nhập lại!',
        }),
      );
      history.push({
        pathname: `/login`,
      });
    }
  };

  return (
    <>
      <NavBar />

      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <div className="edit_container">
            <div className="edit_option">
              <div
                onClick={() => {
                  setOption(1);
                }}
                className={option === 1 ? 'active' : 'option'}
              >
                Chỉnh sửa trang cá nhân
              </div>
              <div
                onClick={() => {
                  setOption(2);
                }}
                className={option === 2 ? 'active' : 'option'}
              >
                Đổi mật khẩu
              </div>
            </div>
            {option === 1 && (
              <div className="edit_box_data">
                <div className="edit_element">
                  <img
                    alt="element"
                    style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '100px' }}
                    src={`http://localhost:5000/public/${infoUser.avatar}`}
                  ></img>
                  <div>
                    <div className="edit_infoUser">{infoUser.userName}</div>
                    <div className="edit_avatar">Thay đổi ảnh đại diện</div>
                  </div>
                </div>
                <div className="edit_element">
                  <label>Tên</label>
                  <input
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                    value={fullName}
                    className="edit_inputText"
                    type="text"
                  />
                </div>
                <div className="edit_element">
                  <label>Tên người dùng</label>
                  <input
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    value={userName}
                    className="edit_inputText"
                    type="text"
                  />
                </div>
                <div className="edit_element">
                  <label>Email</label>
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    className="edit_inputText"
                    type="text"
                  />
                </div>
                <div className="edit_element">
                  <label style={{ marginRight: '20px' }}>type account</label> <br></br>
                  <input
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                    type="radio"
                    id="account"
                    name="account"
                    value={1}
                  />
                  <label for="account">Private</label>
                  <br></br>
                  <input
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                    style={{ marginBottom: '10px' }}
                    type="radio"
                    id="account"
                    name="account"
                    value={0}
                  />
                  <label for="account">Public</label>
                  <br></br>
                </div>
                <button onClick={handleUpdateProfile} className="edit_btn">
                  Gửi
                </button>
              </div>
            )}
            {option === 2 && (
              <div className="edit_password">
                <div className="edit_element">
                  <img
                    alt="element"
                    style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '100px' }}
                    src={`http://localhost:5000/public/${infoUser.avatar}`}
                  ></img>
                  <div>
                    <div className="edit_infoUser">{infoUser.userName}</div>
                  </div>
                </div>
                <div className="edit_element">
                  <label className="lb_pw">Mật khẩu cũ</label>
                  <input
                    onChange={(e) => {
                      setOldPassword(e.target.value);
                    }}
                    value={oldPassword}
                    className="edit_inputText"
                    type="password"
                  />
                </div>
                <div className="edit_element">
                  <label className="lb_pw">Mật khẩu mới</label>
                  <input
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                    value={newPassword}
                    className="edit_inputText"
                    type="password"
                  />
                </div>
                <div className="edit_element">
                  <label className="lb_pw">Xác nhận mật khẩu mới</label>
                  <input
                    onChange={(e) => {
                      setConfirmPass(e.target.value);
                    }}
                    value={confirmNewPass}
                    className="edit_inputText"
                    type="password"
                  />
                </div>
                <button onClick={handleReplacePassword} className="edit_btn_pw">
                  Đổi mật khẩu
                </button>
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </>
  );
};

export default EditProfile;
