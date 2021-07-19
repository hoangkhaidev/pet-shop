import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import SelectField from "src/components/shared/InputField/SelectField";
import InputField from "src/components/shared/InputField/InputField";
import get from 'lodash/get';
import { toast } from "react-toastify";
import api from 'src/utils/api'; 
import StatusBadge from "src/components/shared/StatusBadge/StatusBadge";
import ModalComponent from "src/components/shared/ModalComponent/ModalComponent";
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import { SubmitButton } from "src/components/shared/Button/Button";
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import useRouter from "src/utils/hooks/useRouter";

const fakeData = [
  {
    id: 1,
    role_name: "Sub Account",
    description: "Access Sub Account Page",
  },
  {
    id: 2,
    role_name: "Operator",
    description: "Access Operator Page"
  }
];

const ChangeStatus = ({ newlabel, linkApi, STATUS, username, statuses }) => {
  const [label, setLabel] = useState(newlabel);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const { handleSubmit, formState: { errors }, control, setError, setValue } = useForm();
  const router = useRouter();

  const [objFilter, setObjFilter] = useState({
    page: 1,
    page_size: 30,
    ...router.query
  });

  useEffect(() => {
    setValue("username", username);
    setValue("current_status", newlabel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setData(statuses)
  }, [statuses])

  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      data_field: "at",
      column_name: "Date",
      align: "left"
    },
    {
      data_field: "status",
      column_name: "Status",
      align: "center"
    },
    {
      data_field: "by_user",
      column_name: "By",
      align: "center",
    },
    {
      data_field: "reason",
      column_name: "Reason",
      align: "center",
    },
  ];

  const handleChangePage = (page) => {
    setObjFilter(prevState => ({
      ...prevState,
      page
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    setObjFilter(prevState => ({
      ...prevState,
      page: 1,
      page_size: parseInt(event.target.value, 10)
    }));
  };

  const onSubmit = async (data) => {
    const form = {
      action: data.status,
      reason: data.reason,
    };

    try {
      const response = await api.post(linkApi, form);

      console.log(response);
      
      if (get(response, 'success', false)) {
        setLabel(data.status);
        setValue("reason", "");
        toast.success("Update Status Success", {
          onClose: onClose()
        });
      } else {
        if (response?.err === 'err:form_validation_failed') {
          for (const field in response?.data) {
            setError(field, {
              type: 'validate',
              message: response?.data[field]
            });
          }
        }
      }
    } catch (e) {
      console.log('e', e);
    }
  };


  return (
    <div>
      <StatusBadge label={label} onClick={(onOpenModal)}/>
      <ModalComponent
        open={open}
        onClose={onClose}
        width="800px"
      >
        <div>
          <TitlePage title="Change Status" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              namefileld="username"
              control={control}
              id="username"
              errors={errors?.username}
              type="text"
              label="Username"
              disabled
            />  
            <InputField
              namefileld="current_status"
              control={control}
              id="current_status"
              errors={errors?.current_status}
              type="text"
              label="Current Status"
              disabled
            />  
            <SelectField
              namefileld="status"
              id="status"
              control={control}
              errors={errors?.status}
              options={
                STATUS
              }
              label="Status"
              defaultValue="active"
            />
            <InputField
              required
              namefileld="reason"
              control={control}
              id="reason"
              errors={errors?.reason}
              type="text"
              label="Reason"
              multiline
              rows={4}
            />  
            <SubmitButton />
          </form>
          <ContentCardPage>
            <TitlePage title="Role List" />
            <TableComponent
              data={data}
              columns={columns}
              pagination={{
                total_size: fakeData.length,
                page: +objFilter.page,
                page_size: +objFilter.page_size
              }}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </ContentCardPage>
        </div>
      </ModalComponent>
    </div>
  );
};

export default ChangeStatus;
