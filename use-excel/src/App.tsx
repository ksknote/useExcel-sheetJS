import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as XLSX from "xlsx";
import styled, { css } from "styled-components";

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

  return (
    <Wrapper>
      <h3>엑셀 업로드 테스트</h3>
      <input type="file" onChange={(e) => fileChangeHandler(e)} />
      <button>
        <b>Export XLSX!</b>
      </button>
      <SheetWrapper>
        <Label>
          {keyArr.map((key) => (
            <div key={key}>{key}</div>
          ))}
        </Label>
        {excelData && (
          <List>
            {excelData.map((data) => (
              <ListItem key={data["이름"]}>
                <ProfileWrapper>
                  <Profile src={data[keyArr[0]]} />
                </ProfileWrapper>
                {keyArr.slice(1).map((key) => (
                  <ListItemData key={key}>{data[key]}</ListItemData>
                ))}
              </ListItem>
            ))}
          </List>
        )}
      </SheetWrapper>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  width: 95%;
  height: 100vh;
  margin: auto;
  @media (min-width: 1024px) {
    width: 1200px;
  }
`;

const SheetWrapper = styled.div`
  width: 100%;
  height: 700px;
  margin-top: 20px;
  overflow: scroll; /* 가로 스크롤을 활성화합니다. */
  white-space: nowrap;
  border: 1px solid #e6e6e6;
`;

const Label = styled.div`
  height: 40px;
  display: grid;
  grid-template-columns: 80px 80px 150px 150px 70px 200px 70px 70px 70px 70px 70px 70px 70px 70px 70px 70px 70px 70px 70px 70px 140px 160px 110px 110px 110px;
  font-weight: 500;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid #f1efef;
    border-bottom: 1px solid #e6e6e6;
  }
`;

const List = styled.div``;

const ListItem = styled.div`
  min-height: 70px;
  display: grid;
  grid-template-columns: 80px 80px 150px 150px 70px 200px 70px 70px 70px 70px 70px 70px 70px 70px 70px 70px 70px 70px 70px 70px 140px 160px 110px 110px 110px;
  align-items: center;
  color: #595959;
`;
const ProfileWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #e2e2e2;
`;
const Profile = styled.div<{ src: string }>`
  width: 60px;
  height: 60px;
  border: 1px solid #e6e6e6;
  border-radius: 100%;
  background-image: ${({ src }) => css`url(${src})`};
  background-size: cover;
  background-position: center top;
`;

const ListItemData = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 5px;
  white-space: break-spaces;
  border-left: 1px solid #f1efef;
  border-bottom: 1px solid #e2e2e2;
`;
