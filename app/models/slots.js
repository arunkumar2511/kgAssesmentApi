import { time } from 'console'
import mongoose from 'mongoose'

const AppointmentsSchema = new mongoose.Schema(
	{   
        patient_name : { type : String , required: true},
        age : { type : Number , required : true},
        sex: { type: String, enum: ['male', 'female'], required: true },
        contact : { type : Number , required : true},
        from: { type: Date, required: true },
        to: { type: Date, required: true },
		slot_date: { type: Date, required: true },
		status: { type: String, required: true }
	},
	{ collection: 'appoinments' }
)

AppointmentsSchema.index({ slug: 1, userid: 1 }, { unique: true })

const Appointments = mongoose.model('Appointments', AppointmentsSchema)
export default Appointments