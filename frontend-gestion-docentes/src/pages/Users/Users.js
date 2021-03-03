import React, { useEffect, useState } from "react";
import { Table } from "../../components/Tables/Table";
import { Layout } from "../../layout/Layout";
import { columns } from "./Data";
import { getEmployees } from "../../services";

export const Users = ({ setRefreshCheckLogin }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getAllEmployees = async () => {
      const response = await getEmployees();
      setData(response.data.employess);
    };
    getAllEmployees();
  }, []);

  const tableData = {
    columns,
    data,
  };

  return (
    <Layout setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="main ">
        <br />
        <>
          {data ? (
            <Table tableData={tableData} />
          ) : (
            <div className="alert alert-warning mt-4" role="alert">
              No existen datos
            </div>
          )}
        </>
      </div>
    </Layout>
  );
};
