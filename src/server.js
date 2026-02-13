import { config } from "dotenv";
import { connect } from "mongoose";

config();

export default connect(process.env.CONNECTION_STRING, {
  dbName: process.env.DB,
  maxPoolSize: 10,
});
