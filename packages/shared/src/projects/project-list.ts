import { Project, ProjectList } from "../../types";

export function isValidProject(value: unknown) {
  return projectList.some((project) => project.id === value);
}

export const projectList: ProjectList[] = [
  {
    id: "AFFORDABLE_AND_CLEAN_ENERGY",
    title: "Affordable & Clean Energy",
    description: "",
    slug: "affordable-and-clean-energy",
  },
  {
    id: "CLEAN_WATER_AND_SANITATION",
    title: "Clean Water & Sanitation",
    description: "",
    slug: "clean-water-and-sanitation",
  },
  {
    id: "CLIMATE_ACTION",
    title: "Climate Action",
    description: "",
    slug: "climate-action",
  },
  {
    id: "DECENT_WORK_AND_ECONOMIC_GROWTH",
    title: "Decent Work & Economic Growth",
    description: "",
    slug: "decent-work-and-economic-growth",
  },
  {
    id: "GENDER_EQUALITY",
    title: "Gender Equality",
    description: "",
    slug: "gender-equality",
  },
  {
    id: "GOOD_HEALTH_AND_WELL_BEING",
    title: "Good Health & Well Being",
    description: "",
    slug: "good-health-and-well-being",
  },
  {
    id: "INDUSTRY_INNOVATION_AND_INFRASTRUCTURE",
    title: "Industry Innovation & Infrastructure",
    description: "",
    slug: "industry-innovation-and-infrastructure",
  },
  {
    id: "LIFE_BELOW_WATER",
    title: "Life Below Water",
    description: "",
    slug: "life-below-water",
  },
  {
    id: "LIFE_ON_LAND",
    title: "Life On Land",
    description: "",
    slug: "life-on-land",
  },
  {
    id: "NO_POVERTY",
    title: "No Poverty",
    description: "",
    slug: "no-poverty",
  },
  {
    id: "PARTNERSHIPS_FOR_THE_GOALS",
    title: "Partnerships For The Goals",
    description: "",
    slug: "partnerships-for-the-goals",
  },
  {
    id: "PEACE_JUSTICE_AND_STRONG_INSTITUTIONS",
    title: "Peace Justice & Strong Institutions",
    description: "",
    slug: "peace-justice-and-strong-institutions",
  },
  {
    id: "QUALITY_EDUCATION",
    title: "Quality Education",
    description: "",
    slug: "quality-education",
  },
  {
    id: "REDUCED_INEQUALITIES",
    title: "Reduced Inequalities",
    description: "",
    slug: "reduced-inequalities",
  },
  {
    id: "RESPONSIBLE_CONSUMPTION_AND_PRODUCTION",
    title: "Responsible Consumption & Production",
    description: "",
    slug: "responsible-consumption-and-production",
  },
  {
    id: "SUSTAINABLE_CITIES_AND_COMMUNITIES",
    title: "Sustainable Cities & Communities",
    description: "",
    slug: "sustainable-cities-and-communities",
  },
  {
    id: "ZERO_HUNGER",
    title: "Zero Hunger",
    description: "",
    slug: "zero-hunger",
  },
  {
    id: "POLITICAL_LOBBYING",
    title: "Political Lobbying",
    description: "",
    slug: "political-lobbying",
  },
  {
    id: "CORPORATE_LOBBYING",
    title: "Corporate Lobbying",
    description: "",
    slug: "corporate-lobbying",
  },
];
