"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
const fs = require("fs");
const path = require("path");

// Generate a large list of random reactions (more than 1,000)
const reactions = Array.from({ length: 1000 }, (_, i) => `🤓-${i + 1}`); // Example: 🤓-1, 🤓-2, ..., 🤓-1000

zokou({ 
    nomCom: "test", 
    reaction: reactions[Math.floor(Math.random() * reactions.length)], // Pick a random reaction
    nomFichier: __filename 
}, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!");

    // Message content
    let z = '𝐡𝐞𝐥𝐥𝐨𝐰 𝐭𝐡𝐢𝐬 𝐢𝐬 *ℍ𝔸ℕ𝕊 𝕄𝔻🇹🇿  * \n\n' + "i'm a whatsapp bot multi-device created ";
    let d = ' by *hanstz Tech⚠️ *';
    let varmess = z + d;

    // Photo file path (local)
    let photoPath = path.join(__dirname, "../media/king.jpeg");

    // Check if the photo file exists
    if (!fs.existsSync(photoPath)) {
        console.error("Photo file not found at:", photoPath);
        return;
    }

    // Read the local photo file
    let photoBuffer = fs.readFileSync(photoPath);

    // Send photo with caption
    await zk.sendMessage(dest, { image: photoBuffer, caption: varmess });
    console.log("Photo message sent successfully!");
});

console.log("mon test");
