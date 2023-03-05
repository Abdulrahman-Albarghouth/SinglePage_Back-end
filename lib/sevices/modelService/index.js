const models = require("../../../models");

const getInstanceById = async (id, modelName) => {
  if (models[modelName]) {
    if (typeof id === "number" && id > 0) {
      const instance = await models[modelName].findByPk(id);
      if (instance) return instance;
    }
    return null;
  } else {
    throw new Error("Model not found");
  }
};

const getInstanceByText = async (nameIndex, name, modelName) => {
  try {
    if (models[modelName]) {
        const instance = await models[modelName].findOne({ where: { [nameIndex]: name } });
        return instance;
    } else {
      throw new Error("Model not found");
    }
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = {
  getInstanceById,
  getInstanceByText
};
