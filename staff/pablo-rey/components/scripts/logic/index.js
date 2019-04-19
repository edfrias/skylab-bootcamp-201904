"use strict";

const logic = {
  registerUser(name, surname, email, password, callback) {
    validate.arguments([
      { name: "name", value: name, type: "string", notEmpty: true },
      { name: "surname", value: surname, type: "string", notEmpty: true },
      { name: "email", value: email, type: "string", notEmpty: true },
      { name: "password", value: password, type: "string", notEmpty: true },
      { value: callback, type: "function" },
    ]);

    validate.email(email);

    userApi.create(name, surname, email, password, function(response) {
      if (response.status === "OK") callback();
      else callback(Error(response.error));
    });
  },

  loginUser(email, password, callback) {
    validate.arguments([
      { name: "email", value: email, type: "string", notEmpty: true },
      { name: "password", value: password, type: "string", notEmpty: true },
      { value: callback, type: "function" },
    ]);

    userApi.authenticate(email, password, response => {
      if (response.error) {
        callback({
          status: "KO",
          error: response.error,
        });
      } else {
        const { data: { id: userId, token }} = response;
        this.__userId__ = userId;
        this.__token__ = token,
        callback();
      }
    });
  },

  retrieveUser() {
    // TODO validate input

    const user = users.find(user => user.email === this.__userEmail__);

    if (!user) {
      const error = Error("user not found with email " + email);

      error.code = 2;

      throw error;
    }

    return {
      name: user.name,
      surname: user.surname,
      email: user.email,
    };
  },

  searchDucks(query, callback) {
    // TODO validate inputs

    // TODO handle api errors
    duckApi.searchDucks(query, callback);
  },

  retrieveDuck(id, callback) {
    // TODO validate inputs

    // TODO handle api errors
    duckApi.retrieveDuck(id, callback);
  },
};
