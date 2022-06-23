/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
// material-ui
import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// project imports
// import EarningCard from './EarningCard';
// import PopularCard from './PopularCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import Budget from './Budget';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const permission_groups = useSelector((state) => state.roleUser.permission_groups);
    let arrPermissionDashboard = {};
    permission_groups?.map((item) => {
        if (item.name === 'Dashboard') {
            arrPermissionDashboard = item.permissions[0];
        }
        return item.name === 'Dashboard'
    });

    useEffect(() => {
        document.title = 'Dashboard';
    }, []);

    return (
        <Grid container spacing={gridSpacing} sx={arrPermissionDashboard.none ? {marginTop: '0px', justifyContent: 'center'} : {marginTop: '0px'}}>
            <Budget />
            {/* <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid> */}
            {/* <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid> */}
        </Grid>
    );
};

export default Dashboard;
