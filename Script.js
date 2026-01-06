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
            { top: 350, left: 200 },
            { top: 350, left: 260 },
            { top: 450, left: 100 },
            { top: 450, left: 160 },
            { top: 450, left: 220 },
            { top: 450, left: 280 }
        ];

        pegs.forEach(peg => {
            const pegElement = document.createElement('div');
            pegElement.classList.add('peg');
            pegElement.style.top = `${peg.top}px`;
            pegElement.style.left = `${peg.left}px`;
            plinko.appendChild(pegElement);
        });

        for (let i = 0; i < 8; i++) {
            const slot = document.createElement('div');
            slot.classList.add('slot');
            slot.style.left = `${i * 50}px`;
            plinko.appendChild(slot);
        }
    }

    function dropChip() {
        const chip = document.createElement('div');
        chip.classList.add('chip');
        plinko.appendChild(chip);

        const interval = setInterval(() => {
            const top = parseFloat(chip.style.top || 0) + 2;
            chip.style.top = `${top}px`;

            if (top > 580) {
                clearInterval(interval);
                const slotIndex = Math.floor((parseFloat(chip.style.left || 0) + 10) / 50);
                const winnings = selectedMultiplier * 10;
                balance += winnings;
                updateBalance();
                notification.textContent = `You won ${winnings} coins!`;
                winSound.play();
                backButton.click();
            }
        }, 10);

        dropSound.play();
    }

    function earnCoins() {
        const now = Date.now();
        if (now - lastEarnTime >= 600000) {
            balance += 5;
            updateBalance();
            notification.textContent = 'You earned 5 coins!';
            lastEarnTime = now;
        } else {
            notification.textContent = 'You can earn coins again in 10 minutes!';
        }
    }
});
