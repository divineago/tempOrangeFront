export const periodOptions = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' },
];

export const trainingTypes = [
  { value: 'En ligne', label: 'En ligne' },
  { value: 'En présentiel', label: 'En présentiel' },
 
];
export const employeurs = [
  { value: "Orange", label: "ORANGE" },
  { value: "OM", label: "ORANGE MONEY" },
  { value: "Itm", label: "ITM" },
  { value: "Bnw", label: "BENSIZWE" },
];

export const directions = [
  { value: "DG", label: "Direction Générale" },
  { value: "DAF", label: "Direction Financière" },
  { value: "DST", label: "Direction Stratégie et Transformation" },
  { value: "DRH", label: "Direction des Ressources Humaines" },
  { value: "DEC", label: "Direction Expérience Client" },
  { value: "DAL", label: "Direction Achats et Logistique" },
  { value: "DJAR", label: "Direction Juridique & Affaires Réglementaires" },
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

export const agePyramid = [
  { ageRange: '20-25', male: 40, female: 45 },
  { ageRange: '26-30', male: 60, female: 55 },
  { ageRange: '31-35', male: 70, female: 65 },
  { ageRange: '36-40', male: 50, female: 55 },
  { ageRange: '41-45', male: 30, female: 35 },
  { ageRange: '46-50', male: 20, female: 25 },
  { ageRange: '51-55', male: 10, female: 15 },
  { ageRange: '56-60', male: 5, female: 10 },
];

export const agentsByDirection = [
  { direction: 'Direction Générale', count: 15 },
  { direction: 'Direction Financière', count: 30 },
  { direction: 'Direction Stratégie et Transformation', count: 25 },
  { direction: 'Direction des Ressources Humaines', count: 20 },
  { direction: 'Direction Expérience Client', count: 40 },
  { direction: 'Direction Achats et Logistique', count: 35 },
  { direction: 'Direction Juridique & Affaires Réglementaires', count: 10 },
  { direction: 'Direction Marketing & Communication B2C', count: 50 },
  { direction: 'Direction de Ventes & Distribution', count: 45 },
  { direction: 'Direction Commercial et Marketing B2B', count: 15 },
  { direction: 'Orange Money', count: 5 },
  { direction: 'DRSI', count: 25 },
  { direction: 'GRAND KATANGA', count: 20 },
  { direction: 'GRAND KASAI', count: 30 },
  { direction: 'GRAND KIVU', count: 35 },
  { direction: 'GRAND NORD', count: 10 },
  { direction: 'KONGO CENTRAL', count: 15 },
  { direction: 'KINSHASA', count: 60 },
];

export const trainingData = [
  {
    id: 1,
    title: 'Formation Leadership',
    type: 'En ligne',
    startDate: '2024-07-01',
    endDate: '2024-07-15',
    duration: 15,
    evaluationDate: '2024-07-16',
  },
  {
    id: 2,
    title: 'Gestion de Projet',
    type: 'En présentiel',
    startDate: '2024-08-01',
    endDate: '2024-08-10',
    duration: 10,
    evaluationDate: '2024-08-11',
  },
  {
    id: 3,
    title: 'Développement Web',
    type: 'En ligne',
    startDate: '2024-09-01',
    endDate: '2024-09-20',
    duration: 20,
    evaluationDate: '2024-09-21',
  },
  {
    id: 4,
    title: 'Marketing Digital',
    type: 'En présentiel',
    startDate: '2024-10-01',
    endDate: '2024-10-07',
    duration: 7,
    evaluationDate: '2024-10-08',
  },
];

export const initialTrainingData = [
  {
    id: 1,
    title: 'Formation en Leadership',
    description: 'Développez vos compétences en leadership.',
    startDate: '2023-07-01',
    endDate: '2023-07-05',
    days: 5,
  },
  {
    id: 2,
    title: 'Formation en Communication',
    description: 'Améliorez vos compétences en communication.',
    startDate: '2023-08-10',
    endDate: '2023-08-12',
    days: 3,
  },
  {
    id: 3,
    title: 'Formation en Gestion de Projet',
    description: 'Maîtrisez les bases de la gestion de projet.',
    startDate: '2023-09-15',
    endDate: '2023-09-20',
    days: 6,
  },
  {
    id: 4,
    title: 'Formation en Sécurité Informatique',
    description: 'Apprenez les bonnes pratiques en sécurité informatique.',
    startDate: '2023-10-05',
    endDate: '2023-10-10',
    days: 6,
  },
  // Ajoutez plus de données de formation au besoin
];

export const statusOptions = [
  { value: 'local', label: 'Local' },
  { value: 'expatrie', label: 'Expatrié' },
];

export const classificationOptions = [
  { value: 'classifie', label: 'Classifié' },
  { value: 'maitrise', label: 'Maitrise' },
  { value: 'cadre_collaboration', label: 'Cadre de Collaboration' },
  { value: 'cadre_direction', label: 'Cadre de Direction' },
];

export const effectifList = [
  {
    id: 1,
    nom: 'Doe',
    prenom: 'John',
    directionId: 'DG',
    employeurId: 'Orange',
    gender: 'Masculin',
    dateNaissance: '1990-01-01',
    seniorite: 5,
    contrat: 'CDI',
  },
  {
    id: 2,
    nom: 'Smith',
    prenom: 'Jane',
    directionId: 'DAF',
    employeurId: 'OM',
    gender: 'Feminin',
    dateNaissance: '1995-05-15',
    seniorite: 3,
    contrat: 'CDD',
  },
  {
    id: 3,
    nom: 'Johnson',
    prenom: 'Michael',
    directionId: 'DRH',
    employeurId: 'Itm',
    gender: 'Masculin',
    dateNaissance: '1988-10-10',
    seniorite: 7,
    contrat: 'CDI',
  },
  // Ajoutez plus d'effectifs au besoin
];

export const genderOptions = [
  { value: 'Masculin', label: 'Masculin' },
  { value: 'Feminin', label: 'Féminin' },
];

export const contractOptions = [
  { value: 'CDI', label: 'CDI' },
  { value: 'CDD', label: 'CDD' },
];

export const trainingProgressData = [
  {
    agent: 'John Doe',
    training: 'Formation Leadership',
    progress: 80,
    satisfaction: 4,
  },
  {
    agent: 'Jane Smith',
    training: 'Gestion de Projet',
    progress: 100,
    satisfaction: 5,
  },
  {
    agent: 'Peter Johnson',
    training: 'Développement Web',
    progress: 60,
    satisfaction: 3,
  },
  {
    agent: 'Anna Brown',
    training: 'Marketing Digital',
    progress: 40,
    satisfaction: 2,
  },
];

export const initialEffectifData = [
  {
    id: 1,
    nom: 'Doe',
    prenom: 'John',
    directionId: 'DG',
    employeurId: 'Orange',
    gender: 'Masculin',
    dateNaissance: '1990-01-01',
    seniorite: 5,
    contrat: 'CDI',
  },
  {
    id: 2,
    nom: 'Smith',
    prenom: 'Jane',
    directionId: 'DAF',
    employeurId: 'OM',
    gender: 'Feminin',
    dateNaissance: '1995-05-15',
    seniorite: 3,
    contrat: 'CDD',
  },
  {
    id: 3,
    nom: 'Johnson',
    prenom: 'Michael',
    directionId: 'DRH',
    employeurId: 'Itm',
    gender: 'Masculin',
    dateNaissance: '1988-10-10',
    seniorite: 7,
    contrat: 'CDI',
  },
  // Ajoutez plus d'effectifs initiaux au besoin
];
