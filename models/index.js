import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = {
  name: {
    type: String,
    require: true,
    validate(name) {
      if (name === "") throw new Error("Nome não inserido");
    },
  },
  subject: {
    type: String,
    validate(subject) {
      if (subject === "") throw new Error("Assunto não inserido");
    },
  },
  type: {
    type: String,
    require: true,
    validate(type) {
      if (type === "") throw new Error("Tipo não inserido");
    },
  },
  value: {
    type: Number,
    require: true,
    validate(value) {
      if (value < 0) throw new Error("Não aceita valores negativos");
    },
  },
  lastModified: { type: Date, default: Date.now },
};

const studentSchema = mongoose.Schema(db);
mongoose.model("student", studentSchema, "student");
mongoose.set("useFindAndModify", false);
const studentModel = mongoose.model("student", studentSchema, "student");

db.mongoose = mongoose;
db.url = process.env.MONGODB;

export { db, studentModel };
