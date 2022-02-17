import Button from '@material-ui/core/Button';
import get from 'lodash/get';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import api from 'src/utils/api';

const ButtonResume = ({cell, row, setRefreshData = () => {} }) => {
  const { t } = useTranslation();
    
  const onResume = async (row, message) => {
    const response = await api.post(`/api/global/brand_detail/${row.brand_id}/${row.round_id}/resume`, null);
    if (get(response, 'success', false)) {
        setRefreshData(() => Math.random());
        toast.success(message);
        // window.location.reload();
    } else {
        if (response?.err === 'err:suspended_account') {
            toast.warn(t('suspended_account'));
        }
        if (response?.err === 'err:no_permission') {
            toast.warn(t('no_permission'));
        }
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
                    onClick={() => onResume(row, 'Retry Success')}
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
                    onClick={() => onResume(row, 'Refund Success')}
                >
                    Refund Now
                </Button>
            ) : ''
        }
    </div>
  );
};

export default ButtonResume;
