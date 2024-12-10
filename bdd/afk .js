// Import necessary modules
require("dotenv").config();
const { Pool } = require("pg");

const s = require("../set");
var dbUrl = s.DATABASE_URL ? s.DATABASE_URL : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9";
const proConfig = {
  connectionString: dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
};

// Create PostgreSQL pool connection
const pool = new Pool(proConfig);

// Create AFK table with antitag tracking
const creerTableAfk = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS afk (
        id serial PRIMARY KEY,
        etat text DEFAULT 'off',
        message text,
        lien text
      );
    `);
    console.log("La table 'afk' a été créée avec succès.");
  } catch (e) {
    console.error("Une erreur est survenue lors de la création de la table 'afk':", e);
  }
};

// Function to add or update AFK status
async function addOrUpdateAfk(id, message, lien) {
  try {
    await pool.query(`
      INSERT INTO afk (id, message, lien)
      VALUES ($1, $2, $3)
      ON CONFLICT (id)
      DO UPDATE SET message = $2, lien = $3;
    `, [id, message, lien]);

    console.log("L'enregistrement AFK a été ajouté ou mis à jour avec succès.");
  } catch (e) {
    console.error("Une erreur est survenue lors de l'ajout ou de la mise à jour de l'enregistrement AFK:", e);
  }
}

// Function to change AFK state
async function changeAfkState(id, etat) {
  try {
    const result = await pool.query(`
      UPDATE afk
      SET etat = $1
      WHERE id = $2
      RETURNING *;
    `, [etat, id]);

    if (result.rows.length === 0) {
      console.log("L'enregistrement AFK n'existe pas.");
      return "not defined";
    } else {
      console.log("L'état de l'enregistrement AFK a été modifié avec succès.");
      return "succes";
    }
  } catch (e) {
    console.error("Une erreur est survenue lors du changement de l'état de l'enregistrement AFK:", e);
  }
}

module.exports = {
  creerTableAfk,
  addOrUpdateAfk,
  changeAfkState,
};
