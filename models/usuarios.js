let usuarios = [];
let siguienteId = 1;

const usuariosModel = {
  buscarPorCorreo: (correo) => usuarios.find(u => u.correo === correo),
  crear: (correo, hashPassword) => {
    const nuevo = { id: siguienteId++, correo, password: hashPassword };
    usuarios.push(nuevo);
    return nuevo;
  }
};

export default usuariosModel;
