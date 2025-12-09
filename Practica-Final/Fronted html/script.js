const API = "http://localhost:3000";

// ============================
// RENDER TABLA UNIVERSAL ✅
// ============================

function renderTablaGenerica(data, id){
    const container = document.getElementById(id);

    if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = `<p>No hay datos.</p>`;
        return;
    }

    const columnas = Object.keys(data[0]);

    let html = `<table class="data-table"><thead><tr>`;
    columnas.forEach(col => html += `<th>${col}</th>`);
    html += `</tr></thead><tbody>`;

    data.forEach(item => {
        html += `<tr>`;
        columnas.forEach(col => {
            let valor = item[col];

            if (Array.isArray(valor)) valor = valor.join(", ");
            if (typeof valor === "object" && valor !== null) valor = JSON.stringify(valor);
            if (typeof valor === "string" && valor.length > 40) valor = valor.slice(0, 40) + "...";

            html += `<td>${valor}</td>`;
        });
        html += `</tr>`;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
}

function toggleFetchTabla(id, endpoint) {
    const container = document.getElementById(id);

    if (container.querySelector('.data-table') || container.textContent.trim() !== "") {
        container.innerHTML = "";
        return;
    }

    fetch(`${API}${endpoint}`)
        .then(r => r.json())
        .then(data => renderTablaGenerica(data, id))
        .catch(e => {
            console.error(`Error al obtener ${id}:`, e);
            container.innerHTML = `<pre>${JSON.stringify({ error: e.message }, null, 2)}</pre>`;
        });
}

// ============================
// GET (TODOS EN TABLA ✅)
// ============================

function getRestaurantes(){ toggleFetchTabla("restaurantes", "/restaurantes"); }
function getRiders(){ toggleFetchTabla("riders", "/riders"); }
function getUsuarios(){ toggleFetchTabla("usuarios", "/usuarios"); }
function getPedidos(){ toggleFetchTabla("pedidos", "/pedidos"); }

// ============================
// POST (CREAR)
// ============================

function crearRestaurante(){
    const nombre = document.getElementById("restName").value;
    const categorias = document.getElementById("restCat").value
        .split(",")
        .map(cat => cat.trim())
        .filter(cat => cat.length > 0);

    fetch(`${API}/restaurantes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, categorias })
    })
    .then(() => {
        alert("🍽️ Restaurante creado!");
        getRestaurantes();
    });
}

function crearRider(){
    const nombre = document.getElementById("riderName").value;
    const vehiculo = document.getElementById("riderVeh").value;
    const estado = document.getElementById("riderEstado").value;

    fetch(`${API}/riders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, vehiculo, estado })
    })
    .then(() => {
        alert("🏍️ Rider creado!");
        getRiders();
    });
}

function crearUsuario(){
    const nombre = document.getElementById("userName").value;
    const direccion = document.getElementById("userDir").value;
    const telefono = document.getElementById("userTel").value;

    fetch(`${API}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, direccion, telefono })
    })
    .then(() => {
        alert("🧑 Usuario creado!");
        getUsuarios();
    });
}

function crearPedido(){
    const usuarioId = document.getElementById("pedidoUser").value;
    const restauranteId = document.getElementById("pedidoRest").value;
    const riderId = document.getElementById("pedidoRider").value || null;
    const plato = document.getElementById("pedidoPlato").value;
    const cantidad = Number(document.getElementById("pedidoCant").value);
    const precio_unitario = Number(document.getElementById("pedidoPrecio").value);

    if (!usuarioId || !restauranteId || !plato || cantidad <= 0 || precio_unitario < 0) {
        alert("Completa todos los campos correctamente.");
        return;
    }

    const items = [{ plato, cantidad, precio_unitario }];

    fetch(`${API}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuarioId, restauranteId, riderId, items })
    })
    .then(() => {
        alert("📦 Pedido creado!");
        getPedidos();
    });
}

// ============================
// DELETE
// ============================

function borrarRestaurante(){
    const id = document.getElementById("restDeleteId").value;
    if (!id) return;

    fetch(`${API}/restaurantes/${id}`, { method: "DELETE" })
    .then(() => {
        alert("Restaurante eliminado!");
        getRestaurantes();
    });
}

function borrarRider(){
    const id = document.getElementById("riderDeleteId").value;
    if (!id) return;

    fetch(`${API}/riders/${id}`, { method: "DELETE" })
    .then(() => {
        alert("Rider eliminado!");
        getRiders();
    });
}

function borrarUsuario(){
    const id = document.getElementById("userDeleteId").value;
    if (!id) return;

    fetch(`${API}/usuarios/${id}`, { method: "DELETE" })
    .then(() => {
        alert("Usuario eliminado!");
        getUsuarios();
    });
}

function borrarPedido(){
    const id = document.getElementById("pedidoDeleteId").value;
    if (!id) return;

    fetch(`${API}/pedidos/${id}`, { method: "DELETE" })
    .then(() => {
        alert("Pedido eliminado!");
        getPedidos();
    });
}

// ============================
// CONSULTA COMPLEJA EN TABLA ✅
// ============================

function consultaActivos(){
    toggleFetchTabla("consulta", "/pedidos/activos");
}
