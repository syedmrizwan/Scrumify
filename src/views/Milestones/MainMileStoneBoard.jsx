import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Grid, Typography } from '@material-ui/core';
import StoryCard from '../StoryCard/StoryCard';
import { styles } from '../../styles';
import PropTypes from 'prop-types';

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
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});

class MainMileStoneBoard extends Component {


    state = {
        selected0: this.props.pipelines[0].cards,
        selected1: this.props.pipelines[1].cards,
        selected2: this.props.pipelines[2].cards,
    };

    // componentDidMount() {
    //     let payload = {}
    //     for (let i in this.props.pipelines) {
    //         payload.items = this.props.pipelines[i].cards
    //         this.setState(
    //         )
    //     }

    // }

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

        console.log(result);
        const { source, destination } = result;
        debugger;
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

            console.log(result)
            this.setState({
                selected0: result.droppable0,
                selected1: result.droppable1,
                selected2: result.droppable2
            });
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
                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-start' }}>
                        <DragDropContext onDragEnd={this.onDragEnd}>

                            {
                                this.props.pipelines.map((item, index) => {
                                    { console.log("droppable" + index) }
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
                                                                        {/* <Grid item md={4}>
                                                                            <StoryCard
                                                                                title={"HyperLedger Servers Up"}
                                                                                subHeader={"September 14, 2016"}
                                                                                mainDescription={"This impressive paella is a"}
                                                                                avatar={"UA"}
                                                                                image={"https://fct.ca/wp-content/uploads/2017/07/FCT-Login-Page-Residential-Title-Insurance-1.jpg"}
                                                                            />

                                                                        </Grid> */}
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

export default withStyles(styles)(MainMileStoneBoard);



