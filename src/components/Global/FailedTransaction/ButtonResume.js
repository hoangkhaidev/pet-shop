import Button from '@material-ui/core/Button';
import get from 'lodash/get';
import { toast } from 'react-toastify';
import api from 'src/utils/api';

const ButtonResume = ({cell, row }) => {
    
  const onResume = async (row) => {
    const response = await api.post(`/api/global/brand_detail/${row.brand_id}/${row.round_id}/resume`, null);
    if (get(response, 'success', false)) {
        toast.success("Reset Success");
        // console.log(response)
        window.location.reload();
    } else {
        toast.warn("Fail");
    }
  }

  return (
    <div>
        {
            cell === 'refunded' ? '' : ''
        }
        {
            cell === 'retry_result' || cell === 'manual_retry_result' ? (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onResume(row)}
                >
                    Retry Now
                </Button>
            ) : ''
        }
        {
            cell === 'refund' || cell === 'manual_retry_refund' ? (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onResume(row)}
                >
                    Refund Now
                </Button>
            ) : ''
        }
    </div>
  );
};

export default ButtonResume;
