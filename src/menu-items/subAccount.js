// assets
// constant

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const subAccount = {
    id: 'sub',
    title: 'Sub Account',
    type: 'group',
    children: [
        {
            id: 'list',
            title: 'Sub Account List',
            type: 'item',
            url: 'sub/list',
            breadcrumbs: false
        }
    ]
};

export default subAccount;
