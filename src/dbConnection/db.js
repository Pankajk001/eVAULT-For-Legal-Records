import mongoose from "mongoose";
export const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL ,{
            dbName: "Evault",
        });
        console.log("Connected to DataBase !")
    } catch(error){
        console.log(`Some error occured while connecting to DataBase !, ${error}`);
    }
}




