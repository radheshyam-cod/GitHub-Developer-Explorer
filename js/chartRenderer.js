// Using Chart.js which is globally available via CDN in index.html

let chartInstance = null;

const langColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Java: '#b07219',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    PHP: '#4F5D95',
    Vue: '#41b883',
    Svelte: '#ff3e00',
    Shell: '#89e051',
    default: '#8B5CF6'
};

export const renderChart = (repos) => {
    if (!Array.isArray(repos) || repos.length === 0) return;

    const canvas = document.getElementById('language-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Aggregate languages
    const langCounts = {};
    repos.forEach(repo => {
        if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
        }
    });

    const labels = Object.keys(langCounts);
    const data = Object.values(langCounts);
    
    if (labels.length === 0) {
        // No languages found, we can hide the chart or show a message
        // For now, let's just not render
        return;
    }

    const backgroundColors = labels.map(lang => langColors[lang] || langColors.default);

    // Destroy existing chart to prevent memory leaks and overlay issues
    if (chartInstance) {
        chartInstance.destroy();
    }

    // Ensure Chart is defined (from CDN)
    if (typeof Chart !== 'undefined') {
        // Register dark theme defaults
        Chart.defaults.color = '#94A3B8';
        Chart.defaults.font.family = "'Inter', sans-serif";
        
        chartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors,
                    borderWidth: 2,
                    borderColor: '#1E293B', // Match card bg to create spacing between slices
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    animateScale: true,
                    animateRotate: true,
                    duration: 1000,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        titleFont: { size: 14, family: "'Poppins', sans-serif" },
                        bodyFont: { size: 13, family: "'Inter', sans-serif" },
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.chart._metasets[context.datasetIndex].total;
                                const percentage = Math.round((value / total) * 100);
                                return ` ${label}: ${value} repos (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
};
