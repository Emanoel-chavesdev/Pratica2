const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Movies = require('./models/Movies')
app.use(
 express.urlencoded({
 extended: true,
 }),
)
app.use(express.json())
app.post('/movies', async (req, res) => {
    const { titulo,imagem,Categorias,sinopse,duracao,dataLancamento} = req.body
    const movies = {
        titulo,
        imagem,
        Categorias,
        sinopse,
        duracao,
        dataLancamento
    }
    try {
    await Movies.create(movies)
    res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' }) 
    } catch (error) {
    res.status(500).json({ erro: error })
    }
    })

app.get('/movies', async (req, res) => {
    try {
    const people = await Movies.find()
    res.status(200).json(people)
    } catch (error) {
    res.status(500).json({ erro: error })
    }
    })

    app.get('/movies/:id', async (req, res) => {
        const id = req.params.id
        try {
        const movies = await Movies.findOne({ _id: id })
        if (!movies) {
        res.status(422).json({ message: 'Filme não encontrado!' })
        return
        }
        res.status(200).json(movies)
        } catch (error) {
        res.status(500).json({ erro: error })
        }
       })

       app.patch('/movies/:id', async (req, res) => {
        const id = req.params.id
        const { titulo,imagem,Categorias,sinopse,duracao,dataLancamento } = req.body
        const movies = {
            titulo,
            imagem,
            Categorias,
            sinopse,
            duracao,
            dataLancamento
        }
        try {
        const updatedMovies = await Movies.updateOne({ _id: id }, 
       movies)
        if (updatedMovies.matchedCount === 0) {
        res.status(422).json({ message: 'Filme não encontrado!' })
        return
        }
        res.status(200).json(movies)
        } catch (error) {
        res.status(500).json({ erro: error })
        }
        })

        app.delete('/movies/:id', async (req, res) => {
            const id = req.params.id
            const movies = await Movies.findOne({ _id: id })
            if (!movies) {
            res.status(422).json({ message: 'Filme não encontrado!' }) 
            return
            }
            try {
            await Movies.deleteOne({ _id: id })
            res.status(200).json({ message: 'Usuário removido com sucesso!' })
            } catch (error) {
            res.status(500).json({ erro: error })
            }
           }) 
       
       

app.get("/", (req, res) => {
    res.json({ message: "Oi Express!" });
   });

   mongoose
   .connect(
   'mongodb+srv://echavesdev:Ehpstmdv675271@cluster0.b4jidfk.mongodb.net/test'
   )
   .then(() => {
   console.log('Conectou ao banco!')
   app.listen(3000)
   })
   .catch((err) => console.log(err))

   
   