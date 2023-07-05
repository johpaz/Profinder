const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
<<<<<<< HEAD
 const Profesional= sequelize.define('Profesional', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null,
    },
    years_exp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    pro: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    softDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue:null,
    }

  }, {
=======
  sequelize.define("Profesional",
  {
   id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
   },
   name:{
    type: DataTypes.STRING(25),
    allowNull: false,
    unique: false,
   },
   email:{
    type: DataTypes.STRING,
    unique: true,
    allowNull: false, //Agregar phone
   },
   image:{
    type: DataTypes.STRING, //Podría ser un BLOB
    allowNull: false,
   },
   genre:{
    type: DataTypes.STRING(25),
    allowNull: false,
   },
   rating:{
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: null,
   },
   years_exp: {
    type: DataTypes.STRING, // Podría ser INTEGER pero string en caso que no tenga experiencia?
    allowNull: false,
   },
   description: {
    type: DataTypes.TEXT,
    allowNull: false,
   },
   active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
   },
   pro:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
   },
  },{
>>>>>>> develop
    timestamps: false,
  });
};
