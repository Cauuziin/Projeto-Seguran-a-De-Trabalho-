// ======== Alterna entre seções ========
const links = document.querySelectorAll("nav a");
const conteudos = document.querySelectorAll(".conteudo");

links.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const alvo = link.getAttribute("href").replace("#", "");

        // remove ativo
        links.forEach(l => l.classList.remove("ativo"));
        conteudos.forEach(c => c.classList.remove("ativo"));

        // adiciona ativo
        link.classList.add("ativo");
        document.getElementById(alvo).classList.add("ativo");

        // inicia o mapa quando clicar
        if (alvo === "mapa") {
            setTimeout(initMap, 300);
        }
    });
});

// ======== Mapa Leaflet ========
let map;

function initMap() {
    if (map) {
        map.invalidateSize();
        return;
    }

    map = L.map('map').setView([-14.235, -51.9253], 4); // Brasil inteiro

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    // ======== Marcadores ========
    const marcadores = [
        { nome: "São Paulo", coords: [-23.55, -46.63], info: "Centro de monitoramento sudeste" },
        { nome: "Rio de Janeiro", coords: [-22.91, -43.17], info: "Estações de qualidade do ar" },
        { nome: "Brasília", coords: [-15.78, -47.93], info: "Sede Nacional de Monitoramento" },
        { nome: "Manaus", coords: [-3.11, -60.02], info: "Monitoramento da Amazônia" },
        { nome: "Porto Alegre", coords: [-30.03, -51.23], info: "Estação Sul de observação" }
    ];

    marcadores.forEach(m => {
        L.marker(m.coords)
            .addTo(map)
            .bindPopup(`<b>${m.nome}</b><br>${m.info}`);
    });
}
let map; // variável global para o mapa

document.querySelector('a[href="#mapa"]').addEventListener('click', (e) => {
    e.preventDefault();

    // ativa a seção do mapa
    document.querySelectorAll('.conteudo').forEach(sec => sec.classList.remove('ativo'));
    document.getElementById('mapa').classList.add('ativo');

    // inicializa o mapa se ainda não foi criado
    if (!map) {
        setTimeout(() => {
            map = L.map('map').setView([-14.235, -51.9253], 4); // Brasil inteiro
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; OpenStreetMap'
            }).addTo(map);
        }, 300);
    } else {
        map.invalidateSize(); // corrige exibição ao voltar pro mapa
    }
}); // --- MENU INTERATIVO + MAPA ---
const links = document.querySelectorAll("nav a");
const secoes = document.querySelectorAll("main section");

let mapaCarregado = false;
let mapa; // variável global do mapa

links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const alvo = link.getAttribute("data-section");

        // alterna visibilidade das seções
        links.forEach(l => l.classList.remove("ativo"));
        secoes.forEach(sec => sec.classList.remove("ativo"));
        link.classList.add("ativo");
        document.getElementById(alvo).classList.add("ativo");

        // 👉 quando clicar em "Mapa", ativa o mapa interativo
        if (alvo === "mapa") {
            setTimeout(() => {
                if (!mapaCarregado) {
                    mapa = L.map('map').setView([-14.235, -51.9253], 4); // Brasil
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                        attribution: '&copy; OpenStreetMap'
                    }).addTo(mapa);
                    mapaCarregado = true;
                } else {
                    mapa.invalidateSize(); // re-renderiza se já estiver criado
                }
            }, 300);
        }
    });
});