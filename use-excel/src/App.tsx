import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as XLSX from "xlsx";
import styled from "styled-components";

type Politician = {
  [key: string]: string;
};

function App() {
  const [__html, setHTML] = useState("");
  const [excelData, setExcelData] = useState<Politician[]>();
  let keyArr: string[] = [];
  if (excelData) keyArr = Object.keys(excelData[0]);
  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    importFile(file);
  };

  console.log(excelData);
  console.log(keyArr);
  const importFile = async (file: File) => {
    /* get data as an ArrayBuffer */
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e?.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0]; // Assuming the first sheet is the one you want to read
      const worksheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(parsedData as Politician[]);
    };

    reader.readAsBinaryString(file);
  };

  useEffect(() => {
    if (!excelData) return;
  }, [excelData]);

  return (
    <>
      <h3>엑셀 업로드 테스트</h3>
      {/* Import Button */}
      <input type="file" onChange={(e) => fileChangeHandler(e)} />

      {/* Export Button */}
      <button
        onClick={() => {
          /* Create worksheet from HTML DOM TABLE */
          const table = document.getElementById("tabeller");
          const wb = XLSX.utils.table_to_book(table);

          /* Export to file (start a download) */
          XLSX.writeFile(wb, "SheetJSIntro.xlsx");
        }}
      >
        <b>Export XLSX!</b>
      </button>

      {excelData && (
        <SheetWrapper>
          <Label>
            {keyArr.map((key) => (
              <div>{key}</div>
            ))}
          </Label>
          <div>
            {excelData.map((data) => (
              <>
                <img src={data[keyArr[0]]} alt="" />
                <div>{data[keyArr[1]]}</div>
                <div>{data[keyArr[2]]}</div>
                <div>{data[keyArr[3]]}</div>
                <div>{data[keyArr[4]]}</div>
                <div>{data[keyArr[5]]}</div>
                <div>{data[keyArr[6]]}</div>
                <div>{data[keyArr[7]]}</div>
                <div>{data[keyArr[8]]}</div>
                <div>{data[keyArr[9]]}</div>
                <div>{data[keyArr[10]]}</div>
                <div>{data[keyArr[11]]}</div>
                <div>{data[keyArr[12]]}</div>
                <div>{data[keyArr[13]]}</div>
              </>
            ))}
          </div>
        </SheetWrapper>
      )}
    </>
  );
}

export default App;

const Label = styled.div`
  display: flex;
`;

const SheetWrapper = styled.div`
  width: 100%;
  overflow-x: scroll; /* 가로 스크롤을 활성화합니다. */
  white-space: nowrap;
  @media (min-width: 1024px) {
    width: 120rem;
  }
`;
