import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { styles } from '../../styles';
import { Grid } from '@material-ui/core';
import StoryCard from '../StoryCard/StoryCard';

class Milestones extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Typography className={classes.appBarSpacer} variant="title" gutterBottom>
                        Milestones
                    </Typography>


                    <div style={{ textAlign: "center", width: '100%' }}>
                        <Grid container spacing={24}>
                            <Grid item md={4}>
                                {/* <Paper className={classes.paper}> */}
                                <Typography variant="title" gutterBottom>Pipe Line 1 </Typography>
                                <StoryCard
                                    title={"HyperLedger Servers Up"}
                                    subHeader={"September 14, 2016"}
                                    mainDescription={"This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."}
                                    avatar={"UA"}
                                    image={"https://fct.ca/wp-content/uploads/2017/07/FCT-Login-Page-Residential-Title-Insurance-1.jpg"}
                                />
                                {/* </Paper> */}
                            </Grid>

                            <Grid item md={4}>
                                {/* <Paper className={classes.paper}> */}
                                <Typography variant="title" gutterBottom>Pipe Line 1 </Typography>
                                <StoryCard
                                    title={"Implement Login"}
                                    subHeader={"September 14, 2016"}
                                    mainDescription={"This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."}
                                    avatar={"SQ"}
                                    image={"https://fct.ca/wp-content/uploads/2017/07/FCT-Login-Page-Residential-Title-Insurance-1.jpg"}
                                />
                                {/* </Paper> */}
                            </Grid>

                            <Grid item md={4}>
                                {/* <Paper className={classes.paper}> */}
                                <Typography variant="title" gutterBottom>Pipe Line 1 </Typography>
                                <StoryCard
                                    title={"UI Enhancements"}
                                    subHeader={"September 14, 2016"}
                                    mainDescription={"This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."}
                                    avatar={"SR"}
                                    image={"https://fct.ca/wp-content/uploads/2017/07/FCT-Login-Page-Residential-Title-Insurance-1.jpg"}
                                />
                                {/* </Paper> */}
                            </Grid>

                            {/* <Grid item md={4}>
                                <Typography variant="title" gutterBottom>Pipe Line 1 </Typography>
                                <StoryCard
                                title={"Functional Routing"}
                                subHeader={"September 14, 2016"} 
                                mainDescription={"This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."}
                                avatar={"UA"}
                                image={"https://fct.ca/wp-content/uploads/2017/07/FCT-Login-Page-Residential-Title-Insurance-1.jpg"}
                                />
                            </Grid> */}

                        </Grid>
                    </div>
                </main>
            </div>
        );
    }
}

Milestones.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Milestones);