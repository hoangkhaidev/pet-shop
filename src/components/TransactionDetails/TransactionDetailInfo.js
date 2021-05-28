import { useState } from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core";

import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";

const useStyles = makeStyles((theme) => ({
  transactionDetailInfo: {
    width: "50%"
  },
  infoLine: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  labelLine: {
    fontWeight: "bold",
    minWidth: 200
  }
}));

const TransactionDetailInfo = () => {
  const classes = useStyles();
  const [playerTransactionDetails] = useState({
    player: {
      label: "Player",
      value: "2427465 - tri7_sinh00 (IDR - Indonesia Rupiahs (1 = Rp1))",
    },
    round_id: {
      label: "Round ID",
      value: "2436761168"
    },
    status: {
      label: "Status",
      value: "Completed "
    },
    started: {
      label: "Started",
      value: "13 May 2021 16:30:53.557 +07:00"
    },
    completed: {
      label: "Completed",
      value: "13 May 2021 16:30:53.723 +07:00"
    }
  });

  return (
    <ContentCardPage>
      <Typography variant="h6" gutterBottom>
        Transaction Detail
      </Typography>
      <div className={classes.transactionDetailInfo}>
        {Object.keys(playerTransactionDetails).map(key => (
          <div key={key} className={classes.infoLine}>
            <div className={classes.labelLine}>
              {playerTransactionDetails[key].label}
            </div>
            <div>
              {playerTransactionDetails[key].value}
            </div>
          </div>
        ))}
      </div>
    </ContentCardPage>
  );
};

export default TransactionDetailInfo;
