function ImagePopup(props) {

  return(
    <div className={`popup popup_place_card ${props.card && 'popup_opened'}`}>
        <div className="popup__container popup__container_image">
          <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose} ></button>
          <img className="popup__image" src={props.card?.link} alt={props.card?.name} />
          <p className="popup__name">{props.card?.name}</p>
        </div>
    </div>
  )
}

export default ImagePopup;