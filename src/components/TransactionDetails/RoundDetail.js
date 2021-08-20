/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
// import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import get from 'lodash/get';

const RoundDetail = ({roundId}) => {
  
  const [dataRoundId, setDataRoundId] = useState([]);

  const onViewRoundDetail = async() => {
    // const response = await api.post('/public/round_detail/PaBmYRfKpR5SVUW', null);
    const res = await fetch(
      `https://sbpubapi.arrowltd.net/public/round_detail/${roundId}`,
      {
        method: 'GET',
      }
    );
    const test = await res.json();
    if (get(test, "success", false)) {
      setDataRoundId(test.data);
    } else {
      console.log("response", test);
    }
  }

  useEffect(() => {
    onViewRoundDetail();
  }, []);

  useEffect(() => {
    console.log(dataRoundId);
  }, [dataRoundId]);

  return (
    <div>
      test
    </div>
  );
};

export default RoundDetail;
