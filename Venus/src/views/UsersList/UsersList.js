import React, { useEffect, useState } from 'react'

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import QueueSharpIcon from '@material-ui/icons/QueueSharp';
import AddIcon from '@material-ui/icons/Add';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import CustomTabs from 'components/CustomTabs/CustomTabs';
import UsersTable  from 'components/UsersTable/UsersTable'
import Axios from 'axios';
import { SentimentSatisfied, SettingsSystemDaydreamTwoTone } from '@material-ui/icons';

const useStyles = makeStyles(styles);



export default function UsersList() {
  
    const classes = useStyles();

    return (
        <GridContainer>
            
            <GridItem xs={12} sm={12} md={12}>
                <CustomTabs
                    title=""
                    headerColor="primary"
                    tabs={[
                        {
                            tabName: "List of Users",
                            tabIcon: CloudUploadIcon,
                            tabContent: (
                                <UsersTable />
                            )
                        }
                    ]}
                />
                
            </GridItem>
        </GridContainer>

    )
}
