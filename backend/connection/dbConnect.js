const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected");
    }
    catch(err) {
        console.log("Err", err);
    }
}
module.exports = connectDb;