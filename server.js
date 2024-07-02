const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/submit', (req, res) => {
    const newComment = req.body;

    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err && err.code === 'ENOENT') {
            // Si le fichier n'existe pas, créer un nouveau tableau
            const comments = [newComment];
            fs.writeFile('comments.json', JSON.stringify(comments, null, 2), (err) => {
                if (err) {
                    console.error('Error writing file', err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.status(200).send({ message: 'Comment added successfully' });
                }
            });
        } else if (err) {
            console.error('Error reading file', err);
            res.status(500).send('Internal Server Error');
        } else {
            // Si le fichier existe, ajouter le nouveau commentaire au tableau
            const comments = JSON.parse(data);
            comments.push(newComment);
            fs.writeFile('comments.json', JSON.stringify(comments, null, 2), (err) => {
                if (err) {
                    console.error('Error writing file', err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.status(200).send({ message: 'Comment added successfully' });
                }
            });
        }
    });
});

app.get('/api/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err && err.code === 'ENOENT') {
            res.status(200).json([]);
        } else if (err) {
            console.error('Error reading file', err);
            res.status(500).send('Internal Server Error');
        } else {
            const comments = JSON.parse(data);
            const lastTenComments = comments.slice(-10); 
            res.status(200).json(lastTenComments);
        }
    });
});

const publicchemin = path.join(__dirname, "public");
const nodemailer = require('nodemailer')



app.get("/submitcontact", (req, res) => {
    res.sendFile(path.join(publicchemin, "contact.html"));
  });

app.get("/", (req, res) => {
    res.sendFile(path.join(publicchemin, "index.html"));
  });

app.get("/nosoffres", (req, res) => {
    res.sendFile(path.join(publicchemin, "nosoffres.html"));
  });

app.get("/notreequipe", (req, res) => {
    res.sendFile(path.join(publicchemin, "notreequipe.html"));
  });



app.post('/submitcontact', (req, res) => {
    const { name, prenom, email, message } = req.body;
    // console.log('Données du formulaire:', { name, prenom, email, message });

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'cherenfanyvinchy@gmail.com',
                pass: 'lwfn ulfi mgcm ixel',  
            },
        });

        const mailOptions = {
            from: 'cherenfanyvinchy@gmail.com',
            to: 'cherenfanyvinchy@gmail.com', 
            subject: 'New customer on your site',
            text: `Bonjour the CEO nous avons recu un nouveau client \n Identifie au nom: ${name} ${prenom},\n\n avec son adresse mail :\n"${email}"\n\n son message \n"${message}"`
        };
    
        // Envoi de l'email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erreur lors de l\'envoi de l\'email :', error);
                res.status(500).send('Erreur lors de l\'envoi de l\'email');
            } else {
                console.log('Email envoyé :', info.response);
                res.send('Formulaire soumis avec succès');
            }
        });

});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
