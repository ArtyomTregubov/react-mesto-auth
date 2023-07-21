import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import ProtectedRouteElement from "./ProtectedRoute";

import API from "../utils/api";
import AUTH from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [cards, setCards] = React.useState([]);

  const [isInfoTooltipOpen, openInfoTooltip] = React.useState(false);
  const [isError, setErrorStatus] = React.useState(false);
  const [isEditProfilePopupOpen, editProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, addPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, editAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const navigate = useNavigate();

  async function getUserInfo() {
    const userInfo = await API.getUserInfo();
    setCurrentUser(userInfo);
  }

  async function getCards() {
    const initialCards = await API.getInitialCards();
    setCards(initialCards);
  }

  React.useEffect(() => {
    (async () => {
      try {
        const userInfo = await AUTH.checkToken();
        if (userInfo) {
          localStorage.setItem("email", userInfo.data.email);
          setLoggedIn(true);
          await getUserInfo();
          await getCards();
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [loggedIn]);

  function handleOpenInfoTooltip() {
    openInfoTooltip(true);
  }

  function setStatus(status) {
    setErrorStatus(status);
  }

  function handleEditProfileClick() {
    editProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    addPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    editAvatarPopupOpen(true);
  }
  function handleCloseAllPopups() {
    editProfilePopupOpen(false);
    addPlacePopupOpen(false);
    editAvatarPopupOpen(false);
    setImagePopupOpen(false);
  }

  function closeInfoTooltip() {
    openInfoTooltip(false);
    if (!isError) {
      navigate("/signin", { replace: true });
    }
  }

  function handleCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    API.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    API.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
    const newUserData = { ...currentUser, name, about };
    API.updateUserInfo(newUserData)
      .then(() => {
        setCurrentUser(newUserData);
        handleCloseAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    API.changeAvatar(avatar)
      .then(() => {
        setCurrentUser({ ...currentUser, ...avatar });
        handleCloseAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    API.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleCloseAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  }

  function handleLogIn() {
    setLoggedIn(true);
  }

  async function handleRegister(password, email) {
    try {
      await AUTH.signup({
        password,
        email,
      });
      setStatus(false);
      handleOpenInfoTooltip();
    } catch (err) {
      setStatus(true);
      handleOpenInfoTooltip();
      console.log(err);
    }
  }

  async function handleLogin(password, email, callback) {
    try {
      const userInfo = await AUTH.signin({
        password,
        email,
      });
      if (userInfo.token) {
        localStorage.setItem("token", userInfo.token);
        localStorage.setItem("email", email);
        callback({ email: "", password: "" });
        handleLogIn();
      }
    } catch (err) {
      setStatus(true);
      handleOpenInfoTooltip();
      console.log(err);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={() => {
                  return (
                    <>
                      <Header
                        text={"Выйти"}
                        email={localStorage.getItem("email")}
                        link={""}
                        onLogOut={handleLogOut}
                      />
                      <Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                      />
                      <Footer />
                    </>
                  );
                }}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/signup"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <>
                  <Header text={"Войти"} email={""} link={"/signin"} />
                  <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    isError={isError}
                    onClose={closeInfoTooltip}
                  />
                  <Register
                    onRegister={handleRegister}
                    setStatus={setStatus}
                    title={"Регистрация"}
                    buttonText={"Зарегистрироваться"}
                    question={"Уже зарегистрированы?"}
                    linkText={"Войти"}
                  />
                </>
              )
            }
          />
          <Route
            path="/signin"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <>
                  <Header text={"Регистрация"} email={""} link={"/signup"} />
                  <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    isError={isError}
                    onClose={closeInfoTooltip}
                  />
                  <Login
                    onLogin={handleLogin}
                    title={"Вход"}
                    buttonText={"Войти"}
                  />
                </>
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleCloseAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={handleCloseAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={handleCloseAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
