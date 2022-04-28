const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server now listening on port: ${PORT}`);
});

app.get('/api/quotes/random', (req, res, next) => {
    res.send(
        {
            quote: getRandomElement(quotes)
        }
    );
});

app.get('/api/quotes', (req, res) => {
    if(req.query.person === undefined) {
        res.send({
            quotes: quotes
        })
    } else {
        const quotesByPerson = quotes.filter(quote => quote.person === req.query.person)
        res.send({
            quotes: quotesByPerson
        })
    }
});

app.post('/api/quotes', (req, res) => {
    const quote = req.query.quote;
    const person = req.query.person;
    if (quote && person) {
        const newQuote = {
            quote: quote,
            person: person
        }
        quotes.push(newQuote);
        res.send({
            quote: newQuote
        });
    } else {
        res.status(400).send();
    }
})

