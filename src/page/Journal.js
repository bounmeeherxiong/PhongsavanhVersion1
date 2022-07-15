import React, { useState } from "react";
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function Journal() {
  const [rows, setRows] = useState(['1','1','1','1','1']);
  const push = () => {
    setRows([...rows, rows]);
  };
  const classes = useStyles();
  const removeArray = (index) => {
    if (rows.length > 5) {
        let oldarray = [...rows]
        oldarray.splice(index, 1);
        setRows([...oldarray])
    }
  };
  return (
    <div>
      <button onClick={() => push()}>pust</button>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row,index) => (
              <TableRow key={row.name}>
                <TableCell style={{ width: 50 }}>1</TableCell>
                <TableCell style={{ width: 300, backgroundColor: "red" }}>
                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                  >
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      aria-describedby="outlined-weight-helper-text"
                      style={{ height: 35, width: 300 }}
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
                    />
                  </FormControl>
                </TableCell>
                <TableCell>
                  <DeleteIcon style={{ cursor: "pointer" }} onClick={()=>removeArray(index)}/>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell
                colSpan={2}
                style={{ backgroundColor: "red" }}
                align="right"
              >
                Total
              </TableCell>
              <TableCell align="left">20000</TableCell>
              <TableCell align="left">20000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
