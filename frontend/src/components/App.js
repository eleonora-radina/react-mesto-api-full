import { useEffect, useState } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import '../index.css';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from "./ProtectedRoute";
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setEditProfileOpening] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceOpening] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarOpening] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [isInfoToolTipOpen, setInfoToolTipOpening] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if(loggedIn) {
      api.getUser()
        .then((userData) => {
         setLoggedIn(true);
          setCurrentUser(userData);
        })
        .catch((err) => console.log(err));
     }
  }, [loggedIn, history]);

  useEffect(() => {
    if(loggedIn) {
      api.getCards()
        .then((cardData) => {
          setCards(cardData);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleEditProfileClick() {
    setEditProfileOpening(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceOpening(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarOpening(true);
  }

  function closeAllPopups() {
    setEditProfileOpening(false);
    setAddPlaceOpening(false);
    setEditAvatarOpening(false);
    setSelectedCard(null);
    setInfoToolTipOpening(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    api.editUserInfo(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  function handleUpdateAvatar(data) {
    api.editAvatar(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn]);
  
  function handleRegister(data) {
    api.register(data)
    .then(() => {
      setIsSuccess(true);
      history.push("/sign-in");      
    })
    .catch((err) => {
      setIsSuccess(false);
      console.log(err)
    })
    .finally(()=>{
      setInfoToolTipOpening(true);
    })
  }

  function handleLogin(data) {
    api.authorize(data)
    .then(() => {
      setLoggedIn(true);
      setEmail(data.email);
    })
    .catch((err) => {
      console.log(err);
      setIsSuccess(false);
      setInfoToolTipOpening(true);
    });
  }

  function handleLogout() {
    api.logout()
    .then(() => {
      setLoggedIn(false);
      history.push("/sign-in");
    })
    .catch((err) => {
      console.log(err);
    });

  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          onLogout={handleLogout}
          email={email}
        />

        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            handleEditProfileClick={handleEditProfileClick}
            handleAddPlaceClick={handleAddPlaceClick}
            handleEditAvatarClick={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Route path="/sign-up">
            <Register
              onRegister={handleRegister}
            />
          </Route>

          <Route path="/sign-in">
            <Login
              onLogin={handleLogin}
            />
          </Route>
        </Switch>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCards={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          isSuccess={isSuccess}
          onClose={closeAllPopups}
          successTitle={'Вы успешно зарегистрировались!'}
          failTitle={'Что-то пошло не так! Попробуйте ещё раз.'}
        />

      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
