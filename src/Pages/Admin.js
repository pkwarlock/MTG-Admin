import React, { useState, useEffect } from "react";
import Select from "react-select";
import ModalCrudUser from "../Components/ModalCrudUser";
import { getAllAdmin } from "../Services/login";

const Admin = () => {
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const getList = () => {
    getAllAdmin()
      .then((res) => {
        console.log(res);
        setResults(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  const displayForm = (
    <div>
      <div className="row">
        <div className="col-5">
          <input type="text" className="form-control" placeholder="Name" />
        </div>
        <div className="col-5">
          <Select placeholder="Status" />
        </div>

        <div className="col-2">
          <div className="d-flex justify-content-around">
            <button className="btn btn--secondary ">Search</button>
            <button
              className="btn btn--outline-secondary"
              onClick={() => {
                setIsModalOpen(true);
                setModalType("Create");
              }}
            >
              New
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const displayTable = (
    <div className="my-2">
      <table className="main-table">
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th>NAME</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {results?.map((item, index) => {
            return (
              <tr key={item.id}>
                <td className="text-center">{index + 1}</td>
                <td>
                  {item.firstName} {item.lastName}
                </td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>Active</td>
                <td className="text-nowrap">
                  <span
                    className="mx-3"
                    type="button"
                    onClick={() => {
                      setIsModalOpen(true);
                      setModalType("Edit");
                    }}
                  >
                    <img
                      src="/assets/images/icon/edit.png"
                      alt="edit"
                      width="16px"
                    />
                  </span>

                  <span className="mx-3" type="button">
                    <img
                      src="/assets/images/icon/bin.png"
                      alt="bin"
                      width="16px"
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="py-4 container">
      <div className="h4">Admin</div>
      <div>{displayForm}</div>
      <div>{displayTable}</div>
      <ModalCrudUser
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        modalType={modalType}
        callBack={getList}
      />
    </div>
  );
};

export default Admin;
