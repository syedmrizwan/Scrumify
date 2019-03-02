import React from 'react'
import { Grid } from '@material-ui/core';
import MainMileStoneBoard, { getItems } from './MainMileStoneBoard';

let pipelines = [
    {
        id: 1,
        name: "Line 1",
        cards: getItems(5),
    },

    {
        id: 2,
        name: "Line 2",
        cards: getItems(3, 5),
    },

    {
        id: 3,
        name: "Line 3",
        cards: getItems(6, 10),
    }
]

class Board extends React.Component {


    render() {
        return (
            <Grid container>
                <MainMileStoneBoard pipelines={pipelines} />
            </Grid>
        )
    }
}

export default Board;