/* import Paciente from '../models/Paciente.js';


const cpacientes = async (req, res) => {
  try {
    // Verificarmo si el usuario ya está registrado en la base de datos
    const existingPaciente = await Paciente.findOne({ email: req.body.email });
    if (existingPaciente) {
      // Si el usuario ya existe, con esta funcion se envia un mensaje de error 400
      return res.status(400).json({ mensaje: 'El usuario ya está registrado en la base de datos' });
    }

    

    // Si el usuario no está registrado, creamos uno nuevo
    const paciente = new Paciente(req.body); 
    const pacienteGuardado = await paciente.save(); 

    res.json({ mensaje: 'Registrando un nuevo doctor',  paciente: pacienteGuardado});
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Hubo un error' });
  }
};

const perfil = (req, res) => {
   res.json({url: "Esta es la ruta perfil"});
};

//--------------------------------------------------------------------------------------------------------------------------------------


export {
  cpacientes,
  perfil,
 
}; */