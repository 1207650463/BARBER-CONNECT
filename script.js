// BARBERHUB PE
// Cadastro demonstrativo das barbearias

const barbearias = [

    {
        id: 1,
        nome: "Barbearia Central",
        cidade: "Mirandiba",
        endereco: "Centro, Mirandiba - PE",
        iniciais: "BC",
        whatsapp: "",
        barbeiros: [
            { nome: "Rafael", status: "Disponível" },
            { nome: "Diego", status: "Em atendimento" }
        ]
    },

    {
        id: 2,
        nome: "Estilo de Respeito",
        cidade: "Mirandiba",
        endereco: "Mirandiba - PE",
        iniciais: "ER",
        whatsapp: "",
        barbeiros: [
            { nome: "Lucas", status: "Disponível" },
            { nome: "João", status: "Disponível" }
        ]
    },

    {
        id: 3,
        nome: "Navalha Premium",
        cidade: "Carnaubeira da Penha",
        endereco: "Centro, Carnaubeira da Penha - PE",
        iniciais: "NP",
        whatsapp: "",
        barbeiros: [
            { nome: "Matheus", status: "Em atendimento" },
            { nome: "André", status: "Disponível" }
        ]
    },

    {
        id: 4,
        nome: "Barber Shop Penha",
        cidade: "Carnaubeira da Penha",
        endereco: "Carnaubeira da Penha - PE",
        iniciais: "BP",
        whatsapp: "",
        barbeiros: [
            { nome: "Gabriel", status: "Disponível" }
        ]
    },

    {
        id: 5,
        nome: "Dom Corte",
        cidade: "Cachoeirinha",
        endereco: "Centro, Cachoeirinha - PE",
        iniciais: "DC",
        whatsapp: "",
        barbeiros: [
            { nome: "Pedro", status: "Disponível" },
            { nome: "Bruno", status: "Em atendimento" }
        ]
    },

    {
        id: 6,
        nome: "Cachoeirinha Barber",
        cidade: "Cachoeirinha",
        endereco: "Cachoeirinha - PE",
        iniciais: "CB",
        whatsapp: "",
        barbeiros: [
            { nome: "Felipe", status: "Em atendimento" }
        ]
    }

];

// ELEMENTOS DO HTML

const lista = document.getElementById("listaBarbearias");
const pesquisa = document.getElementById("pesquisa");
const cidade = document.getElementById("cidade");
const disponibilidade = document.getElementById("disponibilidade");
const contador = document.getElementById("contador");

// VERIFICAR DISPONIBILIDADE

function temDisponivel(barbearia) {

    return barbearia.barbeiros.some(
        barbeiro => barbeiro.status === "Disponível"
    );

}

// PROTEGER TEXTO INSERIDO NO HTML

function escapar(texto) {

    return String(texto).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[caractere]);

}

// MOSTRAR BARBEARIAS

function mostrarBarbearias() {

    const termo = pesquisa.value
        .trim()
        .toLocaleLowerCase("pt-BR");

    const cidadeSelecionada = cidade.value;
    const disponibilidadeSelecionada = disponibilidade.value;

    const filtradas = barbearias.filter(barbearia => {

        const conteudo = [

            barbearia.nome,
            barbearia.cidade,
            barbearia.endereco,

            ...barbearia.barbeiros.map(
                barbeiro => barbeiro.nome
            )

        ].join(" ").toLocaleLowerCase("pt-BR");

        const correspondePesquisa =
            conteudo.includes(termo);

        const correspondeCidade =
            cidadeSelecionada === "Todas" ||
            barbearia.cidade === cidadeSelecionada;

        const correspondeDisponibilidade =
            disponibilidadeSelecionada === "Todas" ||
            temDisponivel(barbearia);

        return correspondePesquisa &&
            correspondeCidade &&
            correspondeDisponibilidade;

    });

    contador.textContent =
        `${filtradas.length} barbearia(s) encontrada(s)`;

    if (filtradas.length === 0) {

        lista.innerHTML = `
            <div class="vazio">
                <h2>NENHUMA BARBEARIA ENCONTRADA</h2>
                <p>Tente pesquisar outra cidade ou nome.</p>
            </div>
        `;

        return;

    }

    lista.innerHTML = filtradas.map(barbearia => {

        const disponivel = temDisponivel(barbearia);

        return `

            <div class="card">

                <div class="card-topo">

                    <h2>${escapar(barbearia.iniciais)}</h2>

                    <span>✂</span>

                </div>

                <div class="card-info">

                    <h3>${escapar(barbearia.nome)}</h3>

                    <p>
                        📍 ${escapar(barbearia.endereco)}
                    </p>

                    <p>
                        ${barbearia.barbeiros.length}
                        profissional(is)
                    </p>

                    <p class="status ${disponivel ? "" : "ocupado"}">

                        ${disponivel
                            ? "● Barbeiro disponível"
                            : "● Sem disponibilidade no momento"
                        }

                    </p>

                    <div class="acoes">

                        <button
                            onclick="abrirDetalhes(${barbearia.id})">

                            VER BARBEIROS

                        </button>

                        <button
                            class="detalhes"
                            onclick="abrirContato(${barbearia.id})">

                            CONTATO ↗

                        </button>

                    </div>

                </div>

            </div>

        `;

    }).join("");

}

// ABRIR DETALHES DA BARBEARIA

function abrirDetalhes(id) {

    const barbearia = barbearias.find(
        item => item.id === id
    );

    if (!barbearia) return;

    document.getElementById("nomeModal").textContent =
        barbearia.nome;

    document.getElementById("enderecoModal").textContent =
        barbearia.endereco;

    const areaBarbeiros =
        document.getElementById("barbeirosModal");

    areaBarbeiros.innerHTML = barbearia.barbeiros.map(barbeiro => {

        const disponivel =
            barbeiro.status === "Disponível";

        return `

            <div class="barbeiro-item">

                <strong>${escapar(barbeiro.nome)}</strong>

                <span class="${disponivel
                    ? "disponivel"
                    : "indisponivel"
                }">

                    ${disponivel
                        ? "● Disponível"
                        : "● Em atendimento"
                    }

                </span>

            </div>

        `;

    }).join("");

    const contato =
        document.getElementById("contatoModal");

    const numero = barbearia.whatsapp.replace(/\D/g, "");

    if (numero) {

        contato.href =
            `https://wa.me/${numero}`;

        contato.classList.remove("escondido");

    } else {

        contato.removeAttribute("href");
        contato.classList.add("escondido");

    }

    document.getElementById("modal")
        .classList.add("ativo");

}

// ABRIR CONTATO

function abrirContato(id) {

    abrirDetalhes(id);

}

// FECHAR JANELA

function fecharModal() {

    document.getElementById("modal")
        .classList.remove("ativo");

}

// FECHAR CLICANDO FORA

document.getElementById("modal").addEventListener(
    "click",
    function(event) {

        if (event.target === this) {
            fecharModal();
        }

    }
);

// FECHAR COM ESC

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        fecharModal();
    }

});

// MENU DO CELULAR

function toggleMenu() {

    document.getElementById("menu")
        .classList.toggle("ativo");

}

// FECHAR MENU AO CLICAR EM UM LINK

document.querySelectorAll("#menu a").forEach(link => {

    link.addEventListener("click", function() {

        document.getElementById("menu")
            .classList.remove("ativo");

    });

});

// ANO AUTOMÁTICO

document.getElementById("ano").textContent =
    new Date().getFullYear();

// INICIAR SITE

mostrarBarbearias();
