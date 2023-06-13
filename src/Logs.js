import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import background from "./assets/images/background.jpg";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

export default function CustomizedTables() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("/get_logs")
      .then((response) => response.json())
      .then((data) => setLogs(data.log_data));
  }, []);

  return (
    <Background>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Time</StyledTableCell>
              <StyledTableCell align="right">Level</StyledTableCell>
              <StyledTableCell align="right">File</StyledTableCell>
              <StyledTableCell align="right">Line</StyledTableCell>
              <StyledTableCell align="right">Message</StyledTableCell>
              <StyledTableCell align="right">Application Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <StyledTableRow key={log.time}>
                <StyledTableCell component="th" scope="row">
                  {log.time}
                </StyledTableCell>
                <StyledTableCell align="right">{log.level}</StyledTableCell>
                <StyledTableCell align="right">{log.file}</StyledTableCell>
                <StyledTableCell align="right">{log.line}</StyledTableCell>
                <StyledTableCell align="right">{log.message}</StyledTableCell>
                <StyledTableCell align="right">
                  {log.application_name}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Background>
  );
}

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-image: url(${background});
  background-repeat: repeat;
  background-position: center;
  background-size: auto;
  position: relative;
`;
