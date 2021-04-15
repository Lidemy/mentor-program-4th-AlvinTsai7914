import styled from 'styled-components';
import { newPost } from '../../WebAPI';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';

const Root = styled.div`
  width: 50%;
  margin: 100px auto;
`;

const PostContainer = styled.div`
  position: relative;
`;

const NewPostTitle = styled.input`
  width: 20em;
  padding: 8px;
`;

const NewPostTextarea = styled.textarea`
  width: 100%;
  height: 400px;
  margin-top: 8px;
  padding: 8px;
  box-sizing: border-box;
`;

const NewPostButton = styled.button`
  position: absolute;
  right: 0;
  bottom: -48px;
  padding: 8px 32px;
`;

const ErrorMessage = styled.div`
  color: red;
`;

export default function NewPostPage() {
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleTitleChange = (e) => {
    setNewPostTitle(e.target.value);
  };
  const handlePostContentChange = (e) => {
    setNewPostContent(e.target.value);
  };
  const handleFocus = () => {
    setErrorMessage('');
  };

  const handleNewPostSubmit = (e) => {
    e.preventDefault();
    newPost(newPostTitle, newPostContent).then((response) => {
      if (response.ok === 0) {
        return setErrorMessage(response.message);
      }
      history.push('/');
    });
  };

  return (
    <Root>
      <PostContainer>
        <form onSubmit={handleNewPostSubmit}>
          <NewPostTitle
            name="newPostTitle"
            value={newPostTitle}
            onChange={handleTitleChange}
            onFocus={handleFocus}
            placeholder="文章標題..."
          ></NewPostTitle>
          <NewPostTextarea
            name="newPostContent"
            value={newPostContent}
            onChange={handlePostContentChange}
            onFocus={handleFocus}
            placeholder="文章內文..."
          ></NewPostTextarea>
          <NewPostButton>送出</NewPostButton>
        </form>
      </PostContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Root>
  );
}
