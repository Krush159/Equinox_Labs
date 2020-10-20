import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import QueueSharpIcon from '@material-ui/icons/QueueSharp';
import ViewListSharpIcon from '@material-ui/icons/ViewListSharp';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import AddProfile from "views/Form/AddProfile";
import BulkUpload from "components/BulkUpload/BulkUpload";
import ApplicantList from "components/ApplicantsList/ApplicantsList";

const useStyles = makeStyles(styles);

export default function Profile() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title="Profile"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bulk Upload",
                tabIcon: CloudUploadIcon,
                tabContent: (
                  <BulkUpload/>
                )
              },
              {
                tabName: "Add Profile",
                tabIcon: QueueSharpIcon,
                tabContent: (
                  <AddProfile/>
                )
              },
              {
                tabName: "Candidate List",
                tabIcon: ViewListSharpIcon,
                tabContent: (
                  <ApplicantList url={"http://localhost:5000/getProfile"} params =""/>
                )
              }
            ]}
          />
        </GridItem>
      {/* <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add Profiles</h4>
              <p className={classes.cardCategoryWhite}>Enter Your Details</p>
            </CardHeader>
            <CardBody>
              <AddProfile/>
            </CardBody>
            </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Bulk Upload</h4>
              <p className={classes.cardCategoryWhite}>Uplaod you file</p>
            </CardHeader>
            <CardBody>
              <BulkUpload/>
            </CardBody>
            </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>List of Applicants</h4>
              <p className={classes.cardCategoryWhite}>View Details</p>
            </CardHeader>
            <CardBody>
              <ApplicantList/>
            </CardBody>
            </Card>
        </GridItem> */}
      </GridContainer>
    </div>
  );
}