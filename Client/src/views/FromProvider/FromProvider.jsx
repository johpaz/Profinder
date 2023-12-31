/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  getAllCategories,
  postProveedor,
} from "../../services/redux/actions/actions";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Button,
  useColorModeValue,
  Radio,
  RadioGroup,
  Select,
  CircularProgress,
  Heading,
  ButtonGroup,
} from "@chakra-ui/react";
import GoogleAuthButton from "../../singleComponents/GooglAuthButton";

import SelectCategories from "../../singleComponents/SelectCategories";
import { uploadFile } from "../../utils/Firebase/config";
import { postSessionUser } from "../../services/redux/actions/actions";
import { useCredentials } from "../../utils/customHooks/useCredentials";
import PrivacyNotice from "../../components/PrivacyNotice/PrivacyNotice";

function FormProvider() {
  const { handleUserSession } = useCredentials();
  const [genre, setGenre] = useState("female");

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      image: [],
      genre: "",
      years_exp: "",
      password: "",
      country: "",
      location: "",
      phone: "",
      ocupations: [],
      categories: [],
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedOccupations, setSelectedOccupations] = useState([]);
  const [countries, setCountries] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://backprofinder-production.up.railway.app/country")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleCountryChange = (countryId) => {
    setSelectedCountry(countryId);

    if (countryId) {
      fetch(
        `https://backprofinder-production.up.railway.app/country/${countryId}`
      )
        .then((response) => response.json())
        .then((data) => {
          const selectedCountry = data;
          if (selectedCountry) {
            fetch("https://backprofinder-production.up.railway.app/location")
              .then((response) => response.json())
              .then((locationsData) => {
                const filteredLocations = locationsData.filter(
                  (location) => location.CountryId === selectedCountry.id
                );
                setLocations(filteredLocations);
              })
              .catch((error) => console.log(error));
          } else {
            setLocations([]);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setLocations([]);
    }
  };

  const envioCategoria = (value) => {
    setSelectedCategory([value]);
  };

  const envioOcupaciones = (value) => {
    setSelectedOccupations(value);
  };

  const onSubmit = async (data) => {
    const imageData = await uploadFile(data.image);

    const selectedCountryObj = countries.find(
      (country) => country.id === parseInt(data.country)
    );
    const selectedLocationObj = locations.find(
      (location) => location.id === parseInt(data.location)
    );

    const newData = {
      name: data.name,
      email: data.email,
      image: imageData,
      genre: genre,
      years_exp: data.years_exp,
      password: data.password,
      CountryId: selectedCountryObj?.id,
      LocationId: selectedLocationObj?.id,
      phone: data.phone,
      ocupations: [selectedOccupations],
      categories: selectedCategory,
    };
    console.log(newData);
    const sessionData = {
      name: data.name,
      email: data.email,
      password: data.password,
      usuario: "p",
    };

    console.log(newData);

    await dispatch(postSessionUser(sessionData));
    dispatch(postProveedor(newData));
    handleUserSession("Cuenta creada", "Algo salió mal");
  };

  return (
    <Flex
    minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.800", "gray.800")}
      // width={{ base: "90%", sm: "80%", md: "60%", lg: "500px" }}
    >
      <Box      rounded="lg"
        bg={useColorModeValue("blackAlpha.800", "gray800")}
        boxShadow="lg"
        p={8}
        color="gray.300"
      
        width={{ base: "90%", sm: "80%", md: "60%", lg: "500px" }}>
          
        <Stack spacing={4} >
          <form onSubmit={handleSubmit(onSubmit)}>
            
          <Heading
            fontSize='4xl'
            bgGradient='linear(to-l, teal.300, green.400)'
            bgClip='text'
            align='center'

          >
            REGISTRATE
          </Heading>
            <FormControl marginTop="5">
              <FormLabel>Nombre y apellido</FormLabel>
              <Input
                type="text"
                {...register("name", {
                  required: "El campo nombre y apellido es requerido",
                  pattern: {
                    value: /^[a-zA-ZñÑ\s]+$/,
                    message: "El nombre y apellido no puede contener expresiones especiales o símbolos",
                  },
                  minLength: {
                    value: 2,
                    message: "El nombre y apellido deben tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "El nombre y apellido no puede tener más de 100 caracteres",
                  },
                })}
              />
              {errors.name && (
                <span style={{ color: "red" }}>{errors.name.message}</span>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                {...register("email", {
                  required: "El campo email es requerido",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                    message: "El formato del email es incorrecto",
                  },
                })}
              />
              {errors.email && (
                <span style={{ color: "red" }}>{errors.email.message}</span>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Telefono</FormLabel>
              <Input
                type="number"
                {...register("phone", {
                  required: "El campo teléfono es requerido",
                  pattern: {
                    value: /^\d+$/,
                    message: "El teléfono solo debe contener números",
                  },
                  minLength: {
                    value: 10,
                    message: "El teléfono debe tener al menos 10 dígitos",
                  },
                  maxLength: {
                    value: 10,
                    message: "El teléfono no puede tener más de 10 dígitos",
                  },
                })}
              />
              {errors.phone && (
                <span style={{ color: "red" }}>{errors.phone.message}</span>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>País</FormLabel>
              <Select
                {...register("country")}
                borderWidth="1px"
                color={useColorModeValue("gray.800", "gray.100")}
                bg={useColorModeValue("white", "gray.600")}
                borderColor={useColorModeValue("gray.200", "gray.600")}
                onChange={(e) => handleCountryChange(parseInt(e.target.value))}
              >
                <option value="">Seleccionar país</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </Select>
              {errors.country && (
                <span style={{ color: "red" }}>{errors.country.message}</span>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Provincia/Estado</FormLabel>
              <Select
                {...register("location", {
                  required: "El campo provincia/estado es requerido",
                })}
                color={useColorModeValue("gray.800", "gray.100")}
                bg={useColorModeValue("white", "gray.600")}
                borderColor={useColorModeValue("gray.200", "gray.600")}
                borderWidth="1px"
                // color="gray.800"
              >
                <option value="">Seleccionar provincia/estado</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </Select>
              {errors.location && (
                <span style={{ color: "red" }}>{errors.location.message}</span>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Foto de perfil</FormLabel>
              <Input
                type="file"
                accept="image/jpeg, image/png"
                {...register("image", {
                  required: "Solo se permiten archivos de imagen JPEG o PNG",
                  validate: {
                    isImage: (value) =>
                      ["image/jpeg", "image/png"].includes(value[0]?.type) ||
                      "Solo se permiten archivos de imagen JPEG o PNG",
                  },
                })}
              />
              
              {errors.image && (
                <span style={{ color: "red" }}>{errors.image.message}</span>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Género</FormLabel>
              <RadioGroup onChange={setGenre} value={genre}>
                <Stack direction="row">
                  <Radio value="female">Femenino</Radio>
                  <Radio value="male">Masculino</Radio>
                  <Radio value="otro">Otro</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Años de experiencia</FormLabel>
              <NumberInput defaultValue={0} min={0} max={100}>
                <NumberInputField
                  {...register("years_exp", { required: true })}
                />
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>Categorías</FormLabel>
              <SelectCategories
              
                fnSelectCategory={envioCategoria}
                fnSelectOcupation={envioOcupaciones}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                {...register("password", {
                  required: "El campo contraseña es requerido",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                    message:
                      "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número",
                  },
                })}
              />
              {errors.password && (
                <span style={{ color: "red" }}>{errors.password.message}</span>
              )}
            </FormControl>

            <FormControl>
              <FormLabel />
              {isLoading ? (
                <CircularProgress
                  isIndeterminate
                  size="24px"
                  color="blue.500"
                />
              ) : (
                <ButtonGroup
                  flexWrap='wrap-reverse'
                  justifyContent='center'
                  spacing={5}
                  mt={3}
                >
                  <Button
                    bg='teal.400'
                    color='white'
                    mt={5}
                    _hover={{ bg: 'teal.500' }}
                    loadingText='Ingresando'
                    type='submit'
                    size='lg'
                  >
                    Registrarme
                  </Button>
                  <GoogleAuthButton
                    setValue={setValue}
                  />
                  <PrivacyNotice />
                </ButtonGroup>
              )}
            </FormControl>
          </form>
        </Stack>
      </Box>
    </Flex>
  );
}

export default FormProvider;
