import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import "./EmpolyeeForm.css";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import validator from "validator";
import csc from  "country-state-city"
import axios from 'axios'

function EmpolyeeForm({ FormOpen, setFormOpen }) {
  const initialValue = {
    firstname: "",
    lastname: "",
    gender : "",
    Phone : "",
    dob: new Date("1995-11-17").toUTCString(),
    Aadhaar : "",
    Pan : "",
    Address : "",
    State : "",
    Pincode : "",
    email: "",
    emp_Photo: ""
  };
  let State = csc.getStatesOfCountry("IN")
  const [Values, setValues] = useState(initialValue);
  const [Errors, setErrors] = useState({});
  const validate = (FieldValue = Values) => {
    let temp = { ...Errors };
    if ("firstname" in FieldValue)
    {
      temp.firstname = Values.firstname.length > 4 ? "" : "Length more than 4";
    }
    if ("lastname" in FieldValue)
    {
      temp.lastname = Values.lastname.length>4 ? "" : "Length more than 4";
    }
    if ("email" in FieldValue)
    {
      temp.email = validator.isEmail(Values.email) ? "" : "Vaild mail ID";
    }
    if("Pincode" in FieldValue)
    {
      temp.Pincode = Values.Pincode.length === 6 ? "" : "Length equal to 6"
    }
    if("Address" in FieldValue)
    {
      temp.Address = Values.Address.length > 10 ? "" : "Length greater than 8"
    }
    if("Aadhaar" in FieldValue)
    {
      temp.Aadhaar = Values.Aadhaar.length === 16 ? "" : "Length equal to 16"
    }
    if("Phone" in FieldValue)
    {
      temp.Phone = Values.Phone.length === 10 ? "" : "Length equal to 10"
    }
    if("Pan" in FieldValue)
    {
      temp.Pan = Values.Pan.length > 7 ? "" : "Length greater than 8"
    }
    setErrors({
      ...temp,
    });
    if (FieldValue == Values)
    {
     return Object.values(temp).every(x => x == "")
    }
  };
  const resetForm = () =>
  {
    setValues(initialValue)
    setErrors({})  
  }
  const AddingEmpolyee = (e) => {
    e.preventDefault();
    if (validate()) {
    console.log(Values)
      axios.post('http://localhost:4000/Empolyee',Values)
      setValues(initialValue)
      resetForm()
    }
  };
  const convertToPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  const handleInputChange = (e,vaildateOnChange = false) => {
    setValues({
      ...Values,
      [e.target.name]: e.target.value,
    });
    if(vaildateOnChange)
    validate({[e.target.name]:e.target.value})

  };
  const handleImagePath = (e) => 
  {
    let file = e.target.files[0]
    setValues({
      ...Values,
      emp_Photo: file.name,
    });
  }
  return (
    <>
      {FormOpen ? (
        <div className="Form">
          <form onSubmit={AddingEmpolyee} onReset={() => setValues(initialValue)} className="FormBox">
            <FormControl>
              <div className="Form_Header">
                <h2> Adding a Empolyee</h2>
                <IconButton>
                  <CloseIcon onClick={() => setFormOpen(false)} />
                </IconButton>
              </div>
              <div className="InputForm">
                <div className="one">
                  <TextField
                    variant="outlined"
                    label="First Name"
                    name="firstname"
                    value={Values.firstname}
                    onChange={handleInputChange}
                    error = {Errors.firstname}
                    helperText = {Errors.firstname}
                    required
                  />
                  <TextField
                    variant="outlined"
                    label="Last Name"
                    name="lastname"
                    value={Values.lastname}
                    onChange={handleInputChange}
                    error = {Errors.lastname}
                    helperText = {Errors.lastname}
                    required
                  />
                  <TextField
                    variant="outlined"
                    label="email"
                    value={Values.email}
                    name="email"
                    onChange={handleInputChange}
                    error = {Errors.email}
                    helperText = {Errors.email}
                    required
                  />
                  <FormControl >
                    <InputLabel htmlFor="select">Gender</InputLabel>
                    <Select 
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="gender"
                    value={Values.gender}
                    onChange={handleInputChange}
                    required
                    native >
                      <option aria-label="None" />
                        <option
                          name="gender"
                        >
                          Male
                        </option>
                        <option
                          name="gender"
                        >
                          Female
                        </option>
                        <option
                          name="gender"
                        >
                          Others
                        </option>
                    </Select>
                  </FormControl>
                 
                </div>
                <div className="one">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableFuture
                      varient="dialog"
                      format="dd/MM/yyyy"
                      margin="normal"
                      views={["year", "month", "date"]}
                      label="Birthday"
                      value={Values.dob}
                      onChange={(date) =>
                        handleInputChange(convertToPara("dob", date))
                      }
                    />
                  </MuiPickersUtilsProvider>
                  <TextField
                    variant="outlined"
                    label="Pincode"
                    value={Values.Pincode}
                    name="Pincode"
                    onChange={handleInputChange}
                    error = {Errors.Pincode}
                    helperText = {Errors.Pincode}
                    required
                  />
                  <FormControl >
                    <InputLabel htmlFor="select">State</InputLabel>
                    <Select 
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    name="State"
                    value={Values.State}
                    onChange={handleInputChange}
                    required
                    native >
                      <option aria-label="None" />
                      {
                        State.map((e) => <option>{e.name}</option>)
                      }
                    </Select>
                  </FormControl>
                  <TextField
                    variant="outlined"
                    label="Address"
                    value={Values.Address}
                    name="Address"
                    onChange={handleInputChange}
                    error = {Errors.Address}
                    helperText = {Errors.Address}
                    required
                  />

                </div>
                <div className="one">
                   <TextField
                    variant="outlined"
                    label="Aadhaar Number"
                    name="Aadhaar"
                    value={Values.Aadhaar}
                    onChange={handleInputChange}
                    type= "Number"
                    error = {Errors.Aadhaar}
                    helperText = {Errors.Aadhaar}
                    required
                  />
                  <TextField
                    variant="outlined"
                    label="PAN CARD Number"
                    name="Pan"
                    value={Values.Pan}
                    onChange={handleInputChange}
                    error = {Errors.Pan}
                    helperText = {Errors.Pan}
                    required
                  />
                  <TextField
                    variant="outlined"
                    label="Phone Number"
                    name="Phone"
                    value={Values.Phone}
                    error = {Errors.Phone}
                    helperText = {Errors.Phone}
                    onChange={handleInputChange}
                    type= "Number"
                    required
                  />
                  <label htmlFor="btn-upload">
                    <input
                      id="btn-upload"
                      name="emp_Photo"
                      style={{ display: 'none' }}
                      type="file"
                      onChange = {handleImagePath}
                      required
                      />
                    <Button
                      className="btn-choose"
                      variant="outlined"
                      component="span" >
                      Choose Image
                    </Button>
                  </label>

                  
                  
                  
                </div>
              </div>
            </FormControl>

            <div className="Form_Button">
              <Button
                variant="contained"
                type="submit"
                style={{ backgroundColor: "green" }}
              >
                Submit
              </Button>
              <Button
                type="reset"
                variant="contained"
                color="secondary"
              >
                Reset
              </Button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}

export default EmpolyeeForm;
