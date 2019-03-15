import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Typography, Button, IconButton, Tooltip } from '@material-ui/core';
import AddCircleOutlineOutlined from '@material-ui/icons/AddCircleOutlineOutlined';
import StoryCard from '../StoryCard/StoryCard';
import { styles } from '../../styles';
import PropTypes from 'prop-types';
import { update } from '../../actions/board';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DialogForm from '../../components/Dialogs/DialogForm';
import PipleLineForm from './Pipeline/PipleLineForm';
import CardsForm from './Cards/CardsForm';



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
    padding: grid * 1,
    //margin: `0 0 ${grid}px 0`,
    // change background colour if dragging
    background: isDragging ? '#160733' : '#f0f8ff',
    borderRadius: '20px',
    marginBottom: '1rem',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#E6E6FA' : '#E6E6FA',
    padding: grid,
    marginLeft: '0.2rem',
    borderRadius: '15px'
});


// let pipelines = [
//     {
//         id: 0,
//         name: "Line 1",
//         cards: getItems(5),
//     },

//     {
//         id: 1,
//         name: "Line 2",
//         cards: getItems(3, 5),
//     },

//     {
//         id: 2,
//         name: "Line 3",
//         cards: getItems(6, 10),
//     }
// ]

class MainMileStoneBoard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            lists: {},
            id2List: {},
            openDialog: false,
            openCardDialog: false,
        };


        this.openAddPipeLineDialog = this.openAddPipeLineDialog.bind(this);
        this.openAddCardDialog = this.openAddCardDialog.bind(this);

    }




    openAddPipeLineDialog() {
        this.setState({
            openDialog: !this.state.openDialog
        })
    }

    openAddCardDialog() {
        this.setState({
            openCardDialog: !this.state.openCardDialog
        })
    }


    componentDidMount() {
        //this.props.dispatch(initBoard(pipelines))
        for (let index in this.props.pipelines) {
            let temp = this.state.lists;
            temp["selected" + index] = this.props.pipelines[index].cards;
            this.setState({
                lists: temp
            })

            let listNames = this.state.id2List;
            listNames["droppable" + index] = "selected" + index;
            this.setState({
                id2List: listNames
            })
        }

        console.log(this.state)

    }

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable0 container to the names of the
     * source arrays stored in the state.
     */
    // id2List = {
    //     droppable0: 'selected0',
    //     droppable1: 'selected1',
    //     droppable2: 'selected2'

    // };

    getList = id => this.state.lists[this.state.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
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
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            let temp = this.state.lists;
            for (let i in Object.keys(temp)) {
                if (result && result["droppable" + i]) {
                    temp["selected" + i] = result["droppable" + i];
                }
            }

            this.setState({
                lists: temp
            })
            this.props.dispatch(update(temp, this.props.pipelines))
        }
    };

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {

        const { classes } = this.props;
        return (
            <div style={{ marginTop: '4rem' }}>
                <div className={classes.headerClass}>
                    <Typography variant="title">Milestones</Typography>
                    <Button color="primary" variant="contained" onClick={this.openAddPipeLineDialog}>Add Pipeline</Button>
                </div>
                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-start', paddingRight: '1rem' }}>

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
                                                    <div className={classes.headerClass}>
                                                        <Typography variant="body2" gutterBottom>{item.name}</Typography>



                                                        <Tooltip title="Add cards in pipeline">
                                                            <IconButton onClick={this.openAddCardDialog} className={classes.button} aria-label="Delete">
                                                                <AddCircleOutlineOutlined />
                                                            </IconButton>
                                                        </Tooltip>

                                                    </div>

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
                                    </div>
                                )
                            })
                        }

                    </DragDropContext>
                </div>



                <DialogForm
                    maxWidth={"sm"}
                    handleClose={this.openAddPipeLineDialog}
                    title={"Add Pipe Line"}
                    content={<PipleLineForm />}
                    open={this.state.openDialog}
                />


                <DialogForm
                    maxWidth={"sm"}
                    handleClose={this.openAddCardDialog}
                    title={"Add Cards"}
                    content={<CardsForm />}
                    open={this.state.openCardDialog}
                />
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



