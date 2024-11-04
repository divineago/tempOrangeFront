import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Modal,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { fetchDataFromAPI } from "../../api";
import * as XLSX from "xlsx";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TurnoverChart from "./components/TurnoverFilter";

const EffectifDashboard = () => {
  const [employeurs, setEmployeurs] = useState({});
  const [statutsContrat, setStatutsContrat] = useState({});
  const [typesContrat, setTypesContrat] = useState({});
  const [agents, setAgents] = useState([]);
  const [grades, setGrades] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployeur, setSelectedEmployeur] = useState(null);
  const [turnoverData, setTurnoverData] = useState([]);
  const turnoverDataT = [
    { month: "April", total_employees: 100, departures: 100, turnover: 20.0 },
    { month: "October", total_employees: 200, departures: 80, turnover: 30.0 },
    { month: "September", total_employees: 120, departures: 40, turnover: 40.0 },
    { month: "February", total_employees: 150, departures: 50, turnover: 50.0 },
    { month: "November", total_employees: 180, departures: 20, turnover: 30.0 },
    { month: "December", total_employees: 100, departures: 10, turnover: 60.0 },
    { month: "August", total_employees: 140, departures: 70, turnover: 60.0 },
  ];

  useEffect(() => {
    fetchEffectifData();
    fetchStatutContratData();
    fetchGradesData();
    fetchTypesContratData();
    fetchTurnoverData();
  }, []);

  const fetchEffectifData = async () => {
    try {
      const response = await fetchDataFromAPI(
        "/effectif/agent/count_by_genre/"
      );
      setEmployeurs(response.data);
    } catch (error) {
      console.error("Error fetching employeurs data:", error);
    }
  };
  // Fonction pour récupérer les données des grades
  const fetchGradesData = async () => {
    try {
      const response = await fetchDataFromAPI(
        "/effectif/agent/count_by_grade/"
      );
      setGrades(response.data);
    } catch (error) {
      console.error("Error fetching grades data:", error);
    }
  };
  const fetchStatutContratData = async () => {
    try {
      const response = await fetchDataFromAPI(
        "/effectif/agent/count_by_statut_contrat/"
      );
      setStatutsContrat(response.data);
    } catch (error) {
      console.error("Error fetching statut contrat data:", error);
    }
  };

  // Fonction pour récupérer les agents d'un employeur spécifique
  const fetchAgentsByEmployeur = async (employeur) => {
    try {
      const response = await fetchDataFromAPI(
        `/effectif/agent?employeur=${employeur}`
      );
      // Filtrer les agents pour l'employeur sélectionné
      const filteredAgents = response.data.results.filter(
        (agent) => agent.employeur.type_employeur === employeur
      );
      setAgents(filteredAgents);
    } catch (error) {
      console.error("Error fetching agents:", error);
      setAgents([]); // Assurez-vous que `agents` est un tableau vide en cas d'erreur
    }
  };
  const fetchTypesContratData = async () => {
    try {
      const response = await fetchDataFromAPI(
        "/effectif/agent/count_by_contrat/"
      );
      console.log("Response data:", response.data);
      setTypesContrat(response.data);
    } catch (error) {
      console.error("Error fetching types contrat data:", error);
      setTypesContrat({});
    }
  };

  const fetchTurnoverData = async () => {
    try {
      const response = await fetchDataFromAPI(
        "/effectif/agent/turnover_mensuel/"
      ); // Mettre à jour l'URL si nécessaire
      setTurnoverData(response.data);
    } catch (error) {
      console.error("Error fetching turnover data:", error);
    }
  };

  const handleOpenModal = (employeur) => {
    setSelectedEmployeur(employeur);
    fetchAgentsByEmployeur(employeur);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEmployeur(null);
    setAgents([]);
  };
  const handleExportExcel = () => {
    const dataToExport = agents.map((agent) => ({
      Nom: agent.name || "",
      Prénom: agent.prenom,
      Email: agent.user ? agent.user.email : "",
      Fonction: agent.fonction,
      Direction: agent.direction ? agent.direction.name : "",
      "Numéro matricule": agent.num_mat || "",
      "Lieu d'embauche": agent.lieu_embauche || "",
      Contrat: agent.contrat ? agent.contrat.type_contrat : "",
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Agents");
    XLSX.writeFile(wb, "Agents_Export.xlsx");
  };
  const renderEmployeurCard = (employeur) => {
    // Calculer le total des agents (hommes + femmes)
    const hommes = employeurs[employeur]?.homme || 0;
    const femmes = employeurs[employeur]?.femme || 0;
    const total = hommes + femmes;

    return (
      <Grid item xs={12} sm={3} md={4} key={employeur}>
        <Card
          sx={{
            minWidth: 275,
            mb: 2,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#FFFFFF",
            borderLeft: "5px solid #1976D2",
            position: "relative", // Positionnement relatif pour les éléments absolus internes
          }}>
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", color: "#1976D2" }}>
              {employeur}
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="h5" color="textSecondary">
                Hommes: {hommes}
              </Typography>
              <Typography variant="h5" color="textSecondary">
                Femmes: {femmes}
              </Typography>
            </Box>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold" }}>
              Total: {total}
            </Typography>
            <Box
              sx={{
                position: "absolute",
                bottom: 10,
                right: 10,
              }}>
              <IconButton onClick={() => handleOpenModal(employeur)}>
                <VisibilityIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  const renderStatutCard = (statut) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={statut}>
      <Card
        sx={{
          maxWidth: 750, // Largeur maximale des cartes pour une meilleure dimension
          height: "100%", // Assure une bonne hauteur
          mb: 2,
          p: 2, // Padding interne pour aérer le contenu
          borderRadius: 4, // Coins arrondis pour un look moderne
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Ombre douce pour l'effet visuel
          backgroundColor: statut === "expat" ? "#E3F2FD" : "#C8E6C9", // Couleur spécifique en fonction du statut
         
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: "#388E3C" }} // Texte en gras et en vert
          >
            {statut === "expat" ? "Expats" : "Locaux"}
          </Typography>
          <Typography variant="h5" color="textSecondary">
            Nombre: {statutsContrat[statut] || 0}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
  
  // Fonction pour afficher la carte des grades
  const renderGradeCard = (grade) => {
    let color;
    switch (grade) {
      case "CADRE_DE_COLLABORATION":
        color = "#FFEB3B"; // Jaune
        break;
      case "MAITRISE":
        color = "#8BC34A"; // Vert clair
        break;
      case "CLASSIFIE":
        color = "#FF5722"; // Orange
        break;
      case "CADRE_DE_DIRECTION":
        color = "#2196F3"; // Bleu
        break;
      default:
        color = "#F5F5F5"; // Couleur par défaut
    }
  
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={grade}>
        <Card
          sx={{
            maxWidth: 750, // Largeur maximale des cartes pour une meilleure dimension
            height: "100%", // Assure une bonne hauteur
            mt: 3, // Ajoute un margin-top pour l'espace en haut
            mb: 2, // Ajoute un margin-bottom pour l'espace en bas
            p: 2, // Padding interne pour aérer le contenu
            borderRadius: 2, // Coins arrondis pour un look moderne
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Ombre douce pour l'effet visuel
            backgroundColor: color, // Couleur spécifique en fonction du grade
            
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", color: "#000" }} // Texte en gras avec couleur noire
            >
              {grade}
            </Typography>
            <Typography variant="h5" color="textSecondary">
              Nombre: {grades[grade] || 0}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };
  



  const renderAgentTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Prénom</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Fonction</TableCell>
            <TableCell>Direction</TableCell>
            <TableCell>Numéro matricule</TableCell>
            <TableCell>lieu d'embauche</TableCell>
            <TableCell>contrat</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {agents.length > 0 ? (
            agents.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell>{agent.name || ""}</TableCell>
                <TableCell>{agent.prenom}</TableCell>
                <TableCell>{agent.user ? agent.user.email : ""}</TableCell>
                <TableCell>{agent.fonction}</TableCell>
                <TableCell>
                  {agent.direction ? agent.direction.name : ""}
                </TableCell>
                <TableCell>{agent.num_mat || ""}</TableCell>
                <TableCell>{agent.lieu_embauche || ""}</TableCell>
                <TableCell>
                  {agent.contrat ? agent.contrat.type_contrat : ""}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>Aucun agent trouvé</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderTypeContratCard = (contrat) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={contrat}>
      <Card
        sx={{
          maxWidth: 750, // Largeur maximale pour une meilleure dimension
          height: "100%", // Assure une bonne hauteur
          mt: 4, // Espacement supérieur
          mb: 2, // Espacement inférieur
          borderRadius: 2, // Coins arrondis pour un look moderne
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Ombre douce pour l'effet visuel
          backgroundColor: "#FFEBEE", // Couleur de fond spécifique pour type de contrat

        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: "#D32F2F" }} // Texte en gras et rouge
          >
            {contrat}
          </Typography>
          <Typography variant="h5" color="textSecondary">
            Nombre: {typesContrat[contrat] || 0}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
  

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Effectif par Employeur
      </Typography>

      <Grid container spacing={2}>
        {/* Cartes pour les employeurs */}
        {Object.keys(employeurs).map((employeur) =>
          renderEmployeurCard(employeur)
        )}
      </Grid>
      
      <Grid container spacing={2}>  
           {["expat", "local"].map(renderStatutCard)}
      </Grid>
      <Grid container spacing={2}>  
      {Object.keys(grades).map(renderGradeCard)}
      </Grid>  
      <Grid container spacing={2}>
        {Object.keys(typesContrat).map(renderTypeContratCard)}
      </Grid>

      {/* Section pour le graphique de turnover */}
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          Taux de Rotation Mensuel
        </Typography>
        <TurnoverChart data={turnoverData} />
      </Box>
      {openModal && (
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "95%",
              maxWidth: 1000, //  la largeur maximale pour une meilleure visualisation
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}>
            <Typography variant="h6" component="h2" gutterBottom>
              {`Détails de la liste des agents pour ${selectedEmployeur}`}
            </Typography>
            {renderAgentTable()}
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button
                onClick={handleExportExcel}
                variant="contained"
                color="primary">
                Exporter
              </Button>
              <Button
                onClick={handleCloseModal}
                variant="contained"
                color="primary"
                sx={{ ml: 2 }}>
                Fermer
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </Box>
  );
  
};

export default EffectifDashboard;
