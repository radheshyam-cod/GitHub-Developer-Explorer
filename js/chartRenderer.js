import { langColors } from './constants.js';

let chartInstance = null;

function getTheme() {
    return document.documentElement.classList.contains('light') ? 'light' : 'dark';
}

function centerTextPlugin(total) {
    return {
        id: 'centerText',
        beforeDraw(chart) {
            const { width, height, ctx } = chart;
            ctx.save();

            const centerX = width / 2;
            const centerY = height / 2;
            const isLight = getTheme() === 'light';

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            ctx.font = "bold 28px 'Poppins', sans-serif";
            ctx.fillStyle = isLight ? '#0F172A' : '#F8FAFC';
            ctx.fillText(total, centerX, centerY - 10);

            ctx.font = "12px 'Inter', sans-serif";
            ctx.fillStyle = isLight ? '#64748B' : '#94A3B8';
            ctx.fillText('repos', centerX, centerY + 18);

            ctx.restore();
        }
    };
}

export const clearLangChart = () => {
    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
    }
    const chartArea = document.querySelector('.chart-area');
    if (chartArea) {
        chartArea.innerHTML = '<canvas id="language-chart"></canvas>';
    }
};

export const renderChart = (repos) => {
    if (!Array.isArray(repos) || repos.length === 0) return;

    const canvas = document.getElementById('language-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const langCounts = {};
    repos.forEach(repo => {
        if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
        }
    });

    const labels = Object.keys(langCounts);
    const data = Object.values(langCounts);
    const total = data.reduce((s, v) => s + v, 0);

    if (labels.length === 0) return;

    const backgroundColors = labels.map(lang => langColors[lang] || langColors.default);

    if (chartInstance) {
        chartInstance.destroy();
    }

    if (typeof Chart !== 'undefined') {
        const isLight = getTheme() === 'light';

        Chart.defaults.color = isLight ? '#64748B' : '#94A3B8';
        Chart.defaults.font.family = "'Inter', sans-serif";

        chartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: backgroundColors,
                    borderWidth: 3,
                    borderColor: isLight ? '#FFFFFF' : '#1E293B',
                    hoverOffset: 8,
                    hoverBorderWidth: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                animation: {
                    animateScale: true,
                    animateRotate: true,
                    duration: 1200,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            font: { size: 12, family: "'Inter', sans-serif" },
                            color: isLight ? '#475569' : '#94A3B8'
                        }
                    },
                    tooltip: {
                        backgroundColor: isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 23, 42, 0.95)',
                        titleFont: { size: 14, family: "'Poppins', sans-serif" },
                        titleColor: isLight ? '#0F172A' : '#F8FAFC',
                        bodyFont: { size: 13, family: "'Inter', sans-serif" },
                        bodyColor: isLight ? '#334155' : '#E2E8F0',
                        padding: 14,
                        cornerRadius: 12,
                        borderColor: isLight ? 'rgba(226, 232, 240, 0.8)' : 'rgba(51, 65, 85, 0.5)',
                        borderWidth: 1,
                        displayColors: true,
                        boxPadding: 4,
                        callbacks: {
                            label(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const percentage = Math.round((value / total) * 100);
                                return ` ${label}: ${value} repos (${percentage}%)`;
                            }
                        }
                    }
                }
            },
            plugins: [centerTextPlugin(total)]
        });
    }
};
