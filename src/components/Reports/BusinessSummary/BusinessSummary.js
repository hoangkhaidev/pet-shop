import { Fragment, useEffect, useState } from "react";
// import Link from "@material-ui/core/Link";

import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import useRouter from "src/utils/hooks/useRouter";
import useFetchData from "src/utils/hooks/useFetchData";
import get from 'lodash/get';
import moment from "moment";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHistory } from '@fortawesome/free-solid-svg-icons';
import NoPermissionPage from "src/components/NoPermissionPage/NoPermissionPage";
import Loading from "src/components/shared/Loading/Loading";
import BusinessSummaryFilter from "./BusinessSummaryFilter";
// import { useForm } from "react-hook-form";

const BusinessSummary = () => {
  const router = useRouter();
  const [objFilter, setObjFilter] = useState({
    brand_id: 0,
    product_id: 0,
    from_date: moment().startOf('month').format("DD/MM/YYYY"),
    to_date: moment().endOf('month').format("DD/MM/YYYY"),
    options: "day",
    ...{
      ...router.query,
      product_id: router.query.product_id ? Number(router.query.product_id) : 0,
      brand_id: router.query.brand_id ? Number(router.query.brand_id) : 0,
    },
  });

  const [data, setData] = useState([]);

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData(
    '/api/report/business_reports',
    objFilter
  );

  useEffect(() => {
    const mapData = get(dataResponse, 'business_reports', []);
    setData(mapData);
  }, [dataResponse]);

  useEffect(() => {
    console.log(objFilter);
  }, [objFilter]);

  const columns = [
    {
      data_field: "identifier",
      column_name: "Period",
      align: "right",
      // formatter: (cell, row) => (
      //   <Link href={`/players/${row.id}/information`}>{cell}</Link>
      // ),
    },
    {
      data_field: "new_players",
      column_name: "New Players",
      align: "right"
    },
    {
      data_field: "bets",
      column_name: "Bets ($)",
      align: "right",
      formatter: (cell) => {
        let cellFormat = (Math.round(cell * 100)/100).toFixed(2);
        return cellFormat;
      }
    },
    {
      data_field: "wins",
      column_name: "Wins ($)",
      align: "right",
      formatter: (cell) => {
        let cellFormat = (Math.round(cell * 100)/100).toFixed(2);
        return cellFormat;
      }
    },
    {
      data_field: "margin",
      column_name: "Margin ($)",
      align: "right",
      formatter: (cell) => {
        let cellFormat = (Math.round(cell * 100)/100).toFixed(2);
        return cellFormat;
      }
    },
    {
      data_field: "players_played",
      column_name: "Players",
      align: "right"
    },
    {
      data_field: "play_sessions",
      column_name: "Play Sessions",
      align: "right"
    },
    {
      data_field: "operator_total",
      column_name: "Operator Total ($)",
      align: "right",
      formatter: (cell) => {
        let cellFormat = (Math.round(cell * 100)/100).toFixed(2);
        return cellFormat;
      }
    },
    {
      data_field: "company_total",
      column_name: "Company Total ($)",
      align: "right",
      formatter: (cell) => {
        let cellFormat = (Math.round(cell * 100)/100).toFixed(2);
        return cellFormat;
      }
    }
  ];

  const handleChangePage = (page) => {
    let pageNew = page + 1;
    setObjFilter(prevState => ({
      ...prevState,
      page: pageNew,
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    setObjFilter(prevState => ({
      ...prevState,
      page: 1,
      page_size: parseInt(event.target.value, 10)
    }));
  };

  // useEffect(() => {
  //   console.log(objFilter);
  // }, [objFilter])

  const onSubmit = async (data) => {
    // console.log(data)
    
    setObjFilter(prevState => ({
      ...prevState,
      ...data,
    }));
  };

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  return (
    <Fragment>
      {isLoading && <Loading />}
      <BusinessSummaryFilter onSubmitProps={onSubmit} setObjFilter={setObjFilter} />
      <ContentCardPage>
        <TableComponent
          data={data}
          columns={columns}
          page = { Number(objFilter.page) }
          page_size = { Number(objFilter.page_size) }
          types="RoleList"
          pagination={{
            total_size,
            page: Number(objFilter.page),
            page_size: Number(objFilter.page_size),
          }}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </ContentCardPage>
    </Fragment>
  );
};

export default BusinessSummary;
