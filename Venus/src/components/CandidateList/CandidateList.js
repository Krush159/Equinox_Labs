import React from "react";
import ReactDOM from "react-dom";
import { CircularProgress, Typography } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import axios from "axios";

const columns = [
  {
    name: "firstName",
    label: "First Name",
    options: {
      filter: false,
      sort: true,
    }
  },
  {
    name: "lastName",
    label: "Last Name",
    options: {
      filter: false,
      sort: true,
    }
  },
  {
    name: "email",
    label: "email",
    options: {
      filter: false,
      sort: true,
    }
  },
  {
    name: "gender",
    label: "Gender",
    options: {
      filter: false,
      sort: true,
    }
  },
  {
    name: "dob",
    label: "Date of Birth",
    options: {
      filter: false,
      sort: true,
      // customBodyRender: (value, tableMeta, updateValue) => {
      //   // var d = new Date(value),
      //   //   month = '' + (d.getMonth() + 1),
      //   //   day = '' + d.getDate(),
      //   //   year = d.getFullYear();

      //   // if (month.length < 2) month = '0' + month;
      //   // if (day.length < 2) day = '0' + day;

      //   // let monthNames = { '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec' }
      //   // return [day, monthNames[month], year].join('-');
      //   return new Date(value)
      // }
    }
  },
  {
    name: "city",
    label: "City",
    options: {
      filter: false,
      sort: true,
    }
  },
  {
    name: "phone",
    label: "Phone",
    options: {
      filter: true,
      sort: true,
    }
  }, {
    name: "qualification",
    label: "Qualification",
    options: {
      filter: true,
      sort: true,
    }
  }, {
    name: "specialization",
    label: "Specialization",
    options: {
      filter: true,
      sort: true,
    }
  }, {
    name: "institute",
    label: "institute",
    options: {
      filter: false,
      sort: true,
    }
  }, {
    name: "passingYear",
    label: "PassingYear",
    options: {
      filter: true,
      sort: true,
    }
  }, {
    name: "type",
    label: "Type",
    options: {
      filter: false,
      sort: true,
    }
  }, {
    name: "designation",
    label: "Designation",
    options: {
      filter: true,
      sort: true,
    }
  }, {
    name: "organization",
    label: "Organization",
    options: {
      filter: false,
      sort: true,
    }
  }, {
    name: "workExpFrom",
    label: "WorkExpFrom",
    options: {
      filter: false,
      sort: true,
    }
  }, {
    name: "workExpTill",
    label: "WorkExpTill",
    options: {
      filter: false,
      sort: true,
    }
  }, {
    name: "noticePeriod",
    label: "NoticePeriod",
    options: {
      filter: true,
      sort: true,
    }
  }, {
    name: "currentSalary",
    label: "CurrentSalary",
    options: {
      filter: false,
      sort: true,
    }
  }, {
    name: "flag",
    label: "Flag",
    options: {
      filter: true,
      sort: true,
    }
  }
]
class CandidateList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      data: [["Loading Data..."]],
      columns: columns,

      options: {
        filter: true,
        selectableRows: 'multiple',
        filterType: 'dropdown',
        selectableRows: false,
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
        onRowClick: (rowData, rowMeta) => {
            console.log(rowData)
            console.log(rowMeta)
            let item =this.state.data.find(item => item.email === rowData[2])
            if(this.props.datum){return this.props.datum(item)}
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
    axios.post("http://localhost:5000/getProfile/shortlisted", this.props.data)
    .then(res => 
      this.setState({
        data: res.data
      })
    )
    .catch(err => console.log(err))
    
    // console.log(this.props.data)
  }

  render() {
    const { data, columns, options, isLoading } = this.state
    console.log(data)
    return (
      <div>
        <MUIDataTable
          title={<Typography variant="h6">
            Candidate's List
            {isLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
          </Typography>}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}

export default CandidateList;