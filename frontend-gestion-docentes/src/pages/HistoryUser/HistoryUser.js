// import React from 'react'
import { Layout } from "../../layout/Layout";
import React, { Fragment, useEffect, useState } from "react";
import { ArrowLeft, Plus } from "react-feather";
import { withRouter } from "react-router-dom";
import { Table } from "../../components/Tables/Table";
import { columns } from "./Data";
import Swal from "sweetalert2";
import { getEmployee, UpdateEmployee, calculatePayment } from "../../services";
import { useForm } from "react-hook-form";
import { campos_vacios } from "../../utils/constant";

const HistoryUser = ({ setRefreshCheckLogin, history, match }) => {
  const [employee, setEmployee] = useState(null);
  const [data, setData] = useState(null);

  const { params } = match;

  useEffect(() => {
    const getEmployeeById = async () => {
      const response = await getEmployee(params.id);
      setEmployee(response.data.employee);
      setData(response.data.employee.hours);
      // console.log(response.data.employee.hours)
    };

    getEmployeeById();
  }, []);

  const { register, errors, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const response = await UpdateEmployee(params.id, data);
    if (response && response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Proceso exitoso",
        text: response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });

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

  // hacer el calculo API
  const calculateHours = async (month) => {
    const response = await calculatePayment(params.id, month);

    if (response && response.status === 200) {
      Swal.fire({
        icon: "success",
        html: `El valor a cancelar del mes de ${month} es: <hr> Horas totales: ${response.data.horas_totales} <hr> Precio por hora: ${response.data.precio} <hr> Total a pagar: ${response.data.pagototal}`,
      });
      return;
    }
    Swal.fire({
      icon: "error",
      text: response.message,
    });
    return;
  };
  // obtener el mes
  const calculate = () => {
    Swal.fire({
      title: "Seleccione mes",
      input: "select",
      inputOptions: {
        enero: "Enero",
        febrero: "Febrero",
        marzo: "Marzo",
        abril: "Abril",
        mayo: "Mayo",
        junio: "Junio",
        julio: "Julio",
        agosto: "Agosto",
        septiembre: "Septiembre",
        octubre: "Octubre",
        noviembre: "Noviembre",
        diciembre: "Diciembre",
      },
      showCancelButton: true,
      inputValidator: function (value) {
        return new Promise(function (resolve, reject) {
          if (value !== "") {
            resolve();
          } else {
            resolve("Necesita seleccionar un mes");
          }
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // para mostra resultados
        calculateHours(result.value);
      }
    });
  };

  const tableData = {
    columns,
    data,
  };

  return (
    <Layout setRefreshCheckLogin={setRefreshCheckLogin}>
      <Fragment>
        <div className="container-fluid">
          <button
            className="btn btn-warning mt-3 mb-3"
            onClick={() => history.push("/users")}
          >
            <ArrowLeft />
          </button>
          <button
            className="btn btn-success mt-3 mb-3 float-right"
            onClick={calculate}
          >
            calcular pago <Plus size="0.79em" />
          </button>

          <div className="edit-profile">
            <div className="row">
              <div className="col-lg-5">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title mb-0">Perfil de usuario</h4>
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

                    <form
                      className="theme-form "
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="form-group">
                        <label className="col-form-label pt-0" htmlFor="cedula">
                          Cédula
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="cedula"
                          placeholder="Cédula"
                          defaultValue={employee && employee.cedula}
                          maxLength="10"
                          disabled
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
                          defaultValue={employee && employee.nombre}
                          ref={register({ required: true })}
                        />
                      </div>
                      <div className="form-group">
                        <label
                          className="col-form-label pt-0"
                          htmlFor="apellido"
                        >
                          Apellidos
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Apellidos"
                          defaultValue={employee && employee.apellido}
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
                          defaultValue={employee && employee.cargo}
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
                          defaultValue={employee && employee.precio}
                          name="precio"
                          ref={register({ required: true })}
                        />
                      </div>
                      <div className="form-group">
                        <button className="btn btn-primary btn-block">
                          Actualizar información
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                {data ? (
                  <Table tableData={tableData} />
                ) : (
                  <div className="alert alert-warning mt-4" role="alert">
                    No existen datos
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </Layout>
  );
};

export default withRouter(HistoryUser);
