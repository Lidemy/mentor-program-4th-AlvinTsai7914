import './App.css';
import { useState } from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  margin-bottom: 35px;
`;

const SubmitButton = styled.input`
  height: 40px;
  width: 92px;
  background-color: #fad312;
  border: 0;
  border-radius: 3px;
  margin-bottom: 21px;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }

  &:active {
    transform: scale(1);
  }
`;

const Info = styled.p`
  font-size: 14px;
`;

const Input = ({ type, placeholder, id, name, value, handleInputChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      name={name}
      id={id}
      value={value}
      onChange={(e) => {
        handleInputChange(e);
      }}
    />
  );
};

const Radio = ({ placeholder, id, name, value, checked, handleInputChange }) => {
  return (
    <input
      type="radio"
      placeholder={placeholder}
      name={name}
      id={id}
      value={value}
      checked={checked}
      onChange={(e) => {
        handleInputChange(e);
      }}
    />
  );
};

const Label = ({ text, htmlFor }) => {
  return (
    <label className="label" htmlFor={htmlFor}>
      {text} <span>*</span>
    </label>
  );
};

const App = () => {
  const [form, setForm] = useState({
    name: '',
    eMail: '',
    phoneNumber: '',
    signUp: 'inbed',
    howUKnow: '',
    other: '',
  });

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (!form.name || !form.eMail || !form.phoneNumber || !form.howUKnow) {
      e.preventDefault();
      alert('請填寫完成');
      return;
    }
    alert('資料送出' + JSON.stringify(form));
    e.preventDefault();
  };
  return (
    <div className="wrapper">
      <div className="top-block"></div>
      <Title>新拖延運動報名表單</Title>
      <form
        className="form-group"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="form">
          <Label htmlFor={'name'} text={'暱稱'} />
          <Input
            type={'text'}
            placeholder={'您的回答'}
            name={'name'}
            id={'name'}
            value={form.name}
            handleInputChange={handleInputChange}
          />
        </div>
        <div className="form">
          <Label htmlFor={'eMail'} text={'電子郵件'} />
          <Input
            type={'text'}
            placeholder={'您的電子郵件'}
            name={'eMail'}
            id={'eMail'}
            value={form.eMail}
            handleInputChange={handleInputChange}
          />
        </div>
        <div className="form">
          <Label htmlFor={'phoneNumber'} text={'手機號碼'} />
          <Input
            type={'text'}
            placeholder={'您的手機號碼'}
            name={'phoneNumber'}
            id={'phoneNumber'}
            value={form.phoneNumber}
            handleInputChange={handleInputChange}
          />
        </div>
        <div className="form-inline">
          <p className="form-inline-title">
            報名類型 <span>*</span>
          </p>
          <div>
            <Radio
              name={'signUp'}
              id={'inbed'}
              value={'inbed'}
              checked={form.signUp === 'inbed'}
              handleInputChange={handleInputChange}
            />
            <label className="fake-radio" htmlFor="inbed"></label>
            <label className="description" htmlFor="inbed">
              躺在床上用想像力實作
            </label>
          </div>
          <div>
            <Radio
              name={'signUp'}
              id={'onfloor'}
              value={'onfloor'}
              checked={form.signUp === 'onfloor'}
              handleInputChange={handleInputChange}
            />
            <label className="fake-radio" htmlFor="onfloor"></label>
            <label className="description" htmlFor="onfloor">
              趴在地上滑手機找現成的
            </label>
          </div>
        </div>
        <div className="form">
          <Label htmlFor={'howUKnow'} text={'怎麼知道這個活動的？'} />
          <Input
            type={'text'}
            placeholder={'您的回答'}
            name={'howUKnow'}
            id={'howUKnow'}
            value={form.howUKnow}
            handleInputChange={handleInputChange}
          />
        </div>
        <div className="form">
          <label className="advice" htmlFor="other" name="other">
            其他
          </label>
          <p htmlFor="other">對活動的一些建議 </p>
          <Input
            type={'text'}
            placeholder={'您的回答'}
            name={'other'}
            id={'other'}
            value={form.other}
            handleInputChange={handleInputChange}
          />
        </div>
        <div className="submit">
          <SubmitButton type="submit" />
          <Info>請勿透過表單送出您的密碼。</Info>
        </div>
      </form>
    </div>
  );
};

export default App;
