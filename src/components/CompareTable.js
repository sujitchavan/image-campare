import React from "react";

const CompareTable = (props) => {
  return (
    <div className="mt-4">
      <h6 className="text-center">COMPARISION TABLE</h6>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Photo</th>
            <th>ID</th>
            <th>URL</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((obj, index) => {
            return (
              <tr key={index}>
                <td>
                  <img src={obj.url} className="img-fluid imageHW" alt="" />
                </td>
                <td>{obj.id}</td>
                <td>
                  <a href={obj.url}>{obj.url}</a>
                </td>
                <td>{obj.title}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;
