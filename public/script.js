function verificarAdmin() {
    // const senha = prompt("Digite a senha de administrador:");

    // fetch("/admin-login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ senha })
    // })
    // .then(response => response.json())
    // .then(data => {
    //     if (data.autorizado) {
            window.location.href = "admin.html";
    //     } else {
    //         alert("Senha incorreta!");
    //     }
    // })
    // .catch(() => alert("Erro ao verificar senha!"));
}

function enviarAvaliacao() {
    const nomeAvaliador = document.getElementById("nomeAvaliador").value.trim();
    const notas = document.querySelectorAll(".nota");
    let avaliacoes = [];
    let notasInvalidas = false;

    if (!nomeAvaliador) {
        alert("Por favor, insira seu nome.");
        return;
    }

    notas.forEach(nota => {
        const valorNota = nota.value.trim().replace(',', '.');
        if (valorNota !== "") {
            const notaFloat = parseFloat(valorNota);
            if (isNaN(notaFloat) || notaFloat < 0 || notaFloat > 10) {
                notasInvalidas = true;
            } else {
                avaliacoes.push({
                    nomeAvaliado: nota.closest("tr").querySelector("td").textContent.trim(),
                    nota: notaFloat
                });
            }
        }
    });

    if (notasInvalidas) {
        alert("Notas inválidas! Certifique-se de que todas as notas estão entre 0 e 10.");
        return;
    }

    if (avaliacoes.length === 0) {
        alert("Você precisa avaliar pelo menos um participante.");
        return;
    }

    fetch("/avaliar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomeAvaliador, avaliacoes })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        window.location.href = "index.html";
    })
    .catch(() => alert("Erro ao enviar avaliação."));
}

let dadosOriginais = {};

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("admin.html")) {
        fetch("/dados-admin")
            .then(response => response.json())
            .then(data => {
                dadosOriginais = JSON.parse(JSON.stringify(data)); // Copia profunda dos dados

                preencherTabela(data.mediasFinal, "tabela-medias", ["avaliado", "media"]);
                preencherTabela(data.mediasHistorico, "tabela-historico", ["avaliado", "media"]);
                preencherTabela(data.mediasEntrevista, "tabela-entrevista", ["avaliado", "media"]);
                preencherTabela(data.cartaIntencao, "tabela-carta", ["avaliado", "nota"]);
                preencherTabela(data.avaliacoes, "tabela-avaliacoes", ["avaliador", "avaliado", "nota"]);
            })
            .catch(() => console.error("Erro ao carregar dados!"));
    }
});

function preencherTabela(dados, tabelaId, colunas) {
    const tabela = document.getElementById(tabelaId);
    tabela.innerHTML = "";

    dados.forEach(item => {
        const row = tabela.insertRow();
        colunas.forEach(coluna => {
            const cell = row.insertCell();
            cell.textContent = item[coluna];
        });
    });
}

function buscarTabela() {
    const termo = document.getElementById("busca").value.toLowerCase();
    const tabelas = document.querySelectorAll("tbody");

    tabelas.forEach(tabela => {
        const linhas = tabela.querySelectorAll("tr");
        linhas.forEach(linha => {
            linha.style.display = linha.textContent.toLowerCase().includes(termo) ? "" : "none";
        });
    });
}

let ordenado = false;

function ordenarAutomaticamente() {
    if (!ordenado) {
        Object.keys(dadosOriginais).forEach(key => {
            dadosOriginais[key].sort((a, b) => (b.media || b.nota) - (a.media || a.nota));
            preencherTabela(dadosOriginais[key], getTabelaId(key), getColunas(key));
        });
        ordenado = true;
        alert("Tabela organizada da maior para a menor nota.");
    } else {
        window.location.reload(); // Recarrega a página para voltar para a ordem original
    }
}

function getTabelaId(key) {
    return {
        mediasFinal: "tabela-medias",
        mediasHistorico: "tabela-historico",
        mediasEntrevista: "tabela-entrevista",
        cartaIntencao: "tabela-carta",
        avaliacoes: "tabela-avaliacoes"
    }[key];
}

function getColunas(key) {
    return {
        mediasFinal: ["avaliado", "media"],
        mediasHistorico: ["avaliado", "media"],
        mediasEntrevista: ["avaliado", "media"],
        cartaIntencao: ["avaliado", "nota"],
        avaliacoes: ["avaliador", "avaliado", "nota"]
    }[key];
}

function exportarPDF(tabelaId, titulo) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    pdf.text(titulo, 10, 10);
    pdf.autoTable({ html: `#${tabelaId}` });
    pdf.save(`${titulo}.pdf`);
}

