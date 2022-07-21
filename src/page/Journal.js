import React, { useState, useContext, useEffect } from "react";
import { Table } from "react-bootstrap";

import { LoginContext } from "./contexts/LoginContext";
import axios from "axios";

const Journal = () => {
  const [data, setData] = useState([{}]);

  const addMore = () => {
    setData([...data, {}]);
  };

  return (
    <div>
      {JSON.stringify(data)}
      <table width={"100%"}>
        <tr>
          <td>Index</td>
          <td>Name</td>
          <td>Text</td>
        </tr>
        {data.map((item, index) => {
          return (
            <RowComponent
              key={index}
              index={index}
              data={data}
              setData={setData}
            />
          );
        })}
      </table>
      <button onClick={addMore}>Add more</button>
    </div>
  );
};

function RowComponent({ index, data, setData }) {
  const { nameList } = useContext(LoginContext);
  const [prentid, setPrentid] = useState("");
  const [nameShow, setNameShow] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [active, setActive] = useState("");
  const [showBox, setShowBox] = useState(false);

  const getNameList = (name, index = null) => {
    axios.get(`/Allparents/${name}`).then((data) => {
      if (data?.data?.message.length > 0) {
        setPrentid(data?.data.message[0].Account_id);
        const names = data?.data?.message.map((item) => {
          return item.ChartAccountName;
        });
        names.reverse();
        setNameShow(names.join(":"));
        changeText(names.join(":"), "name");
        setShowBox(!showBox);
      }
    });
    if (index !== null) {
      console.log(index);
    }
  };
  const _onSearchList = (e, name) => {
    setNameShow(e);
    let searchName = nameList.filter((el) => el.label.includes(e));
    if (!e) {
      setSearchResult([]);
    } else {
      setSearchResult([...searchName]);
    }
  };

  const changeText = (value, key) => {
    const object = { ...data[index] };
    object[key] = value;
    const cloneData = [...data];
    cloneData[index] = { ...object };
    setData([...cloneData]);
  };
  return (
    <tr>
      <td>{index}</td>
      <td>
        <input
          placeholder="Account Name"
          value={data[index].name}
          onChange={(e) => {
           
            _onSearchList(e.target.value, "name");
          }}
          onClick={() => setShowBox(true)}
        />
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
                {searchResult.map((data, index1) => {
                  return (
                    <>
                      <span
                        style={{
                          cursor: "pointer",
                          fontWeight: active === data?.label ? "bold" : "",
                        }}
                        onClick={() => getNameList(data?.id, index)}
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
                {nameList.map((data, index1) => {
                  return (
                    <>
                      <span
                        style={{
                          cursor: "pointer",
                          fontWeight: active === data?.label ? "bold" : "",
                        }}
                        onClick={() => getNameList(data?.id, index)}
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
      </td>
      <td>
        <input
          placeholder="Text"
          value={data[index].text}
          onChange={(e) => changeText(e.target.value, "text")}
        />
      </td>
      <td>
        <input
          placeholder="Text"
          value={data[index].text}
          onChange={(e) => changeText(e.target.value, "text")}
        />
      </td>
      <td>
        <input
          placeholder="Text"
          value={data[index].text}
          onChange={(e) => changeText(e.target.value, "text")}
        />
      </td>
    </tr>
  );
}

export default Journal;
