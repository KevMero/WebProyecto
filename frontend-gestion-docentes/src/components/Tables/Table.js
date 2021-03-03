import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

export const Table = ({ tableData }) => {

 
  const paginationOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
  };

  const customStyles = {
    headRow: {
      style: {
        border: "none",
      },
    },
    headCells: {
      style: {
        color: "#202124",
        fontSize: "14px",
        
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: "rgb(230, 244, 244)",
        borderBottomColor: "#FFFFFF",
        outline: "1px solid #FFFFFF",
        
      },
    },
    pagination: {
      style: {
        border: "none",
      },
    },
  };

  return (
    <>
    <DataTableExtensions
      {...tableData}
      print={false}
      filterPlaceholder='Filtrado de busqueda'
    >
      <DataTable
        columns={tableData.columns}
        data={tableData.data}
        noHeader
        pagination
        highlightOnHover
        paginationComponentOptions={paginationOptions}
        customStyles={customStyles}
        fixedHeader
        pointerOnHover
        defaultSortField="id"
        defaultSortAsc={false}
        
        
      />
      </DataTableExtensions>
      </>
  );
};
