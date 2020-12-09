import express from 'express';
import {addAppointment , getAppointments ,getAppointmentsList , updateAppointments} from './controller/app-controller.js';

var router = express.Router();

router.post('/addAppointment',
addAppointment
)

router.post('/getAppointment',
getAppointments
)

router.post('/getAppointmentsList',
getAppointmentsList
)

router.post('/updateAppointments',
updateAppointments
)

export {router}