import Appointments from '../models/slots.js';
import lodash from 'lodash';
import {getFormattedDate} from '../utils/common/common-functions.js';

export async function addAppointment(req,res){
    let params = req.body;
    try {
        params['slot_date'] = new Date();
        params['created_datetime'] = new Date();
        params['status'] = 'fixed';
        params['from_text'] = getFormattedDate(params['from_time']);
        params['to_text'] = getFormattedDate(params['to_time']);
        await new Appointments(params).save();
        return res.status(200).send({status:true,message:"Appointment Added Successfully"})
    } catch (error) {
        let msg = "Exception during adding appointments :- "+error;
        return res.status(500).send({status:false,message:"Something went wrong from our side please try again later ....",error:msg})
    }
}

export async function getAppointments(req,res){
    let params = req.body;
    try {
        let date = params['date'];
        let result = {morning:[],evening:[]};
        let appoinmentsList = await Appointments.find({slot_date:{$gte:new Date(date)},slot_date:{$lte:new Date(date)}}).select('_id from_time from_text to_time session status');
        if(appoinmentsList.length){
            let objMorning = lodash.filter(appoinmentsList, (o)=> { return o['session'] == "Morning"});
            let objEvening = lodash.filter(appoinmentsList, (o) => { return o['session'] == "Evening"});
            if(objMorning){
                result["morning"] = objMorning;
            }
            if(objEvening){
                result["evening"] = objEvening;
            }
        }
        return res.status(200).send({status:true,message:"Success",details:result})
    } catch (error) {
        let msg = "Exception during getting appointments :- "+error;
        return res.status(500).send({status:false,message:"Something went wrong from our side please try again later ....",error:msg})
    }
}

export async function getAppointmentsList(req,res){
    let params = req.body;
    try {
        let date = params['date'];
        let appoinmentsList = await Appointments.find({slot_date:{$gte:new Date(date)},slot_date:{$lte:new Date(date)}}).select('_id patient_name phone from_time from_text to_time session status');
        return res.status(200).send({status:true,message:"Success",details:appoinmentsList})
    } catch (error) {
        let msg = "Exception during getting appointments :- "+error;
        return res.status(500).send({status:false,message:"Something went wrong from our side please try again later ....",error:msg})
    }
}

export async function updateAppointments(req,res){
    let params = req.body;
    try {
        let status = params['status'];
        let id = params['id'];
        let updateValue = {status:status}
        if(status == 'checkin')
            updateValue['checkin_time'] = new Date();
        if(status == 'visited')
            updateValue['visited_time'] = new Date();
        await Appointments.updateOne({_id:id},{$set:updateValue})
        return res.status(200).send({status:true,message:"Success"})
    } catch (error) {
        let msg = "Exception during updating appointments :- "+error;
        return res.status(500).send({status:false,message:"Something went wrong from our side please try again later ....",error:msg})
    }
}