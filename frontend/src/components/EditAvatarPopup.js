import PopupWithForm from './PopupWithForm';
import { useEffect, useRef } from 'react';

function EditAvatarPopup(props) {
  
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = '';
  }, [props.onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  } 

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__form-item popup__form-item_el_link-avatar"
          type="url"
          placeholder="Ссылка на картинку"
          name="link"
          required
          autoComplete="off"
          id="link-input-avatar"
          ref={avatarRef}
        />
        <span className="popup__input-error link-input-avatar-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;