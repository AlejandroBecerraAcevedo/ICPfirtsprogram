import { useEffect, useState } from 'react';
import { usuarios_backend } from 'declarations/usuarios_backend';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [loading, setLoading] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    ObtieneUsuarios();
  }, []);


  const creaUsuarios = async () => {
    setLoading("Loading...");
    const users = await usuarios_backend.createUsers();
    setUsuarios(users);
    setLoading("");
    ObtieneUsuarios();
  }

  const ObtieneUsuarios = async () => {
    setLoading("Loading...");
    const users = await usuarios_backend.ObtieneUsuarios();
    setUsuarios(users);
    setLoading("");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const res = await usuarios_backend.greet(name);
    setGreeting(res);
  }

  const eliminaruser = async (e) => {
    
    e.preventDefault();
    var id = e.target[0].value;
    setLoading("Loading ...")
    //setLoading("Loading...");
    
    await usuarios_backend.eliminarUsuario(id);
    setLoading("");
  }

  return (
    <div>
      
      <main>
        <img src="/logo2.svg" alt="DFINITY logo" />
        <br />
        <br />    
        <form action="#" onSubmit={(event) => {
            handleSubmit(event);
            creaUsuarios();}}>

          <label htmlFor="name">Enter your name: &nbsp;</label>
          <input id="name" alt="Name" type="text" />
          <button type="submit">YES!</button>
        </form>
        <section id="greeting">{greeting}</section>
      </main>

      <div className="row mt-5">
        <div className="col">
          {loading !== "" ? (
            <div className="alert alert-primary">{loading}</div>
          ) : (
            <div></div>
          )}
          <div className="card">
            <div className="card-header">Lista de usuarios</div>
            <div className="card-body">
              <table className="table table-hover table-striped">
                <thead className="table-dark">
                  <tr>                    
                    <th>Nombre</th>
                    <th>Primer Apellido</th>
                    <th>Segundo Apellido</th>
                    <th>Edad</th>
                    <th>Fecha de Nacimiento</th>
                    <th colSpan="2">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => {
                    return (
                      <tr key={usuario.idUsuario}>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.primerApellido}</td>
                        <td>{usuario.segundoApellido}</td>
                        <td>{usuario.edad}</td>
                        <td>{usuario.fechanacimiento}</td>
                        <td>
                          <td><button className="btn btn-primary btnEditarArea">Update</button></td>
                          <td> 
                            <form onSubmit={eliminaruser} method="post">
                              <input type = "hidden" value={usuario.idUsuario} name="id" />
                              <button type="submit" className="btn btn-danger btnEliminarModal">Delete</button>
                            </form>                          
                          </td>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
