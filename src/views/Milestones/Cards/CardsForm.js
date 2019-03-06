import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from '../../../styles';
import { outLinedTextField } from '../../../components/ReduxForm/FormAttributes';



class CardsForm extends React.Component {



    render() {
        const { classes } = this.props;
        return (
            <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="title">Card Details</InputLabel>
                    <Field
                        name="title"
                        type="text"
                        component={outLinedTextField}
                        label="Card Title"
                        fullWidth
                        InputLabelProps={{ shrink: true, }}
                    />
                </FormControl>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary">
                    Add Card
          </Button>
            </form>
        )
    }
}

export default reduxForm({
    form: 'CardsForm', // a unique identifier for this form
    // validate,
    // asyncValidate
})(withStyles(styles)(CardsForm));