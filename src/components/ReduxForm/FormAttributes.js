import TextField from '@material-ui/core/TextField';
import React from 'react';
import Select from '@material-ui/core/Select';
import { FormControl, InputLabel, Checkbox } from '@material-ui/core';


export const outLinedTextField = ({
    input,
    label,
    value,
    meta: { touched, error },
    ...custom
}) => (
        <div className="fieldWrapper">
            <TextField
                variant="outlined"
                label={label}
                error={touched && error}
                required={true}
                defaultValue={value}
                style={{ marginBottom: '18px' }}
                {...input}
                {...custom}
            />
            {touched && ((error &&
                <p className="inline-error">{label} {error}</p>))}
        </div>

    )



export const renderTextArea = ({
    input,
    label,
    value,
    required,
    meta: { touched, error },
    ...custom
}) => (
        <div className="fieldWrapper">
            <TextField
                variant="outlined"
                rows="4"
                multiline
                label={label}
                error={touched && error}
                required={required ? true : false}
                // required={true}
                defaultValue={value}
                style={{ marginBottom: '18px' }}
                {...input}
                {...custom}
            />
            {touched && ((error &&
                <p className="inline-error">{label} {error}</p>))}
        </div>

    )

export const renderSelectField = ({
    input,
    label,
    value,
    id,
    htmlFor,
    name,
    meta: { touched, error },
    children,
    ...custom
}) => (
        <div>
            <InputLabel htmlFor={htmlFor}>{label}</InputLabel>
            {console.log(value)}
            <Select
                label={label}
                value={value}
                displayEmpty={true}
                inputProps={{
                    name: name,
                    id: id,
                }}
                error={touched && error}
                {...input}
                onChange={(event, index, value) => { input.onChange(event.target.value.length > 0 ? event.target.value : event.target.value = "") }}
                children={children}
                {...custom}
            />
            {touched && ((error &&
                <p style={{ marginTop: '5px' }} className="inline-error">{label} {error}</p>))}
        </div>

    )



export const renderWithNoneAsNoSelection = ({
    input,
    label,
    value,
    id,
    htmlFor,
    name,
    meta: { touched, error },
    children,
    ...custom
}) => (
        <div>
            <InputLabel htmlFor={htmlFor}>{label}</InputLabel>
            {console.log(value)}
            <Select
                label={label}
                value={value}
                displayEmpty={true}
                inputProps={{
                    name: name,
                    id: id,
                }}
                error={touched && error}
                {...input}
                onChange={(event, index, value) => { input.onChange(event.target.value.length > 1 ? event.target.value : event.target.value = "") }}
                children={children}
                {...custom}
            />
            {touched && ((error &&
                <p style={{ marginTop: '5px' }} className="inline-error">{label} {error}</p>))}
        </div>

    )

export const renderSelectFieldRequired = ({
    input,
    label,
    value,
    id,
    required,
    meta: { touched, error },
    children,
    ...custom
}) => (

        <FormControl required>
            <InputLabel htmlFor="age-native-required">{label}</InputLabel>
            <Select
                label={label}
                value={value}
                displayEmpty={true}
                inputProps={{
                    name: 'select',
                    id: 'select-role',
                }}
                error={touched && error}
                {...input}
                onChange={(event, index, value) => input.onChange(event.target.value)}
                children={children}
                {...custom}
            />

        </FormControl>



    )


export const renderSelectFieldCountry = ({
    input,
    label,
    value,
    id,
    meta: { touched, error },
    children,
    ...custom
}) => (
        <Select
            label={label}
            value={value}
            displayEmpty={true}
            inputProps={{
                name: 'select',
                id: 'select-country',
            }}
            error={touched && error}
            {...input}
            onChange={(event, index, value) => input.onChange(event.target.value)}
            children={children}
            {...custom}
        />
    )


export const renderCheckbox = ({ input, label }) => (
    <Checkbox
        label={label}
        checked={input.value ? true : false}
        onCheck={input.onChange}
    />
)


