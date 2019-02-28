import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Routes from '../routes/index'



export class MainContent extends React.Component {






    render() {

        return (
            <main>
                <Routes />
            </main>
        )
    }
}

export default withRouter(MainContent);

