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
                dadosOriginais = JSON.parse(JSON.stringify(data));

                preencherTabela(data.mediasFinal, "tabela-medias", ["nome", "nota"]);
                preencherTabela(data.mediasHistorico, "tabela-historico", ["nome", "nota"]);
                preencherTabela(data.mediasEntrevista, "tabela-entrevista", ["nome", "nota"]);
                preencherTabela(data.cartaIntencao, "tabela-carta", ["nome", "nota"]);
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
    const termo = document.getElementById("busca").value.toLowerCase().trim();
    if (termo === "") {
        window.location.reload();
        return;
    }
    const linhas = document.querySelectorAll("tbody tr");
    linhas.forEach(linha => {
        linha.style.display = linha.textContent.toLowerCase().includes(termo) ? "" : "none";
    });
}


let ordenado = false;

function ordenarAutomaticamente() {
    const botao = document.getElementById("botaoOrdenar");
    if (!ordenado) {
        Object.keys(dadosOriginais).forEach(key => {
            dadosOriginais[key].sort((a, b) => {
                const valorA = a.media || a.nota || 0;
                const valorB = b.media || b.nota || 0;
                return valorB - valorA;
            });
            
            preencherTabela(dadosOriginais[key], getTabelaId(key), getColunas(key));
        });
        ordenado = true;
        botao.textContent = "voltar para ordem inicial";
        alert("Tabela organizada da maior para a menor nota.");
    } else {
        window.location.reload(); 
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
        mediasFinal: ["nome", "nota"],
        mediasHistorico: ["nome", "nota"],
        mediasEntrevista: ["nome", "nota"],
        cartaIntencao: ["nome", "nota"],
        avaliacoes: ["avaliador", "avaliado", "nota"]
    }[key];
}

function exportarPDF(tabelaId, titulo, botao) {
    const confirmacao = confirm(`Deseja fazer o download da tabela "${titulo}" em PDF?`);
    if (confirmacao) {
        botao.textContent = "Baixando... 🔥";
        botao.disabled = true;

        setTimeout(() => {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();
            pdf.text(titulo, 10, 10);
            pdf.autoTable({
                html: `#${tabelaId}`,
                startY: 20,
                margin: { top: 20 },
                styles: { fontSize: 12, cellPadding: 5, halign: "center" },
                theme: "striped"
            });

            pdf.save(`${titulo}.pdf`);
            alert(`Download "${titulo}" realizado com sucesso!`);

            botao.textContent = "Exportar para PDF";
            botao.disabled = false;
        }, 2000);
    } else {
        alert("Download cancelado.");
    }
}

function exportarTodosPDFs(botao) {
    const confirmacao = confirm("Deseja fazer o download de todas as tabelas em um único PDF?");
    if (confirmacao) {
        botao.textContent = "Baixando... 🔥";
        botao.disabled = true;

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();

        const tabelas = [
            { id: "tabela-medias", titulo: "Nota Final" },
            { id: "tabela-historico", titulo: "Média do Histórico" },
            { id: "tabela-entrevista", titulo: "Média da Entrevista" },
            { id: "tabela-carta", titulo: "Carta de Intenção" },
            { id: "tabela-avaliacoes", titulo: "Notas dos Avaliadores" }
        ];

        let pagina = 1;

        tabelas.forEach(({ id, titulo }, index) => {
            pdf.text(`${titulo}`, 10, 10);
            pdf.autoTable({
                html: `#${id}`,
                startY: 20,
                margin: { top: 20 },
                styles: { fontSize: 12, cellPadding: 5, halign: "center" },
                theme: "striped"
            });

            if (index < tabelas.length - 1) {
                pdf.addPage(); // Pula para a próxima página se não for a última tabela
            }

            pagina++;
        });

        setTimeout(() => {
            pdf.save(`Todas_as_Tabelas.pdf`);
            alert("Todas as tabelas foram exportadas para um único PDF!");
           
            botao.disabled = false;
        }, 2000);
    } else {
        alert("Download cancelado.");
    }
}
