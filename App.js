
const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const glob = require('glob');
const bodyParser = require('body-parser')
const app = express();
const port = 3501;

const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json())

// Middleware to allow any origin
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // req.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'SavedLevelFiles'));
    },
    filename: (req, file, cb) => {
        // Generate a random encrypted name for the file
        const randomName = crypto.randomBytes(16).toString('hex');
        const ext = path.extname(file.originalname);
        cb(null, randomName + ext);
    },
});

// Create multer instance with the defined storage
const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    if (!req.file) {
        // If no file is uploaded, return error message
        return res.status(400).json({ error: 'No file uploaded', status: 'error' });
    }

    // If file upload is successful, return the random encrypted name
    return res.status(200).json({ filesave: req.file.filename, status: 'done' });
});

app.post('/remove-data', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("req.body: ", req.body)
    // console.log("req", req)

    
    // console.log("req: ", req)
    const { filename } = req.body;
    if(!filename){
        return res.status(400).json({ status: 'error', error: 'Invalid file path' });
    }

    // Build the file path dynamically
    const filePath = path.join(__dirname, 'SavedLevelFiles', filename);

    // Check if the file path is within the 'SavedLevelFiles' directory
    const isFilePathValid = filePath.startsWith(path.join(__dirname, 'SavedLevelFiles'));

    if (!isFilePathValid) {
        return res.status(400).json({ status: 'error', error: 'Invalid file path' });
    }

    // Delete the file
    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(400).json({ status: 'error', error: 'Failed to delete file' });
        }

        // Remove all .json files recursively inside the './Save' folder
        const saveFolderPath = path.join(__dirname, 'Save');
        const jsonFiles = glob.sync('**/*.json', { cwd: saveFolderPath });

        jsonFiles.forEach((file) => {
            fs.unlinkSync(path.join(saveFolderPath, file));
        });

        return res.status(200).json({ status: 'done' });
    });
});

app.post('/export-data', (req, res) => {
    const { filename } = req.body;
    if(!filename){
        return res.status(400).json({ status: 'error', error: 'Invalid file path' });
    }

    // Construir el comando para ejecutar Lantern.js con los argumentos
    const command = `node Lantern.js ExportPals ./SavedLevelFiles/${filename}`;

    // Ejecutar el comando
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            res.status(500).json({ error: stderr });
        } else {
            console.log(`Resultado: ${stdout}`);
            if (stdout.includes("Pal data exported")) {
                // Do something if the stdout contains "Pal data exported"
                console.log("Pal data exported successfully");
                // Get the list of .json files in the folder
                const jsonPlayerFiles = glob.sync('*.json', { cwd: './Save/PalData/Player' });

                // Create an array to store the player objects
                const players = [];

                // Iterate over each .json file
                jsonPlayerFiles.forEach((file) => {
                    // Extract the split name from the file name
                    const splitName = file.split('_').slice(0, -1).join('_');

                    // Get the playerID from the file name
                    const playerID = file.split('_').pop().split('.json')[0];

                    // Build the relative path to the json file
                    const relativePathToJsonFile = `./Save/PalData/Player/${file}`;
                    // Store the content of the file in a variable
                    const file_content = fs.readFileSync(relativePathToJsonFile, 'utf8');                 
                    // Create the player object
                    
                    const player = {
                        name: splitName,
                        file_name: relativePathToJsonFile,
                        player_id: playerID,
                        content: JSON.parse(file_content),
                    };
                    console.log("Content:", player.content);

                    // Add the player object to the players array
                    players.push(player);
                });

                // Get the list of .json files in the folder
                const jsonPalFiles = glob.sync('*.json', { cwd: './Save/PalData/Pal' });

                // Create an array to store the player objects
                const pals = [];

                jsonPalFiles.forEach((file) => {
                    const palID = file.split('_').pop().split('.json')[0];
                    const relativePathToJsonFile = `./Save/PalData/Pal/${file}`;
                    const file_content = fs.readFileSync(relativePathToJsonFile, 'utf8');
                    const name = file.split('_').slice(-2, -1)[0];
                    const pal = {
                        name: name,
                        file_name: relativePathToJsonFile,
                        pal_id: palID,
                        content: JSON.parse(file_content),
                    };
                    pals.push(pal);
                });

                // Create the final JSON object
                const jsonObject = {
                    Players: players,
                    Pals: pals,
                };

                // Do something with the jsonObject
                console.log(jsonObject);
            } else {
                // Do something if the stdout does not contain "Pal data exported"
                console.log("Failed to export Pal data");
            }
            res.json({ result: stdout });
        }
    });
});