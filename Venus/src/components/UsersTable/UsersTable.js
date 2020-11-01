import React, { useState, useEffect } from 'react'
import MUIDataTable, { ExpandButton } from "mui-datatables";
import Axios from 'axios'
import { useHistory } from "react-router-dom";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
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
import CandidateList from 'components/CandidateList/CandidateList';
import EachProfile from 'views/EachProfile/EachProfile'
import { blackColor } from 'assets/jss/material-dashboard-react';
import { purple } from '@material-ui/core/colors';
const useStyles = makeStyles(styles);

const theme = createMuiTheme({
  overrides: {
      MUIDataTableSelectCell: {
          expandDisabled: {
              // Soft hide the button.
              visibility: 'hidden',
          },
      },
      
      MUIDataTableBodyCell: {
          root: {
              padding: "5px 3px",
              
          }
      },
      MUIDataTableToolbar: {
         
      },
      // handles table data header color
      MUIDataTableHeadCell: {
          root: {
              color:'white',
              padding: "5px 10px",
          },
          fixedHeader:{
              backgroundColor: '#12ACC6',
          }
      },
      MUIDataTablePagination: {
          root: {
              backgroundColor: useStyles.tableFooter,
              color: useStyles.textPrimary
          }
      },
      // handles row hover color and selected row color
      MuiTableRow: {
          hover: { '&$root': { '&:hover': { backgroundColor: useStyles.tableRowHoverColor }, } },
          root: {
              '&$selected': {
                  backgroundColor: useStyles.tableRowSelectColor
              }
          }
      },
  },
});

const components = {
    ExpandButton: function (props) {
        return <ExpandButton {...props} />;
    }
};
export default function UsersTable() {
    const [data, setData] = useState([["Loading Data ..."]])
    const [position, setPosition] = useState([])
    const [shortlistedCandidates, setShortlistedCandidates] = useState([])
    const [showRowData, setShowRowData] = useState(false)
    const [openEachProfile, setOpenEachProfile] = useState(false)
    const [eachProfileData, setEachProfileData] = useState([])
    const [tableBodyHeight, setTableBodyHeight] = useState("500px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    const classes = useStyles();

    const columns = [

        {
            name: "firstName",
            label: "First Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "lastName",
            label: "Last Name",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "emailId",
            label: "Email Id",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "phone",
            label: "Phone",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "role",
            label: "Role",
            options: {
                filter: true,
                sort: true,
            }
        }
    ];

    const getAllUsers = async () => {
        return await Axios
            .get('http://localhost:5000/users/getAllUsers')
            // .then(res => console.log(res))
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllUsers()
        setShowRowData(false)
        setOpenEachProfile(false)
    }, [])

    const handleEachCandidate = (data) => {
        console.log("datum", data)
        setOpenEachProfile(true)
        setEachProfileData([...data])
    }

    const options = {
        filter: false,
        search: false,
        print: false,
        download: false,
        viewColumns: false,
        customToolbar: null,
        selectableRows: false,
        pagination: false,
        responsive: 'standard',
        tableBodyHeight,
        tableBodyMaxHeight
    };
    return (
        <>
            <GridContainer>
                {openEachProfile
                    ? <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Shortlisted Candidates for {position} position</h4>
                            </CardHeader>
                            <CardBody>
                                <GridItem xs={12} sm={12} md={12}>
                                    <Button color="primary" onClick={() => setOpenEachProfile(false)}>
                                        Back
                                </Button>
                                </GridItem>
                                <EachProfile data={eachProfileData} />
                            </CardBody>
                        </Card>
                    </GridItem>
                    : showRowData
                        ? <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                <CardHeader color="primary">
                                    <h4 className={classes.cardTitleWhite}>Shortlisted Candidates for {position} position</h4>
                                </CardHeader>
                                <CardBody>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <Button color="primary" onClick={() => setShowRowData(false)}>
                                            Back
                                    </Button>
                                    </GridItem>
                                    <CandidateList data={shortlistedCandidates} datum={handleEachCandidate} />
                                </CardBody>
                            </Card>
                        </GridItem>
                        : <GridItem xs={12} sm={12} md={12}>
                            <Card>
                                <CardBody>
                                    <MuiThemeProvider theme={theme}>
                                        <MUIDataTable
                                            title={"users"}
                                            data={data}
                                            columns={columns}
                                            options={options}
                                            components={components}
                                        />
                                    </MuiThemeProvider>
                                </CardBody>
                            </Card>
                        </GridItem>}
            </GridContainer>
        </>
    )
}
