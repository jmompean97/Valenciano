// =========================================
// DATOS DE EXÁMENES
// =========================================
const examsData = [
    {
        year: 2025, months: [
            { name: 'Juny', enunciado: true, solucion: false },
            { name: 'Característiques', file: '2025 - Caracteristicas y criterios generales (nuevo).pdf', isSpecial: true }
        ]
    },
    {
        year: 2024, months: [
            { name: 'Juliol', enunciado: true, solucion: false },
            { name: 'Juny', enunciado: true, solucion: false }
        ]
    },
    {
        year: 2023, months: [
            { name: 'Juny', enunciado: true, solucion: true }
        ]
    },
    {
        year: 2022, months: [
            { name: 'Juliol', enunciado: true, solucion: true },
            { name: 'Juny', enunciado: true, solucion: true }
        ]
    },
    {
        year: 2021, months: [
            { name: 'Juliol', enunciado: true, solucion: true },
            { name: 'Juny', enunciado: true, solucion: true }
        ]
    },
    {
        year: 2020, months: [
            { name: 'Juliol', enunciado: true, solucion: false },
            { name: 'Juny', enunciado: true, solucion: true }
        ]
    },
    {
        year: 2019, months: [
            { name: 'Juliol', enunciado: true, solucion: false },
            { name: 'Juny', enunciado: true, solucion: true }
        ]
    },
    {
        year: 2018, months: [
            { name: 'Juliol', enunciado: true, solucion: true },
            { name: 'Juny', enunciado: true, solucion: true }
        ]
    },
    {
        year: 2017, months: [
            { name: 'Juliol', enunciado: true, solucion: true },
            { name: 'Juny', enunciado: true, solucion: true }
        ]
    },
    {
        year: 2016, months: [
            { name: 'Juliol', enunciado: true, solucion: true },
            { name: 'Juny', enunciado: true, solucion: true }
        ]
    },
    {
        year: 2015, months: [
            { name: 'Juliol', enunciado: true, solucion: true },
            { name: 'Juny', enunciado: true, solucion: true }
        ]
    },
    {
        year: 2014, months: [
            { name: 'Juliol', enunciado: true, solucion: true },
            { name: 'Juny', enunciado: true, solucion: true }
        ]
    },
    {
        year: 2013, months: [
            { name: 'Juliol', enunciado: true, solucion: true },
            { name: 'Juny', enunciado: true, solucion: true }
        ]
    },
    {
        year: 2012, months: [
            { name: 'Setembre', enunciado: true, solucion: true },
            { name: 'Juny', enunciado: true, solucion: true }
        ]
    },
    {
        year: 2011, months: [
            { name: 'Setembre', enunciado: true, solucion: true },
            { name: 'Juny', enunciado: true, solucion: false }
        ]
    },
    {
        year: 2010, months: [
            { name: 'Setembre', enunciado: true, solucion: true },
            { name: 'Juny', enunciado: true, solucion: true }
        ]
    }
];

const monthMap = {
    'Juny': 'Junio',
    'Juliol': 'Julio',
    'Setembre': 'Septiembre',
    'Característiques': 'Caracteristicas y criterios generales (nuevo)'
};

const BASE_PATH = 'assets/documents/examenes/';

// =========================================
// RENDERIZADO
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const examsGrid = document.getElementById('examsGrid');

    if (examsGrid) {
        renderExams(examsGrid);
    }
});

function renderExams(container) {
    examsData.forEach(exam => {
        const card = document.createElement('div');
        card.className = 'exam-card';

        let contentHTML = '';

        exam.months.forEach(month => {
            if (month.isSpecial) {
                contentHTML += `
                    <div class="exam-group">
                        <div class="link-row">
                            <a href="${BASE_PATH}${month.file}" target="_blank" class="exam-link is-special">
                                <span>📋 ${month.name}</span>
                            </a>
                        </div>
                    </div>
                `;
            } else {
                const monthCast = monthMap[month.name];
                let linksCells = '';

                // Botón Enunciado
                if (month.enunciado) {
                    linksCells += `
                        <a href="${BASE_PATH}${exam.year} - ${monthCast} - Enunciado.pdf" target="_blank" class="exam-link">
                            📝 Enunciat
                        </a>`;
                } else {
                    linksCells += `
                        <div class="exam-link no-solution">
                            ❌ Enunciat
                        </div>`;
                }

                // Botón Solución
                if (month.solucion) {
                    linksCells += `
                        <a href="${BASE_PATH}${exam.year} - ${monthCast} - Solución.pdf" target="_blank" class="exam-link">
                            ✅ Solució
                        </a>`;
                } else {
                    linksCells += `
                        <div class="exam-link no-solution">
                            ❌ Solució
                        </div>`;
                }

                contentHTML += `
                    <div class="exam-group">
                        <div class="month-label">${month.name}</div>
                        <div class="link-row">
                            ${linksCells}
                        </div>
                    </div>
                `;
            }
        });

        card.innerHTML = `
            <div class="exam-year">${exam.year}</div>
            <div class="exam-links">
                ${contentHTML}
            </div>
        `;

        container.appendChild(card);
    });
}
