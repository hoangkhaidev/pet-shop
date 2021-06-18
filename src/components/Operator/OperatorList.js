import { Fragment, useState, useEffect, lazy } from "react";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";
import get from "lodash/get";
import Link from "@material-ui/core/Link";

import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import OperatorListFilter from "src/components/Operator/OperatorFilter";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import NoPermissionPage from "src/components/NoPermissionPage/NoPermissionPage";
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import Loading from 'src/components/shared/Loading/Loading';
import StatusBadge from "src/components/shared/StatusBadge/StatusBadge";

import useFetchData from "src/utils/hooks/useFetchData";
import useRouter from "src/utils/hooks/useRouter";

const ChangePasswordForm = lazy(() => import("src/components/Modal/ChangePasswordForm"));
const ChangeStatus = lazy(() => import("src/components/Modal/ChangeStatus"));

const STATUS = [
  {
    id: 1,
    value: "active",
    label: "active",
  },
  {
    id: 2,
    value: "inactive",
    label: "inactive",
  },
  {
    id: 3,
    value: "suspended",
    label: "suspended",
  },
  {
    id: 4,
    value: "unsuspended",
    label: "unsuspended",
  },
  {
    id: 5,
    value: "locked",
    label: "locked",
  },
  {
    id: 6,
    value: "unlocked",
    label: "unlocked",
  },
];

const OperatorList = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [objFilter, setObjFilter] = useState({
    name_search: "",
    status_search: "",
    sort_field: "username",
    sort_order: "asc",
    page: 1,
    page_size: 30,
    ...router.query
  });

  const methods = useForm({
    defaultValues: router.query
  });
  const { t } = useTranslation();

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData("/api/operators", objFilter);

  useEffect(() => {
    const mapData = get(dataResponse, "list", []);
    mapData.map(data => data.id = data.account_id);
    setData(mapData);
  }, [dataResponse]);

  const onSubmit = async (dataForm) => {
    const form = {
      ...dataForm,
      status_search: dataForm?.status_search === "all" ? "" : dataForm?.status_search
    };
    setObjFilter({
      ...form,
      page: 1,
      page_size: 30
    });
  };

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  const columns = [
    {
      data_field: "username",
      column_name: "Username",
      align: "left",
      formatter: (cell, row) => (
        <Link href={`/operator/list/${row.id}/edit`}>
          {cell}
        </Link>
      )
    },
    {
      data_field: "operator_name",
      column_name: "Name",
      align: "left",
    },
    {
      data_field: "support_email",
      column_name: "Support Email",
      align: "left"
    },
    {
      data_field: "finance_emails",
      column_name: "Finance Email",
      align: "left",
      formatter: (cell) => cell.join(", ")
    },
    {
      data_field: "created_at",
      column_name: "Created At",
      align: "left",
    },
    {
      data_field: "last_logged_in",
      column_name: "Last Login Time",
      align: "left"
    },
    {
      data_field: "statuses",
      column_name: "Status",
      align: "center",
      formatter: (cell, row) => {
        const newlabel = row.statuses[0] ? row.statuses[0].status : "active";
        return (
          <ChangeStatus newlabel={newlabel} linkApi={`/api/operators/${row.id}/update_status`} STATUS={STATUS} STATUS={STATUS} username={row.username} statuses={row.statuses}/>
      )}
    },
    {
      data_field: "action",
      column_name: "Action",
      align: "center",
      formatter: (cell, row) => <ChangePasswordForm linkApi={`/api/operators/${row.id}/update_password`} />,
    }
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

  return (
    <Fragment>
      {isLoading && <Loading />}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <OperatorListFilter />
        </form>
      </FormProvider>
      <ContentCardPage>
        <TitlePage title="Operator List" />
        <TableComponent
          data={data}
          columns={columns}
          pagination={{
            total_size,
            page: objFilter.page,
            page_size: objFilter.page_size
          }}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </ContentCardPage>
    </Fragment>
  );
};

export default OperatorList;
