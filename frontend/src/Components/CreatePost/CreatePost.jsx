import { Avatar } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './CreatePost.css';
const CreatePost = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [pictures, setPictures] = useState('');
  const [imgPreview, setImgPreview] = useState(null);
  const [error, setError] = useState(false);

  const handleImageChange = (e) => {
    setError(false);
    const selected = e.target.files[0];
    setPictures(selected);
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      setError(true);
      console.log('file not supported');
    }
  };

  const hanldeTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, pictures });
    const formData = new FormData();
    formData.append('title', title);
    formData.append('pictures', pictures);
    axios({
      method: 'post',
      url: 'http://localhost:5000/api/post/create-post',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      data: formData,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          alert('Tạo post thành công');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="userPost">
        <Avatar src={''} style={{ marginRight: '10px' }} />
        <div style={{ fontWeight: '600' }}>ducdatchelsea</div>
      </div>

      <textarea
        placeholder="Nói gì về bài viết này"
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={hanldeTitleChange}
      >
        {title}
      </textarea>
      {error && <p style={{ color: 'red' }}>File not supported</p>}
      <div
        className="imgPreview"
        style={{
          background: imgPreview ? `url("${imgPreview}") no-repeat center/cover` : '#fff',
        }}
      >
        {!imgPreview && (
          <>
            <label htmlFor="fileUpload" className="customFileUpload">
              Chọn ảnh từ máy
            </label>
            <input type="file" name="picture" id="fileUpload" onChange={handleImageChange} />
            <span>(jpg,jpeg or png)</span>
          </>
        )}
      </div>
      {imgPreview && <button onClick={() => setImgPreview(null)}>Remove image</button>}
      <button type="submit">Tạo</button>
    </form>
  );
};

export default CreatePost;
