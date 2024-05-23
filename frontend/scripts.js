function mostrarOverlay(tipo) {
  document.getElementById(`overlay-${tipo}`).style.display = 'flex';
}

function cerrarOverlay(tipo) {
  document.getElementById(`overlay-${tipo}`).style.display = 'none';
}

function registrarDoctor() {
  const nombre = document.getElementById('nombreDoctor').value;
  const email = document.getElementById('emailDoctor').value;
  const celular = document.getElementById('celularDoctor').value;
  const password = document.getElementById('passwordDoctor').value;

  axios.post('http://localhost:4000/doctores/register', {
    nombre: nombre,
    email: email,
    celular: celular,
    password: password
  })
  .then(function (response) {
    console.log(response.data);
    alert('Doctor registrado exitosamente!');
    cerrarOverlay('registroDoctor');
  })
  .catch(function (error) {
    console.error(error);
    alert('Hubo un error al registrar al doctor.');
  });
}

function loginDoctor() {
  const email = document.getElementById('emailDoctorLogin').value;
  const password = document.getElementById('passwordDoctorLogin').value;

  axios.post('http://localhost:4000/doctores/login', {
    email: email,
    password: password
  })
  .then(function (response) {
      if (response.data.success) {
        // Guardar los datos del doctor en localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // Redirigir a la página de perfil del doctor
        window.location.href = 'perfil-doctor.html';
      } else {
        alert('Usuario o contraseña incorrectos.');
      }
  })
  .catch(function (error) {
    console.error(error);
    alert('Hubo un error al iniciar sesión.');
  });
}

function registrarPaciente() {
  const nombre = document.getElementById('nombrePaciente').value;
  const email = document.getElementById('emailPaciente').value;
  const celular = document.getElementById('celularPaciente').value;
  const password = document.getElementById('passwordPaciente').value;

  axios.post('http://localhost:4000/pacientes/register', {
    nombre: nombre,
    email: email,
    celular: celular,
    password: password
  })
  .then(function (response) {
    console.log(response.data);
    alert('Paciente registrado exitosamente!');
    cerrarOverlay('registroPaciente');
  })
  .catch(function (error) {
    console.error(error);
    alert('Hubo un error al registrar al paciente.');
  });
}

function loginPaciente() {
  const email = document.getElementById('emailPacienteLogin').value;
  const password = document.getElementById('passwordPacienteLogin').value;

  axios.post('http://localhost:4000/pacientes/login', {
    email: email,
    password: password
  })
  .then(function (response) {
      if (response.data.success) {
        // Guardar los datos del paciente en localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // Redirigir a la página de perfil del paciente
        window.location.href = 'perfil-paciente.html';
      } else {
        alert('Usuario o contraseña incorrectos.');
      }
    })
  .catch(function (error) {
    console.error(error);
    alert('Hubo un error al iniciar sesión.');
  });
}