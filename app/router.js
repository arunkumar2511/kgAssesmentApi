import express from 'express';
import {addAppointment , getAppointments} from './controller/app-controller.js';

var router = express.Router();

router.post('/addAppointment',
addAppointment
)

router.get('/getAppointment',
getAppointments
)

export {router}