/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prefer-template */
/* eslint-disable prefer-const */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-var */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
/* eslint-disable prettier/prettier */
import { saveAs } from "file-saver";
import XlsxPopulate from "xlsx-populate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@mui/material";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export const ExportExcelPlayersBusinessSummary = ({ excelData }) => {

  const getSheetData = (data, header) => {
    var fields = Object.keys(data[0]);
    var sheetData = data.map(function (row) {
      return fields.map(function (fieldName) {
        return row[fieldName] ? row[fieldName] : "";
      });
    });
    sheetData.unshift(header);
    return sheetData;
  }

  const exportToExcel = async () => {
    let header = ["Period", "Player ID", "Nickname", "Sign Up Language", "Brand", "Bet", "Win", "Margin", "Currency", "Bet ($)", "Win ($)", "Margin ($)"];

    XlsxPopulate.fromBlankAsync().then(async (workbook) => {
      const sheet1 = workbook.sheet(0);
      const sheetData = getSheetData(excelData, header);
      const totalColumns = sheetData[0].length;
      sheet1.cell("A1").value(sheetData);

      const range = sheet1.usedRange();
      
      const endColumn = String.fromCharCode(64 + totalColumns);

      const maxStringLength = sheet1.range("A1:" + endColumn + "1").reduce((max, cell) => {
          const value = cell.value();
          if (value === undefined) return max;
          return Math.max(max, value.toString().length);
      }, 0);
      sheet1.column("A").width(maxStringLength);
      sheet1.column("B").width(maxStringLength);
      sheet1.column("C").width(maxStringLength);
      sheet1.column("D").width(maxStringLength);
      sheet1.column("E").width(maxStringLength);
      sheet1.column("F").width(maxStringLength);
      sheet1.column("G").width(maxStringLength);
      sheet1.column("H").width(maxStringLength);
      sheet1.column("I").width(maxStringLength);
      sheet1.column("J").width(maxStringLength);
      sheet1.column("K").width(maxStringLength);
      sheet1.column("L").width(maxStringLength);

      sheet1.row(1).style("bold", true);
      sheet1.row(1).style("horizontalAlignment", 'center');
      sheet1.range("A1:" + endColumn + "1").style("fill", "BFBFBF");
      let colRange = ("A" + (excelData.length + 1) + ":" + endColumn + (excelData.length + 1));
      sheet1.range(colRange).style("fill", "07bb5f");
      sheet1.range(colRange).style("bold", true);
      sheet1.range("A2:" + endColumn + (excelData.length + 1)).style("horizontalAlignment", 'right');
      sheet1.range("B2:E" + (excelData.length + 1)).style("horizontalAlignment", 'left');
      range.style("border", true);
      return workbook.outputAsync().then((res) => {
        saveAs(res, "ReportPlayersBusinessSummary.xlsx");
      });
    });
  }
          
  return (
    <>
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <Button 
          sx={{ 
            background: '#68a9e8',
            '&:hover': {
              background: '#68a9e863',
            }
          }} 
          onClick={e => exportToExcel()}
        >
          {/* <FontAwesomeIcon 
            icon={faFileExcel} 
            size={'2x'} 
            color={'#fff'} 
            title={'Download Excel'} 
            style={{cursor: 'pointer'}}
          /> */}
          <FileDownloadIcon 
              style={{cursor: 'pointer', fontSize: '20px'}}
            />
          <span style={{marginLeft: '5px'}}>Export</span>
        </Button>
      </div>
    </>
  )
}