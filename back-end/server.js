import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());

// ===== CONFIGURAÇÃO DO CAMINHO CORRETO =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, 'data', 'usuarios.json');

console.log("Caminho do arquivo:", usersFilePath); // Pra debug

// ===== GARANTIR QUE O ARQUIVO EXISTE =====
async function garantirArquivo() {
  try {
    await fs.promises.access(usersFilePath);
    console.log("Arquivo encontrado!");
  } catch {
    console.log("Arquivo não existe, criando...");
    // Garantir que a pasta data existe
    const dataDir = path.join(__dirname, 'data');
    await fs.promises.mkdir(dataDir, { recursive: true });
    await fs.promises.writeFile(usersFilePath, '[]');
    console.log("Arquivo criado!");
  }
}
garantirArquivo();

// ===== ROTA DE CADASTRO =====
app.post("/cadastro", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = await fs.promises.readFile(usersFilePath, 'utf-8');
    const users = JSON.parse(data);

    if (users.find(u => u.username === username)) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    users.push({ username, email, password: hashedPassword });

    await fs.promises.writeFile(usersFilePath, JSON.stringify(users, null, 2));

    res.status(201).json({ message: "Usuário cadastrado com sucesso" });

  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// ===== ROTA DE LOGIN =====
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const data = await fs.promises.readFile(usersFilePath, 'utf-8');
    const users = JSON.parse(data);

    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const senhaCorreta = await bcrypt.compare(password, user.password);
    if (senhaCorreta) {
      res.json({ message: 'Login realizado com sucesso' });
    } else {
      res.status(401).json({ error: 'Senha inválida' });
    }

  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});