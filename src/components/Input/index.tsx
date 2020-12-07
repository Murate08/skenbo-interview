import React, {FormHTMLAttributes} from 'react'
import {TextField, Grid} from '@material-ui/core'
import {useFormContext, Controller } from 'react-hook-form'


interface InputProps extends FormHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}

const  FormInput: React.FC<InputProps> = ({label, name}) =>{ 
    const {control} = useFormContext()
    return (
        <Grid item xs={12} sm={6}>
            <Controller
                as={TextField}
                control={control}
                fullWidth
                name={name}
                label={label}
                required
            />

        </Grid>
    )
}

export default  FormInput
