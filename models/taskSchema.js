const { Schema, model } = require("mongoose");
const Joi = require("joi");

const taskSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    dateOrder: {
      type: String,
      required: true,
    },
    supplier: {
      type: String,
      required: false,
    },
    dateInvoice: {
      type: String,
      default: "",
    },
    datePayment: {
      type: String,
      default: "",
    },
    freight: {
      type: String,
      required: true,
    },
    dateETD: {
      type: String,
      default: "",
    },
    dateETA: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    comments: {
      type: String,
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiTaskSchema = Joi.object({
  name: Joi.string().required(),
  qty: Joi.number().required(),
  unit: Joi.string().required(),
  dateOrder: Joi.string().required(),
  supplier: Joi.string(),
  dateInvoice: Joi.string(),
  datePayment: Joi.string(),
  freight: Joi.string(),
  dateETA: Joi.string(),
  dateETD: Joi.string().required(),
  comments: Joi.string(),
});

const joiTaskStatusSchema = Joi.object({
  completed: Joi.boolean().required(),
});

const Task = model("task", taskSchema);

module.exports = {
  Task,
  joiTaskSchema,
  joiTaskStatusSchema,
};
