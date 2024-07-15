import { useState } from "react";
import styles from "./styles.module.css";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Nome é obrigatório";
    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email Inválido";
    }
    if (!formData.password) {
      newErrors.password = "O campo de senha é obrigatório";
    } else if (formData.password.length < 8) {
      newErrors.password = "O campo de senha precisa de ao menos 8 caracteres";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "O campo de senha é obrigatório";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "O campo de senha precisa coincidir";
    }
    return newErrors;
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      alert("Formulario enviado com sucesso");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Registre-se</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={styles.label}>
            Nome:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
          {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
        </div>

        <div>
          <label className={styles.label}>
            E-mail:
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email}</p>
          )}
        </div>

        <div>
          <label className={styles.label}>
            Senha:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password}</p>
          )}
        </div>

        <div>
          <label className={styles.label}>
            Repita sua senha:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
          {errors.confirmPassword && (
            <p className={styles.errorMessage}>{errors.confirmPassword}</p>
          )}
        </div>
        <button type="submit" className={styles.submitButton}>
          Registrar
        </button>
      </form>
    </div>
  );
}
