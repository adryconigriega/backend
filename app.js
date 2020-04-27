const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/',[
    check('name').isLength({ max: 10 }).withMessage('Le nom contient trop de caractères'),
    check('email').isEmail().withMessage('Le mail ne respect pas les normes'),
    check('tel').isNumeric().withMessage('Le téléphone doit contenir que des numéros')
  ], (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() })
    }

    console.log(req.body);
    console.log(errors);
    const result = errors;
    res.json(result);
    next();
});



module.exports = app;