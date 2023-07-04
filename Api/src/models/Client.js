const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Client",{
    id:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    genre:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating:{
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: null,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: true,
    },
    active:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    pro:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },{
    timestamps: false,
  })
};