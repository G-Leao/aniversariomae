// ===== CONFIGURAÇÃO =====
const MES_ANIVERSARIO = 10; // 0 = janeiro ... 10 = novembro
const DIA_ANIVERSARIO = 21;

// ===== CONTAGEM REGRESSIVA =====
const contagem = document.getElementById("contagem");

function atualizarContagem() {
  const agora = new Date();
  const ano = agora.getFullYear();
  const inicio = new Date(ano, MES_ANIVERSARIO, DIA_ANIVERSARIO);
  const fim = new Date(ano, MES_ANIVERSARIO, DIA_ANIVERSARIO + 1);

  // Dia do aniversário
  if (agora >= inicio && agora < fim) {
    contagem.innerHTML = '<p class="contagem-hoje">Feliz seu diaaa!</p>';
    return;
  }

  // Antes do dia: conta pra este ano. Depois: conta pro próximo.
  const alvo = agora < inicio
    ? inicio
    : new Date(ano + 1, MES_ANIVERSARIO, DIA_ANIVERSARIO);

  const diff = alvo - agora;
  const dias = Math.floor(diff / 86400000);
  const horas = Math.floor((diff % 86400000) / 3600000);
  const minutos = Math.floor((diff % 3600000) / 60000);
  const segundos = Math.floor((diff % 60000) / 1000);

  contagem.innerHTML = `
    <div class="contagem-item"><strong>${dias}</strong><span>dias</span></div>
    <div class="contagem-item"><strong>${String(horas).padStart(2, "0")}</strong><span>horas</span></div>
    <div class="contagem-item"><strong>${String(minutos).padStart(2, "0")}</strong><span>min</span></div>
    <div class="contagem-item"><strong>${String(segundos).padStart(2, "0")}</strong><span>seg</span></div>
  `;
}

if (contagem) {
  atualizarContagem();
  setInterval(atualizarContagem, 1000);
}

// ===== CONFETE =====
const CORES = ["#bcd7ff", "#1f4fd8", "#f2b84b", "#ffffff", "#6f9bff"];
const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function soltarConfete(quantidade = 90) {
  if (reduzirMovimento) return;

  for (let i = 0; i < quantidade; i++) {
    const pedaco = document.createElement("span");
    pedaco.className = "confete";
    pedaco.style.left = Math.random() * 100 + "vw";
    pedaco.style.background = CORES[Math.floor(Math.random() * CORES.length)];
    pedaco.style.animationDuration = 2.5 + Math.random() * 2.5 + "s";
    pedaco.style.animationDelay = Math.random() * 0.8 + "s";
    pedaco.style.setProperty("--giro", Math.random() * 720 - 360 + "deg");
    document.body.appendChild(pedaco);
    pedaco.addEventListener("animationend", () => pedaco.remove());
  }
}

// Confete quando ela clica na surpresa
const surpresa = document.getElementById("surpresa");
if (surpresa) {
  surpresa.addEventListener("change", () => {
    if (surpresa.checked) soltarConfete();
  });
}

// Confete uma vez ao abrir a página
window.addEventListener("load", () => setTimeout(() => soltarConfete(60), 400));

// ================================================
// ANIMAÇÕES (v2)
// ================================================

// Título do hero: cada letra entra em sequência
document.querySelectorAll(".hero-titulo .linha").forEach((linha, l) => {
  const texto = linha.textContent;
  linha.textContent = "";
  [...texto].forEach((c, i) => {
    const s = document.createElement("span");
    s.className = "letra";
    s.textContent = c;
    s.style.setProperty("--i", i + l * 9);
    linha.appendChild(s);
  });
});

// Estrelas piscando no hero
const estrelas = document.getElementById("estrelas");
if (estrelas) {
  for (let i = 0; i < 45; i++) {
    const e = document.createElement("span");
    e.className = "estrela";
    e.style.left = Math.random() * 100 + "%";
    e.style.top = Math.random() * 100 + "%";
    e.style.setProperty("--t", 2 + Math.random() * 2 + "px");
    e.style.setProperty("--d", 1.5 + Math.random() * 2.5 + "s");
    e.style.setProperty("--a", -Math.random() * 4 + "s");
    estrelas.appendChild(e);
  }
}

// Revelar elementos ao rolar
const alvos = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visivel");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  alvos.forEach((a) => obs.observe(a));
} else {
  alvos.forEach((a) => a.classList.add("visivel"));
}

// Envelope da carta
const cena = document.getElementById("cena");
const abrir = document.getElementById("abrir");
const envTexto = document.getElementById("envelope-texto");
const papel = document.getElementById("papel");

if (cena && abrir) {
  abrir.addEventListener("click", () => {
    const aberta = cena.classList.toggle("aberta");
    abrir.setAttribute("aria-expanded", aberta);
    envTexto.textContent = aberta ? "Toque para fechar" : "Toque para abrir";
    if (aberta) {
      soltarConfete(40);
      setTimeout(() => papel.scrollIntoView({ behavior: "smooth", block: "center" }), 1400);
    }
  });
}

// Corações subindo
function soltarCoracoes(quantidade = 22) {
  if (reduzirMovimento) return;
  for (let i = 0; i < quantidade; i++) {
    const c = document.createElement("span");
    c.className = "coracao";
    c.textContent = "♥";
    c.style.left = Math.random() * 100 + "vw";
    c.style.fontSize = 14 + Math.random() * 22 + "px";
    c.style.color = CORES[Math.floor(Math.random() * CORES.length)];
    c.style.setProperty("--desvio", Math.random() * 120 - 60 + "px");
    c.style.animationDuration = 4 + Math.random() * 3 + "s";
    c.style.animationDelay = Math.random() * 1.2 + "s";
    document.body.appendChild(c);
    c.addEventListener("animationend", () => c.remove());
  }
}

if (surpresa) {
  surpresa.addEventListener("change", () => {
    if (surpresa.checked) soltarCoracoes();
  });
} 