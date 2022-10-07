import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser =  useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-zone">
          <img className="profile__avatar" src={currentUser?.avatar} alt="Аватар" onClick={props.handleEditAvatarClick} />
        </div>
        <div className="profile__info">
          <div className="profile__name-zone">
            <h1 className="profile__name">{currentUser?.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={props.handleEditProfileClick}></button>
          </div>
          <p className="profile__about">{currentUser?.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить" onClick={props.handleAddPlaceClick}></button>
      </section>

      <section className="elements">
        <ul className="cards">
          { props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              id={card._id}
              link={card.link}
              name={card.name}
              likeNumber={card.likes.length} 
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main;
