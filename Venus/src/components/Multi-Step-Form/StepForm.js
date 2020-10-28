import React, { useState, Fragment } from "react"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import PersonalDetails from "./PersonalDetails"
import EducationDetails from "./EducationDetails"
import ProfessionalDetails from "./ProfessionalDetails"
import Confirm from "./Confirm"
import Success from "./Success"

const emailRegex = RegExp(/^[^@]+@[^@]+\.[^@]+$/)
const phoneRegex = RegExp(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4,6})$/)
// Step titles
const labels = ["Personal Details", "Educational Details", "Professional Details", "Confirmation"]

const StepForm = () => {
  const [steps, setSteps] = useState(0)
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dob: "",
    city: "",
    phone: "",
    qualification: "",
    specialization: "",
    institute:"",
    passingYear: "",
    type: "",
    designation: "",
    organization: "",
    workExpFrom: "",
    workExpTill: "",
    noticePeriod: "",
    currentSalary: ""
  })
  // Copy fields as they all have the same name
  const [fieldError, setFieldError] = useState({
    ...fields
  })

  const [isError, setIsError] = useState(false)

  // Proceed to next step
  const handleNext = () => setSteps(steps + 1)
  // Go back to prev step
  const handleBack = () => setSteps(steps - 1)

  // Handle fields change
  const handleChange = input => ({ target: { value } }) => {
    // Set values to the fields
    setFields({
      ...fields,
      [input]: value
    })

    // Handle errors
    const formErrors = { ...fieldError }
    const lengthValidate = value.length > 0 && value.length < 3

    switch (input) {
      case "firstName":
        formErrors.firstName = lengthValidate
          ? "Minimum 3 characaters required"
          : ""
        break
      case "lastName":
        formErrors.lastName = lengthValidate
          ? "Minimum 3 characaters required"
          : ""
        break
      case "email":
        formErrors.email = emailRegex.test(value) ? "" : "Invalid email address"
        break
      case "phone":
        formErrors.phone = phoneRegex.test(value)
          ? ""
          : "Please enter a valid phone number. i.e: xxx-xxx-xxxx"
        break
      case "city":
        formErrors.city = lengthValidate ? "Minimum 3 characaters required" : ""
        break
      default:
        break
    }

    // set error hook
    Object.values(formErrors).forEach(error =>
      error.length > 0 ? setIsError(true) : setIsError(false)
    )
    // set errors hook
    setFieldError({
      ...formErrors
    })
  }

  const handleSteps = step => {
    switch (step) {
      case 0:
        return (
          <PersonalDetails
            handleNext={handleNext}
            handleChange={handleChange}
            values={fields}
            isError={isError}
            fieldError={fieldError}
          />
        )
      case 1:
        return (
          <EducationDetails
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={fields}
            isError={isError}
            fieldError={fieldError}
          />
        )
        case 2:
        return (
          <ProfessionalDetails
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={fields}
            isError={isError}
            fieldError={fieldError}
          />
        )
      case 3:
        return (
          <Confirm
            handleNext={handleNext}
            handleBack={handleBack}
            values={fields}
          />
        )
      default:
        break
    }
  }

  // Handle components
  return (
    <Fragment>
      {steps === labels.length ? (
        <Success />
      ) : (
        <Fragment>
          <Stepper
            activeStep={steps}
            style={{ paddingTop: 30, paddingBottom: 50 }}
            alternativeLabel
          >
            {labels.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {handleSteps(steps)}
        </Fragment>
      )}
    </Fragment>
  )
}

export default StepForm
