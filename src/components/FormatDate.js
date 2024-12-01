import React from 'react'
//import { makeStyle } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    }
}))

export default function FormatDate() {
    const classes = useStyles()
    
    return (
        <form className={classes.container} noValidate>
            <TextField 
                id="date" 
                label="Birthday" 
                type="date" 
                defaultValue="2018-05-24" 
                className={classes.textField}
                imputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
    )
}
