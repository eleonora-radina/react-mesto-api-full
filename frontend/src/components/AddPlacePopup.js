import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setTitle('');
    setLink('');
  }, [props.onClose]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateCards({
      name: title,
      link: link,
    });
  }
  return (
    <PopupWithForm
      name="cards"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__form-item popup__form-item_el_title"
          type="text"
          placeholder="Название"
          name="title"
          minLength="2"
          maxLength="30"
          required
          autoComplete="off"
          id="title-input"
          value={title}
          onChange={handleTitleChange}
        />
        <span className="popup__input-error title-input-error"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__form-item popup__form-item_el_link"
          type="url"
          placeholder="Ссылка на картинку"
          name="link"
          required
          autoComplete="off"
          id="link-input"
          value={link}
          onChange={handleLinkChange}
        />
        <span className="popup__input-error link-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;