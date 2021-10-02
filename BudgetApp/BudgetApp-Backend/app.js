const express = require('express');
const mysql = require('mysql');
const util = require('util');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT ? process.env.PORT : 3000;

app.use(express.json());
app.use(cors());

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'budgetadmin'
});
conexion.connect();
const qy = util.promisify(conexion.query).bind(conexion);

app.post('/operation', async (req, res) => {
    try{
        const reason = req.body.reason.toUpperCase().trim();;
        const amount = req.body.amount;
        const date = req.body.date;
        const type = req.body.type.toUpperCase().trim();;

        if(!reason || !amount || !date || !type){
            throw new Error('All the fields must be completed');
        }
        const response = await qy('INSERT into budget_table (reason, amount, date, type) VALUES (?, ?, ?, ?)', [reason, amount, date, type]);

        const insertedRecord = await qy('SELECT * FROM budget_table WHERE id=?', [response.insertId]);

        res.send(insertedRecord[0]);
    }
    catch(e){
        res.status(413).send(e.message);
    }
  });
  
app.get('/operation', async (req, res) => {
    try{
        const response = await qy('SELECT * FROM budget_table');

        res.send(response);
    }
    catch(e){
        res.status(413).send(e.message);
    }
  });

app.put('/operation/:id', async (req, res) => {
    try{
        const reason = req.body.reason.toUpperCase().trim();
        const amount = req.body.amount;
        const date = req.body.date;

        const query = await qy('SELECT * FROM budget_table WHERE id=?', [req.params.id]);

        if(!reason || !amount || !date){
            throw new Error('All the fields must be completed');
        }
        if(query.length == 1){
            await qy('UPDATE budget_table SET reason=?, amount=?, date=? WHERE id=?',[reason, amount, date, req.params.id]);

            const response = await qy('SELECT * FROM budget_table WHERE id=?', [req.params.id]);

            res.send(response);
        }
    }
    catch(e){
        res.status(413).send(e.message);
    }
  });

app.delete('/operation/:id', async (req, res) => {
    try{
        let query = 'SELECT * FROM budget_table WHERE id=?';

        let response = await qy(query, [req.params.id]);

        if(response.length == 0){
            throw new Error('The transaction selected doesn`t exist');
        }else{
            query = 'DELETE FROM budget_table WHERE id=?';

            response = await qy(query, [req.params.id]);
        }

        res.send('The operation was successfully deleted');
    }
    catch(e){
        res.status(413).send(e.message);
    }
  });

app.listen(PORT, () =>{
    console.log('App running at port:', PORT);
});