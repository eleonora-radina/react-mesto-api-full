import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser =  useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;

  const cardDeleteButtonClassName = `card__trash ${isOwn ? '' : 'card__trash_disabled'}`;

  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = `card__like ${isLiked ? 'card__like_active' : ''}`;

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleCardLike() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="card" key={props.id}>
      <img className="card__image" src={props.link} alt={props.name} onClick={handleCardClick} />
      <button className={cardDeleteButtonClassName} type="button" aria-label="Корзина" onClick={handleDeleteClick}></button>
      <div className="card__description">
        <h2 className="card__title">{props.name}</h2>
        <div className="card__like-zone">
          <button className={cardLikeButtonClassName} type="button" aria-label="Лайк" onClick={handleCardLike}></button>
          <p className="card__like-number">{props.likeNumber}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;