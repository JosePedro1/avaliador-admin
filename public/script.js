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
        const valorNota = nota.value.trim().replace(',', '.'); // Aceita vírgula ou ponto
        if (valorNota !== "") { // Apenas verifica notas preenchidas
            const notaFloat = parseFloat(valorNota);
            if (isNaN(notaFloat) || notaFloat < 0 || notaFloat > 10) {
                notasInvalidas = true; // Marca que existe uma nota inválida
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

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("admin.html")) {
        fetch("/dados-admin")
            .then(response => response.json())
            .then(data => {
                preencherTabela(data.avaliacoes, "tabela-avaliacoes", ["avaliador", "avaliado", "nota"]);
                preencherTabela(data.mediasFinal, "tabela-medias-final", ["avaliado", "media"]);
                preencherTabela(data.mediasEntrevista, "tabela-medias-entrevista", ["avaliado", "media"]);
                preencherTabela(data.mediasHistorico, "tabela-medias-historico", ["avaliado", "media"]);
                preencherTabela(data.cartaIntencao, "tabela-carta-intencao", ["avaliado", "nota"]);
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

