import { useState, useEffect, lazy, Fragment } from "react";
import get from "lodash/get";
import { useForm, FormProvider } from "react-hook-form";
import Link from "@material-ui/core/Link";

import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import Loading from "src/components/shared/Loading/Loading";
import NoPermissionPage from "src/components/NoPermissionPage/NoPermissionPage";

import useFetchData from "src/utils/hooks/useFetchData";
import useRouter from "src/utils/hooks/useRouter";
import SubAccountListFilter from "./SubAccountListFilter";

const ChangePasswordForm = lazy(() => import("src/components/Modal/ChangePasswordForm"));

const SubAccountList = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
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

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData("/api/subs", objFilter);

  useEffect(() => {
    setData(get(dataResponse, "list", []));
  }, [dataResponse]);

  const columns = [
    {
      data_field: "username",
      column_name: "Username",
      align: "left",
      formatter: (cell, row) => (
        <Link href={`/sub/list/${row.id}/edit`}>
          {cell}
        </Link>
      )
    },
    {
      data_field: "display_name",
      column_name: "Name",
      align: "left",
    },
    {
      data_field: "role",
      column_name: "Role",
      align: "center"
    },
    {
      data_field: "brand",
      column_name: "Brand",
      align: "center"
    },
    {
      data_field: "created_at",
      column_name: "Created At",
      align: "right",
    },
    {
      data_field: "last_login_time",
      column_name: "Last Login Time",
      align: "right"
    },
    {
      data_field: "statuses",
      column_name: "Status",
      align: "center",
    },
    {
      data_field: "action",
      column_name: "Action",
      align: "center",
      formatter: () => <ChangePasswordForm />
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

  const onSubmit = dataSubmit => {
    setObjFilter(prevState => ({
      ...prevState,
      name_search: dataSubmit.name_search,
      status_search: dataSubmit.status_search,
      sort_order: dataSubmit.sort_order,
      refetch: true
    }));
  };

  const onResetFilter = () => {
    setObjFilter({
      name_search: "",
      sort_field: "username",
      sort_order: "asc",
      page: 1,
      page_size: 30,
    });
    methods.reset({
      name_search: "",
      sort_order: "asc",
      status_search: "all"
    });
  };

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  return (
    <Fragment>
      {isLoading && <Loading />}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <SubAccountListFilter
            onResetFilter={onResetFilter}
          />
        </form>
      </FormProvider>
      <ContentCardPage>
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

export default SubAccountList;
