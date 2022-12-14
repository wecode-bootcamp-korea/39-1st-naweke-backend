const { appDataSource } = require('./dataSource');

const createUser = async (name, nickname, password, birth) => {
  const user = await appDataSource.query(
    `INSERT INTO users(
      name,
      nickname,
      password,
      birth
    ) VALUES (?, ?, ?, ?);
    `,
    [name, nickname, password, birth]
  );
  return user;
};

const getUserByNickname = async (nickname) => {
  const [user] = await appDataSource.query(
    `SELECT
      id,
      name,
      nickname,
      password,
      birth
    FROM users
    WHERE nickname = ?
    `,
    [nickname]
  );
  return user;
};

const getUserByUserId = async (userId) => {
  const user = await appDataSource.query(
    `SELECT
      name,
      nickname,
      password,
      birth
    FROM users
    WHERE id = ?`,
    [userId]
  );
  return user;
};

module.exports = { createUser, getUserByNickname, getUserByUserId };
