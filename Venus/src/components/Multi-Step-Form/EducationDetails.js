import React, { Fragment } from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// Destructure props
const EducationDetails = ({
  handleNext,
  handleBack,
  handleChange,
  values: { qualification, specialization, institute, passingYear, type },
  fieldError,
  isError
}) => {
  // Check if all values are not empty
  const isEmpty = passingYear.length > 0 && specialization.length > 0
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Highest Qualification"
            name="Highest Qualification"
            placeholder="Enter your qualification"
            defaultValue={qualification}
            onChange={handleChange("qualification")}
            margin="normal"
            error={fieldError.qualification !== ""}
            helperText={fieldError.qualification !== "" ? `${fieldError.qualification}` : ""}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Specialization"
            name="specialization"
            placeholder="Enter your specialization"
            defaultValue={specialization}
            onChange={handleChange("specialization")}
            margin="normal"
            error={fieldError.specialization !== ""}
            helperText={fieldError.specialization !== "" ? `${fieldError.specialization}` : ""}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Institute"
            name="institute"
            placeholder="Enter Name of your institute"
            defaultValue={institute}
            onChange={handleChange("institute")}
            margin="normal"
            error={fieldError.institute !== ""}
            helperText={fieldError.institute !== "" ? `${fieldError.institute}` : ""}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            label="Year of Passing"
            name="passingYear"
            type="date"
            defaultValue={passingYear}
            onChange={handleChange("passingYear")}
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required margin="normal">
            <InputLabel htmlFor="type">Education Type:</InputLabel>
            <Select value={type} onChange={handleChange("type")}>
              <MenuItem value={"Full Time"}>Full Time</MenuItem>
              <MenuItem value={"Part Time"}>Part Time</MenuItem>
              <MenuItem value={"Correspondance"}>Correspondance</MenuItem>
            </Select>
          </FormControl>
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

export default EducationDetails
