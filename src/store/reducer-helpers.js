/*
 * Reducer helpers utility functions
 * - Collection of functions that returns common objects on reducer's
 * switch statements
 */

// Common loading object to be returned
export const loadingObject = state => ({
  ...state,
  isLoading: true
});

// Common error object to be returned
export const errorObject = state => ({
  ...state,
  isLoading: false,
  isError: true
});

// common success object to be returned - with payload
export const successObject = (state, payload) => ({
  ...state,
  isLoading: false,
  isError: false,
  data: payload
});
