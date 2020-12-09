import Appointments from '../models/slots.js';
import lodash from 'lodash';

export async function addAppointment(req,res){
    let params = req.body;
    try {
        params['slot_date'] = new Date();
        params['created_datetime'] = new Date();
        params['status'] = 'fixed';
        params['from_text'] = params['from_time']['hour'] +":"+ params['from_time']['minute'];
        params['to_text'] = params['to_time']['hour'] +":"+ params['to_time']['minute'];
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
        let result = {morning:[],evening:[]}
        let appoinmentsList = await Appointments.find({}).select('_id from_time from_text to_time session status');
        if(appoinmentsList.length){
            let objMorning = lodash.filter(appoinmentsList, (o)=> { return o['session'] == "Morning"});
            let objEvening = lodash.filter(appoinmentsList, (o) => { return o['session'] == "Evening"});
            if(objMorning){
                result["morning"] = Array.isArray(objMorning)?objMorning:[objMorning];
            }
            if(objEvening){
                result["evening"] = Array.isArray(objEvening)?objEvening:[objEvening];
            }
        }
        return res.status(200).send({status:true,message:"Success",details:result})
    } catch (error) {
        let msg = "Exception during getting appointments :- "+error;
        return res.status(500).send({status:false,message:"Something went wrong from our side please try again later ....",error:msg})
    }
}