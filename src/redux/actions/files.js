export const fetchFiles = (files) => ({
  type: "FETCH_FILES",
  payload: files,
});

export const deleteFile = (fileId) => ({
  type: "DELETE_FILES",
  payload: fileId,
});
