/* eslint-disable arrow-body-style */
import { Fragment } from "react";

import TransactionDetailsInfo from "./TransactionDetailInfo";
import TransactionDetailsTable from "./TransactionDetailsTable";

const TransactionDetails = () => {
  return (
    <Fragment>
      <TransactionDetailsInfo />
      <TransactionDetailsTable />
    </Fragment>
  );
};

export default TransactionDetails;
