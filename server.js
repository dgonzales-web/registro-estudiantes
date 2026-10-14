//Importar Express
const express = require("express");
//Crear la app del servidor
const app = express();

//PERMITIR QUE EL SERVIDOR RECIBA DATOS DEL JSON 
app.use(express.json());
//HABILITAR LOS ARCHIVOS DE LA CARPETA PUBLIC
app.use(express.static("public"));

//Crear una lista temporal para almacenar estudiantes
//No existe BD
let estudiantes = [
    {
        id: 1,
        nombre: "Ana Torres Igor",
        carrera: "Ingenieria de extorsion",
    },
    {
        id: 2,
        nombre: "Carlota Aguilar Rabit",
        carrera: "Videojuegos",
    }
];

//CONSULTAR ESTUDIANTES (READ)
app.get("/estudiantes", (req, res) => {
    res.json(estudiantes);
});

//REGISTRAR ESTUDIANTES (CREATE)
app.post("/estudiantes", (req, res) => {
    const nuevo = {
        id: Date.now(),          
        nombre: req.body.nombre, 
        carrera: req.body.carrera
    };
    estudiantes.push(nuevo);
    res.json({ mensaje: "Estudiante registrado" });
});

//ACTUALIZAR ESTUDIANTES
app.put("/estudiantes/:id", (req, res) => { 
    const estudiante = estudiantes.find(
        e => e.id === Number(req.params.id) 
    );
    if (!estudiante) {
        return res.status(404).json({ mensaje: "No encontrado" });
    }
    estudiante.nombre = req.body.nombre;
    estudiante.carrera = req.body.carrera;

    res.json({ mensaje: "Estudiante actualizado" });
});

//ELIMINAR ESTUDIANTES (DELETE)
app.delete("/estudiantes/:id", (req, res) => {
    estudiantes = estudiantes.filter(
        e => e.id !== Number(req.params.id) 
    );
    res.json({ mensaje: "Estudiante eliminado" });
});

//INICIAR EL SERVIDOR
app.listen(3000, () => {
    console.log("Servidor en http://localhost:3000"); 
});