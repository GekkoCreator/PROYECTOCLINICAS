/*import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import doctorRoutes from "./routes/doctorRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";
import cors from 'cors'; // Importar el middleware cors

dotenv.config();

conectarDB();

const app = express();

app.use(express.json()); 

const corsOptions = {
  origin: 'http://127.0.0.1:5500', // O el puerto donde estés sirviendo tu frontend
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Usar el middleware cors con las opciones

app.use('/doctores', doctorRoutes);

app.use('/pacientes', pacienteRoutes);

app.use("/", (req, res) => {
    res.send("FUNCIONA EL SERVIDOR BACKEND!");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto: ${PORT}`);
});

*/
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://127.0.0.1:5501',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Conexión a la base de datos
const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Conectado a la base de datos`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
conectarDB();

// Modelos
const doctorSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  celular: { type: String, default: null, trim: true },
  token: String,
  confirmado: { type: Boolean, default: false }
});

const pacienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true },
  celular: { type: String, default: null, trim: true },
  token: String,
  confirmado: { type: Boolean, default: false }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
const Paciente = mongoose.model('Paciente', pacienteSchema);

// Funciones de utilidad
const generarToken = () => {
  const caracteres = '0123456789';
  let token = '';
  for (let i = 0; i < 16; i++) {
    token += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return token;
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Controladores
const registrarDoctor = async (req, res) => {
  try {
    const { nombre, email, celular, password } = req.body;
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ mensaje: 'El usuario ya está registrado en la base de datos' });
    }
    const hashedPassword = await hashPassword(password);
    const token = generarToken();
    const doctor = new Doctor({ nombre, email, celular, password: hashedPassword, token });
    const doctorGuardado = await doctor.save();
    res.json({ mensaje: 'Registrando un nuevo doctor', doctor: doctorGuardado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Hubo un error' });
  }
};

const registrarPaciente = async (req, res) => {
  try {
    const { nombre, email, celular, password } = req.body;
    const existingPaciente = await Paciente.findOne({ email });
    if (existingPaciente) {
      return res.status(400).json({ mensaje: 'El usuario ya está registrado en la base de datos' });
    }
    const hashedPassword = await hashPassword(password);
    const token = generarToken();
    const paciente = new Paciente({ nombre, email, celular, password: hashedPassword, token });
    const pacienteGuardado = await paciente.save();
    res.json({ mensaje: 'Registrando un nuevo paciente', paciente: pacienteGuardado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Hubo un error' });
  }
};

const perfilDoctor = (req, res) => {
  res.json({ url: "Esta es la ruta perfil doctor" });
};

const perfilPaciente = (req, res) => {
  res.json({ url: "Esta es la ruta perfil paciente" });
};

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ email });
    if (!doctor || !(await bcrypt.compare(password, doctor.password))) {
      return res.json({ success: false, mensaje: 'Credenciales incorrectas' });
    }
    res.json({ success: true, user: { nombre: doctor.nombre, email: doctor.email, celular: doctor.celular } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Hubo un error' });
  }
};

const loginPaciente = async (req, res) => {
  try {
    const { email, password } = req.body;
    const paciente = await Paciente.findOne({ email });
    if (!paciente || !(await bcrypt.compare(password, paciente.password))) {
      return res.json({ success: false, mensaje: 'Credenciales incorrectas' });
    }
    res.json({ success: true, user: { nombre: paciente.nombre, email: paciente.email, celular: paciente.celular } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Hubo un error' });
  }
};

// Rutas
const router = express.Router();
router.post('/doctores/register', registrarDoctor);
router.get('/doctores/perfil', perfilDoctor);
router.post('/pacientes/register', registrarPaciente);
router.get('/pacientes/perfil', perfilPaciente);
router.post('/doctores/login', loginDoctor);
router.post('/pacientes/login', loginPaciente);

app.use('/', router);

app.use("/", (req, res) => {
  res.send("FUNCIONA EL SERVIDOR BACKEND!");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto: ${PORT}`);
});
