let ptsJogador = 0;
let ptsCpu = 0;
let ptsEmpate = 0;

const visorJogador = document.getElementById('ptsJogador');
const visorCpu = document.getElementById('ptsCpu');
const visorEmpate = document.getElementById('ptsEmpate');
const visorResultado = document.getElementById('resultado');
const botoesEscolha = document.querySelectorAll('.btn-escolha');
const btnReset = document.getElementById('btnReset');

const opcoes = ['pedra', 'papel', 'tesoura'];
const emojis = { pedra: '🪨', papel: '📄', tesoura: '✂️' };

function jogar(escolhaJogador) {
    const escolhaCpu = opcoes[Math.floor(Math.random() * opcoes.length)];
    visorResultado.className = 'resultado'; // Limpa classes anteriores

    if (escolhaJogador === escolhaCpu) {
        ptsEmpate++;
        visorResultado.textContent = `Empate! Ambos escolheram ${emojis[escolhaJogador]}`;
        visorResultado.classList.add('empate');
    } else if (
        (escolhaJogador === 'pedra' && escolhaCpu === 'tesoura') ||
        (escolhaJogador === 'papel' && escolhaCpu === 'pedra') ||
        (escolhaJogador === 'tesoura' && escolhaCpu === 'papel')
    ) {
        ptsJogador++;
        visorResultado.textContent = `Você venceu! ${emojis[escolhaJogador]} ganha de ${emojis[escolhaCpu]}`;
        visorResultado.classList.add('vitoria');
    } else {
        ptsCpu++;
        visorResultado.textContent = `Você perdeu! ${emojis[escolhaCpu]} ganha de ${emojis[escolhaJogador]}`;
        visorResultado.classList.add('derrota');
    }

    atualizarPlacar();
}

function atualizarPlacar() {
    visorJogador.textContent = ptsJogador;
    visorCpu.textContent = ptsCpu;
    visorEmpate.textContent = ptsEmpate;
}

function resetarJogo() {
    ptsJogador = 0;
    ptsCpu = 0;
    ptsEmpate = 0;
    atualizarPlacar();
    visorResultado.className = 'resultado';
    visorResultado.textContent = 'Placar zerado! Faça a sua jogada.';
}

botoesEscolha.forEach(btn => {
    btn.addEventListener('click', () => {
        jogar(btn.getAttribute('data-jogada'));
    });
});

btnReset.addEventListener('click', resetarJogo);

document.addEventListener('keydown', (e) => {
    const tecla = e.key.toLowerCase();
    
    if (tecla === '1') {
        botoesEscolha[0].focus();
        jogar('pedra');
    } else if (tecla === '2') {
        botoesEscolha[1].focus();
        jogar('papel');
    } else if (tecla === '3') {
        botoesEscolha[2].focus();
        jogar('tesoura');
    } else if (tecla === 'r') {
        btnReset.focus();
        resetarJogo();
    }
});