const fs = require("node:fs");
const path = require("node:path");

const dataDir = path.resolve(__dirname, "..", "data");
const usersFilePath = path.join(dataDir, "usuarios-criados.json");

function ensureUsersFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, "[]", "utf-8");
  }
}

function readUsers() {
  ensureUsersFile();
  try {
    const raw = fs.readFileSync(usersFilePath, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  ensureUsersFile();
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf-8");
}

function registerCreatedUser(user, origin = "ui") {
  const users = readUsers();
  users.push({
    ...user,
    origin,
    createdAt: new Date().toISOString(),
  });
  saveUsers(users);
}

module.exports = {
  usersFilePath,
  ensureUsersFile,
  registerCreatedUser,
};

