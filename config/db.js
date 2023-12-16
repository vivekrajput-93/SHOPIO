import mongoose  from "mongoose";

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Database is connected.${conn.connection.host}`)
    } catch (error) {
        console.log(`There is an error in database connection ${error}`)
    }
}

export default connectDB;