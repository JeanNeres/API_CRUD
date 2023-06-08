const exp = require('constants');
const express = require('express');
const app = express();

app.use(express.json());

//Objeto contendo pares chave-valor

let data = {
    livro1: 10,
    livro2: 10,
    livro3: 10,
    livro4: 10
}

//Endpoint para recuperar o valor com base na chave

app.get('/books/:key', (req,res) =>{
    const key = req.params.key;
    const value = data[key];

    if(value){
        res.json({ livro_qtd: value});
    }else{
        res.status(404).json({ error: 'Book not found'});
    }
});

//Endpoint para recuperar o valor com base na chave

app.get('/books/:key', (req, res) =>{
    const key = req.params.key;
    const value = data[key];

    if(value){
        res.json({livro_qtd: value});
    }else{
        res.status(404).json({error: `Book not found`});
    }
});


// Endpoint para criar/persistir um valor baseado na chave

app.post('/books/', (req, res) => {
    const book = req.body;
    try{
        data[book.nome] = book.qtd;
        res.status(201).send({status: "Created"})
    }
    catch(error){
        res.status(400).send({status: "bad_request"});
    }
});


// Endpoint para atualizar o valor com base na chave e qtd

app.put('/books/:key/:qtd', (req, res) => {
    const key = req. params.key;
    const qtd = req.params.qtd;

    if(data[key]){
        data[key] = parseInt(qtd);
        res.json({livro_nova_qtd: data[key] });
    }else{
        res.status(404).json({error:'Book not found'});
    }
});


//Iniciando o servidor

const port = 3000;
app.listen(port, () =>{
    console.log(`Servidor rodando na porta ${port}`);
});