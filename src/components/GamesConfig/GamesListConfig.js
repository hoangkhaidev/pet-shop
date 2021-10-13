import { useEffect, useState } from "react";
import Link from "@material-ui/core/Link";
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import useRouter from "src/utils/hooks/useRouter";
import useFetchData from "src/utils/hooks/useFetchData";
import get from 'lodash/get';
import Loading from "../shared/Loading/Loading";
import NoPermissionPage from "../NoPermissionPage/NoPermissionPage";
import GamesFilterConfig from "./GamesFilterConfig";
import ChangeStatusGamesConfig from "src/components/Modal/ChangeStatusGamesConfig";

const GamesListConfig = () => {
  const router = useRouter();

  const [objFilter, setObjFilter] = useState({
    brand_ids: [],
    game_type: "",
    sort_field: "game_name",
    sort_order: "asc",
    game_name: "",
    status: "all",
    page: 1,
    page_size: 30,
    ...router.query,
  });
  const [data, setData] = useState([]);

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData(
    '/api/game_config/game_list',
    objFilter
  );

  useEffect(() => {
    const mapData = get(dataResponse, 'list', []);
    setData(mapData);
  }, [dataResponse]);
 
  const columns = [
    {
      data_field: "game_code",
      column_name: "Game Code",
      align: "left",
      formatter: (cell, row) => {
        return (
          <Link href={`/configuration/games/${row.game_code}/brand_id/${row.brand_id}/edit`}>{cell}</Link>
        )
      }
    },
    {
      data_field: "game_name",
      column_name: "Game Name",
      align: "left",
    },
    {
      data_field: "game_type",
      column_name: "Game Type",
      align: "left",
    },
    {
      data_field: "brand_name",
      column_name: "Brand",
      align: "left",
    },
    {
      data_field: "status",
      column_name: "Status",
      align: "center",
      formatter: (cell, row) => {
        return (
          <ChangeStatusGamesConfig 
            status={row.enable} 
            game_code={row.game_code}
            brand_name={row.brand_name}
            brand_id={row.brand_id}
            game_name={row.game_name}
          />
        );
      },
    },
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

  const onSubmit = async (data) => {
    
    setObjFilter(prevState => ({
      ...prevState,
      ...data,
    }));
  };

  if (!isHasPermission) {
    return <NoPermissionPage />;
  }

  return (
    <>
      {isLoading && <Loading />}
      <GamesFilterConfig onSubmitProps={onSubmit} setObjFilter={setObjFilter} />
      <ContentCardPage>
        <TableComponent
          data={data}
          columns={columns}
          page = { Number(objFilter.page) }
          page_size = { Number(objFilter.page_size) }
          pagination={{
            total_size,
            page: Number(objFilter.page),
            page_size: Number(objFilter.page_size),
          }}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </ContentCardPage>
    </>
  );
};

export default GamesListConfig;
