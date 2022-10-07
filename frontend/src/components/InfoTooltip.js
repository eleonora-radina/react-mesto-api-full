import successIcon from '../images/Union1.png';
import failIcon from '../images/Union.png';

function InfoTooltip(props) {
  return (
    <div className={`popup popup_place_infotooltip ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
        <img className="popup__icon" src={props.isSuccess ? successIcon : failIcon} alt="Иконка" />
        <h3 className="popup__title">{props.isSuccess ? props.successTitle : props.failTitle}</h3>
      </div>
    </div>
  )

}

export default InfoTooltip;