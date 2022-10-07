import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
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

function App() {
  const [isEditProfilePopupOpen, setEditProfileOpening] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceOpening] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarOpening] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getCards()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api.getUser()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);


  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          handleEditProfileClick={handleEditProfileClick}
          handleAddPlaceClick={handleAddPlaceClick}
          handleEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

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

        <div className="popup popup_place_confirmation">
          <div className="popup__container">
            <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
            <h3 className="popup__title">Вы уверены?</h3>
            <button className="popup__save-button" type="click" aria-label="Да">Да</button>
          </div>
        </div>

        <Route path="/">
        </Route>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
