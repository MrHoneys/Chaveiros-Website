// Função para rolar suavemente até um elemento com controle de tempo
function smoothScrollTo(element) {
    const start = window.scrollY; // Posição inicial
    const end = element.getBoundingClientRect().top + window.scrollY; // Posição final
    const distance = end - start; // Distância a ser percorrida
    const duration = 1500; // Duração da animação em milissegundos (ajuste conforme necessário)
    let startTime = null;

    // Função de animação
    function animateScroll(timestamp) {
        if (!startTime) startTime = timestamp; // Marca o início da animação

        const progress = timestamp - startTime; // Progresso da animação

        // Calcula a quantidade de rolagem no tempo atual (equação de easing)
        const scrollStep = Math.min(progress / duration, 1) * distance;

        window.scrollTo(0, start + scrollStep); // Realiza a rolagem

        // Se o progresso for menor que a duração, continue a animação
        if (progress < duration) {
            window.requestAnimationFrame(animateScroll);
        } else {
            window.scrollTo(0, end); // Garante que chegamos exatamente no final
        }
    }

    // Inicia a animação
    window.requestAnimationFrame(animateScroll);
}

// Espera o DOM estar completamente carregado
document.addEventListener("DOMContentLoaded", function () {
    // Seleciona todos os links que apontam para uma âncora
    const anchors = document.querySelectorAll('a[href^="#"]');

    // Adiciona um evento de clique para cada link de âncoras
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Impede a rolagem padrão

            const targetId = this.getAttribute('href').substring(1); // Pega o ID do destino
            const targetElement = document.getElementById(targetId); // Encontra o elemento com esse ID

            if (targetElement) {
                smoothScrollTo(targetElement); // Chama a função de rolagem suave
            }
        });
    });
});