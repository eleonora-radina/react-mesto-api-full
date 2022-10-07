import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister({ email, password });
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" name="register-form" onSubmit={handleSubmit}>
          <input
            className="auth__form-item"
            type="email"
            placeholder="Email"
            name="email"
            required
            autoComplete="off"
            minLength="2"
            maxLength="50"
            value={email || ''}
            onChange={handleEmailChange}
          />
          <input
            className="auth__form-item"
            type="password"
            placeholder="Пароль"
            name="password"
            required
            autoComplete="off"
            minLength="5"
            maxLength="20"
            value={password || ''}
            onChange={handlePasswordChange}
          />
        <button className="auth__save-button" type="submit" aria-label="Зарегистрироваться">Зарегистрироваться</button>
      </form>
      <p className="auth__text">Уже зарегистрированы? <Link className="auth__text" to="/sign-in">Войти</Link></p>
    </section>
  )
}

export default Register;