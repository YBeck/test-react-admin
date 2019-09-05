import React from "react";

import { connect } from 'react-redux';
import { Layout as AdminLayout, setSidebarVisibility } from 'react-admin';
import { MyAppBar } from './AppBar';
import { MySidebar } from './Sidebar';
// import MyMenu from './MyMenu';
// import MyNotification from './MyNotification';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1,
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        position: 'relative',
    },
    appFrame: {
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'auto',
    },
    contentWithSidebar: {
        display: 'flex',
        flexGrow: 1,
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 2,
        padding: theme.spacing.unit * 3,
        marginTop: '4em',
        paddingLeft: 5,
    },
});

export const Layout = props => <AdminLayout
    {...props}
    appBar={MyAppBar}
    sidebar={MySidebar}
    // menu={MyMenu}
    // notification={MyNotification}
/>;

// const mapStateToProps = state => ({ isLoading: state.admin.loading > 0 });
// export const Layout = connect(mapStateToProps, { setSidebarVisibility })(withStyles(styles)(LayoutView));
