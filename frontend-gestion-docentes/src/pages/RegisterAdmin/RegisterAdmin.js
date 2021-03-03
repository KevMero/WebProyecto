import React from "react";
import { useForm } from "react-hook-form";
import { campos_vacios } from "../../utils/constant";
import { RegisterUser } from "../../services";
import Swal from "sweetalert2";

export const RegisterAdmin = () => {
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const response = await RegisterUser(data);
    if (response && response.status === 200) {
      e.target.reset();

      Swal.fire({
        icon: "success",
        title: "Exito",
        text: response.data.message,
      });

      return;
    }
    Swal.fire({
      icon: "warning",
      title: "Advertencia",
      text: response.message,
    });
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="auth-bg">
          <div className="authentication-box">
            <div className="text-center">
              {/* <img src={logo} alt="" height="140px"/> */}
            </div>
            <div className="card mt-4">
              <div className="card-body">
                <div className="text-center">
                  <h4>Usuarios administradores</h4>
                  <h6>Creacion de usuarios </h6>
                </div>
                {(errors.email || errors.password) && (
                  <div className="alert alert-warning mt-4" role="alert">
                    {" "}
                    {campos_vacios}{" "}
                  </div>
                )}
                <form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label className="col-form-label pt-0">Correo</label>
                    <input
                      className="form-control"
                      type="text"
                      name="email"
                      placeholder="Correo electrónico"
                      ref={register({ required: true })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="col-form-label">Contraseña</label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      placeholder="********"
                      ref={register({ required: true })}
                    />
                  </div>

                  <div className="form-group form-row mt-3 mb-0">
                    <button className="btn btn-primary btn-block" type="submit">
                      Crear usuario
                    </button>
                    <a
                      href="/login"
                      style={{ marginTop: "15px", marginLeft: "79%" }}
                    >
                      Inicie sesión
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
