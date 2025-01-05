import "../config/init.js";
// 5 minutes
// export const LOCAL_MEMORY_TREE_UPDATE_INTERVAL = 300000;
// 15 minutes later it will be 1 Hour
export const JSON_METADATA_UPDATE_INTERVAL = 900000;

// 50 seconds
export const JSON_METADATA_UPDATE_INTERVAL_MS_TEST_CASE = 50000;

export const UPDATE_INTERVAL_MS =
  process.env.NODE_ENV === "development"
    ? JSON_METADATA_UPDATE_INTERVAL_MS_TEST_CASE
    : JSON_METADATA_UPDATE_INTERVAL;
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.BASE_URL_DEV
    : process.env.BASE_URL_PROD;

export const API_BASE_URI = BASE_URL;
export const API_UPDATE_URI = `${API_BASE_URI}/api/v1/update`;
export const API_SETUP_URI = `${API_BASE_URI}/api/v1/setup`;
export const API_UPLOAD_URI = `${API_BASE_URI}/api/v1/upload`;
export const API_HEALTHCHECK_URI = `${API_BASE_URI}/api/v1/healthcheck`;
export const FOLDER_NAME =
  process.env.NODE_ENV === "development"
    ? process.env.TEST_FOLDER_NAME
    : process.env.FOLDER_NAME;
