import React from "react";
import { useEffect, useState } from "react";
import "../style/style.css";
import _ from "lodash";
import CompareTable from "./CompareTable";

const Image = () => {
  const [images, setImages] = useState();
  const [dataTable, setDataTable] = useState([]);

  const [paginatedData, setPaginatedData] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 12;
  const pageCount = images ? Math.ceil(images.length / pageSize) : 0;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setPaginatedData(_(data).slice(0).take(pageSize).value());
      })
      .catch((error) => console.log(error));
  }, []);

  const AddDataToTable = (obj) => {
    let local = [...dataTable];
    local.push(obj);
    setDataTable(local);
  };

  const RemoveDataFromTable = (obj) => {
    let local = [...dataTable];
    local = local.filter((val) => val.id !== obj.id);
    setDataTable(local);
  };

  const pages = _.range(1, pageCount + 1);

  const PaginationFn = (page) => {
    setCurrentPage(page);
    setPaginatedData(
      _(images)
        .slice((page - 1) * pageSize)
        .take(pageSize)
        .value()
    );
  };

  return (
    <div className="container mt-4">
      <h6 className="text-center">PHOTO LISTING</h6>
      {paginatedData && (
        <div className="row g-4 mt-2">
          {paginatedData.map((obj, index) => {
            return (
              <div className="col-md-3 col-lg-2" key={index}>
                <div className="card bg-light h-100">
                  <div className="card-body text-center">
                    <img
                      src={obj.url}
                      alt=""
                      className="img-fluid rounded-circle mb-2"
                    />
                    <p className="titleHW">{obj.title}</p>
                    <p>{obj.id}</p>
                    <a href={obj.url} className="cart-text small">
                      {obj.url}
                    </a>
                    <div>
                      {!dataTable.includes(obj) ? (
                        <button
                          className="btn btn-dark mt-2"
                          size="sm"
                          type="button"
                          onClick={() => {
                            AddDataToTable(obj);
                          }}
                        >
                          Compare
                        </button>
                      ) : (
                        <button
                          className="btn btn-dark mt-2"
                          size="sm"
                          type="button"
                          onClick={() => {
                            RemoveDataFromTable(obj);
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <nav className="pt-3">
        <ul className="d-flex justify-content-end pagination">
          {pages.map((page, index) => {
            if (page === currentPage) {
              return (
                <>
                  {page !== 1 && (
                    <li className="page-item">
                      <p
                        className="page-link text-dark"
                        onClick={() => {
                          if (page !== 1) PaginationFn(page - 1);
                        }}
                      >
                        {page - 1}
                      </p>
                    </li>
                  )}
                  <li className="page-item">
                    <p
                      className="page-link text-dark"
                      onClick={() => {
                        PaginationFn(page);
                      }}
                    >
                      {page}
                    </p>
                  </li>
                  {page !== pageCount && (
                    <>
                      <li className="page-item">
                        <p
                          className="page-link text-dark"
                          onClick={() => {
                            PaginationFn(page + 1);
                          }}
                        >
                          {page + 1}
                        </p>
                      </li>
                      <li className="page-item">
                        <p className="page-link text-dark">...</p>
                      </li>
                      <li className="page-item">
                        <p
                          className="page-link text-dark"
                          onClick={() => {
                            PaginationFn(pageCount);
                          }}
                        >
                          {pageCount}
                        </p>
                      </li>
                    </>
                  )}
                </>
              );
            }
            return null;
          })}
        </ul>
      </nav>
      {dataTable.length !== 0 && <CompareTable data={dataTable} />}
    </div>
  );
};

export default Image;
