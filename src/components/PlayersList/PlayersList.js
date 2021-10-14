/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Link from "@material-ui/core/Link";
import ContentCardPage from "src/components/ContentCardPage/ContentCardPage";
import TableComponent from "src/components/shared/TableComponent/TableComponent";
import useRouter from "src/utils/hooks/useRouter";
import PlayerListFilter from "./PlayerListFilter";
import useFetchData from "src/utils/hooks/useFetchData";
import get from 'lodash/get';
import Loading from "../shared/Loading/Loading";
import NoPermissionPage from "../NoPermissionPage/NoPermissionPage";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { setParentParam } from "src/features/parentParam/parentParam";

const PlayersList = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [objFilter, setObjFilter] = useState({
    player_id: 0,
    nick_name: "",
    brand_id: 0,
    ip_address: "",
    from_date: moment().format("DD/MM/YYYY"),
    to_date: moment().format("DD/MM/YYYY"),
    language: "",
    currency: "",
    sort_field: "id",
    sort_order: "desc",
    page: 1,
    page_size: 30,
    ...{
      ...router.query,
      player_id: router.query.player_id ? Number(router.query.player_id) : 0,
      brand_id: router.query.brand_id ? Number(router.query.brand_id) : 0,
    },
  });

  const [data, setData] = useState([]);

  const { dataResponse, total_size, isLoading, isHasPermission } = useFetchData(
    '/api/members',
    objFilter
  );

  const pad = (number, length) => {
    let str = "" + number
    while (str.length < length) {
        str = '0' + str
    }
    return str;
  }

  let tz = new Date().getTimezoneOffset()
  tz = ((tz <0 ? '+' : '-') + pad(parseInt(Math.abs(tz / 60)), 2) + pad(Math.abs(tz % 60), 2));
  const time_zoneReplace = tz.replace('+', '%2B');

  useEffect(() => {
    const mapData = get(dataResponse, 'list', []);
    setData(mapData);
  }, [dataResponse]);

  useEffect(() => {
    dispatch(setParentParam('/players/players'));
  }, []);

  useEffect(() => {
    console.log(objFilter);
  }, [objFilter]);

  const columns = [
    {
      data_field: "id",
      column_name: "Player ID",
      align: "left",
      formatter: (cell, row) => (
        <Link href={`/players/${row.id}/information`}>{cell}</Link>
      ),
    },
    {
      data_field: "username",
      column_name: "Nickname",
      align: "left",
    },
    {
      data_field: "created_at",
      column_name: "Signup",
      align: "right",
    },
    {
      data_field: "currency_code",
      column_name: "Currency",
      align: "left",
    },
    {
      data_field: "language",
      column_name: "Language",
      align: "left"
    },
    {
      data_field: "last_logged_in",
      column_name: "Last Login Time",
      align: "right"
    },
    {
      data_field: "last_logged_ip",
      column_name: "Last Login IP",
      align: "left"
    },
    {
      data_field: "Action",
      column_name: "Action",
      align: "left",
      formatter: (cell, row) => {
        return (
          <Link href={`/players/game-history?brand_id=1&from_date=${moment().format("DD/MM/YYYY 00:00")}&game_name=&game_type=&nick_name=&page=1&page_size=30&player_id=${row.id}&round_id=&sort_field=start_at&sort_order=DESC&time_zone=${time_zoneReplace}&to_date=${moment().format("DD/MM/YYYY 23:59")}`}>
            <FontAwesomeIcon 
              icon={faHistory} 
              size={'2x'} 
              color={'#ff8007'} 
              title={'Game History'} 
              style={{cursor: 'pointer'}}
            />
          </Link>
        )
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
      <PlayerListFilter onSubmitProps={onSubmit} setObjFilter={setObjFilter} />
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

export default PlayersList;
