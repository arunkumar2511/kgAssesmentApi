import Appointments from '../models/slots.js';

export async function addAppointment(req,res){
    let params = req.body;
    try {
        let result = await Appointments.find({}).lean();
        return res.status(200).send({status:true,message:"Success"})
    } catch (error) {
        let msg = "Exception during adding appointments :- "+error;
        return res.status(500).send({status:false,message:"Something went wrong from our side please try again later ....",error:msg})
    }
}

export async function getAppointments(req,res){
    let params = req.body;
    try {
        let result = await Appointments.find({}).lean();
        return res.status(200).send({status:true,message:"Success",details:result})
    } catch (error) {
        let msg = "Exception during getting appointments :- "+error;
        return res.status(500).send({status:false,message:"Something went wrong from our side please try again later ....",error:msg})
    }
}