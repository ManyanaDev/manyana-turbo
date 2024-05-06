import { ProjectList } from "../../types/Project";

export function isValidProject(value: unknown): value is ProjectList["id"] {
  return projectList.some((project) => project.id === value);
}

export const projectList: ProjectList[] = [
  {
    id: "AFFORDABLE_AND_CLEAN_ENERGY",
    title: "Affordable And Clean Energy",
    description: "",
  },
  {
    id: "CLEAN_WATER_AND_SANITATION",
    title: "Clean Water And Sanitation",
    description: "",
  },
  { id: "CLIMATE_ACTION", title: "Climate Action", description: "" },
  {
    id: "DECENT_WORK_AND_ECONOMIC_GROWTH",
    title: "Decent Work And Economic Growth",
    description: "",
  },
  { id: "GENDER_EQUALITY", title: "Gender Equality", description: "" },
  {
    id: "GOOD_HEALTH_AND_WELL_BEING",
    title: "Good Health And Well Being",
    description: "",
  },
  {
    id: "INDUSTRY_INNOVATION_AND_INFRASTRUCTURE",
    title: "Industry Innovation And Infrastructure",
    description: "",
  },
  { id: "LIFE_BELOW_WATER", title: "Life Below Water", description: "" },
  { id: "LIFE_ON_LAND", title: "Life On Land", description: "" },
  { id: "NO_POVERTY", title: "No Poverty", description: "" },
  {
    id: "PARTNERSHIPS_FOR_THE_GOALS",
    title: "Partnerships For The Goals",
    description: "",
  },
  {
    id: "PEACE_JUSTICE_AND_STRONG_INSTITUTIONS",
    title: "Peace Justice And Strong Institutions",
    description: "",
  },
  { id: "QUALITY_EDUCATION", title: "Quality Education", description: "" },
  {
    id: "REDUCED_INEQUALITIES",
    title: "Reduced Inequalities",
    description: "",
  },
  {
    id: "RESPONSIBLE_CONSUMPTION_AND_PRODUCTION",
    title: "Responsible Consumption And Production",
    description: "",
  },
  {
    id: "SUSTAINABLE_CITIES_AND_COMMUNITIES",
    title: "Sustainable Cities And Communities",
    description: "",
  },
  { id: "ZERO_HUNGER", title: "Zero Hunger", description: "" },
  { id: "POLITICAL_LOBBYING", title: "Political Lobbying", description: "" },
  { id: "CORPORATE_LOBBYING", title: "Corporate Lobbying", description: "" },
];
