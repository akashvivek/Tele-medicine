const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const ApiFeatures = require("../utils/apiFeatures");
const patientRegister = require("../models/patientRegisterModel");
const Appointment = require("../models/appointModel");
const dayjs = require('dayjs')
dayjs().format()

//New Registeration
exports.newPatientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    email,
    phone,
    age,
    address,
    city,
    state,
    gender,
    occupation,
    medicalHistory,
    drugHistory,
    anydrugHistory,
    allergy,
    familyHistory,
  } = req.body;

  const newPatient = await patientRegister.create({
    
    name,
    email,
    phone,
    age,
    address,
    city,
    state,
    gender,
    occupation,
    medicalHistory,
    drugHistory,
    anydrugHistory,
    allergy,
    familyHistory,
  });

  res.status(201).json({
    success: true,
    newPatient,
  });
});



//get ALl Register Patients
exports.getRegisteredPatient = catchAsyncErrors(async (req, res) => {
  const registeredPatientCount = await patientRegister.countDocuments();

  const apiFeature = new ApiFeatures(patientRegister.find(), req.query)
    .search()
    .filter();

  let alreadyRegistered = await apiFeature.query;
  let filterRegisteredPatientCount = alreadyRegistered.length;

  alreadyRegistered = await apiFeature.query.clone();
  res
    .status(200)
    .json({
      success: true,
      registeredPatientCount,
      alreadyRegistered,
      filterRegisteredPatientCount,
    });
});

//New Appointment
exports.newPatientAppointment = catchAsyncErrors(async (req, res, next) => {
  const {name,  phone, age, problemcat, gender, dhst, allrg, history } =
    req.body;

  const lowerName = name.toLowerCase()  
  const  trim = lowerName.trim()
  const naam = trim.split(" ").join("")
  // console.log()

  // const naam = name.toLowerCase()  
  // console.log(naam)

  const patient = await Appointment.create({
    name,
    naam,
    phone,
    age,
    problemcat,
    gender,
    dhst,
    allrg,
    history,
  });
  res.status(201).json({
    success: true,
    patient,
  });
});



//get ALl Appointed Patients
exports.getAppointedPatient = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 10;
  // const appointedPatientCount = await Appointment.countDocuments();
  const start = dayjs().startOf('day'); 
  const end = dayjs().endOf('day'); 

  const apiFeature = new ApiFeatures(Appointment.find({  createdAt: { $gt: start, $lt: end } }), req.query)
  .search()
  .filter()

  const appointedPatientCount = await Appointment.countDocuments({  createdAt: { $gt: start, $lt: end } });


 let appointedPatients  = await apiFeature.query; 

  // const toadyAppointedPatients = await Appointment.find( {  createdAt: { $gt: start, $lt: end } } )

  let filterAppointedPatientCount = appointedPatients.length;
   apiFeature.pagination(resultPerPage);
   appointedPatients = await apiFeature.query.clone();

  res
    .status(200)
    .json({
      success: true,
      appointedPatientCount,
      appointedPatients,
      filterAppointedPatientCount,

      resultPerPage,
    });
});