/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
// import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import get from 'lodash/get';
import api from "src/utils/api";

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

  return (
    <div style={{ paddingTop: '10px' }}>
      <a href={roundIdURL} style={{ fontSize: '24px' }} >Diamond Strike</a>
    </div>
  );
};

export default RoundDetail;
