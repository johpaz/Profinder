const { Sequelize } = require('sequelize');

// Importamos los modelos

const ProfesionalModel = require('./models/Profesional');
const OcupationModel = require('./models/Ocupation');
const ClientModel = require('./models/Client');
const ReviewModel = require('./models/Review');
const CategoryModel = require('./models/Category');
const PostProfesionalModel = require('./models/PostProfesional');
const UserModel = require('./models/User')
const ProfesionalImagesPostModel = require('./models/ProfesionalImagesPost');
const CountryModel = require('./models/Country');
const LocationModel = require('./models/Location');
const PremiumModel = require('./models/Premium');
// Credenciales

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

// Instanciamos sequelize

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, { logging: false });

// Definimos los modelos -> usando una función que recibe una instancia de sequelize

ProfesionalModel(sequelize);
OcupationModel(sequelize);
ClientModel(sequelize);
ReviewModel(sequelize);
CategoryModel(sequelize);
PostProfesionalModel(sequelize);
ProfesionalImagesPostModel(sequelize);
UserModel(sequelize);
CountryModel(sequelize);
LocationModel(sequelize);
PremiumModel(sequelize);

// Destructuring de los modelos para vincularlos -> sequelize.models

const { Profesional, Category, Ocupation, Client, Review, PostProfesional, User, ProfesionalImagesPost, Country, Location, Premium } = sequelize.models;

// Relacionar los modelos n:n

Profesional.belongsToMany(Category, { through: "ProfesionalCategory" });
Category.belongsToMany(Profesional, { through: "ProfesionalCategory" });

Profesional.belongsToMany(Ocupation, { through: "ProfesionalOcupations" });
Ocupation.belongsToMany(Profesional, { through: "ProfesionalOcupations" });

// Relacionar los modelos 1:n

Client.hasMany(Review);

Review.belongsTo(Client);

Profesional.hasMany(Review);

// PostProfesional.hasMany(Category)
// Category.belongsTo(PostProfesional)

// PostProfesional.hasMany(Ocupation)
// Ocupation.belongsTo(PostProfesional)

Review.belongsTo(Profesional);

Profesional.hasMany(PostProfesional);

PostProfesional.belongsTo(Profesional);

//? Esto es para el detalle del profesional (Front)
Profesional.hasMany(ProfesionalImagesPost);

ProfesionalImagesPost.belongsTo(Profesional);

//?
Category.hasMany(Ocupation);

Ocupation.belongsTo(Category);

Country.hasMany(Location);
Location.belongsTo(Country);

Country.hasMany(Profesional);
Profesional.belongsTo(Country);

Location.hasMany(Profesional);
Profesional.belongsTo(Location);

Country.hasMany(Client);
Client.belongsTo(Country);

Location.hasMany(Client);
Client.belongsTo(Location);

// Relacionar ambos modelos:

Profesional.belongsToMany(Client, { through: "ProfesionalClientRelation" });
Client.belongsToMany(Profesional, { through: "ProfesionalClientRelation" });


  // Asociación Profesional con Premium
  Profesional.hasOne(Premium); // Un profesional tiene una suscripción Premium
  Premium.belongsTo(Profesional); // Una suscripción Premium pertenece a un profesional


// Relacionar 1:1:
User.hasOne(Profesional)

module.exports = {
  sequelize,
  ...sequelize.models
}