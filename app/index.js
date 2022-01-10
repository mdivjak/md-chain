const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
app.use(bodyParser.json());
const bc = new Blockchain();

app.get('/blocks', (req, res) => {
    res.json(bc.chain);
});

// Test za link za majnovanje
// curl -X POST -H "Content-Type: application/json" -d '{"data":"foo"}' localhost:3001/mine
app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`New blocks added: ${block.toString()}`);
    res.redirect('/blocks');
});

app.listen(HTTP_PORT, () => console.log(`Listening on port: ${HTTP_PORT}`));