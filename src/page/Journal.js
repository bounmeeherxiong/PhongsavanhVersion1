import React, { useState, useContext, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { LoginContext } from "./contexts/LoginContext";
import axios from "axios";

export default function Journal() {
  const { nameList } = useContext(LoginContext);
  const [prentid, setPrentid] = useState("");
  const [nameShow, setNameShow] = useState("");

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
  const [rows, setRows] = useState([
    {
      AccountName: "",
      Debit: "",
      Credit: "",
      Description: "",
      Tax: "",
      Employee: "",
    },
    {
      AccountName: "",
      Debit: "",
      Credit: "",
      Description: "",
      Tax: "",
      Employee: "",
    },
    {
      AccountName: "",
      Debit: "",
      Credit: "",
      Description: "",
      Tax: "",
      Employee: "",
    },
    {
      AccountName: "",
      Debit: "",
      Credit: "",
      Description: "",
      Tax: "",
      Employee: "",
    },
    {
      AccountName: "",
      Debit: "",
      Credit: "",
      Description: "",
      Tax: "",
      Employee: "",
    },
    {
      AccountName: "",
      Debit: "",
      Credit: "",
      Description: "",
      Tax: "",
      Employee: "",
    },
  ]);

  const getNameList = (name) => {
    axios.get(`/Allparents/${name}`).then((data) => {
      if (data?.data?.message.length > 0) {
        // console.log("name=",data?.data.message[0].Account_id);
        setPrentid(data?.data.message[0].Account_id);
        const names = data?.data?.message.map((item) => {
          return item.ChartAccountName;
        });
        names.reverse();
        setNameShow(names.join(":"));
      }
    });
  };
  const submit = (e) => {
    e.preventDefault();
    console.log(rows);
  };

  const handleFormChange = (event, index) => {
    let data = [...rows];
    data[index][event.target.name] = event.target.value;
    setRows(data);
  };
  const addFields = () => {
    let object = {
      AccountName: "",
      Debit: "",
      Credit: "",
      Description: "",
      Tax: "",
      Employee: "",
    };
    setRows([...rows, object]);
  };
  const remove = (index) => {
    // console.log(index)
    let data = [...rows];
    data.splice(index, 1);
    setRows(data);
  };

  const classes = useStyles();

  return (
    <div>
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
            ລົງບັນຊີປະຈຳວັນ
          </p>
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
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>ຊື່ບັນຊີ</TableCell>
              <TableCell>ໜີສີນ</TableCell>
              <TableCell>ມິ</TableCell>
              <TableCell>ລາຍລະອຽດ</TableCell>
              <TableCell>ຊື່ພະນັກງານ</TableCell>
              <TableCell>ຢ</TableCell>
              <TableCell>ຢ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((data, index) => (
              <TableRow key={index}>
                <TableCell style={{ width: 50 }}>{index + 1}</TableCell>
                <TableCell style={{ width: 300 }}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    sx={{ width: 300 }}
                    options={nameList}
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
                </TableCell>
                <TableCell>
                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                  >
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      aria-describedby="outlined-weight-helper-text"
                      style={{ height: 35, width: 100 }}
                      name="Debit"
                      onChange={(event) => handleFormChange(event, index)}
                      value={data.Debit}
                    />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                  >
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      aria-describedby="outlined-weight-helper-text"
                      style={{ height: 35, width: 100 }}
                      name="Credit"
                      onChange={(event) => handleFormChange(event, index)}
                      value={data.Credit}
                    />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                  >
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      aria-describedby="outlined-weight-helper-text"
                      style={{ height: 35 }}
                      name="Description"
                      onChange={(event) => handleFormChange(event, index)}
                      value={data.Description}
                    />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                  >
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      aria-describedby="outlined-weight-helper-text"
                      labelWidth={0}
                      style={{ height: 35 }}
                      name="Tax"
                      onChange={(event) => handleFormChange(event, index)}
                      value={data.Tax}
                    />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                  >
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      aria-describedby="outlined-weight-helper-text"
                      labelWidth={0}
                      style={{ height: 35 }}
                      name="Employee"
                      onChange={(event) => handleFormChange(event, index)}
                      value={data.Employee}
                    />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <DeleteIcon style={{ cursor: "pointer" }} />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2} align="right">
                Total:
              </TableCell>
              <TableCell align="right">20000</TableCell>
              <TableCell align="right">20000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <button onClick={addFields}>Add lines....</button>
        <button onClick={remove}>Clear lines....</button>
        <button onClick={submit}>Saving</button>
      </TableContainer>
    </div>
  );
}
