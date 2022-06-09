/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import get from 'lodash/get';
import api from "utils/api";
import { Link } from "@mui/material";

const RoundDetail = ({roundId}) => {
  
  const [roundIdURL, setRoundIdURL] = useState({});

  const onViewRoundDetail = async() => {
    const response = await api.post(`/api/transaction/round/${roundId}/url`, null);
    if (get(response, "success", true)) {
      setRoundIdURL(response?.url);
    } else {
      console.log("response", response);
    }
  }

  useEffect(() => {
    onViewRoundDetail();
  }, []);
  
  const onPopupRoundDetail = () => {
    let params = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=800,height=800";
    window.open(roundIdURL, 'roundDetail', params);
  }

  return (
    <div style={{ paddingTop: '10px', display: 'flex' }}>
      <Link  
        color="primary"
        variant="contained"
        style={{ color: '#3245b9', margin: 'auto', fontWeight: '600', textDecoration: 'underline', cursor: 'pointer' }} 
        onClick={() => onPopupRoundDetail()}
      >
        Spin Details
      </Link >
    </div>
  );
};

export default RoundDetail;
