/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import get from 'lodash/get';
import GamesFilterConfig from "./GamesFilterConfig";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import useRouter from "utils/hooks/useRouter";
import api from "utils/api";
import { Link } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import TableComponent from "views/TableComponent/TableComponent";
import ChangeStatusGamesConfig from "views/Modal/ChangeStatusGamesConfig";

const GamesListConfig = () => {
  const router = useRouter();
  ///handle permission
  const roleUser = useSelector((state) => state.roleUser);
  const permission_groups = useSelector((state) => state.roleUser.permission_groups);
  let arrPermissionGames = {};
  permission_groups?.map((item) => {
    if (item.name === 'Configuration') {
      item.permissions?.map((itemPermission) => {
        if (itemPermission.name === 'Games') arrPermissionGames = itemPermission;
        return itemPermission;
      });
    }
    return item.name === 'Configuration'
  });

  const [data, setData] = useState([]);
  const [total_size, setTotal_size] = useState(0);

  let initFilter = {};

  if (roleUser.account_type === 'admin' || roleUser.account_type === 'adminsub') {
    initFilter = {
      game_type: "",
      sort_field: "game_name",
      sort_order: "asc",
      game_name: "",
      game_activation: "",
      page: 1,
      page_size: 30,
      ...router.query,
    };
  } else {
    initFilter = {
      brand_ids: [],
      game_type: "",
      sort_field: "game_name",
      sort_order: "asc",
      game_name: "",
      status: "all",
      page: 1,
      page_size: 30,
      ...router.query,
    };
  }

  const [objFilter, setObjFilter] = useState(initFilter);

  useEffect(() => {
    if (roleUser.account_type === 'admin' || roleUser.account_type === 'adminsub') {
      onDataGameConfigAdminList();
    } else {
      onDataGameConfigList();
    }
  }, [roleUser, objFilter]);

  const onDataGameConfigList = async () => {
    const response = await api.post('/api/game_config/game_list', objFilter);
    if (get(response, "success", false)) {
      setData(response?.data?.list);
      const total_sizeData = get(response.data, 'total_size', []);
      setTotal_size(total_sizeData);
    } else {
      console.log("response", response);
    }
  };

  const onDataGameConfigAdminList = async () => {
    const response = await api.post('/api/game_config/admin_game_list', objFilter);
    if (get(response, "success", false)) {
      setData(response?.data?.list);
      const total_sizeData = get(response.data, 'total_size', []);
      setTotal_size(total_sizeData);
    } else {
      console.log("response", response);
    }
  };

  let columns = [];

  if (roleUser.account_type === 'operator' || roleUser.account_type === 'operatorsub') {
    columns = [
      {
        data_field: 'indexRow',
        column_name: '#',
        align: 'center',
      },
      {
        data_field: "game_code",
        column_name: "Game Code",
        align: "left",
        formatter: (cell, row) => 
          arrPermissionGames?.full ? (
            <Link href={`/configuration/games/${row.game_code}/brand_id/${row.brand_id}/edit`}>{cell}</Link>
          ) : 
          arrPermissionGames?.view || arrPermissionGames?.create ? (
            <Link href={`/configuration/games/${row.game_code}/brand_id/${row.brand_id}/view`}>{cell}</Link>
          ) : (
            <Link href={`/configuration/games/${row.game_code}/brand_id/${row.brand_id}/edit`}>{cell}</Link>
          )
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
  }

  if (roleUser.account_type === 'brand' || roleUser.account_type === 'brandsub') {
    columns = [
      {
        data_field: 'indexRow',
        column_name: '#',
        align: 'center',
      },
      {
        data_field: "game_code",
        column_name: "Game Code",
        align: "left",
        formatter: (cell, row) => 
          arrPermissionGames?.full ? (
            <Link href={`/configuration/games/${row.game_code}/brand_id/${row.brand_id}/edit`}>{cell}</Link>
          ) : 
          arrPermissionGames?.view || arrPermissionGames?.create ? (
            <Link href={`/configuration/games/${row.game_code}/brand_id/${row.brand_id}/view`}>{cell}</Link>
          ) : (
            <Link href={`/configuration/games/${row.game_code}/brand_id/${row.brand_id}/edit`}>{cell}</Link>
          )
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
  }

  if (roleUser.account_type === 'admin' || roleUser.account_type === 'adminsub') {
    columns = [
      {
        data_field: 'indexRow',
        column_name: '#',
        align: 'center',
      },
      {
        data_field: "game_code",
        column_name: "Game Code",
        align: "left",
        formatter: (cell, row) => cell
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
        data_field: "enable",
        column_name: "Game Activation",
        align: "center",
        formatter: (cell, row) => {
          return (
            <ChangeStatusGamesConfig 
              status={row.enable} 
              game_code={row.game_code}
              brand_name={row.brand_name}
              brand_id={row.brand_id}
              game_name={row.game_name}
              game_id={row.game_id}
            />
          );
        },
      },
    ];
  }

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

  useEffect(() => {
    document.title = 'Games';
  }, []);

  // if (!isHasPermission) {
  //   return <NoPermissionPage />;
  // }

  if (arrPermissionGames?.none) {
    return <Navigate to="/404" />;
  }

  return (
    <>
      {/* {isLoading && <Loading />} */}
      <GamesFilterConfig onSubmitProps={onSubmit} setObjFilter={setObjFilter} />
      <MainCard sx={{mt: '15px'}}> 
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
      </MainCard>
    </>
  );
};

export default GamesListConfig;
