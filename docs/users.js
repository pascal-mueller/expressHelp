const { pool } = require('./config')
const bcrypt = require('bcrypt');

exports.create = function(user, done) {
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        const text = 'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *'
        const values = [user.username, user.email, hash]

        pool
          .query(text, values)
          .then(res => {
            done()
            console.log(res.rows[0])
            // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
          })
          .catch(e => console.error(e.stack))
      });
  });
}

function getHash(email) {
  pool.query('SELECT password FROM users WHERE email=$1', [email], (err, result) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    return result.rows[0];
  })
}

exports.login = function(email, password, done) {
  const saltRounds = 10;
  const hash = getHash(email);

  bcrypt.compare(password, hash, function(err, result) {
    pool.query('SELECT username, email FROM users WHERE email=$1', [email], (err, result) => {
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      done(result.rows[0]);
    })
  })
}


/*
exports.login = function(user, done) {

  bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
      // result == true
  });


  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        const text = 'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *'
        const values = [user.username, user.email, hash]

        pool
          .query(text, values)
          .then(res => {
            done()
            console.log(res.rows[0])
            // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
          })
          .catch(e => console.error(e.stack))
      });
  });
}*/


exports.findById = function(id, cb) {
  var query = ''
  process.nextTick(function() {
    pool.query('SELECT * FROM users where id=$1', [id], (error, results) => {
      if (error) {
        cb(new Error('User ' + id + ' does not exist!'));
      }
      cb(null, results.rows[0]);
    })




    /*var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }*/
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
      pool.query("SELECT * FROM users where username=$1", [username], (error, results) => {
      if (error) {
        cb(new Error('User ' + username + ' does not exist'));
      }
      return cb(null, results.rows[0]);
    })


      
    /*for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);*/
  });
}