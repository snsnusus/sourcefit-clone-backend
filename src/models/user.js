import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String },
});

export default model("User", userSchema);
