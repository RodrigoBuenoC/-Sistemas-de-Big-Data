const API = "http://localhost:3000";

// -------------------------
// RENDER TABLAS
// -------------------------
function renderTablaGenerica(data, id) {
    const container = document.getElementById(id);

    if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = `<p>No hay datos.</p>`;
        return;
    }

    const columnas = Object.keys(data[0]);

    let html = `<table class="data-table"><thead><tr>`;
    columnas.forEach(c => html += `<th>${c}</th>`);
    html += `</tr></thead><tbody>`;

    data.forEach(row => {
        html += `<tr>`;
        columnas.forEach(col => {
            let v = row[col];
            if (Array.isArray(v)) v = v.join(", ");
            if (typeof v === "object" && v !== null) v = JSON.stringify(v);
            html += `<td>${v}</td>`;
        });
        html += `</tr>`;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
}

function toggleFetchTabla(id, endpoint) {
    const c = document.getElementById(id);

    if (c.querySelector('.data-table') || c.textContent.trim() !== "") {
        c.innerHTML = "";
        return;
    }

    fetch(API + endpoint)
        .then(r => r.json())
        .then(data => renderTablaGenerica(data, id));
}

// ===================== GET ======================
function getRestaurantes(){ toggleFetchTabla("restaurantes", "/restaurantes"); }
function getRiders(){ toggleFetchTabla("riders", "/riders"); }
function getUsuarios(){ toggleFetchTabla("usuarios", "/usuarios"); }
function getPedidos(){ toggleFetchTabla("pedidos", "/pedidos"); }

// ===================== CREAR ======================
function crearRestaurante(){
    const nombre = restName.value;
    const categorias = restCat.value.split(",").map(c => c.trim());
    fetch(API + "/restaurantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, categorias })
    }).then(() => { alert("Creado"); getRestaurantes(); });
}

function crearRider(){
    const nombre = riderName.value;
    const vehiculo = riderVeh.value;
    const estado = riderEstado.value;
    fetch(API + "/riders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, vehiculo, estado })
    }).then(() => { alert("Creado"); getRiders(); });
}

function crearUsuario(){
    const nombre = userName.value;
    const direccion = userDir.value;
    const telefono = userTel.value;
    fetch(API + "/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, direccion, telefono })
    }).then(() => { alert("Creado"); getUsuarios(); });
}

function crearPedido(){
    const usuarioId = pedidoUser.value;
    const restauranteId = pedidoRest.value;
    const riderId = pedidoRider.value || null;
    const plato = pedidoPlato.value;
    const cantidad = Number(pedidoCant.value);
    const precio_unitario = Number(pedidoPrecio.value);

    const items = [{ plato, cantidad, precio_unitario }];

    fetch(API + "/pedidos", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ usuarioId, restauranteId, riderId, items })
    }).then(() => { alert("Creado"); getPedidos(); });
}

// ===================== VER POR ID ======================
function verRestaurante(){
    const id = restViewId.value;
    fetch(API + "/restaurantes/" + id)
        .then(r => r.json())
        .then(data => restView.innerHTML = JSON.stringify(data, null, 2));
}
function verRider(){
    const id = riderViewId.value;
    fetch(API + "/riders/" + id)
        .then(r => r.json())
        .then(data => riderView.innerHTML = JSON.stringify(data, null, 2));
}
function verUsuario(){
    const id = userViewId.value;
    fetch(API + "/usuarios/" + id)
        .then(r => r.json())
        .then(data => usuarioView.innerHTML = JSON.stringify(data, null, 2));
}
function verPedido(){
    const id = pedidoViewId.value;
    fetch(API + "/pedidos/" + id)
        .then(r => r.json())
        .then(data => pedidoView.innerHTML = JSON.stringify(data, null, 2));
}

// ===================== EDITAR ======================
function editarRestaurante(){
    const id = restEditId.value;
    const nombre = restEditName.value;
    const categorias = restEditCat.value.split(",").map(c => c.trim());
    fetch(API + "/restaurantes/" + id, {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ nombre, categorias })
    }).then(() => { alert("Editado"); getRestaurantes(); });
}

function editarRider(){
    const id = riderEditId.value;
    const nombre = riderEditName.value;
    const vehiculo = riderEditVeh.value;
    const estado = riderEditEstado.value;
    fetch(API + "/riders/" + id, {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ nombre, vehiculo, estado })
    }).then(() => { alert("Editado"); getRiders(); });
}

function editarUsuario(){
    const id = userEditId.value;
    const nombre = userEditName.value;
    const direccion = userEditDir.value;
    const telefono = userEditTel.value;
    fetch(API + "/usuarios/" + id, {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ nombre, direccion, telefono })
    }).then(() => { alert("Editado"); getUsuarios(); });
}

function editarPedido(){
    const id = pedidoEditId.value;
    const estado = pedidoEditEstado.value;
    fetch(API + "/pedidos/" + id, {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ estado })
    }).then(() => { alert("Editado"); getPedidos(); });
}

// ===================== ELIMINAR ======================
function borrarRestaurante(){ fetch(API+"/restaurantes/"+restDeleteId.value,{method:"DELETE"}).then(()=>{alert("Eliminado"); getRestaurantes();});}
function borrarRider(){ fetch(API+"/riders/"+riderDeleteId.value,{method:"DELETE"}).then(()=>{alert("Eliminado"); getRiders();});}
function borrarUsuario(){ fetch(API+"/usuarios/"+userDeleteId.value,{method:"DELETE"}).then(()=>{alert("Eliminado"); getUsuarios();});}
function borrarPedido(){ fetch(API+"/pedidos/"+pedidoDeleteId.value,{method:"DELETE"}).then(()=>{alert("Eliminado"); getPedidos();});}

// ===================== CONSULTA ======================
function cargarDashboard() {
    fetch(API + "/dashboard")
        .then(r => r.json())
        .then(data => {
            const container = document.getElementById("dashboard");
            container.innerHTML = "";

            for (const [coleccion, items] of Object.entries(data)) {
                const h3 = document.createElement("h3");
                h3.textContent = coleccion.toUpperCase();
                container.appendChild(h3);

                if (!items.length) {
                    const p = document.createElement("p");
                    p.textContent = "No hay datos";
                    container.appendChild(p);
                    continue;
                }

                const table = document.createElement("table");
                table.classList.add("data-table");
                const thead = document.createElement("thead");
                const tbody = document.createElement("tbody");

                // encabezados
                const trHead = document.createElement("tr");
                Object.keys(items[0]).forEach(key => {
                    const th = document.createElement("th");
                    th.textContent = key;
                    trHead.appendChild(th);
                });
                thead.appendChild(trHead);

                // filas
                items.forEach(item => {
                    const tr = document.createElement("tr");
                    Object.values(item).forEach(v => {
                        const td = document.createElement("td");
                        if (Array.isArray(v)) td.textContent = v.join(", ");
                        else if (typeof v === "object" && v !== null) td.textContent = JSON.stringify(v);
                        else td.textContent = v;
                        tr.appendChild(td);
                    });
                    tbody.appendChild(tr);
                });

                table.appendChild(thead);
                table.appendChild(tbody);
                container.appendChild(table);
            }
        })
        .catch(err => {
            console.error(err);
            document.getElementById("dashboard").textContent = "Error cargando los datos";
        });
}

