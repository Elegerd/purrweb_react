export const SET_DIRECTORIES = "SELECT_DIRECTORIES";

export function setProcessingStatus(status) {
  return {
    type: SET_PROCESSING_STATUS,
    payload: status,
  };
}
