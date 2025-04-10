let alunos = [];

function processarAlunos() {
    let alunosText = document.getElementById("alunosLista").value.trim();
    let formularioDiv = document.getElementById("formulario");
    let botaoParecer = document.getElementById("btnParecer");

    if (!alunosText) {
        alert("Cole a lista de alunos!");
        return;
    }

    alunos = alunosText.split("\n").map(aluno => aluno.trim()).filter(aluno => aluno !== "");
    formularioDiv.innerHTML = "";

    alunos.forEach((aluno, index) => {
        formularioDiv.innerHTML += `
            <div class="aluno-card">
                <h4>${aluno}</h4>
                
                <label>Programa estudado:</label>
                <select id="programa-${index}">
                    <option value="Word">Word</option>
                    <option value="Excel">Excel</option>
                    <option value="PowerPoint">PowerPoint</option>
                </select>

                <label>Realiza as atividades?</label>
                <select id="realiza-${index}">
                    <option value="sim">Sim</option>
                    <option value="não">Não</option>
                </select>

                <label>Tem facilidade?</label>
                <select id="facilidade-${index}">
                    <option value="sim">Sim</option>
                    <option value="não">Não</option>
                </select>

                <label>Demonstra conhecimento?</label>
                <select id="conhecimento-${index}">
                    <option value="sim">Sim</option>
                    <option value="não">Não</option>
                </select>
            </div>
        `;
    });

    botaoParecer.style.display = "block";
}

function gerarParecer() {
    let resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "";

    alunos.forEach((aluno, index) => {
        let programa = document.getElementById(`programa-${index}`).value;
        let realiza = document.getElementById(`realiza-${index}`).value;
        let facilidade = document.getElementById(`facilidade-${index}`).value;
        let conhecimento = document.getElementById(`conhecimento-${index}`).value;

        let parecer = criarParecerCompleto(aluno, programa, realiza, facilidade, conhecimento);
        
        resultadoDiv.innerHTML += `<p>${parecer}</p>`;
    });
}

function criarParecerCompleto(aluno, programa, realiza, facilidade, conhecimento) {
    let participacao = realiza === "sim" 
        ? "Participa ativamente das atividades em sala de aula, demonstrando interesse e dedicação." 
        : "Participa parcialmente das atividades em sala de aula, necessitando maior envolvimento.";

    let totalSim = [realiza, facilidade, conhecimento].filter(res => res === "sim").length;

    let parecerPositivo = [
        `Demonstra compromisso com a aprendizagem e busca sempre melhorar suas habilidades no ${programa}. Com acompanhamento docente, demonstra capacidade de acessar sites de pesquisa e jogos, apresentando apropriação parcial dos conteúdos de Hardware, Software (partes do computador), regras do laboratório e programas como o Paint.`,
        `Apresenta interesse pelo ${programa}, explorando suas ferramentas (menus) de forma eficiente. Evidencia compreensão parcial dos conteúdos desenvolvidos no trimestre, como Hardware, Software, normas do laboratório e uso de programas como o Paint, acessando sites de pesquisa e jogos com mediação do professor. `,
        `Tem se destacado no uso do ${programa}, mostrando evolução no aprendizado, utilizando os comandos estudados com certa facilidade. Apresenta apropriação parcial dos conceitos relacionados ao funcionamento do computador (Hardware e Software), regras do laboratório e uso de ferramentas como o Paint, realizando acessos a sites de pesquisa e jogos sob orientação.`,
        `Participa com entusiasmo das aulas e colabora com seus colegas nas atividades do ${programa}. Participa das atividades propostas com apoio docente, acessando sites de pesquisa e jogos, e demonstra assimilação parcial dos conteúdos de Hardware, Software, normas do laboratório e programas trabalhados, como o Paint.`,
        `Mantém um bom ritmo de aprendizagem e explora as funcionalidades do ${programa} com autonomia. Com suporte pedagógico, realiza navegação orientada em sites de pesquisa e jogos, evidenciando compreensão parcial dos conteúdos de Hardware, Software, regras do laboratório e dos programas utilizados nas aulas, como o Paint.`,
        `Demonstra facilidade na utilização dos recursos do ${programa}, aplicando-os de maneira criativa. Revela avanços parciais no entendimento sobre Hardware, Software, regras do laboratório e utilização de programas como o Paint, acessando sites com acompanhamento e orientação adequados.`
    ];

    let parecerNegativo = [
        `Ainda enfrenta dificuldades na utilização do ${programa}, necessitando maior dedicação. Apesar do acompanhamento do professor, apresenta dificuldades em acessar de forma autônoma sites de pesquisa e jogos. A apropriação dos conteúdos sobre Hardware, Software, regras do laboratório e programas como o Paint ocorreu de maneira limitada, sendo necessário reforço contínuo.`,
        `Demonstra pouco domínio sobre as ferramentas do ${programa}, precisando praticar mais. Requer maior acompanhamento para acessar adequadamente sites educativos. A compreensão dos conteúdos trabalhados no trimestre, como Hardware, Software, normas do laboratório e uso do Paint, ainda está em desenvolvimento.`,
        `Precisa aprimorar suas habilidades no ${programa}, explorando melhor suas funcionalidades. Demonstra necessidade de apoio constante para realizar atividades que envolvem navegação em sites e utilização de programas. A apropriação dos conteúdos de Hardware, Software e regras do laboratório foi parcial, indicando a importância de estratégias pedagógicas diferenciadas.`,
        `Enfrenta desafios no uso do ${programa}, mas pode melhorar com mais prática e atenção. Apresenta limitações no uso de recursos digitais, mesmo com orientação docente. Os conteúdos relacionados ao funcionamento do computador e ao uso responsável do laboratório ainda não foram plenamente assimilados, demandando intervenções pedagógicas mais individualizadas.`,
        `Necessita de maior envolvimento para compreender e aplicar os recursos do ${programa} com eficiência. Evidencia dificuldades em compreender e aplicar os conceitos de Hardware, Software, regras do laboratório e utilização de programas como o Paint, mesmo com mediação do professor. O progresso foi discreto, sendo necessário acompanhamento mais próximo.`,
        `Tem dificuldades no uso do ${programa}, sendo essencial mais treino para avançar no aprendizado. A apropriação dos conteúdos relacionados ao uso do computador e navegação em sites educativos permanece em estágio inicial. Comportamentos esperados no ambiente digital e conhecimento de programas como o Paint ainda requerem maior desenvolvimento.`
    ];

    let parecerEscolhido = totalSim >= 2 
        ? parecerPositivo[Math.floor(Math.random() * parecerPositivo.length)] 
        : parecerNegativo[Math.floor(Math.random() * parecerNegativo.length)];

    let parecerFinal = `${aluno}. ${participacao} ${parecerEscolhido}`;

    return parecerFinal;
}
