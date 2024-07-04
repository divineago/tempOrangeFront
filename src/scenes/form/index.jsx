import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

/* la liste des directions */
const directions = [
  { value: "DG", label: "Direction Générale" },
  { value: "DAF", label: "Direction Financière" },
  { value: "DST", label: "Direction Stratégie et transformation" },
  { value: "DRH", label: "Direction des Ressources Humaines" },
  { value: "DEC", label: "Direction Expérience Client" },
  { value: "DAL", label: "Direction Achats et Logistique" },
  { value: "DJAR", label: "Direction Juridique & Affaires Réglementaire" },
  { value: "B2C", label: "Direction Marketing & Communication B2C" },
  { value: "DVD", label: "Direction de Ventes & Distribution" },
  { value: "B2B", label: "Direction Commercial et Marketing B2B" },
  { value: "OM", label: "Orange Money" },
  { value: "DRSI", label: "DRSI" },
  { value: "GKAT", label: "GRAND KATANGA" },
  { value: "GKAS", label: "GRAND KASAI" },
  { value: "GKIVU", label: "GRAND KIVU" },
  { value: "GNORD", label: "GRAND NORD" },
  { value: "KC", label: "KONGO CENTRAL" },
  { value: "KIN", label: "KINSHASA" },
];

/* liste des employeurs */
const employeurs = [
  { value: "Orange", label: "ORANGE" },
  { value: "Itm", label: "ITM" },
  { value: "Bnw", label: "BENSIZWE" },
];

/* liste des classifications */
const cls = [
  { value: "C", label: "CLASSIFIE" },
  { value: "M", label: "MAITRISE" },
  { value: "CC", label: "CADRE DE COLLABORATION" },
  { value: "CD", label: "CADRE DE DIRECTION" },
];

const Form = ({ addEmployee }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values, { resetForm }) => {
    addEmployee(values);
    resetForm();
  };

  return (
    <Box m="20px">
      <Header title="CRÉER UN AGENT" subtitle="Créer un nouvel agent" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Fullname"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullname}
                name="fullname"
                error={!!touched.fullname && !!errors.fullname}
                helperText={touched.fullname && errors.fullname}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                select
                label="Employeur"
                name="employeur"
                value={values.employeur}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.employeur && Boolean(errors.employeur)}
                helperText={touched.employeur && errors.employeur}
                sx={{ gridColumn: "span 2" }}
              >
                {employeurs.map((employeur) => (
                  <MenuItem key={employeur.value} value={employeur.value}>
                    {employeur.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Numéro Matricule"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.numeroMatricule}
                name="numeroMatricule"
                error={!!touched.numeroMatricule && !!errors.numeroMatricule}
                helperText={touched.numeroMatricule && errors.numeroMatricule}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                select
                label="Classification"
                name="classification"
                value={values.classification}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.classification && Boolean(errors.classification)}
                helperText={touched.classification && errors.classification}
                sx={{ gridColumn: "span 4" }}
              >
                {cls.map((classification) => (
                  <MenuItem key={classification.value} value={classification.value}>
                    {classification.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Fonction"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fonction}
                name="fonction"
                error={!!touched.fonction && !!errors.fonction}
                helperText={touched.fonction && errors.fonction}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                select
                label="Direction"
                name="direction"
                value={values.direction}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.direction && Boolean(errors.direction)}
                helperText={touched.direction && errors.direction}
                sx={{ gridColumn: "span 4" }}
              >
                {directions.map((direction) => (
                  <MenuItem key={direction.value} value={direction.value}>
                    {direction.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" sx={{ fontSize: 15, mr: 3, color: "orange" }}>
                Créer un nouvel agent
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  fullname: yup.string().required("Nom requis"),
  employeur: yup.string().required("Employeur requis"),
  email: yup.string().email("Email invalide").required("Email requis"),
  classification: yup.string().required("Classification requise"),
  fonction: yup.string().required("Fonction requise"),
  direction: yup.string().required("Direction requise"),
  numeroMatricule: yup
    .string()
    .matches(/^[A-Z0-9]{9}$/, "Numéro matricule invalide, doit être composé de 9 caractères alphanumériques en majuscules")
    .required("Numéro matricule requis"),
});

const initialValues = {
  fullname: "",
  employeur: "",
  email: "",
  classification: "",
  fonction: "",
  direction: "",
  numeroMatricule: "",
};

export default Form;
