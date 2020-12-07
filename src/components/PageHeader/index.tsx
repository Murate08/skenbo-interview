import React from 'react'
import { Link } from 'react-router-dom'
import {AppBar, Toolbar, Typography} from '@material-ui/core'
import {FiArrowLeftCircle} from 'react-icons/fi'
import './styles.css'
import logo from '../../img/logo.png'

const PageHeader = () =>{
    return(
    <AppBar position="fixed" className="page-header" color="inherit" >
            <Toolbar>       

            <Typography variant="h6" className="top-bar-container" >
                <Link to="/" >
                    <FiArrowLeftCircle size={50} color="#007bff" className="link"/>
                </Link>
               <img src={logo} alt=""/>
            </Typography>
        
        </Toolbar>
    </AppBar>

    )
}
export default PageHeader;