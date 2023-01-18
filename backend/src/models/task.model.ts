import mongoose from "mongoose";
// import uniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const taskSchema = new Schema({
   title: { type: String, required: true },
});

export default mongoose.model("Task", taskSchema);