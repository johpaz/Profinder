const { Profesional, Client } = require('../../db');

const createContact = async  (id,profesionalIds) => {
  const client = await Client.findByPk(id);
  if(!client) throw Error(`No existe el cliente de id ${id}`);

  const profesionals = await Promise.all(
    profesionalIds.map(async (profesionalId) => {
      const profesional = await Profesional.findByPk(profesionalId);
      if (!profesional) throw Error(`No existe el profesional de id ${profesionalId}`);
      return profesional;
    })
  );

  await client.addProfesionals(profesionals);

  const clientWithProfesionals = await Client.findByPk(id,{
    include:{
      model:Profesional,
      attributes: ["id","name","email"],
      through: { attributes: []} 
    }
  });
  return clientWithProfesionals;
};

module.exports = createContact;