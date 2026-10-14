//OBTENER LOS ELEMENTOSDE LA PAGINA
const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista");
//CONSULTAR Y MOSTRAR LOS ESTUDIANTES
async function cargar() {
    const respuesta = await fetch("/estudiante");
    const estudiantes = await respuesta.json(); 

    lista.replaceChildren();
    estudiantes.forEach(e => { 
        let elemento = document.createElement("li"); 
        elemento.textContent = `${e.id} -${e.nombre} -${e.carrera}`;
        //BOTON PARA ELIMINAR 
        const eliminar = document.createElement("button");
        eliminar.textContent = "Eliminar";

        eliminar.onclick = async () => {
            await fetch(`/estudiantes/${e.id}`, {
                method: "DELETE"
            });
            cargar();
        }; 

        elemento = document.createElement("li"); 
        elemento.textContent = `${e.id} -${e.nombre} -${e.carrera}`;
        //BOTON PARA EDITAR 
        const editar = document.createElement("button");
        editar.textContent = "Editar";

        editar.onclick = async () => {
            const nombre = prompt("Nuevo nombre:", e.nombre);
            const carrera = prompt("Nuevo nombre:", e.carrera);
            if (nombre && carrera) {
                await fetch(`/estudiantes/${e.id}`, { 
                    method: "PUT",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ nombre, carrera })
                }); 
                cargar();
            } 
        }; 
        
        elemento.append(" ", editar, " ");
        lista.appendChild(elemento);
    }); 
}
//REGISTRAR UN ESTUDIANTE
formulario.onsubmit = async(evento) =>{
    evento.preventDefault();
    await fetch ("/estudiantes",{
        method:"POST",
        headers:{"Content-Type" : "aplicacion.json"},
        body: JSON.stringify({
            nombre:document.getElementById("nombre").value,
            nombre:document.getElementById("carrera").value,
        })
    });
    formulario.reset();
    cargar();
};
//MOSTRAR LOS REGISTROS
cargar()