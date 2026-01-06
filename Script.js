document.addEventListener('DOMContentLoaded', () => {
    const notification = document.getElementById('notification');
    const balanceElement = document.getElementById('balance');
    const startGameButton = document.getElementById('startGame');
    const backButton = document.getElementById('back');
    const earnCoinsButton = document.getElementById('earnCoins');
    const multipliers = document.querySelectorAll('.multiplier');
    const plinko = document.querySelector('.plinko');
    const dropSound = document.getElementById('dropSound');
    const winSound = document.getElementById('winSound');

    let balance = 10;
    let selectedMultiplier = 1;
    let lastEarnTime = Date.now();

    updateBalance();

    startGameButton.addEventListener('click', startGame);
    backButton.addEventListener('click', () => {
        plinko.innerHTML = '';
        startGameButton.style.display = 'block';
        backButton.style.display = 'none';
        earnCoinsButton.style.display = 'block';
    });
    earnCoinsButton.addEventListener('click', earnCoins);

    multipliers.forEach(multiplier => {
        multiplier.addEventListener('click', () => {
            selectedMultiplier = parseFloat(multiplier.dataset.multiplier);
            notification.textContent = `Selected Multiplier: ${selectedMultiplier}x`;
        });
    });

    function updateBalance() {
        balanceElement.textContent = balance;
    }

    function startGame() {
        if (balance <= 0) {
            notification.textContent = 'You have no coins left!';
            return;
        }

        balance -= 1;
        updateBalance();

        startGameButton.style.display = 'none';
        backButton.style.display = 'block';
        earnCoinsButton.style.display = 'none';

        generatePlinkoBoard();
        dropChip();
    }

    function generatePlinkoBoard() {
        plinko.innerHTML = '';

        const pegs = [
            { top: 50, left: 20 },
            { top: 50, left: 80 },
            { top: 50, left: 140 },
            { top: 50, left: 200 },
            { top: 50, left: 260 },
            { top: 50, left: 320 },
            { top: 50, left: 380 },
            { top: 150, left: 40 },
            { top: 150, left: 100 },
            { top: 150, left: 160 },
            { top: 150, left: 220 },
            { top: 150, left: 280 },
            { top: 150, left: 340 },
            { top: 250, left: 60 },
            { top: 250, left: 120 },
            { top: 250, left: 180 },
            { top: 250, left: 240 },
            { top: 250, left: 300 },
            { top: 350, left: 80 },
            { top: 350, left: 140 },
            { top: 350
