import { Canister, Principal, Vec, query, text, nat8, StableBTreeMap, Record, update, Variant, Result, Err, Ok } from 'azle';

const Usuario = Record({
    idUsuario: Principal,
    nombre: text,
    primerApellido: text,
    segundoApellido: text,
    edad: nat8,
    fechanacimiento: text
});

type Usuario = typeof Usuario.tsType;

const AplicationError = Variant({
    UserDoesNotExist: text
});

type AplicationError = typeof AplicationError.tsType;

let usuarios = StableBTreeMap<Principal, Usuario>(0);


function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random()*256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}



export default Canister({
    greet: query([text], text, (name) => {
        return `Hello, ${name}!`;
    }),

    eliminarUsuario: update([text], Result(Usuario, AplicationError), (idUsuario) => {
       
        const usuario = usuarios.get(Principal.fromText(idUsuario));
        if ('None' in usuario){
            console.log("No se encontró usuario");
            return Err({
                UserDoesNotExist: idUsuario
            });
        }
        const usuarioX = usuario.Some;
       
        usuarios.remove(usuarioX.idUsuario);
        console.log(usuarios.values());
        return Ok(usuarioX);   
    }),

    ObtieneUsuarios: query([], Vec(Usuario), () => {
        return usuarios.values();
    }),

    createUsers: update([], Vec(Usuario),() => { 
        // Creación de usuarios


        const idUsuario = generateId();
        const usuario: Usuario = {
            idUsuario: idUsuario,
            nombre: "Juan",
            primerApellido: "Pérez",
            segundoApellido: "García",
            edad: 30,
            fechanacimiento: "06/16/1994"
        };

        const idUsuario2 = generateId();
        const usuario2: Usuario = {
            idUsuario: idUsuario2,
            nombre: "Juan",
            primerApellido: "Pérez",
            segundoApellido: "García",
            edad: 30,
            fechanacimiento: "06/16/1994"
        };

        const idUsuario3 = generateId();
        const usuario3: Usuario = {
            idUsuario: idUsuario3,
            nombre: "Pedro",
            primerApellido: "Gómez",
            segundoApellido: "López",
            edad: 25,
            fechanacimiento: "03/21/1999"
        };
        
        const idUsuario4 = generateId();
        const usuario4: Usuario = {
            idUsuario: idUsuario4,
            nombre: "María",
            primerApellido: "Martínez",
            segundoApellido: "Sánchez",
            edad: 40,
            fechanacimiento: "11/05/1984"
        };
        
        const idUsuario5 = generateId();
        const usuario5: Usuario = {
            idUsuario: idUsuario5,
            nombre: "Laura",
            primerApellido: "Rodríguez",
            segundoApellido: "Fernández",
            edad: 35,
            fechanacimiento: "09/12/1989"
        };
        
        const idUsuario6 = generateId();
        const usuario6: Usuario = {
            idUsuario: idUsuario6,
            nombre: "Carlos",
            primerApellido: "González",
            segundoApellido: "Ruiz",
            edad: 28,
            fechanacimiento: "07/30/1996"
        };
        
        const idUsuario7 = generateId();
        const usuario7: Usuario = {
            idUsuario: idUsuario7,
            nombre: "Ana",
            primerApellido: "Díaz",
            segundoApellido: "Pérez",
            edad: 33,
            fechanacimiento: "05/08/1991"
        };

       
        usuarios.insert(idUsuario, usuario);
        usuarios.insert(idUsuario2, usuario2);
        usuarios.insert(idUsuario3, usuario3);
        usuarios.insert(idUsuario4, usuario4);
        usuarios.insert(idUsuario5, usuario5);
        usuarios.insert(idUsuario6, usuario6);

        return usuarios.values();


    }),


})

