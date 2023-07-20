const { Profesional, Client } = require('../../db');
const { sequelize } = require('../../db')

const getAllContacts = async () => {

  const clients = await Client.findAll({
    include: {
      model: Profesional,
      attributes: ["id", "name", "email", "image","genre","rating","years_exp"],
      include: [
        { 
          model: Category, 
          attributes: ["id","name"], 
          through: { attributes: [] } 
        },
        { 
          model: Ocupation, 
          attributes: ["id","name"], 
          through: { attributes: [] } 
        },
        { 
          model: Country, 
          attributes: ["id","name"],
          through: { attributes: [] } 
        },
        { 
          model: Location, 
          attributes: ["id","name"],
          through: { attributes: [] } 
        }
      ],
      through: { attributes: [] }
    },
    where: sequelize.where(
      sequelize.col('Profesionals.id'),
      'IS NOT', // Puedes cambiar 'IS NOT' a 'IS' si deseas obtener solo los que tienen asociaciones vacías (sin profesionales).
      null
    )
  });

  // if(clients.length === 0) throw Error(`No hay clientes con profesionales relacionados`)

  return clients;
};

module.exports = getAllContacts;