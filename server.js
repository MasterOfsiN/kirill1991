var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/insert', function(req, res) {
  pg.connect(process.env.DATABASE_URL, function(err, conn, done) {
    if (err) console.log(err);
    conn.query('INSERT INTO salesforce.Lead (FirstName, LastName, Email, Company, LeadSource) VALUES ($1, $2, $3, $4, $5)', [req.body.firstName.trim(), req.body.lastName.trim(), req.body.email.trim(), req.body.company.trim(), req.body.leadsource.trim()],
      function(err, result) {
        done();
        if (err) {
          res.status(400).json({ error: err.message });
        }
        else {
          res.json(result);
        }
      });
  });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
