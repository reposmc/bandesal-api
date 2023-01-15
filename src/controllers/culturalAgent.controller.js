const CulturalAgent = require("../models/CulturalAgent");
const culturalAgents = require("../assets/culturalAgents.json");
const csv = require("csv-parser");
const fs = require("fs");
const libs = require("./../libs/functions");

/**
 * Retrieve the json file with the data and save the model.
 * @param {*} req
 * @param {*} res
 *
 * @returns res
 */
const insertsDataFromJson = async (req, res) => {
  const token = req.headers["x-access-token"];

  if (!libs.verifyToken(token)) {
    return res.status(200).send("Token not provided or invalid.");
  }

  culturalAgents.forEach(async (agent) => {
    try {
      const culturalAgent = new CulturalAgent(agent);
      const agentSaved = await culturalAgent.save();
    } catch (error) {
      console.log("Error: " + error);
    }
  });

  return res.status(200).send(culturalAgents.length + " where inserted.");
};

/**
 * Search an specific model searching by DUI.
 * @param {*} req
 * @param {*} res
 *
 * @returns res
 */
const searchByDui = async (req, res) => {
  let culturalAgent = {};
  const token = req.headers["x-access-token"];

  if (!libs.verifyToken(token)) {
    return res.status(200).send("Token not provided or invalid.");
  }

  try {
    culturalAgent = await CulturalAgent.findOne({
      dui: req.body.dui,
    }).exec();
  } catch (error) {
    console.log("Error: " + error);
  }

  if (!culturalAgent) {
    culturalAgent = {};
  }

  // console.log(culturalAgent);

  return res.status(200).json({
    culturalAgent: culturalAgent,
  });
};

/**
 * Deletes all the documents in a Collection.
 * @param {*} req
 * @param {*} res
 *
 * @returns res
 */
const deleteAllData = async (req, res) => {
  try {
    const all = await CulturalAgent.find({});
    all.forEach(async (agent, index) => {
      try {
        await CulturalAgent.deleteOne({
          dui: agent.dui,
        }).catch((err) => console.error(`Delete failed with error: ${err}`));
      } catch (error) {
        console.log("Error: " + error);
      }
    });
    const token = req.headers["x-access-token"];

    if (!libs.verifyToken(token)) {
      return res.status(200).send("Token not provided or invalid.");
    }

    return res.status(200).send(all.length + " where deleted.");
  } catch (error) {
    console.log("Error: " + error);
  }
};

/**
 * Read the CSV file and creates a new JSON file with the data.
 * @param {*} req
 * @param {*} res
 *
 * @returns res
 */
const createJson = async (req, res) => {
  let rows = [];

  try {
    fs.createReadStream("./src/assets/artistas_bandesal_8k.csv")
      .pipe(csv())
      .on("data", async (row) => {
        rows.push(row);
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
        fs.writeFile(
          "./src/assets/culturalAgents.json",
          JSON.stringify(rows, null, 4),
          (err) => {
            if (err) {
              console.error(err);
              return;
            }
          }
        );
      });

    return res.status(200).send("The JSON file was created.");
  } catch (error) {
    return res.status(200).send("The JSON could not be created: " + error);
  }
};

const index = async (req, res) => {
  const token = req.headers["x-access-token"];

  if (!libs.verifyToken(token)) {
    return res.status(200).send("Token not provided or invalid.");
  }

  try {
    const culturalAgents = await CulturalAgent.find({})
      .skip(parseInt(req.body.skip))
      .limit(parseInt(req.body.take));

    const total = await CulturalAgent.count({});

    return res.status(200).json({
      culturalAgents: culturalAgents,
      total: total,
    });
  } catch (error) {
    console.log("Error: " + error);
  }
};

exports.insertsDataFromJson = insertsDataFromJson;
exports.searchByDui = searchByDui;
exports.deleteAllData = deleteAllData;
exports.createJson = createJson;
exports.index = index;
