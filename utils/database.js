function getDefinedProperties(data, propertyMap) {
  const definedProperties = [];

  for (const [key, value] of Object.entries(propertyMap)) {
    if (data[key]) {
      definedProperties.push({ property: key, value: data[key] });
    }
  }

  return definedProperties;
}

module.exports = { getDefinedProperties };
