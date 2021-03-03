import React from "react";
// import logo from "../../assets/logo maracana.svg";
import { useForm } from "react-hook-form";
import { campos_vacios } from '../../utils/constant'
import { login } from '../../services'
import Swal from "sweetalert2";

export const Login = ({setRefreshCheckLogin, push}) => {

  const { register, errors, handleSubmit } = useForm();


  const onSubmit = async (data, e) => {

    e.preventDefault();   
    const response = await login(data);
    if (response && response.status === 200) {
      setRefreshCheckLogin(true);
      window.location.replace('/home')
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
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <a className="navbar-brand" href="/register-hours">Sistema calculo de horas</a>

  <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
   
    </ul>
      <a className="text-dark" href="/">Registro de horas</a>
  </div>
</nav>
      <div className="page-wrapper">
        <div className="auth-bg">
          <div className="authentication-box">
            <div className="text-center">
              {/* <img src={logo} alt="" height="140px"/> */}
            </div>
            <div className="card mt-4">
              <div className="card-body">
                <div className="text-center">
                  <h4>Inicio de sesión</h4>
                  <h6>Ingrese su nombre de usuario y contraseña </h6>
                </div>
                {(errors.email || errors.password) && <div className="alert alert-warning mt-4" role="alert"> {campos_vacios} </div>}
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
                      Iniciar Sesión
                    </button>
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
