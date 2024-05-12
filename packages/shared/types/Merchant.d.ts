import { Merchant } from "./payload-types";

/**
 * manually defined User interface, try to use payload interface instead
 */
export type IMerchant = Pick<Merchant, "business_name">;

export type UN_SDG =
  // list of UN sustainability goals
  // https://sdgs.un.org/goals
  | "NO_POVERTY"
  | "ZERO_HUNGER"
  | "GOOD_HEALTH_AND_WELL_BEING"
  | "QUALITY_EDUCATION"
  | "GENDER_EQUALITY"
  | "CLEAN_WATER_AND_SANITATION"
  | "AFFORDABLE_AND_CLEAN_ENERGY"
  | "DECENT_WORK_AND_ECONOMIC_GROWTH"
  | "INDUSTRY_INNOVATION_AND_INFRASTRUCTURE"
  | "REDUCED_INEQUALITIES"
  | "SUSTAINABLE_CITIES_AND_COMMUNITIES"
  | "RESPONSIBLE_CONSUMPTION_AND_PRODUCTION"
  | "CLIMATE_ACTION"
  | "LIFE_BELOW_WATER"
  | "LIFE_ON_LAND"
  | "PEACE_JUSTICE_AND_STRONG_INSTITUTIONS"
  | "PARTNERSHIPS_FOR_THE_GOALS";

export type Projects = "POLITICAL_LOBBYING" | "CORPORATE_LOBBYING";
