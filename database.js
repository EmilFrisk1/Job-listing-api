const Pool = require("pg-pool");
const { constants } = require("./constants");
const { getDefinedProperties } = require("./utils/database");
const { utilHashPassword } = require("./utils/security");
require("dotenv").config();

let pool;

function initDbPool() {
  pool = new Pool({
    user: "basic_user",
    host: "127.0.0.1",
    database: "mydb",
    password: process.env.DB_PASSOWRD,
    port: 5432,
    max: 20, // set pool max size to 20
    idleTimeoutMillis: 1000, // close idle clients after 1 second
    connectionTimeoutMillis: 2000, // return an error after 2 seconds
  });
}

function getDbPool() {
  if (!pool) {
    console.log("initializing db pool...");
    initDbPool();
  }
  return pool;
}

async function findUserByEmail(email) {
  const text = "SELECT * FROM users WHERE email = $1";
  const values = [email];

  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) reject(err);

      client.query({ text, values }, (err, res) => {
        done();
        if (err) {
          console.log("error finding a user");
          reject(err);
        } else {
          return resolve(res.rows[0]);
        }
      });
    });
  });
}

async function findUserById(id) {
  const text = "SELECT * FROM users WHERE user_id = $1";
  const values = [id];

  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) reject(err);

      client.query({ text, values }, (err, res) => {
        done();
        if (err) {
          console.log("error finding a user");
          reject(err);
        } else {
          return resolve(res.rows[0]);
        }
      });
    });
  });
}

async function findJobListingById(id) {
  const text = "SELECT * FROM job_listings WHERE job_listing_id = $1";
  const values = [id];

  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) reject(err);

      client.query({ text, values }, (err, res) => {
        done();
        if (err) {
          console.log("error finding a user");
          reject(err);
        } else {
          return resolve(res.rows[0]);
        }
      });
    });
  });
}

async function deleteJobListing(id) {
  const text = "DELETE FROM job_listings WHERE job_listing_id = $1";
  const values = [id];

  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) reject(err);

      client.query({ text, values }, (err, res) => {
        done();
        if (err) {
          console.log("error finding a user");
          reject(err);
        } else {
          return resolve();
        }
      });
    });
  });
}

async function editJobListing(id, data) {
  try {
    //const { title, description, experience_level, location, salary } = data;
    //const data = { title, description, experience_level, location, salary };

    const definedProperties = getDefinedProperties(
      data,
      constants.job_list_property_map
    );

    const newValues = definedProperties.map((obj) => {
      return obj.value;
    });

    const values = [...newValues, id];

    const changes = definedProperties.map((obj, index) => {
      return `${obj.property} = $${index + 1}`;
    });

    const text = `UPDATE job_listings SET ${changes.join(
      ", "
    )} WHERE job_listing_id = $${values.length}`;

    return new Promise((resolve, reject) => {
      pool.connect((err, client, done) => {
        if (err) reject(err);

        client.query({ text, values }, (err, res) => {
          done();
          if (err) {
            console.log("error editing job listing: " + err);
            reject(err);
          } else {
            return resolve();
          }
        });
      });
    });
  } catch (error) {
    console.log("error editing a job_listings table: " + error);
  }
}

async function createUser(name, email, password, is_employee, fk_employee_id) {
  const text =
    "INSERT INTO users (user_name, email, user_password, is_employee, fk_employee_id, role) VALUES ($1, $2, $3, $4, $5, 'basic') RETURNING user_id";
  const values = [name, email, password, is_employee, fk_employee_id];

  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) {
        return reject(err);
      }

      client.query({ text, values }, (err, res) => {
        done();

        if (err) {
          if (
            err.message.includes(
              "duplicate key value violates unique constraint"
            )
          ) {
            reject(new Error("Email already in use"));
          } else {
            reject(err);
          }
        } else {
          resolve(res.rows);
        }
      });
    });
  });
}

async function createJobListing(data) {
  //
  const text = `
  INSERT INTO job_listings (title, experience_level, location, salary, description, created_at, creator)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING job_listing_id
`;

  const values = [...Object.values(data)];
  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) {
        return reject(err);
      }

      client.query({ text, values }, (err, res) => {
        done();

        if (err) {
          reject(err);
        } else {
          resolve(res.rows);
        }
      });
    });
  });
}

async function getJobListings(page) {
  const offset = (page - 1) * 6;
  const text = "SELECT * FROM job_listings LIMIT 6 OFFSET $1;";
  const values = [offset];

  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) {
        return reject(err);
      }

      client.query({ text, values }, (err, res) => {
        done();

        if (err) {
          reject(err);
        } else {
          resolve(res.rows);
        }
      });
    });
  });
}

async function deleteUser(id) {
  const text = "DELETE FROM users where user_id = $1";
  const values = [id];

  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) {
        return reject(err);
      }

      client.query({ text, values }, (err, res) => {
        done();

        if (err) {
          reject(err);
        } else {
          resolve("deleted user successfully");
        }
      });
    });
  });
}

