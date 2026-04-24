const express = require("express");
const path = require("path");
const app = express();

const pub_path = path.join(__dirname, '/public');

// 1. Fixed the arrow function syntax '() =>'
app.get('', (req, res) => {
    // Use res.sendFile to serve the actual content of the file
    res.sendFile(path.join(pub_path, 'dashboard.html'));
});
app.use(express.static(pub_path));

const PORT = 8003;

// 2. Changed 8000 to the variable PORT 
// 3. Fixed the arrow function syntax '() =>'
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
