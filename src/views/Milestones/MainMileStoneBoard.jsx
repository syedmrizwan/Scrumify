import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Typography } from '@material-ui/core';
import StoryCard from '../StoryCard/StoryCard';
import { styles } from '../../styles';
import PropTypes from 'prop-types';
import { update, initBoard } from '../../actions/board';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';



// fake data generator
export const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({

    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? '#DCDCDC' : '#DCDCDC',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#E6E6FA' : 'white',
    padding: grid
});


let pipelines = [
    {
        id: 0,
        name: "Line 1",
        cards: getItems(5),
    },

    {
        id: 1,
        name: "Line 2",
        cards: getItems(3, 5),
    },

    {
        id: 2,
        name: "Line 3",
        cards: getItems(6, 10),
    }
]

class MainMileStoneBoard extends Component {


    state = {
        selected0: this.props.pipelines[0].cards,
        selected1: this.props.pipelines[1].cards,
        selected2: this.props.pipelines[2].cards,
    };

    componentDidMount() {
        this.props.dispatch(initBoard(pipelines))

    }

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable0 container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable0: 'selected0',
        droppable1: 'selected1',
        droppable2: 'selected2'

    };

    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        console.log(this.state)
        console.log(result);
        const { source, destination } = result;
        //debugger;
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            console.log("IF")
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'droppable0') {
                state = { selected0: items };
            }

            if (source.droppableId === 'droppable1') {
                state = { selected1: items };
            }

            if (source.droppableId === 'droppable2') {
                state = { selected2: items };
            }
            this.setState(state);
        } else {
            console.log("ELSE")
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );


            // console.log(source.droppableId)
            // console.log(destination.droppableId)

            // console.log(result)
            // console.log(result.droppable0)
            // console.log(result.droppable1)
            // console.log(result.droppable2)
            if (result && result.droppable0) {
                this.setState({
                    selected0: result.droppable0
                })
            }

            if (result && result.droppable1) {
                this.setState({
                    selected1: result.droppable1
                })
            }

            if (result && result.droppable2) {
                this.setState({
                    selected2: result.droppable2
                })
            }

            let newState = [
                this.state.selected0, this.state.selected1, this.state.selected2
            ]

            this.props.dispatch(update(result, this.props.pipelines))
            // this.setState({
            //     selected0: result.droppable0,
            //     selected1: result.droppable1,
            //     selected2: result.droppable2
            // });
        }

        console.log(this.state);
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {

        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <main className={classes.content}>
                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-start', paddingRight: '2rem' }}>

                        <DragDropContext onDragEnd={this.onDragEnd}>

                            {
                                this.props.pipelines && this.props.pipelines.map((item, index) => {
                                    // { console.log("droppable" + index) }
                                    return (
                                        <div>
                                            <Droppable droppableId={"droppable" + index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        style={getListStyle(snapshot.isDraggingOver)}>
                                                        <Typography variant="title" gutterBottom>{item.name}</Typography>
                                                        {item.cards.map((item, index) => (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={getItemStyle(
                                                                            snapshot.isDragging,
                                                                            provided.draggableProps.style
                                                                        )}
                                                                    >

                                                                        <StoryCard
                                                                            title={"HyperLedger Servers Up"}
                                                                            subHeader={"September 14, 2016"}
                                                                            mainDescription={"This impressive paella is a"}
                                                                            avatar={"UA"}
                                                                            image={"https://fct.ca/wp-content/uploads/2017/07/FCT-Login-Page-Residential-Title-Insurance-1.jpg"}
                                                                        />


                                                                        {item.content}

                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                            {/* <Droppable droppableId="droppable1">

                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        style={getListStyle(snapshot.isDraggingOver)}>
                                                        <Typography variant="title" gutterBottom>{item.name}</Typography>
                                                        {this.state.selected.map((item, index) => (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={getItemStyle(
                                                                            snapshot.isDragging,
                                                                            provided.draggableProps.style
                                                                        )}>
                                                                        {item.content}
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable> */}
                                        </div>
                                    )
                                })
                            }

                        </DragDropContext>
                    </div>

                </main>
            </div>
        );
    }
}



MainMileStoneBoard.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
    return {
        //pipelines: state.board.boardState,
    };
}


export default withRouter(connect(mapStateToProps)(withStyles(styles)(MainMileStoneBoard)));

//export default withStyles(styles)(MainMileStoneBoard);



