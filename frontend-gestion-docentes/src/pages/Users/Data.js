import React from "react";
import { User, ToggleLeft, ToggleRight } from "react-feather";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { statusEmployee } from "../../services";

const status = (id) => {
  Swal.fire({
    title: "¿Confirmar esta acción?",
    text: "Modificara el estado de este usuario",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      statusEmployee(id);
      window.location.reload();
    }
  });
};

export const columns = [
  {
    name: "Cedula",
    selector: "cedula",
  },
  {
    name: "Nombre",
    selector: "nombre",
  },
  {
    name: "Apellido",
    selector: "apellido",
  },
  {
    name: "Cargo",
    selector: "cargo",
  },
  {
    name: "Precio/hora",
    selector: "precio",
  },
  {
    name: "Estado",
    selector: "estado",
  },
  {
    name: "Acciones",
    cell: (row) => (
      <>
        {row.estado === "ACTIVO" && (
          <button
            className="btn btn-success ml-2 px-2"
            onClick={() => status(row._id)}
          >
            <ToggleRight className="text-white" />
          </button>
        )}
        {row.estado === "INACTIVO" && (
          <button
            className="btn btn-danger ml-2 px-2"
            onClick={() => status(row._id)}
          >
            <ToggleLeft className="text-white" />
          </button>
        )}

        <NavLink
          to={`/detail-user/${row._id}`}
          className="btn btn-info ml-2 px-2"
        >
          <User className="text-white" />
        </NavLink>
      </>
    ),

    ignoreRowClick: true,
  },
];
