import { time } from 'console'
import mongoose from 'mongoose'

const AppointmentsSchema = new mongoose.Schema(
	{   
        _id	: { type: mongoose.Schema.Types.ObjectId, auto: true },
        patient_name : { type : String , required: true},
        age : { type : Number , required : true},
        sex: { type: String, enum: ['male', 'female'], required: true },
        from_text : { type:String , required : true},
        to_text : { type:String , required : true},
        phone : { type : Number , required : true},
        from_time: { type: Object, required: true },
        to_time: { type: Object, required: true },
        session : { type : String,required:true},
		slot_date: { type: Date, required: true },
        status: { type: String, required: true },
        checkin_time : { type:Object },
        visited_time : { type:Object },
        created_datetime : { type : Date}
    },
    { _id:false, versionKey:false },
	{ collection: 'appointments' }
)


const Appointments = mongoose.model('Appointments', AppointmentsSchema)
export default Appointments