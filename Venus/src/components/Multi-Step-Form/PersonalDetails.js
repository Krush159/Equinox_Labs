import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

// Destructure props
const PersonalDetails = ({
  handleNext,
  handleChange,
  values: { firstName, lastName, email, gender, dob, phone, city },
  fieldError,
  isError
}) => {
  // Check if all values are not empty
  const isEmpty =
    firstName.length > 0 &&
    lastName.length > 0 &&
    gender.length > 0 &&
    email.length > 0 &&
    isEmail.test(email);

  return (
    <Fragment>
      <Grid container spacing={2} noValidate>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            placeholder="Your first name"
            defaultValue={firstName}
            onChange={handleChange("firstName")}
            margin="normal"
            error={fieldError.firstName !== ""}
            helperText={
              fieldError.firstName !== "" ? `${fieldError.firstName}` : ""
            }
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            placeholder="Your last name"
            defaultValue={lastName}
            onChange={handleChange("lastName")}
            margin="normal"
            error={fieldError.lastName !== ""}
            helperText={
              fieldError.lastName !== "" ? `${fieldError.lastName}` : ""
            }
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            placeholder="Your email address"
            type="email"
            defaultValue={email}
            onChange={handleChange("email")}
            margin="normal"
            error={fieldError.email !== ""}
            helperText={fieldError.email !== "" ? `${fieldError.email}` : ""}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required margin="normal">
            <InputLabel htmlFor="gender">Gender</InputLabel>
            <Select value={gender} onChange={handleChange("gender")}>
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="City"
            name="city"
            placeholder="Enter your city"
            defaultValue={city}
            onChange={handleChange("city")}
            margin="normal"
            error={fieldError.city !== ""}
            helperText={fieldError.city !== "" ? `${fieldError.city}` : ""}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            label="Date of birth"
            name="birthday"
            type="date"
            defaultValue={dob}
            onChange={handleChange("date")}
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone number"
            name="phone"
            placeholder="i.e: xxx-xxx-xxxx"
            defaultValue={phone}
            onChange={handleChange("phone")}
            margin="normal"
            error={fieldError.phone !== ""}
            helperText={fieldError.phone !== "" ? `${fieldError.phone}` : ""}
          />
        </Grid>
      </Grid>
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
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
  );
};

export default PersonalDetails;
