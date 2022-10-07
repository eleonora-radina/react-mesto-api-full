import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__form-item popup__form-item_el_name"
          type="text"
          placeholder="Ваше имя"
          name="name"
          required
          autoComplete="off"
          minLength="2"
          maxLength="40"
          id="name-input"
          value={name || ''}
          onChange={handleNameChange}
        />
        <span className="popup__input-error name-input-error"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__form-item popup__form-item_el_about"
          type="text"
          placeholder="О себе"
          name="about"
          required
          autoComplete="off"
          minLength="2"
          maxLength="200"
          id="about-input"
          value={description || ''}
          onChange={handleDescriptionChange}
        />
        <span className="popup__input-error about-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;