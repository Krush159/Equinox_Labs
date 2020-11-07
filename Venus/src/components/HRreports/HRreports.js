import React from "react";
import ReactDOM from "react-dom";
import { CircularProgress, Typography } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";


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
        color: 'white',
        padding: "5px 10px",
      },
      fixedHeader: {
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
    name: "name",
    label: "Name",
    options: {
      filter: false,
      sort: true,
    }
  }, {
  //   name: "ringing",
  //   label: "Ringing",
  //   options: {
  //     filter: false,
  //     sort: true,
  //   }
  // }, {
  //   name: "callback",
  //   label: "Callback",
  //   options: {
  //     filter: false,
  //     sort: true,
  //   }
  // }, {
  //   name: "notReachable",
  //   label: "Not Reachable",
  //   options: {
  //     filter: false,
  //     sort: true,
  //   }
  // }, {
  //   name: "interviewScheduled",
  //   label: "Interview Scheduled",
  //   options: {
  //     filter: false,
  //     sort: true,
  //   }
  // }, {
  //   name: "notInterested",
  //   label: "Not Interested",
  //   options: {
  //     filter: false,
  //     sort: true,
  //   }
  // }, {
    name: "numOfleads",
    label: "Number of Leads",
    options: {
      filter: false,
      sort: true,
    }
  }
]
class HRreports extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      data: [["Loading Data..."]],
      columns: columns,
      callerUpdateData: [],
      newData: [],
      options: {
        filter: true,
        selectableRows: "none",
        filterType: 'dropdown',
        responsive: 'standard',
        rowsPerPage: 10,
        download: true,
        tableBodyHeight: '500px',
        tableBodyMaxHeight: "",
        downloadOptions: {
          filename: 'tableDownload.csv',
          separator: ',',
          filterOptions: {
            useDisplayedColumnsOnly: true || false,
            useDisplayedRowsOnly: true || true
          } || false
        },
        onRowClick: (rowData, rowMeta) => {
          console.log(rowData)
          console.log(rowMeta)
          let item = this.state.data.find(item => item.email === rowData[2])
          if (this.props.datum) { return this.props.datum(item) }
        },
        onRowSelectionChange: (currentRowsSelected, allRows, rowsSelected) => {
          let shortlistedCandidate = []
          rowsSelected.map(item => shortlistedCandidate.push(this.state.data[item]))
          console.log(shortlistedCandidate)
          this.props.data(shortlistedCandidate)
        },

        print: false,
        onTableInit: this.handleTableInit,
        onTableChange: this.handleTableChange,
      }
    }
  }

  componentDidMount() {
    axios.get("http://localhost:5000/getProfile/")
      .then(res => {
        this.setState({
          data: res.data.filter(item => item.callerUpdate?.length !== 0)
        })
        // this.state.data?.map(item => (
        //   item.callerUpdate?.map(ele =>
        //   this.setState({
        //     callerUpdateData: [...this.state.callerUpdateData, { status: ele.status, caller: ele.caller }]
        //   })
        // ))
        // )
        
        // this.state.callerUpdateData?.map(obj => {
        //   this.state.newData.find(ele => ele.caller === obj.caller)?
        // })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { data, columns, options, isLoading, callerUpdateData } = this.state
    console.log(data)

    console.log(callerUpdateData)

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <MUIDataTable
            title={<Typography variant="h6">
              Lead Reports
            {isLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
            </Typography>}
            data={data}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default HRreports;