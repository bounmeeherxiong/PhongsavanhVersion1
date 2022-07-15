import React, { useState, useContext, useEffect } from "react";

import { Table, Form, FloatingLabel } from "react-bootstrap";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { LoginContext } from "./contexts/LoginContext";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ChartAccounts() {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setType("");
    setNamelaos("");
    setNameeng("");
    setCode_2009("");
    setCode_1992("");
    setCode("");
    setShowUpdate(false);
    setCheckType(false);
    setErr_type("");
    setCheck(false);
  };
  const handleShow = () => setShow(true);
  const [type, setType] = useState("");
  const [code, setCode] = useState("");
  const [namelaos, setNamelaos] = useState("");
  const [nameeng, setNameeng] = useState("");

  const [searchResutl, setSearchResult] = useState([]);
  const [check, setCheck] = useState(false);
  const [statusType, setStatusType] = useState("");
  const [code_2009, setCode_2009] = useState("");
  const [code_1992, setCode_1992] = useState("");
  const [typeName, setTypeName] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const [checkType, setCheckType] = useState(false);
  const [id, setId] = useState("");
  const [err_namelaos, setErr_namelaos] = useState("");
  const [err_type, setErr_type] = useState("");
  const [err_status, setErr_status] = useState("");
  const [err_code, setErr_code] = useState("");
  const [err_codealready, setErr_codealready] = useState("");

  const { listCategory } = useContext(LoginContext);
  // const _onSearch = (e) => {
  //   setCode(e);
  //   if (check === true) {
  //     let dataresult = listchartaccount.filter((el) => el.ac_code.includes(e));
  //     setSearchResult(dataresult);
  //     if (!e) {
  //       setSearchResult([]);
  //     }
  //   }
  // };

  const [list, setList] = useState({});
  const [nameList, setNameList] = useState([]);
  const [detailCategory, setDetailCategory] = useState([]);
  const [detailCategoryFilter, setDetailCategoryFilter] = useState([]);

  useEffect(() => {
    axios.get("/accounts").then((data) => {
      setList({ ...data.data });
    });
    axios.get("/account-names").then((data) => {
      setNameList([...data.data.message]);
    });
    axios.get("detail-categories").then((data) => {
      setDetailCategory([...data.data.message]);
    });
  }, []);

  useEffect(() => {
    const filter = detailCategory.filter((el) => el.Category_name === type);

    setDetailCategoryFilter([...filter]);
  }, [type]);

  const [nameShow, setNameShow] = useState("");
  const getNameList = (name) => {
    axios.get(`/parents/${name}`).then((data) => {
      if (data?.data?.message.length > 0) {
        console.log(data?.data?.message);
        const names = data?.data?.message.map((item) => {
          return item.fullname;
        });
        names.reverse();
        setNameShow(names.join("-"));
      }
    });
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        style={{ paddingTop: 50 }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "100%" }}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label style={{ fontSize: 20 }}>Account Type</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                  >
                    {listCategory &&
                      listCategory.map((data, index) => {
                        return (
                          <option value={data.uid} key={index}>
                            {data?.Category_name}
                          </option>
                        );
                      })}
                  </Form.Select>
                  <p style={{ color: "red" }}>{err_type}</p>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label style={{ fontSize: 20 }}>Detail Type</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setType(e.target.value)}
                    value={type}
                  >
                    <option>ໃຫ້ເລືອກຊະນີດ</option>
                    {
                      detailCategoryFilter.map((data, index)=>{
                        return (
                          <option key={index} value="12">{data.DetailType}</option>
                        )
                      })
                    }
                  </Form.Select>
                </Form.Group>
                <p style={{ color: "red" }}>{err_namelaos}</p>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label style={{ fontSize: 20 }}></Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </div>
              <div style={{ width: 15 }}></div>
              <div style={{ width: "100%" }}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label style={{ fontSize: 20 }}>Name</Form.Label>

                  <Form.Control type="email" placeholder="Name" autoFocus />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label style={{ fontSize: 20 }}>Description</Form.Label>

                  <Form.Control
                    type="email"
                    placeholder="Description"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Is sub-account"
                    onClick={() => setCheck(!check)}
                  />
                </Form.Group>
                <Form.Group>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={nameList}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Name List"
                        onBlur={(e) => getNameList(e.target.value)}
                        value={nameShow}
                      />
                    )}
                  />
                  {nameShow}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter parent account"
                    autoFocus
                  />
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {showUpdate ? (
            <Button variant="primary">Upate Changes1</Button>
          ) : (
            <Button variant="primary">Save Changes1</Button>
          )}
        </Modal.Footer>
      </Modal>
      <Breadcrumbs aria-label="breadcrumb">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <p
            style={{
              fontSize: 20,
              color: "black",
              fontFamily: "Phetsarath OT",
              alignItems: "center",
              paddingTop: 10,
            }}
          >
            <ArrowBackIcon style={{ color: "#3f51b5" }} />
            ຕາຕະລາງບັນຊີ
          </p>
          <button
            style={{
              backgroundColor: "#3f51b5",
              border: "none",
              height: 35,
              borderRadius: 2,
              flexDirection: "row",
              marginLeft: 10,
              paddingLeft: 10,
              paddingRight: 10,
              color: "white",
              fontFamily: "Phetsarath OT",
            }}
            onClick={() => {
              handleShow();
              setCheckType(false);
            }}
          >
            <AddIcon />
            ເພີ່ມເລກລະຫັດບັນຊີ
          </button>
        </div>
      </Breadcrumbs>
      <div
        style={{
          height: 10,
        }}
      ></div>
      <div
        style={{
          height: 5,
          backgroundColor: "#3f51b5",
        }}
      ></div>
      <div
        style={{
          height: 10,
        }}
      ></div>

      <div
        style={{
          display: "flex",
          height: 40,
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 5,
        }}
      >
        <input
          type={"text"}
          style={{
            width: 100,
            outline: "none",
            border: "1px solid #DBDBDB",
            height: 35,
            paddingLeft: 20,
            display: "flex",
            justifyContent: "center",
          }}
        />
        <button
          style={{
            backgroundColor: "#3f51b5",
            border: "none",
            height: 35,
            borderRadius: 2,
            flexDirection: "row",
            paddingLeft: 10,
            paddingRight: 10,
            color: "white",
          }}
        >
          <CloseIcon />
        </button>

        <input
          type={"text"}
          style={{
            width: 200,
            outline: "none",
            border: "1px solid #DBDBDB",
            height: 35,
            marginLeft: 20,
            paddingLeft: 20,
            display: "flex",
            justifyContent: "center",
          }}
        />
        <button
          style={{
            backgroundColor: "#3f51b5",
            border: "none",
            height: 35,
            borderRadius: 2,
            flexDirection: "row",
            paddingLeft: 10,
            paddingRight: 10,
            color: "white",
          }}
        >
          <CloseIcon />
        </button>
        <select
          style={{
            width: 200,
            outline: "none",
            border: "1px solid #DBDBDB",
            height: 35,
            marginLeft: 20,
            paddingLeft: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <option>ຊະນິດທັງໝົດ</option>
          {/* {listType &&
            listType.map((data, index) => {
              return (
                <option value={data.uid} key={index}>
                  {data?.name}
                </option>
              );
            })} */}
        </select>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <button
            style={{
              backgroundColor: "#3f51b5",
              border: "none",
              height: 35,
              borderRadius: 2,
              paddingLeft: 10,
              paddingRight: 10,
              color: "white",
              alignItems: "center",
            }}
          >
            <SearchIcon />
            ຊອກຫາ
          </button>
        </div>
      </div>
      <div style={{ paddingTop: 20 }}>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ລະຫັດ</th>
              <th>ຊື່</th>
              <th>ປະເພດ</th>
              <th>ບັນຊີ2009</th>
              <th>ບັນຊີ1992</th>
              <th>ສະຖານະ</th>
              <th>ໝ້າທີ່</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list.message &&
              list.message.map((item, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td>{item.fullname}</td>
                      <td>ຊື່</td>
                      <td>ປະເພດ</td>
                      <td>ບັນຊີ2009</td>
                      <td>ບັນຊີ1992</td>
                      <td>ສະຖານະ</td>
                      <td>ໝ້າທີ່</td>
                    </tr>
                    {/* Level 1 */}
                    <RowComponent
                      children={list.children}
                      id={item.id}
                      level={20}
                    />
                  </>
                );
              })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

// Level 1
function RowComponent({ children, id, level }) {
  const filter = children.filter((el) => el.parent_id == id);
  if (filter.length === 0) return <></>;
  return (
    <>
      {filter.map((data, index) => {
        return (
          <>
            <tr key={index}>
              <td
                style={{
                  paddingLeft: level,
                }}
              >
                {data.fullname}
              </td>
              <td>ຊື່</td>
              <td>ປະເພດ</td>
              <td>ບັນຊີ2009</td>
              <td>ບັນຊີ1992</td>
              <td>ສະຖານະ</td>
              <td>ໝ້າທີ່</td>
            </tr>
            <RowComponent children={children} id={data.id} level={level * 2} />
          </>
        );
      })}
    </>
  );
}
