// src/data/mockData.js

export const employeurs = [
  { value: "Orange", label: "ORANGE" },
  { value: "OM", label: "ORANGE MONEY" },
  { value: "Itm", label: "ITM" },
  { value: "Bnw", label: "BENSIZWE" },
];

export const directions = [
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
  { direction: 'Direction Stratégie et transformation', count: 25 },
  { direction: 'Direction des Ressources Humaines', count: 20 },
  { direction: 'Direction Expérience Client', count: 40 },
  { direction: 'Direction Achats et Logistique', count: 35 },
  { direction: 'Direction Juridique & Affaires Réglementaire', count: 10 },
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
    title: 'Formation en leadership',
    description: 'Développez vos compétences en leadership.',
    startDate: '2023-07-01',
    endDate: '2023-07-05',
    days: 5,
  },
  {
    id: 2,
    title: 'Formation en communication',
    description: 'Améliorez vos compétences en communication.',
    startDate: '2023-08-10',
    endDate: '2023-08-12',
    days: 3,
  },
  {
    id: 3,
    title: 'Formation en gestion de projet',
    description: 'Maîtrisez les bases de la gestion de projet.',
    startDate: '2023-09-15',
    endDate: '2023-09-20',
    days: 6,
  },
  // Add more training data as needed
];
export const statusOptions = [
  { value: 'local', label: 'Local' },
  { value: 'expatrie', label: 'Expatrié' },
  // Add more status options as needed
];

export const classificationOptions = [
  { value: 'classifie', label: 'Classifié' },
  { value: 'maitrise', label: 'Maitrise' },
  { value: 'cadre_collaboration', label: 'Cadre de Collaboration' },
  { value: 'cadre_direction', label: 'Cadre de Direction' },
  // Add more classification options as needed
];

export const effectifList = [
  {
    id: 1,
    nom: 'Doe',
    prenom: 'John',
    directionId: 1,
    employeurId: 1,
    gender: 'Feminin',
    dateNaissance: '1990-01-01',
    seniorite: 5,
    contrat: 'CDI',
  },
  {
    id: 2,
    nom: 'Smith',
    prenom: 'Jane',
    directionId: 2,
    employeurId: 2,
    gender: 'Feminin',
    dateNaissance: '1995-05-15',
    seniorite: 3,
    contrat: 'CDD',
  },
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
    agent: 'Mary Williams',
    training: 'Marketing Digital',
    progress: 90,
    satisfaction: 4,
  },
];

export const sampleDirectionStats = {
  DG: {
    pieData: [
      { id: 0, value: 10, label: 'Femmes' },
      { id: 1, value: 15, label: 'Hommes' },
    ],
    lineData: {
      uData: [3000, 2500, 2000, 2780, 1890, 2390, 3490],
      pData: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
    },
    barData: [5, 6, 7],
  },
  DAF: {
    pieData: [
      { id: 0, value: 20, label: 'Femmes' },
      { id: 1, value: 30, label: 'Hommes' },
    ],
    lineData: {
      uData: [2000, 3000, 4000, 5000, 6000, 7000, 8000],
      pData: [3400, 2398, 5800, 4908, 5800, 4800, 5300],
    },
    barData: [8, 9, 10],
  },
  DST: {
    pieData: [
      { id: 0, value: 25, label: 'Femmes' },
      { id: 1, value: 35, label: 'Hommes' },
    ],
    lineData: {
      uData: [1000, 1500, 2000, 2500, 3000, 3500, 4000],
      pData: [2400, 1400, 980, 3900, 480, 3800, 4300],
    },
    barData: [1, 2, 3],
  },
  // Add more directions as needed
};
