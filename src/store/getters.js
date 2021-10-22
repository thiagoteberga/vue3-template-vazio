export default {
  getUsuario: state =>{
      return state.usuario;
  },
  getUsuarioById: (state) => (id) => {
    return state.usuario.data.find(usuario => usuario.id == id)
  },
  getToken: state =>{
    return state.usuario.token;
  },
}