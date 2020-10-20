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
    label: "lastName",
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
    label: "gender",
    options: {
      filter: false,
      sort: true,
    }
  },
  {
    name: "date",
    label: "date",
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value, tableMeta, updateValue) => {
        var d = new Date(value),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
      }
    }
  },
  {
    name: "city",
    label: "city",
    options: {
      filter: false,
      sort: true,
    }
  },
  {
    name: "phone",
    label: "phone",
    options: {
      filter: true,
      sort: true,
    }
  }, {
    name: "qualification",
    label: "qualification",
    options: {
      filter: true,
      sort: true,
    }
  }, {
    name: "specialization",
    label: "specialization",
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
    label: "passingYear",
    options: {
      filter: true,
      sort: true,
    }
  }, {
    name: "type",
    label: "type",
    options: {
      filter: false,
      sort: true,
    }
  }, {
    name: "designation",
    label: "designation",
    options: {
      filter: true,
      sort: true,
    }
  }, {
    name: "organization",
    label: "organization",
    options: {
      filter: false,
      sort: true,
    }
  }, {
    name: "workExpFrom",
    label: "workExpFrom",
    options: {
      filter: false,
      sort: true,
    }
  }, {
    name: "workExpTill",
    label: "workExpTill",
    options: {
      filter: false,
      sort: true,
    }
  }, {
    name: "noticePeriod",
    label: "noticePeriod",
    options: {
      filter: true,
      sort: true,
    }
  }, {
    name: "currentSalary",
    label: "currentSalary",
    options: {
      filter: false,
      sort: true,
    }
  }, {
    name: "status",
    label: "status",
    options: {
      filter: true,
      sort: true,
    }
  }
]
class ApplicantList extends React.Component {
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
        onRowSelectionChange: (currentRowsSelected, allRows, rowsSelected) => {
          let shortlistedCandidate = []
          rowsSelected.map(item => shortlistedCandidate.push(this.state.data[item]))
          console.log(shortlistedCandidate)
          this.setState({
            shortlist:[...shortlistedCandidate]
          })
          this.props.data(shortlistedCandidate)
        },
        
        print: false,
        onTableInit: this.handleTableInit,
        onTableChange: this.handleTableChange,
      }
    }
  }

  componentDidMount() {
    this.getData(this.props.url, this.props.param)
  }


  getData = async (url, params) => {
    this.setState({ isLoading: true });
    await axios.get(params === "" ? url : url, { params })
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

export default ApplicantList;