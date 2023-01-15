const { Schema, model } = require("mongoose");

const CulturalAgent = new Schema(
  {
    nombre_completo: {
      type: "string",
      default: "",
      trim: true, //Cuts blank spaces
    },
    dui: {
      type: "string",
      default: "",
      trim: true,
      unique: true,
    },
    fecha_nacimiento: {
      type: "string",
      default: "",
    },
    sexo: {
      type: "string",
      default: "",
      trim: true,
    },
    especialidad_artistica: {
      type: "string",
      default: "",
      trim: true,
    },
    es_representante: {
      type: "string",
      default: "",
      trim: true,
    },
    nombre_grupo: {
      type: "string",
      default: "",
      trim: true,
    },
    nombre_artistico: {
      type: "string",
      default: "",
      trim: true,
    },
    departamento_residencia: {
      type: "string",
      default: "",
      trim: true,
    },
    municipio_residencia: {
      type: "string",
      default: "",
      trim: true,
    },
    ben_domicilio: {
      type: "string",
      default: "",
      trim: true,
    },
    telefono: {
      type: "string",
      default: "",
      trim: true,
    },
    telefono_2: {
      type: "string",
      default: "",
      trim: true,
    },
    trayectoria: {
      type: "string",
      default: "",
      trim: true,
    },
    tiempo_trayectoria: {
      type: "string",
      default: "",
    },
    facebook: {
      type: "string",
      default: "",
    },
    tiktok: {
      type: "string",
      default: "",
    },
    twitter: {
      type: "string",
      default: "",
    },
    youtube: {
      type: "string",
      default: "",
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

module.exports = model("CulturalAgent", CulturalAgent);
