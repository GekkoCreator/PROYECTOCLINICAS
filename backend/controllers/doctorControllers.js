import Doctor from '../models/Doctor.js';


const cdoctores = async (req, res) => {
  try {
    console.log(req.body);// Verificarmo si el usuario ya está registrado en la base de datos
    const existingDoctor = await Doctor.findOne({ email: req.body.email });
    if (existingDoctor) {
      // Si el usuario ya existe, con esta funcion se envia un mensaje de error 400
      return res.status(400).json({ mensaje: 'El usuario ya está registrado en la base de datos' });
    }

    

    // Si el usuario no está registrado, creamos uno nuevo
    const doctor = new Doctor(req.body); 
    const doctorGuardado = await doctor.save(); 

    res.json({ mensaje: 'Registrando un nuevo doctor',  doctor: doctorGuardado});
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
  cdoctores,
  perfil,
 
};


