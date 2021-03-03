import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { campos_vacios } from "../../utils/constant";
import { RegisterEmployee } from "../../services";
import Swal from "sweetalert2";

export const FormUser = () => {
  const { register, errors, handleSubmit } = useForm();

  const onSubmit = async (data, e) => {
    const response = await RegisterEmployee(data);
    if (response && response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Proceso exitoso",
        text: response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      e.target.reset();

      return;
    }
    Swal.fire({
      icon: "error",
      title: "Proceso fallido",
      text: response.message,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <h5>Datos de usuarios </h5>
          </div>

          <div className="card-body">
            {(errors.cedula ||
              errors.nombre ||
              errors.apellido ||
              errors.cargo ||
              errors.precio) && (
              <div className="alert alert-warning mt-4" role="alert">
                {campos_vacios}
              </div>
            )}

            <form className="theme-form " onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="col-form-label pt-0" htmlFor="cedula">
                  Cédula
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Cédula"
                  name="cedula"
                  maxLength="10"
                  ref={register({ required: true })}
                />
              </div>
              <div className="form-group">
                <label className="col-form-label pt-0" htmlFor="nombre">
                  Nombres
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nombres"
                  name="nombre"
                  ref={register({ required: true })}
                />
              </div>
              <div className="form-group">
                <label className="col-form-label pt-0" htmlFor="apellido">
                  Apellidos
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Apellidos"
                  name="apellido"
                  ref={register({ required: true })}
                />
              </div>
              <div className="form-group">
                <label className="col-form-label pt-0" htmlFor="cargo">
                  Cargo
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Cargo"
                  name="cargo"
                  ref={register({ required: true })}
                />
              </div>
              <div className="form-group">
                <label className="col-form-label pt-0" htmlFor="precio">
                  Precio por hora
                </label>
                <input
                  className="form-control"
                  type="number"
                  placeholder="Precio por hora"
                  name="precio"
                  ref={register({ required: true })}
                />
              </div>
              <div className="form-group">
                <button
                  className="btn btn-primary mr-1 float-right mt-4"
                  type="submit"
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
