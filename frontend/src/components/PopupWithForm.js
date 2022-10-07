function PopupWithForm(props) {
  return (
    <div className={`popup popup_place_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
        <h3 className="popup__title">{props.title}</h3>
        <form className="popup__form" name={`${props.name}-edit-form`} onSubmit={props.onSubmit} noValidate>
          {props.children}
          <button className="popup__save-button" type="submit" aria-label="Сохранить">Сохранить</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;