import React from "react";
import { saveAs } from "file-saver";
import XlsxPopulate from "xlsx-populate";
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";

export const ExportExcelPlayerSummary = ({ excelData }) => {
  const roleUser = useSelector((state) => state.roleUser);
  const getSheetData = (data, header) => {
    var fields = Object.keys(data[0]);
    var sheetData = data.map(function (row) {
      return fields.map(function (fieldName) {
        return row[fieldName];
      });
    });
    sheetData.unshift(header);
    return sheetData;
  }

  const exportToExcel = async () => {
    let header = ["Player ID", "Nickname", "Sign Up Language", "Brand", "Bet", "Win", "Margin", "Currency", "Bet ($)", "Win ($)", "Margin ($)", "Operator Total ($)"];
    if (roleUser.account_type === 'admin' || roleUser.account_type === 'adminsub') {
      header = ["Player ID", "Nickname", "Sign Up Language", "Brand", "Bet", "Win", "Margin", "Currency", "Bet ($)", "Win ($)", "Margin ($)", "Operator Total ($)", "Company Total ($)"];
    }
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
      sheet1.column("M").width(maxStringLength);

      sheet1.row(1).style("bold", true);
      sheet1.row(1).style("horizontalAlignment", 'center');
      sheet1.range("A1:" + endColumn + "1").style("fill", "BFBFBF");
      let colRange = ("A" + (excelData.length + 1) + ":" + endColumn + (excelData.length + 1));
      sheet1.range(colRange).style("fill", "07bb5f");
      sheet1.range(colRange).style("bold", true);
      sheet1.range("A2:" + endColumn + (excelData.length + 1)).style("horizontalAlignment", 'right');
      range.style("border", true);
      return workbook.outputAsync().then((res) => {
        saveAs(res, "ReportPlayerSummary.xlsx");
      });
    });
  }
          
  return (
      <>
        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
          <Button 
            style={{ background: '#15aabf', padding: '10px' }} 
            onClick={e => exportToExcel()}
          >
            <FontAwesomeIcon 
              icon={faFileExcel} 
              size={'2x'} 
              color={'#fff'} 
              title={'Download Excel'} 
              style={{cursor: 'pointer'}}
            />
          </Button>
        </div>
      </>
  )
}