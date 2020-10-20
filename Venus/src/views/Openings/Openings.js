import React, { useEffect, useState } from 'react'

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import QueueSharpIcon from '@material-ui/icons/QueueSharp';
import AddIcon from '@material-ui/icons/Add';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import CreateVaccancy from "views/CreateVaccancy/CreateVaccancy";
import CustomTabs from 'components/CustomTabs/CustomTabs';
import VacancyComponent from 'components/Vacancy/Vacancy';
import Axios from 'axios';
import { SentimentSatisfied, SettingsSystemDaydreamTwoTone } from '@material-ui/icons';

const useStyles = makeStyles(styles);



export default function Openings() {
  
    const classes = useStyles();

    return (
        <GridContainer>
            
            <GridItem xs={12} sm={12} md={12}>
                <CustomTabs
                    title=""
                    headerColor="primary"
                    tabs={[
                        {
                            tabName: "List of Openings",
                            tabIcon: CloudUploadIcon,
                            tabContent: (
                                <VacancyComponent />
                            )
                        },
                        {
                            tabName: "Create Vacancy",
                            tabIcon: QueueSharpIcon,
                            tabContent: (
                                <CreateVaccancy />
                            )
                        }
                    ]}
                />
                
            </GridItem>
        </GridContainer>

    )
}
