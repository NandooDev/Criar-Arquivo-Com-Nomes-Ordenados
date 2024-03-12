import express from 'express';
import { json } from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(json());
app.use(cors());

app.get('/ordenar-nomes/:arquivo', (req, res) => {
    const nome_arquivo = req.params.arquivo;

    try{

        const conteudo_arquivo = fs.readFileSync(`${nome_arquivo}.txt`, 'utf8');

        const linhas = conteudo_arquivo.split('\n');

        const nomes_ordenados = linhas.sort();

        const conteudo_ordenado = nomes_ordenados.join('\n');

        fs.writeFileSync("./nova_lista.txt", conteudo_ordenado)

        res.status(200).send('Nomes ordenados e salvos em nova_lista.txt com sucesso.');

    } catch(err) {

        console.log(err);

        res.status(500).send('Ocorreu um erro no processo.');

    }
})

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log("API RODANDO EM http://localhost:" + PORT);
})