import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import { Typography, Grid } from '@material-ui/core';
import image from '../../images/bg2.jpg';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SignInForm from './SignInForm';
import { login } from '../../actions/login';
import SnackBar from '../../components/SnackBars/SnackBar';
import { showErrorSnackBar } from '../../actions/snackbars';
const styles = theme => ({
    main: {

        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class SignIn extends React.Component {

    constructor(props) {
        super(props)

        this.login = this.login.bind(this);
    }

    login(values) {
        console.log(values)
        this.props.dispatch(login(values))
    }

    render() {
        const { classes } = this.props;

        return (

            <div style={{ height: '636px', background: 'url(' + image + ') center center no-repeat', backgroundSize: 'cover' }}>
                {console.log(this.props)}
                <Grid style={{ justifyContent: 'center' }} container>
                    <Grid item sm={4}>
                        <Paper className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Login In

                            </Typography>

                            <SignInForm onSubmit={this.login} />
                        </Paper>
                    </Grid>
                </Grid>



                {
                    this.props.err_flag && <SnackBar
                        close={setTimeout(() => { this.props.dispatch(showErrorSnackBar({ flag: false, message: '' })) }, 2500)}
                        variant={"error"}
                        Message={this.props.err_message}
                        open={this.props.err_flag} />
                }

            </div>

        );
    }

}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    return {
        err_flag: state.snackbars.err_flag,
        err_message: state.snackbars.err_message
        // isAuthenticated: store.auth.isAuthenticated,
    };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(SignIn)));
