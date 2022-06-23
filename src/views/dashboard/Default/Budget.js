/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
/* eslint-disable prefer-spread */
/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Grid, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { clearParentParam, setParentParam } from 'features/parentParam/parentParam';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import useFetchData from 'utils/hooks/useFetchData';
import NoPermissionPage from 'views/NoPermissionPage/NoPermissionPage';
import NoPermissionPageNotBack from 'views/NoPermissionPage/NoPermissionPageNotBack';
import TitleDashboard from './TitleDashboard';

const useStyles = makeStyles((theme) => ({
    itemChart: {
        width: '50%',
        textAlign: 'center',
        paddingTop: '10px',
    },
    itemTitle: {
        fontSize: '20px',
        display: 'flex',
        justifyContent: 'center',
    },
    test: {
        width: '17%',
    },
    test1: {
        display: 'flex',
        position: 'absolute',
        bottom: '0px',
        width: '100%',
        padding: '0px 0px 0px 20px',
    },
    marin: {
        padding: '15px 30px',
        background: 'none',
        border: 'none',
        width: '100%',
    }
}));

const Budget = (props) => {
    const classes = useStyles();
    const { dataResponse } = useFetchData("/api/dashboard");
    const [dataChartBar, setDataChartBar] = useState({
        labels: [],
        datasets: [],
    });
    const [dataChartLine, setDataChartLine] = useState({
        labels: [],
        datasets: [],
    });
    const [prevChart2, setPrevChart2] = useState({});
    const [maxAll, setMaxAll] = useState(null);
    const dispatch = useDispatch();
    const roleUserType = useSelector((state) => state.roleUser.account_type);
    ///handle permission
    const permission_groups = useSelector((state) => state.roleUser.permission_groups);
    let arrPermissionDashboard = {};
    let arrPermissionBrand = {};
    let arrPermissionPlayers = {};
    let arrPermissionGames = {};
    let checkPermissionFail = false;
    permission_groups?.map((item) => {
        if (item.name === 'Dashboard') {
            arrPermissionDashboard = item.permissions[0];
        }
        if (item.name === 'Brand') {
            arrPermissionBrand = item.permissions[0];
        }
        if (item.name === 'Players') {
            arrPermissionPlayers = item.permissions[0];
        }
        if (item.name === 'Configuration') {
            arrPermissionGames = item.permissions[0];
        }
        if (item.name === 'Global') {
            item.permissions?.map((item2) => {
                if (item2.name === 'Failed Transaction') checkPermissionFail = item2.none;
                return item2.name === 'Failed Transaction';
            });
        }
        return item.name === 'Dashboard'
    });

    useEffect(() => {
        let dataChart1 = cloneDeep(dataResponse?.bet_win_list);
        const monthChart1 = (dataChart1 || []).map((item) => item.month);
        const betChart1 = (dataChart1 || []).map((item) => item.bet);
        const winChart1 = (dataChart1 || []).map((item) => item.win);
        let maxBet = Math.max.apply(Math, betChart1);
        let maxWin = Math.max.apply(Math, winChart1);
        let maxNum = 0;
        if (maxWin > maxBet) {
            maxNum = maxWin;
        } else {
            maxNum = maxBet;
        }
        let maxAll = maxNum + maxNum / 100 * 10;

        setMaxAll(maxAll);

        setDataChartBar({
            labels: monthChart1,
            datasets: [
                {
                    label: 'Bets ($)',
                    data: betChart1,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Wins ($)',
                    data: winChart1,
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
            ],
        });

        let dataChart2 = cloneDeep(dataResponse?.bet_margin_percent_list);
        const monthChart2 = (dataChart2 || []).map((item) => item.month);
        const betChart2 = (dataChart2 || []).map((item) => item.bet_percent);
        const ggrChart2 = (dataChart2 || []).map((item) => {
            if (item.empty_previous) {
                return item.margin_percent = null;
            }
            return item.margin_percent;
        });
        const betPrevChart2 = (dataChart2 || []).map((item) => item.bet);
        const marginPrevChart2 = (dataChart2 || []).map((item) => item.margin);
        setPrevChart2({
            betPrevChart2,
            marginPrevChart2
        });

        setDataChartLine({
            labels: monthChart2,
            datasets: [
                {
                    label: 'GGR increase',
                    data: ggrChart2,
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'BET increase',
                    data: betChart2,
                    borderColor: 'rgb(53, 162, 235)',
                    fill: false,
                    tension: 0.1
                },
            ],
        });

    }, [dataResponse]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                    suggestedMax: maxAll,   // minimum value will be 0.
                }
            }]
        }
    };

    const optionsLine = {
        scales: {
            yAxes: [{
                ticks: {
                    callback: function(value){return value+ "%"}
                },  
                scaleLabel: {
                    display: true,
                    labelString: "Percentage"
                }
            }]
        },
    };

    useEffect(() => {
        dispatch(setParentParam(`/home/dashboard`));
        return () => {
            dispatch(clearParentParam());
        }
    }, []);

    if (arrPermissionDashboard.none) {
        return <NoPermissionPage />;
    }

    if (arrPermissionBrand?.none && arrPermissionPlayers?.none && checkPermissionFail) {
        return <NoPermissionPageNotBack />;
    }

    return (
        <>
            <TitleDashboard dataResponse={dataResponse}/>
            {
                roleUserType === 'operator' || roleUserType === 'operatorsub' || roleUserType === 'brand' || roleUserType === 'brandsub' ? 
                    !arrPermissionBrand?.none && !arrPermissionPlayers?.none && !arrPermissionGames?.none ? (
                        <Card
                            sx={{ 
                                height: '100%', 
                                width: '100%',
                                ml: '25px'
                            }}
                            {...props}
                        >
                            <Grid container spacing={2} style={{paddingTop: '20px'}}>
                                <Grid item xs={12} xl={6} md={6}>
                                    <span className={classes.itemTitle}>BET / WIN by Month</span>
                                    <Bar options={options} data={dataChartBar}/>
                                </Grid>
                                <Grid item xs={12} xl={6} md={6} style={{position: 'relative'}}>
                                    <span className={classes.itemTitle}>% BET / GGR increase by Month</span>
                                    <Line 
                                        options={optionsLine} 
                                        data={dataChartLine} 
                                    />
                                    <div className={classes.test1}>
                                        {prevChart2.betPrevChart2?.map((item, index) => (
                                            <div key={index} className={classes.test}>
                                                <Tooltip
                                                    key={index}
                                                    title={
                                                        <>
                                                            <span style={{ whiteSpace: 'pre-line' }}>{`Bet: ${item}`}</span>
                                                            <br/>
                                                            <span >{`Margin: ${prevChart2.marginPrevChart2[index]}`}</span>
                                                        </>
                                                    }
                                                >
                                                    <button className={classes.marin}></button>
                                                </Tooltip>
                                            </div>
                                        ))}
                                    </div>
                                </Grid>
                            </Grid>
                        </Card>
                    ) : ''
                : ''
            }
        </>
    );
}

export default Budget;
