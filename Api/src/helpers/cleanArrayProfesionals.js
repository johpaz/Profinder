const cleanArray = (profesionals) => {
  return profesionals.map((profesional) => {
    const professions = profesional.Categories.map((category) => {
      const ocupations = profesional.Ocupations.filter((ocupation) => ocupation.CategoryId === category.id);
      return {
        id: category.id,
        category: category.name,
        ocupations: ocupations.map((ocupation) => ({ 
          id: ocupation.id,
          name: ocupation.name 
        }))
      };
    });

    return {
      id: profesional.id,
      name: profesional.name,
      email: profesional.email,
      genre: profesional.genre,
      years_exp: profesional.years_exp,
      description: profesional.description,
      professions: professions
    };
  });
};

module.exports = cleanArray;