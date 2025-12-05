// Neurana World - Main Menu Script
console.log('🎮 Neurana World Ana Menü Yüklendi!');

// NeuranaWorld Studio
const studioButton = document.getElementById('openStudio');
if (studioButton) {
    studioButton.addEventListener('click', function() {
        showNotification('🎬 NeuranaWorld Studio yükleniyor...', 'info');

        // Studio sayfasına yönlendirme
        setTimeout(() => {
            window.location.href = 'studio/index.html';
        }, 800);
    });
}

// Game data
const games = {
    memory: {
        name: 'Hafıza Oyunu',
        description: 'Kartları eşleştirerek hafızanı test et!'
    },
    puzzle: {
        name: 'Puzzle',
        description: 'Parçaları birleştirerek resmi tamamla!'
    },
    snake: {
        name: 'Yılan Oyunu',
        description: 'Klasik yılan oyununu oyna!'
    },
    quiz: {
        name: 'Bilgi Yarışması',
        description: 'Sorulara cevap vererek puan kazan!'
    },
    tetris: {
        name: 'Tetris',
        description: 'Blokları yerleştirerek satır tamamla!'
    },
    pong: {
        name: 'Pong',
        description: 'Retro klasik ping pong oyunu!'
    }
};

// DOM Elements
const gameCards = document.querySelectorAll('.game-card');
const playButtons = document.querySelectorAll('.play-btn');
const menuButtons = document.querySelectorAll('.menu-btn');

// Game card click handlers
gameCards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Don't trigger if the play button was clicked
        if (e.target.classList.contains('play-btn')) return;

        const gameName = this.dataset.game;
        showGameInfo(gameName);
    });
});

// Play button click handlers
playButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const gameCard = this.closest('.game-card');
        const gameName = gameCard.dataset.game;
        startGame(gameName);
    });
});

// Menu button handlers
menuButtons.forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.querySelector('.btn-text').textContent;
        handleMenuAction(buttonText);
    });
});

// Show game information
function showGameInfo(gameName) {
    const game = games[gameName];
    if (game) {
        console.log(`📋 Oyun Bilgisi: ${game.name}`);
        console.log(`📝 Açıklama: ${game.description}`);
    }
}

// Start a game
function startGame(gameName) {
    const game = games[gameName];
    if (game) {
        console.log(`🎮 ${game.name} başlatılıyor...`);

        // Create a visual feedback
        showNotification(`${game.name} başlatılıyor...`, 'info');

        // In a real application, you would navigate to the game page
        // For now, we'll just show a message
        setTimeout(() => {
            showNotification(`${game.name} yakında eklenecek!`, 'success');
        }, 1000);
    }
}

// Handle menu actions
function handleMenuAction(actionName) {
    console.log(`⚙️ Menü Aksiyonu: ${actionName}`);

    switch(actionName) {
        case 'Ses Ayarları':
            showNotification('Ses ayarları açılıyor...', 'info');
            break;
        case 'Tema Değiştir':
            toggleTheme();
            break;
        case 'Profil':
            showNotification('Profil sayfası yakında eklenecek!', 'info');
            break;
        case 'Hakkında':
            showAbout();
            break;
        default:
            console.log('Bilinmeyen aksiyon');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '10px',
        backgroundColor: type === 'success' ? '#00b894' : type === 'error' ? '#d63031' : '#6c5ce7',
        color: 'white',
        fontWeight: 'bold',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
        zIndex: '1000',
        animation: 'slideInRight 0.3s ease-out',
        maxWidth: '300px'
    });

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Toggle theme
let isDarkTheme = false;
function toggleTheme() {
    isDarkTheme = !isDarkTheme;

    if (isDarkTheme) {
        document.body.style.background = 'linear-gradient(135deg, #2d3436 0%, #000000 100%)';
        showNotification('Koyu tema aktif edildi', 'success');
    } else {
        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        showNotification('Açık tema aktif edildi', 'success');
    }
}

// Show about
function showAbout() {
    const aboutMessage = `
🎮 Neurana World
Versiyon: 1.0.0
© 2025 Tüm hakları saklıdır

Eğlenceli oyunlarla dolu bir dünya!
    `;

    alert(aboutMessage);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'h' for help
    if (e.key === 'h' || e.key === 'H') {
        showNotification('⌨️ Klavye Kısayolları: H=Yardım, T=Tema', 'info');
    }

    // Press 't' to toggle theme
    if (e.key === 't' || e.key === 'T') {
        toggleTheme();
    }
});

// Welcome message
window.addEventListener('load', () => {
    setTimeout(() => {
        showNotification('🎮 Neurana World\'e Hoş Geldiniz!', 'success');
    }, 500);
});

// Add hover sound effect simulation
gameCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        console.log('🔊 Hover ses efekti');
    });
});

console.log('✨ Tüm interaktif özellikler yüklendi!');
