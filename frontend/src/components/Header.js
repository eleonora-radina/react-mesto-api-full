import logo from '../images/logo.svg';
import { Link, Route, Switch } from 'react-router-dom';

function Header(props) {

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип проекта Место" />
      <nav className="header__links">
        <Switch>
          <Route exact path="/">
            <p className="header__link">{props.email}</p>
            <Link className="header__link-out" to="/sign-in" onClick={props.onLogout}>Выйти</Link>
          </Route>

          <Route path="/sign-up">
            <Link className="header__link" to="/sign-in">Вход</Link>
          </Route>

          <Route path="/sign-in">
            <Link className="header__link" to="/sign-up">Регистрация</Link>
          </Route>
        </Switch>
      </nav>
    </header>
  )
}

export default Header;