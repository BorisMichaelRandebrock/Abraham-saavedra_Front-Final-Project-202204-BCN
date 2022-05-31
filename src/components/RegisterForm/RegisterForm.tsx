import { useState } from "react";
import RegisterFormStyles from "./RegisterFormStyles";

const RegisterForm = (): JSX.Element => {
  const initialFormValue = {
    name: "",
    username: "",
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState(initialFormValue);

  const changeUserData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [event.target.id]: event.target.value });
  };

  return (
    <RegisterFormStyles noValidate autoComplete="off">
      <label htmlFor="name">Nombre</label>
      <input
        type="text"
        id="name"
        value={userData.name}
        onChange={changeUserData}
      />
      <label htmlFor="username">Usuario</label>
      <input
        type="text"
        id="username"
        value={userData.username}
        onChange={changeUserData}
      />
      <label htmlFor="email">E-mail</label>
      <input
        type="email"
        id="email"
        value={userData.email}
        onChange={changeUserData}
      />
      <label htmlFor="password">Contraseña</label>
      <input
        type="password"
        id="password"
        value={userData.password}
        onChange={changeUserData}
      />
      <button>Registrarse</button>
      <p>Ya tienes cuenta? Inicia sesión aquí</p>
    </RegisterFormStyles>
  );
};

export default RegisterForm;
