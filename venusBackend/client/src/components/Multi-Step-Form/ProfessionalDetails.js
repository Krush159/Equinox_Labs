import React, { Fragment, useState } from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl";
import {RadioGroup, Radio} from '@material-ui/core';
import { FormControlLabel,FormLabel } from '@material-ui/core';
// import { DatePicker } from "@material-ui/pickers";
// Destructure props
const ProfessionalDetails = ({
  handleNext,
  handleBack,
  handleChange,
  values: { designation, organization, workExpFrom, workExpTill, noticePeriod, currentSalary },
  fieldError,
  isError
}) => {
  // Check if all values are not empty
  const isEmpty = noticePeriod.length > 0 && currentSalary.length > 0
  const [value, setvalue] = useState("yes")
  const handleRadio = (e) => {
    setvalue(e.target.value)
  }
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="designation"
            name="designation"
            placeholder="Enter your current designation"
            defaultValue={designation}
            onChange={handleChange("qualification")}
            margin="normal"
            error={fieldError.designation !== ""}
            helperText={fieldError.designation !== "" ? `${fieldError.designation}` : ""}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Organization"
            name="organization"
            placeholder="Enter your organization"
            defaultValue={organization}
            onChange={handleChange("organization")}
            margin="normal"
            error={fieldError.organization !== ""}
            helperText={fieldError.organization !== "" ? `${fieldError.organization}` : ""}
            required
          />
        </Grid>
        <Grid>
          <FormControl component="fieldset">
            <FormLabel component="legend">Is this your current company?</FormLabel>
            <RadioGroup aria-label="currentcompany" name="currentcompany" value={value} onChange={(e)=>handleRadio(e)}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            label="Work from"
            name="workExpFrom"
            type="date"
            defaultValue={workExpFrom}
            onChange={handleChange("workExpFrom")}
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            label="Work till"
            name="workExpTill"
            type="date"
            defaultValue={workExpTill}
            onChange={handleChange("workExpTill")}
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Notice Period"
            name="noticePeriod"
            type="Number"
            placeholder="Notice Period"
            defaultValue={noticePeriod}
            onChange={handleChange("noticePeriod")}
            margin="normal"
            error={fieldError.currentSalary !== ""}
            helperText={fieldError.currentSalary !== "" ? `${fieldError.currentSalary}` : ""}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Current Salary ( per annum )"
            name="currentSalary"
            type="Number"
            placeholder="Enter your currentSalary"
            defaultValue={currentSalary}
            onChange={handleChange("currentSalary")}
            margin="normal"
            error={fieldError.currentSalary !== ""}
            helperText={fieldError.currentSalary !== "" ? `${fieldError.currentSalary}` : ""}
            required
          />
        </Grid>
      </Grid>
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          color="default"
          onClick={handleBack}
          style={{ marginRight: 20 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          disabled={!isEmpty || isError}
          color="primary"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </Fragment>
  )
}

export default ProfessionalDetails
