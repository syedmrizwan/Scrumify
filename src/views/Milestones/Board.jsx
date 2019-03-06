import React from 'react'
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MainMileStoneBoard, { getItems } from './MainMileStoneBoard';
import { initBoard } from '../../actions/board';

let pipelines = [
    {
        id: 0,
        name: "SPRINT BACKLOG",
        cards: getItems(3),
    },

    {
        id: 1,
        name: "IN PROGRESS",
        cards: getItems(3, 5),
    },

    {
        id: 2,
        name: "CLOSED",
        cards: getItems(7, 10),
    }



]

class Board extends React.Component {

    componentWillMount() {
        console.log("WIll Mount");
        this.props.dispatch(initBoard(pipelines))
    }

    componentDidMount() {
        console.log("Did Mount");



    }

    render() {
        return (
            <Grid container>
                {
                    this.props.pipelines && <MainMileStoneBoard pipelines={this.props.pipelines} />
                }

            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        pipelines: state.board.boardState,
    };
}


export default withRouter(connect(mapStateToProps)(Board));