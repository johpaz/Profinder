const { Profesional } = require('../../db');
const { Category } = require('../../db');
const { Ocupation } = require('../../db');
const { Op } = require('sequelize');

const updateProfesional = async (id, name, email, image, genre, years_exp, description, categories, ocupations, phone, ubication) => {

  const profesionalInBDD = await Profesional.findByPk(id, {
    include: [
      {
        model: Category,
        attributes: ["id", "name"],
        through: { attributes: [] }
      },
      {
        model: Ocupation,
        attributes: ["id", "name", "CategoryId"],
        through: { attributes: [] }
      }
    ]
  });

  if (!profesionalInBDD) throw Error(`No existe el profesional de id: ${id}`);

  // Match ocupations

  const ocupationsFormat = ocupations.map(async (ocupationName) => {
    const ocupationsInBDD = await Ocupation.findOne({ where: { name: ocupationName } });
    if (!ocupationsInBDD) throw Error(`No existe la ocupación llamada: ${ocupationName} en la base de datos`);
    return {
      id: ocupationsInBDD.id,
      name: ocupationsInBDD.name,
      categoryId: ocupationsInBDD.CategoryId,
    };
  });

  const resolvedOcupations = await Promise.all(ocupationsFormat);

  // Match categories

  const categoriesFormat = categories.map(async (categoryName) => {
    const categoriesInBDD = await Category.findOne({ where: { name: categoryName } });
    if (!categoriesInBDD) throw Error(`Las categorías ${categoryName} no existen en la base de datos`);

    const categoryOcupations = resolvedOcupations.filter((ocupation) => ocupation.categoryId === categoriesInBDD.id);

    return {
      id: categoriesInBDD.id,
      name: categoriesInBDD.name,
      ocupations: categoryOcupations.map((ocupation) => ({ id: ocupation.id, name: ocupation.name }))
    };
  });

  const resolvedCategories = await Promise.all(categoriesFormat);

  // Update profesional

  profesionalInBDD.name = name || profesionalInBDD.name;
  profesionalInBDD.email = email || profesionalInBDD.email;
  profesionalInBDD.image = image || profesionalInBDD.image;
  profesionalInBDD.genre = genre || profesionalInBDD.genre;
  profesionalInBDD.years_exp = years_exp || profesionalInBDD.years_exp;
  profesionalInBDD.description = description || profesionalInBDD.description;
  profesionalInBDD.phone = phone || profesionalInBDD.phone; 
  profesionalInBDD.ubication = ubication || profesionalInBDD.ubication;
  await profesionalInBDD.save();

  // Set associations

  const categoriesBDD = await Category.findAll({
    where: {
      name: {
        [Op.in]: resolvedCategories.map((category) => category.name)
      }
    }
  });

  const ocupationsBDD = await Ocupation.findAll({
    where: {
      name: {
        [Op.in]: resolvedOcupations.map((ocupation) => ocupation.name)
      }
    }
  });

  await profesionalInBDD.setCategories(categoriesBDD);
  await profesionalInBDD.setOcupations(ocupationsBDD);

  // Return updated professional

  return {
    id: profesionalInBDD.id,
    name: profesionalInBDD.name,
    email: profesionalInBDD.email,
    genre: profesionalInBDD.genre,
    years_exp: profesionalInBDD.years_exp,
    description: profesionalInBDD.description,
    phone:profesionalInBDD.phone,
    ubication: profesionalInBDD.ubication,
    categories: resolvedCategories
  };
};

module.exports = updateProfesional;