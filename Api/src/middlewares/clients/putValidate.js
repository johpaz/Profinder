const { Client, Profesional} = require('../../db');

const validateId = (id) => {
    if(!id || id === undefined || id === null) throw Error(`El id es obligatorio para editar el cliente`);
    if(!Number(id) || id === undefined) throw Error(`Compruebe los datos para registrarse`);
  };

const validateName = (name) => {
    
    if (typeof name !== "string") {
        throw Error("El nombre debe ser un string")
    }
    let regexSpecialCharacters = /^[a-zA-Z_ ]*$/
    if (!regexSpecialCharacters.test(name)) {
        throw Error("El nombre no puede contener caracteres especiales.")
    };
    if (name.length > 50) {
        throw Error("El nombre contiene muchos caracteres.")
    };
}

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    if(typeof email !== "string") throw Error(`El tipo de dato de email debe ser un string`);
    if(email.trim() === "") throw Error(`El email no puede estar vacío`);
    if(!emailRegex.test(email)) throw Error (`El email debe tener un formato de email - ejemplo: usuario@gmail.com`);
    //if(!emailRegexEnd.test(emailEnd)) throw Error(`El email no puede tener números o símbolos luego del dominio`)
  };

const validatePassword = (password) => {
    // if (!password) {
    //     throw Error("Ingrese una contraseña.")
    // }
}

const validatePhone = (phone) => {
  
    if (typeof phone !== "string") {
        throw Error("El tipo de dato de phone debe ser un string.")
    };
    if (phone.length !== 10) {
        throw Error("El telefono solo debe contar con 10 numeros.")
    }
    const regexPhone = /^[0-9]*$/

    if (!regexPhone.test(phone)) {
        throw Error("El telefono solo puede contener numeros.")
    };
};



const validateGenre = (genre) => {
    if (typeof genre !== "string") {
        throw Error("El tipo de dato de genre debe ser un string")
    };
    const genres = ["male", "female"]
    if (!genres.includes(genre)) {
        throw Error("Eliga un genero correcto.")
    };
};

const validateDescription = (description) => {
    if (typeof description !== "string") {
        throw Error("El tipo de dato de description debe ser un string.")
    }
    if (description.length > 150) {
        throw Error("La descripcion no puede contar con mas de 150 caracteres.")
    };
};

const validateUbication = (ubication) => {
    if (typeof ubication !== "string") {
        throw Error("El tipo de dato de ubication debe ser un string.");
    };
};

const validateImage = (image) => {
    const regexImage = /(https?:\/\/.*\.(?:jpg|jpeg|gif|png|svg))/i
    if (!regexImage.test(image[0])) {
        throw Error("La imagen debe ser una url y debe tener formato jpg|jpeg|gif|png|svg ")
    }

};

module.exports = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, password, phone, image, genre, description, ubication } = req.body;
    try {
        validateId(id);
        validateEmail(email);
        
        const client = await Client.findByPk(id);
        const profesionalEmail = await Profesional.findOne({where:{email: email}});
        const clientEmail = await Client.findOne({where:{email:email}});
        if(email !== client.email){
            if(profesionalEmail || clientEmail) throw Error(`El correo ${email} ya está en uso, pruebe con otro`);
          };
        validateName(name)
        validatePassword(password)
        validatePhone(phone)
        validateImage(image)
        validateGenre(genre)
        validateDescription(description)
        validateUbication(ubication)
    } catch (error) {
        return res.status(401).json(error.message);
    }
    next();
}