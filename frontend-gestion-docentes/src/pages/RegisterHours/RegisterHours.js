import React from "react";
import { inputHour, outputHour } from "../../services";
import Swal from "sweetalert2";

export const RegisterHours = () => {
  // registro de entrada

  const input = async (cedula) => {
    const response = await inputHour(cedula);

    if (response && response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Proceso exitoso",
        text: response.data.message,
      });
      return;
    }
    Swal.fire({
      icon: "info",
      title: "No completado",
      text: response.message,
    });
    return;
  };

  //registro de salida
  const output = async (cedula) => {
    const response = await outputHour(cedula);

    if (response && response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Proceso exitoso",
        text: response.data.message,
      });
      return;
    }
    Swal.fire({
      icon: "info",
      title: "No completado",
      text: response.message,
    });
    return;
  };

  // entrada
  const RegisterInput = () => {
    Swal.fire({
      title: "Registro de Entrada",
      text: "Ingrese su número de cédula",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Registrar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        input(result.value);
      }
    });
  };

  // salida
  const RegisterOutput = () => {
    Swal.fire({
      title: "Registro de Salida",
      text: "Ingrese su número de cédula",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Registrar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        output(result.value);
      }
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="/register-hours">
          Sistema calculo de horas
        </a>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0"></ul>
          <a className="text-dark" href="/login">
            Inicio de sesión
          </a>
        </div>
      </nav>

      <div className="auth-bg">
        <br />
        <div className="card-header">
          <div className="authentication-box">
            <div className="card mt-4">
              <div className="card-body">
                <div className="text-center">
                  <h4>Registro de horas</h4>
                </div>
                <div className="theme-form">
                  <div className="form-group">
                    <button
                      className="form-control btn btn-primary"
                      onClick={RegisterInput}
                    >
                      Registro de entrada
                    </button>
                  </div>
                  <div className="form-group">
                    <button
                      className="form-control btn btn-warning"
                      onClick={RegisterOutput}
                    >
                      Registro de entrada
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
