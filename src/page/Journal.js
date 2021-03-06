import React, { useState, useContext, useEffect } from "react";
import { Table } from "react-bootstrap";

import { LoginContext } from "./contexts/LoginContext";
import axios from "axios";

function Journal() {
  const { nameList } = useContext(LoginContext);
  const [prentid, setPrentid] = useState("");
  const [nameShow, setNameShow] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [detailCategory_id, setDetailCategory_id] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [active, setActive] = useState("");
  const [showBox, setShowBox] = useState(false);
  const getNameList = (name) => {
    axios.get(`/Allparents/${name}`).then((data) => {
      if (data?.data?.message.length > 0) {
        setPrentid(data?.data.message[0].Account_id);
        const names = data?.data?.message.map((item) => {
          return item.ChartAccountName;
        });
        names.reverse();
        setNameShow(names.join(":"));
        setShowBox(!showBox);
      }
    });
  };
  const _onSearchList = (e) => {
    setNameShow(e);
    let searchName = nameList.filter((el) => el.label.includes(e));
    if (!e) {
      setSearchResult([]);
    } else {
      setSearchResult([...searchName]);
    }
  };

  const [formFields, setFormFields] = useState([
    {
      category_id: "",
      detailCategory_id: "",
      prentid: "",
      Description: "",
      Tax: "",
      Amount: "",
    },
  ]);
  const handleFormChange = (event, index) => {
    // console.log(index,event.target.name)
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };
  const submit = (e) => {
    e.preventDefault();
    console.log(formFields);
    // axios.post("/transactions", formFields).then((data) => {
    //   console.log(data);
    // });
  };
  const addFields = () => {
    let object = {
      category_id: category_id,
      detailCategory_id: detailCategory_id,
      prentid: prentid,
      Description: "",
      Tax: "",
      Amount: "",
    };

  

    setFormFields([...formFields, object]);
  };


  const remove = (index) => {
    // console.log(index)
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };
  return (
    <>
      <Table striped bordered hover>
        <tbody>
          {formFields &&
            formFields.map((data, index) => {
              return (
                <tr>
                  <td>1</td>
                  <td>
                    <input
                      type="text"
                      placeholder="Description"
                      onChange={(e) => _onSearchList(e.target.value)}
                      value={nameShow}
                      autoFocus
                      style={{
                        border: "1px solid #ccc",
                        borderRight: "none",
                        flex: 1,
                        height: 40,
                        outline: "none",
                        paddingLeft: 10,
                      }}
                      onClick={() => setShowBox(true)}
                    />
                  </td>
                  {showBox && (
                    <div
                      style={{
                        overflowY: "scroll",
                        height: 100,
                        paddingTop: 5,
                        paddingLeft: 10,
                      }}
                    >
                      {searchResult.length > 0 ? (
                        <>
                          {searchResult.map((data, index) => {
                            return (
                              <>
                                <span
                                  style={{
                                    cursor: "pointer",
                                    fontWeight:
                                      active === data?.label ? "bold" : "",
                                  }}
                                  onClick={() => getNameList(data?.label)}
                                  onMouseOver={() => setActive(data?.label)}
                                  onMouseLeave={() => setActive(null)}
                                >
                                  {data?.label}
                                </span>
                                <br />
                              </>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          {nameList.map((data, index) => {
                            return (
                              <>
                                <span
                                  style={{
                                    cursor: "pointer",
                                    fontWeight:
                                      active === data?.label ? "bold" : "",
                                  }}
                                  onClick={() => getNameList(data?.label)}
                                  onMouseOver={() => setActive(data?.label)}
                                  onMouseLeave={() => setActive(null)}
                                >
                                  {data?.label}
                                </span>
                                <br />
                              </>
                            );
                          })}
                        </>
                      )}
                    </div>
                  )}
                  <td>
                    <input
                      type="text"
                      name="debit"
                      placeholder="Name"
                      onChange={(event) => handleFormChange(event, index)}
                      value={data.debit}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="Credit"
                      placeholder="Name"
                      onChange={(event) => handleFormChange(event, index)}
                      value={data.Credit}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="Description"
                      placeholder="Name"
                      onChange={(event) => handleFormChange(event, index)}
                      value={data.Description}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="Tax"
                      placeholder="Description"
                      onChange={(event) => handleFormChange(event, index)}
                      value={data.Tax}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="Employee"
                      placeholder="Description"
                      onChange={(event) => handleFormChange(event, index)}
                      value={data.Employee}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <button onClick={addFields}>Add more....</button>
      <br />
      <button onClick={submit}>Submit</button>
    </>
  );
}

export default Journal;
