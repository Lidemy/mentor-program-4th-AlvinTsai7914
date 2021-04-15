import styled from 'styled-components';
import React, { useState, useContext } from 'react';
import { register, getMe } from '../../WebAPI';
import { setAuthToken } from '../../utils';
import { useHistory } from 'react-router-dom';

const ErrorMessage = styled.div`
  color: red;
`;

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    register(nickname, username, password).then((data) => {
      console.log(data);
      if (!data.ok) {
        return setErrorMessage(data.message);
      }
      setAuthToken(data.token);
      getMe().then((response) => {
        if (!response.ok) {
          setAuthToken(null);
          return setErrorMessage(response.message);
        }
        history.push('/');
      });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username: <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        nickname:{' '}
        <input
          type="nickname"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
      </div>
      <button>登入</button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </form>
  );
}
