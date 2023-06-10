import "../index.css";



import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { api } from "../utils/Api.js";
//import {register,authorize,getContent} from "../utils/auth"
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";

import ImagePopup from "./ImagePopup.js";
import Register from "./Register";
import Login from "./Login";
//import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import PageError from "./PageNotFound";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ConfirmationPopup from "./ConfirmationPopup";



function App() {
  //Хуки
  const [isAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setAddCardPopupOpen] = useState(false);
  const [isTrashPopupOpen, setTrashPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail]= useState({email:''})

  // Получение данных с сервера о пользователе
  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([currentUser, card]) => {
        setCurrentUser(currentUser);
        setCards(card);
      })
      .catch((err) => console.log(err));
  }, []);

  //Открытие попапа автара и изменение его.
  const handleEditAvatarClick = () => {
    setAvatarPopupOpen(true);
  };

  const handleUpdateAvatar = (value) => {
    setIsLoading(true);
    api
      .editAvatar(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  //Открытие попапа изменения профиля и изменение информации в нем.
  const handleEditProfileClick = () => {
    setProfilePopupOpen(true);
  };

  const handleUpdateUser = (value) => {
    setIsLoading(true);
    api
      .editProfile(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Открытие попапа добавления карточки и добавление ее на страницу.
  const handleAddCardClick = () => {
    setAddCardPopupOpen(true);
  };
  const handleTrashClick = () => {
    setTrashPopupOpen(true);
  };
  const hendleImageClick = (card) => {
    setSelectedCard(card);
  };

  const handleAddCard = (value) => {
    setIsLoading(true);
    api
      .addCard(value)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Закрытие всех попапов
  function closeAllPopups() {
    setAvatarPopupOpen(false);
    setProfilePopupOpen(false);
    setAddCardPopupOpen(false);
    setTrashPopupOpen(false);
    setSelectedCard({});
  }

  // Лайки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  // Корзинки
  function handleCardDelete(card) {
    // Отправляем запрос в API и удаляем карточку
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then((item) => {
        setCards(cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  //Логин
   const handleLogin = () => {
    setLoggedIn(true);
   }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Routes>
            <Route path="*" element={<PageError />} />
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/users/me" />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/sign-in" element={<Login handleLogin = {handleLogin} />} />
            <Route
              path="/users/me"
              element={
                <>
                  <Header
                  userEmail={userEmail} />
                  <ProtectedRoute
                    loggedIn={loggedIn}
                    element={Main}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddCardClick}
                    onEditAvatar={handleEditAvatarClick}
                    onOpenTrash={handleTrashClick}
                    onOpenImage={hendleImageClick}
                    onClose={closeAllPopups}
                    cards={cards}
                    currentUser={currentUser}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />

                  <Footer />

                  <EditProfilePopup
                    isOpen={isProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                  />

                  <EditAvatarPopup
                    isOpen={isAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isLoading={isLoading}
                  />

                  <AddPlacePopup
                    isOpen={isAddCardPopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddCard}
                    isLoading={isLoading}
                  />

                  <ConfirmationPopup
                    isOpen={isTrashPopupOpen}
                    onClose={closeAllPopups}
                    isLoading={isLoading}
                  />

                  <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
