import React, { useState, useContext, useEffect } from "react";
import { Table, Form } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { LoginContext } from "./contexts/LoginContext";
import axios from "axios";

function Journal() {
  const { nameList } = useContext(LoginContext);
  const [prentid, setPrentid] = useState("");
  const [nameShow, setNameShow] = useState("");
  const [category_id,setCategory_id]=useState("");
  const [detailCategory_id,setDetailCategory_id]=useState("")
  const getNameList = (name) => {
    axios.get(`/Allparents/${name}`).then((data) => {
      if (data?.data?.message.length > 0) {
        console.log("category_id=",data?.data.message[0].Category_id)
        console.log("detaiCategory_id=",data?.data.message[0].DetailCategory_id)
        console.log("Account_id=",data?.data.message[0].Account_id)
        setCategory_id(data?.data.message[0].Category_id);
        setDetailCategory_id(data?.data.message[0].DetailCategory_id);
        setPrentid(data?.data.message[0].Account_id);

        const names = data?.data?.message.map((item) => {
          return item.ChartAccountName;
        });
        names.reverse();
        setNameShow(names.join(":"));
      }
    });
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
      prentid:prentid,
      Description: "",
      Tax: "",
      Amount: "",
    };
 
    setFormFields([...formFields, object]);
  };

  function handleInputChange(event, value) {
    getNameList(value)
  }
  const remove = (index) => {
    // console.log(index)
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };
  return (
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {formFields &&
          formFields.map((data, index) => {
            return (
              <tr>
                <td>1</td>
                <td>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={nameList}
                    sx={{ width: 200 }}
                    onInputChange={handleInputChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Name List"
                        onClick={(e) => getNameList(e.target.value)}
                        value={nameShow}
                      />
                    )}
                  />
                  {nameShow}
                </td>
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
