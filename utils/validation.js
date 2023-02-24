function validateEdit(data) {
  const changes = Object.keys(data).filter(
    (key) => data[key] !== "" && data[key] !== null && data[key] !== undefined
  );

  if (changes.length === 0) {
    throw new Error("At least one field must be changed");
  }
}

module.exports = { validateEdit };
