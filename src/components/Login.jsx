import React from "react";
import AUTH from "../utils/auth";

export default function Login({ title, buttonText, handleLoggedIn }) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    try {
      const userInfo = await AUTH.signin({
        password: formValue.password,
        email: formValue.email,
      });
      if (userInfo.token) localStorage.setItem("token", userInfo.token);
      localStorage.setItem("email", formValue.email);
      setFormValue({ email: "", password: "" });
      handleLoggedIn(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sign-up">
      <h1 className="sign-up__title">{title}</h1>
      <form
        onSubmit={handleSubmit}
        action="#"
        name="add-form"
        className="sign-up__main"
        noValidate
      >
        <fieldset className="sign-up__info">
          <input
            value={formValue.email}
            onChange={handleChange}
            type="email"
            name="email"
            className="sign-up sign-up__input_form_name"
            placeholder="Email"
            required
            minLength="2"
            maxLength="30"
            id="email"
          />
          <span className="sign-up__input-error" id="image-name-error"></span>
          <input
            value={formValue.password}
            onChange={handleChange}
            type="password"
            name="password"
            className="sign-up__input sign-up__input_form_description"
            placeholder="Пароль"
            required
            id="password"
          />
          <span className="sign-up__input-error" id="link-error"></span>
        </fieldset>
        <button className="sign-up__save-button" type="submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
}
