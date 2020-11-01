import React from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

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


const columns = [
  {
    name: "firstName",
    label: "First Name",
    options: {
      filter: false,
      sort: true,
      sortThirdClickReset: true
    }
  },
  {
    name: "lastName",
    label: "Last Name",
    options: {
      filter: false,
      sort: true,
      sortThirdClickReset: true
    }
  },
  {
    name: "email",
    label: "Email Id",
    options: {
      filter: false,
      sort: true,
      sortThirdClickReset: true
    }
  },
  {
    name: "gender",
    label: "Gender",
    options: {
      filter: false,
      sort: true,
      sortThirdClickReset: true
    }
  },
  {
    name: "dob",
    label: "Date Of Birth",
    options: {
      filter: false,
      sort: true,
      sortThirdClickReset: true
      // customBodyRender: (value, tableMeta, updateValue) => {
      //   // var d = new Date(value),
      //   //   month = '' + (d.getMonth() + 1),
      //   //   day = '' + d.getDate(),
      //   //   year = d.getFullYear();

      //   // if (month.length < 2) month = '0' + month;
      //   // if (day.length < 2) day = '0' + day;
      //   // let monthNames = { '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec' }
      //   // return [day, monthNames[month], year].join('-');
      //   return new Date()
      // }
    }
  },
  {
    name: "city",
    label: "City",
    options: {
      filter: false,
      sort: true,
      sortThirdClickReset: true
    }
  },
  {
    name: "phone",
    label: "Phone",
    options: {
      filter: true,
      sort: true,
      sortThirdClickReset: true
    }
  }, {
    name: "qualification",
    label: "Qualification",
    options: {
      filter: true,
      sort: true,
      sortThirdClickReset: true
    }
  }, {
    name: "specialization",
    label: "Specialization",
    options: {
      filter: true,
      sort: true,
      sortThirdClickReset: true
    }
  }, {
    name: "institute",
    label: "Institute",
    options: {
      filter: false,
      sort: true,
      sortThirdClickReset: true
    }
  }, {
    name: "passingYear",
    label: "PassingYear",
    options: {
      filter: true,
      sort: true,
      sortThirdClickReset: true
    }
  }, {
    name: "type",
    label: "Type",
    options: {
      filter: false,
      sort: true,
      sortThirdClickReset: true
    }
  }, {
    name: "designation",
    label: "Designation",
    options: {
      filter: true,
      sort: true,
      sortThirdClickReset: true
    }
  }, {
    name: "organization",
    label: "Organization",
    options: {
      filter: false,
      sort: true,
      sortThirdClickReset: true
    }
  }, {
    name: "workExpFrom",
    label: "WorkExpFrom",
    options: {
      filter: false,
      sort: true,
      sortThirdClickReset: true
    }
  }, {
    name: "workExpTill",
    label: "WorkExpTill",
    options: {
      filter: false,
      sort: true,
      sortThirdClickReset: true
    }
  }, {
    name: "noticePeriod",
    label: "NoticePeriod",
    options: {
      filter: true,
      sort: true,
      sortThirdClickReset: true
    }
  }, {
    name: "currentSalary",
    label: "CurrentSalary",
    options: {
      filter: false,
      sort: true,
      sortThirdClickReset: true
    }
  }, {
    name: "flag",
    label: "Flag",
    options: {
      filter: true,
      sort: true,
      sortThirdClickReset: true
    }
  },{
    name: "post",
    label: "Post",
    options: {
      filter: true,
      sort: true,
      sortThirdClickReset: true
    }
  }
]
class MainList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      data: [["Loading Data..."]],
      
      shortlist: [],
      columns: columns,
      options: {
        filter: true,
        selectableRows: 'multiple',
        filterType: 'dropdown',
        responsive: 'standard',
        rowsPerPage: 10,
        download: true,
        downloadOptions: {
          filename: 'tableDownload.csv',
          separator: ',',
          filterOptions: {
            useDisplayedColumnsOnly: true || false,
            useDisplayedRowsOnly: true || true
          } || false
        },
        tableBodyHeight: '500px',
        tableBodyMaxHeight:"",
        setTableProps: () => {
          return {
            padding: 'default'
          }
        },
        print: false,
        onTableInit: this.handleTableInit,
        onTableChange: this.handleTableChange,
      }
    }
  }
 
  componentDidMount() {
    this.getData()
  }


  getData = async () => {
    this.setState({ isLoading: true });
    await axios.get("http://localhost:5000/getProfile")
      .then(res => {
        console.log(res)
        this.setState({ data: res.data, isLoading: false })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { data, columns, options, isLoading } = this.state
    console.log(data)
    return (
      <>
        <MuiThemeProvider theme={theme}>
          <MUIDataTable
            title={<Typography variant="h6">
              Candidate's List
            {isLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
            </Typography>}
            data={data}
            columns={columns}
            options={options}
          />
          </MuiThemeProvider>
      </>
    );
  }
}

export default MainList;