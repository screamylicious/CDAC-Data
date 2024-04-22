const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db");
const crypt = require("crypto-js");
const utils = require("../utils");
const config = require("../config");
const mailer = require("../mailer");
const router = express.Router();

router.post("/register", (request, response) => {
  const { firstName, lastName, email, password, phoneNumber } = request.body;
  const statement = `insert into user(firstName, lastName, email, password, phoneNumber) values (?, ?, ?, ?, ?);`;
  db.pool.execute(
    statement,
    [firstName, lastName, email, String(crypt.SHA256(password)), phoneNumber],
    (error, result) => {
      if (error) {
        response.send(utils.createErrorResult(error));
      } else {
        const message = `<h1> hello ${firstName}</h1>
        thankyou for registering <br>
        with love<br>
        airbnb_clone_test`;
        mailer.sendEmail(email, "welcome", message, () => {
          response.send(
            utils.createResult(error, "user registered successfully")
          );
        });
      }
    }
  );
});

router.post("/login", (request, response) => {
  const { email, password } = request.body;
  const statement = `select id, firstName, lastName, email, phoneNumber, isDeleted from user where email = ? and password = ?;`;
  db.pool.execute(
    statement,
    [email, String(crypt.SHA256(password))],
    (error, users) => {
      if (error) {
        response.send(utils.createErrorResult(error));
      } else {
        if (users.length == 0) {
          response.send(utils.createErrorResult("No user found"));
        } else {
          const user = users[0];
          if (user.isDeleted) {
            response.send(
              utils.createErrorResult("you've deleted your account")
            );
          } else {
            const payload = { id: user.id, email };
            const token = jwt.sign(payload, config.SECRET);
            const userData = {
              // Name: `${user.firstName} ${user.lastName}`,
              // email,
              // phoneNumber: user.phoneNumber,
              name: `${user.firstName} ${user.lastName}`,
              token,
            };
            response.send(utils.createSuccessResult(userData));
          }
        }
      }
    }
  );
});

router.get("/profile", (request, response) => {
  // const token = request.headers["token"];
  // if (!token || token == "") {
  //   response.send(utils.createErrorResult("token empty"));
  //   return;
  // }
  // try {
  // const { id } = jwt.verify(token, config.SECRET);
  const id = request.id;
  const statement = `select id, firstName, lastName, email, phoneNumber from user where id = ?;`;
  db.pool.execute(statement, [id], (error, profiles) => {
    if (error) {
      response.send(utils.createErrorResult(error));
    } else {
      if (profiles.length == 0) {
        response.send(utils.createErrorResult("user does not exist"));
      } else {
        response.send(utils.createSuccessResult(profiles[0]));
      }
    }
  });
  // } catch (ex) {
  //   response.send(utils.createErrorResult("token not matching"));
  // }
});

router.delete("/deactivate", (request, response) => {
  // const token = request.headers["token"];
  // if (!token || token == "") {
  //   response.send(utils.createErrorResult("token empty"));
  //   return;
  // }
  // try {
  // const { id } = jwt.verify(token, config.SECRET);
  const id = request.id;
  const statement = `update user set isDeleted = 1 where id = ?;`;
  db.pool.execute(statement, [id], (error, result) => {
    if (error) {
      response.send(utils.createErrorResult(error));
    } else {
      const message = `<h1> Bye </h1>
      sorry to see you go <br>
      with love<br>
      airbnb_clone_test`;
      mailer.sendEmail(request.email, "See you soon", message, () => {
        response.send(utils.createResult(error, "your account is deactivated"));
      });
    }
  });
  // } catch (ex) {
  //   response.send(utils.createErrorResult("token not matching"));
  // }
});

router.put("/reactivate", (request, response) => {
  const { email, password } = request.body;
  const statement = `update user set isDeleted=0 where email=? and password=?;`;
  db.pool.execute(
    statement,
    [email, String(crypt.SHA256(password))],
    (error, result) => {
      if (error) {
        response.send(utils.createErrorResult(error));
      } else {
        console.log(result);
        if (result.affectedRows == 0 && result.changedRows == 0) {
          response.send(utils.createErrorResult("user does not exist"));
        } else if (result.affectedRows == 1 && result.changedRows == 0) {
          response.send(utils.createErrorResult("user is already activated"));
        } else {
          const message = `<h1> hola Again</h1>
          welcome back <br>
          with love<br>
          airbnb_clone_test`;
          mailer.sendEmail(email, "welcome back", message, () => {
            response.send(
              utils.createResult(error, "your account reactivated")
            );
          });
        }
      }
    }
  );
});
module.exports = router;
