import React, { Fragment } from "react"
import axios from 'axios'
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"

// Destructure props
const Confirm = ({
  handleNext,
  handleBack,
  values: { firstName, lastName, email, gender, date, phone, city, qualification, specialization, institute, passingYear, type, designation, organization, workExpFrom, workExpTill, noticePeriod, currentSalary }
}) => {
  const profile = {firstName, lastName, email, gender, date, phone, city, qualification, specialization, institute, passingYear, type, designation, organization, workExpFrom, workExpTill, noticePeriod, currentSalary}
  console.log(profile)
  const handleSubmit = async() =>{
      return await axios
      .post(`http://localhost:5000/addProfile`, profile)
      .then(res => console.log(res))
      // .then(data => { 
      //     console.log(data)
      // })
      .catch(err => console.log(err))
  }
  return (
    <Fragment>
      <List disablePadding>
        <ListItem xs={12} sm={6} >
          <ListItemText primary="First Name" secondary={firstName} />
        </ListItem>
        <ListItem xs={12} sm={6}>
          <ListItemText primary="Last Name" secondary={lastName} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Email Address" secondary={email} />
        </ListItem>

        <Divider />

        <ListItem xs={12} sm={6}>
          <ListItemText primary="Gender" secondary={gender} />
        </ListItem>

        <ListItem xs={12} sm={6}>
          <ListItemText primary="Date of birth" secondary={date} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="City" secondary={city} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="phone"
            secondary={phone.length > 0 ? phone : "Not Provided"}
          />
        </ListItem>
      </List>

      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <Button variant="contained" color="default" onClick={handleBack}>
          Back
        </Button>
        <Button
          style={{ marginLeft: 20 }}
          variant="contained"
          color="secondary"
          onClick={()=> handleSubmit()}
        >
          Confirm & Continue
        </Button>
      </div>
    </Fragment>
  )
}

export default Confirm