async function editUser(data, id) {
  const definedProperties = getDefinedProperties(
    data,
    constants.user_property_map
  );

  const newValues = definedProperties.map((obj) => {
    return obj.value;
  });

  const values = [...newValues];

  const changes = definedProperties.map((obj, index) => {
    return `${obj.property} = $${index + 1}`;
  });

  const text = `UPDATE users SET ${changes.join(", ")} WHERE user_id = ${id}`;

  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) reject(err);

      client.query({ text, values }, (err, res) => {
        done();
        if (err) {
          console.log("error editing job listing: " + err);
          reject(err);
        } else {
          return resolve("user edited successfully");
        }
      });
    });
  });
}

async function getPosts() {
  const text = `SELECT * FROM posts;`;
  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) reject(err);

      client.query(text, (err, res) => {
        done();
        if (err) {
          console.log("error editing job listing: " + err);
          reject(err);
        } else {
          return resolve(res.rows);
        }
      });
    });
  });
}

async function createPost(data) {
  const values = [...Object.values(data)];

  const text = `INSERT INTO posts (creator, description, title, category, created_at)
  VALUES($1, $2, $3, $4, $5)`;

  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) reject(err);

      client.query({ text, values }, (err, res) => {
        done();
        if (err) {
          console.log("error editing job listing: " + err);
          reject(err);
        } else {
          return resolve("post created successfully");
        }
      });
    });
  });
}

async function editPost(data, id) {
  const definedProperties = getDefinedProperties(
    data,
    constants.post_property_map
  );

  const values = [...definedProperties.map((obj) => obj.value), id];

  const changes = definedProperties.map((obj, index) => {
    return `${obj.property} = $${index + 1}`;
  });

  const text = `UPDATE posts SET ${changes.join(", ")} WHERE post_id = $${
    changes.length + 1
  }`;

  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) reject(err);

      client.query({ text, values }, (err, res) => {
        done();
        if (err) {
          console.log("error editing job listing: " + err);
          reject(err);
        } else {
          return resolve("post edited successfully");
        }
      });
    });
  });
}

async function findPostById(id) {
  const text = "SELECT * FROM posts WHERE post_id = $1";
  const values = [id];

  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) reject(err);

      client.query({ text, values }, (err, res) => {
        done();
        console.log(text + " , " + values);
        if (err) {
          console.log("error finding the post");
          reject(err);
        } else {
          return resolve(res.rows[0]);
        }
      });
    });
  });
}

async function deletePost(id) {
  const text = "DELETE FROM posts WHERE post_id = $1";
  const values = [id];

  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) reject(err);

      client.query({ text, values }, (err, res) => {
        done();
        if (err) {
          console.log("error finding the post");
          reject(err);
        } else {
          return resolve("post deleted");
        }
      });
    });
  });
}

async function getEmployees() {
  const text = "SELECT * FROM employees;";

  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) reject(err);

      client.query({ text }, (err, res) => {
        done();
        if (err) {
          console.log("error finding the post");
          reject(err);
        } else {
          return resolve(res.rows);
        }
      });
    });
  });
}

async function deleteEmployee(id) {
  const text = "DELETE FROM employees WHERE fk_user_id = $1";

  const values = [id];

  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) reject(err);

      client.query({ text, values }, (err, res) => {
        done();
        if (err) {
          console.log("error finding the user");
          reject(err);
        } else {
          return resolve("deleted the user");
        }
      });
    });
  });
}

async function editEmployee(data, id) {
  const definedProperties = getDefinedProperties(
    data,
    constants.employee_property_map
  );

  const values = [...definedProperties.map((obj) => obj.value), id];

  const changes = definedProperties.map((obj, index) => {
    return `${obj.property} = $${index + 1}`;
  });

  const text = `UPDATE employees SET ${changes.join(
    ", "
  )} WHERE fk_user_id = $${values.length}`;

  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) reject(err);

      client.query({ text, values }, (err, res) => {
        done();
        if (err) {
          console.log("error finding the user");
          reject(err);
        } else {
          return resolve("updated the employee");
        }
      });
    });
  });
}

async function createEmployee(data) {
  const employeeData = {
    employment_type: data.employment_type,
    position: data.position,
    hire_date: data.hire_date,
    salary: data.salary,
    fk_user_id: data.user_id,
  };
  const text =
    "INSERT INTO employees (employment_type, position, hire_date, salary, fk_user_id) VALUES ($1, $2, $3, $4, $5)";
  const values = [...Object.values(employeeData)];
  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if (err) reject(err);

      client.query({ text, values }, (err, res) => {
        done();
        if (err) {
          console.log("error finding the user");
          reject(err);
        } else {
          return resolve("created the employee");
        }
      });
    });
  });
}

module.exports = {
  createUser,
  getDbPool,
  findUserByEmail,
  getJobListings,
  findUserById,
  findJobListingById,
  deleteJobListing,
  editJobListing,
  createJobListing,
  deleteUser,
  editUser,
  getPosts,
  createPost,
  editPost,
  findPostById,
  deletePost,
  getEmployees,
  deleteEmployee,
  editEmployee,
  createEmployee,
};
