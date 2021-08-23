/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
// import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import get from 'lodash/get';
import api from "src/utils/api";
import { Button } from "@material-ui/core";

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

  useEffect(() => {
    console.log(roundIdURL);
  }, [roundIdURL]);

  
  const onPopupRoundDetail = () => {
    let params = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=800,height=800";
    window.open(roundIdURL, 'roundDetail', params);
  }


  return (
    <div style={{ paddingTop: '10px' }}>
      <Button 
        color="primary"
        variant="contained" 
        onClick={() => onPopupRoundDetail()}
      >
        Diamond Strike
      </Button>
    </div>
  );
};

export default RoundDetail;
