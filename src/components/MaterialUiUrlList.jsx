import React from "react";
import MaterialTable from "material-table";

import LocalDatabase from "../api/Data";

export default function UrlListMaterialUiTable() {
  let UrlsDB = new LocalDatabase();

  const [state, setState] = React.useState({
    columns: [
      { title: "Key", field: "shortUrl" },
      { title: "Url", field: "url" }
    ],
    data: UrlsDB.getAllUrl()
  });

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>

      <MaterialTable
        title={<h2>List of stored URL's</h2>}
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                UrlsDB.addUrlToStorage(newData.shortUrl, newData.url);
                return { ...prevState, data };
              });
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  UrlsDB.updateUrl(newData);
                  return { ...prevState, data };
                });
              }
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                UrlsDB.saveAll(data);
                return { ...prevState, data };
              });
            })
        }}
      />
    </div>
  );
}
