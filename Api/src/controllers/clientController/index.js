const {getClients,getAllClientsApi} = require("./01 - getClients.js");
const createClient = require("./02 - createClient.js");
const updateClient = require("./03 - updateClient.js");
const getClientById = require("./04 - getClientById.js")
const logicDeleteClient = require("./05 - logicDeleteClient.js")

module.exports = { getClients,getAllClientsApi, createClient, updateClient, getClientById, logicDeleteClient }// 4ef29225941cb9bb0ea93f9cae9b3bcb614f46f8