/* import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // Importa bcrypt



const pacienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    celular : {
        type: String,
        default: null,
        trim: true
    },
    token : {
        type: String,
    },
    confirmado : {
        type: Boolean,
        default: false
    },
});

function generarToken() {
    const caracteres = '0123456789';
    let token = '';
for (let i = 0; i < 16; i++) { // Reducimos la longitud del token a 16 caracteres
        token += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return token;
};

// Antes de guardar, hashea el password
pacienteSchema.pre('save', async function(next) {
    const paciente = this;
    if (paciente.isModified('password')) {
        paciente.password = await bcrypt.hash(paciente.password, 10);
    }
    if (!paciente.token) {
        paciente.token = generarToken();
    }
    next();
});

// Método para comparar passwords
pacienteSchema.methods.comparePassword = async function(candidatePassword) {
    const isPasswordValid = await bcrypt.compare(candidatePassword, this.password);
    console.log('¿La contraseña es válida?', isPasswordValid);
    return isPasswordValid;
};

const Paciente = mongoose.model('Paciente', pacienteSchema);

export default Paciente; */