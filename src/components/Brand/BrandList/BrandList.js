import { Fragment, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";
import get from "lodash/get";
import Link from "@material-ui/core/Link";

import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import NoPermissionPage from "src/components/NoPermissionPage/NoPermissionPage";
import TitlePage from "src/components/shared/TitlePage/TitlePage";
import Loading from 'src/components/shared/Loading/Loading';
import useFetchData from "src/utils/hooks/useFetchData";
import useRouter from "src/utils/hooks/useRouter";

import BrandListFilter from "./BrandListFilter";
import StatusBadge from "src/components/shared/StatusBadge/StatusBadge";

const BrandList = () => {
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

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData("/api/brand", objFilter);

  useEffect(() => {
    setData(get(dataResponse, "list", []));
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
        <Link href={`/brand/list/${row.id}/edit`}>
          {cell}
        </Link>
      )
    },
    {
      data_field: "name",
      column_name: "Name",
      align: "left",
    },
    {
      data_field: "support_email",
      column_name: "Support Email",
      align: "left"
    },
    {
      data_field: "finance_email",
      column_name: "Finance Email",
      align: "left"
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
        <div>
          <StatusBadge label={newlabel} />
        </div>
      )}
    },
    {
      data_field: "players",
      column_name: "Players",
      align: "center",
    },
    {
      data_field: "api_endpoints",
      column_name: "Api Endpoint",
      align: "center",
    },
    {
      data_field: "product",
      column_name: "Product",
      align: "center",
    },
    {
      data_field: "comission",
      column_name: "Commission",
      align: "center",
    },
    {
      data_field: "status",
      column_name: "Status",
      align: "center",
    },
    {
      data_field: "action",
      column_name: "Action",
      align: "center",
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
          <BrandListFilter />
        </form>
      </FormProvider>
      <ContentCardPage>
        <TitlePage title="Brand List" />
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

export default BrandList;
