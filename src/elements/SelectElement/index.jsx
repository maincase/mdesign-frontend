import { MenuItem, Select } from "@mui/material";
import React from "react";

const SelectElement = ({ selectList, title }) => {
  const [selectedElement, setSelectedElement] = React.useState(selectList[0]);
  const elementChange = (event) => {
    setSelectedElement(event.target.value);
  };
  return (
    <>
      <h5 style={{ marginBottom: 5 }}>{title}</h5>
      <Select
        value={selectedElement}
        onChange={elementChange}
        inputProps={{ IconComponent: () => null }}
        style={{
          color: "#fff",
          backgroundColor: "#161616",
          border: "1px solid #ffffff33",
          width: "100%",
          borderRadius: 12,
        }}
      >
        {selectList.map((el) => {
          return (
            <MenuItem value={el} key={el}>
              {el}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};

export default SelectElement;
