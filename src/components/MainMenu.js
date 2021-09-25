import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        width: 155,
        [theme.breakpoints.up('md')]: {
            flexGrow: 'inherit'
        }
    },
}));



export default function MainMenu(props) {
    //const theme = useTheme()
    const classes = useStyles();

    const menuClick = () => {
        props.handleHamburgerClick()
    }
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={menuClick}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    CGA Rankings
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
