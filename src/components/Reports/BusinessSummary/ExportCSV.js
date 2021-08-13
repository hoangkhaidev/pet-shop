import React from "react";
import FileSaver from "file-saver";
import XLSX from "xlsx";
import Button from '@material-ui/core/Button';
import cloneDeep from "lodash.clonedeep";

export const ExportCSV = ({ csvData, fileName, wscols }) => {

  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const Heading = [
    {
      identifier: "Period",
      new_players: "New Players",
      bet: "Bet ($)",
      win: "Win ($)",
      margin: "Margin ($)",
      players_played: "Players",
      play_sessions: "Play Sessions",
      operator_total: "Operator Total ($)",
      company_total: "Company Total ($)",
    }
  ];

  const exportToCSV = (csvData, fileName, wscols) => {
    const ws = XLSX.utils.json_to_sheet(Heading, {
      header: ["identifier", "new_players", "bet", "win", "margin", "players_played", "play_sessions", "operator_total", "company_total"],
      skipHeader: true,
      origin: 0 //ok
    });

    ws["!cols"] = wscols;
    XLSX.utils.sheet_add_json(ws, csvData, {
      header: ["identifier", "new_players", "bet", "win", "margin", "players_played", "play_sessions", "operator_total", "company_total"],
      skipHeader: true,
      origin: -1 //ok
    });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    wb.Sheets.data['A1'].s = {
      font: {sz: 14, bold: true, color: '#FF00FF'}
    };

    console.log(cloneDeep(wb));

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
          
  return (
      <>
          <Button
              variant="contained"
              type="submit"
              color="primary"
              style={{ marginBottom: '10px' }}
              onClick={e => exportToCSV(csvData, fileName, wscols)}
          >
              Download Excel
          </Button>
      </>
  )
}