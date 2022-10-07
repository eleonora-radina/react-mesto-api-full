import { useState } from "react";

function Login(props) {
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
    props.onLogin({ email, password });
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" name="login-form" onSubmit={handleSubmit}>
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
        <button className="auth__save-button" type="submit" aria-label="Войти">Войти</button>
      </form>
    </section>
  )
}

export default Login;