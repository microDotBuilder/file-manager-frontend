/* eslint-disable no-undef */
import "../config/init.js";

// 1 hour
export const JSON_METADATA_UPDATE_INTERVAL = 3600000;

// 1 minute
export const JSON_METADATA_UPDATE_INTERVAL_MS_TEST_CASE = 60000;

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
