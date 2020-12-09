import mongoose from "mongoose";


function buildMongoUri(){
    
    return "mongodb+srv://dbadmin:admin@cluster0.qi6jo.mongodb.net/kgisl?retryWrites=true&w=majority"
}

async function connectMongoose() {
    try{
        let mongoUri = buildMongoUri();
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } catch(error){
        console.error("Failure in connecting mongodb", error);
        throw error;
    }
}

mongoose.connection.on("connected", () => {     
    console.info("MongoDB Connection Established");
});
  
mongoose.connection.on("reconnected", () => {
    console.info("MongoDB Connection Reestablished");
});

mongoose.connection.on("disconnected", () => {
    console.error("MongoDB Connection Disconnected");
});

mongoose.connection.on("close", () => {
    console.error("MongoDB Connection Closed");
});

mongoose.connection.on("error", (error) => {
    console.error("MongoDB Connection ERROR: " + error);
});

export async function connectMongoDatabase(){
    await connectMongoose();
};