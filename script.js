// Открытие модального окна с изображением
function openModal(image) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    modal.style.display = 'flex';
    modalImg.src = image.src;
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Функции для управления календарем
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
const today = new Date();

let selectedDates = []; // Хранение выбранных дат

const monthYearElement = document.getElementById('month-year');

function renderCalendar(month, year) {
    const calendarBody = document.querySelector('.calendar-body');
    calendarBody.innerHTML = '';

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        calendarBody.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.textContent = day;
        dayCell.classList.add('calendar-day');

        const cellDate = new Date(year, month, day);

        if (cellDate < today) {
            dayCell.classList.add('disabled');
        } else {
            dayCell.addEventListener('click', () => selectDate(dayCell, cellDate));
        }

        calendarBody.appendChild(dayCell);
    }

    highlightRange();
    monthYearElement.textContent = `${getMonthName(month)} ${year}`;
}

function getMonthName(month) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    return monthNames[month];
}

function nextMonth() {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    renderCalendar(currentMonth, currentYear);
}

function prevMonth() {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    renderCalendar(currentMonth, currentYear);
}

function selectDate(element, date) {
    if (selectedDates.length === 2) {
        selectedDates = [];
    }
    selectedDates.push(date);
    if (selectedDates.length === 2) {
        selectedDates.sort((a, b) => a - b);
    }
    highlightRange();
}

function highlightRange() {
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected', 'range');
    });

    if (selectedDates.length > 0) {
        const startDate = selectedDates[0];
        const endDate = selectedDates[1] || startDate;

        document.querySelectorAll('.calendar-day').forEach(day => {
            const dayNumber = parseInt(day.textContent);
            const cellDate = new Date(currentYear, currentMonth, dayNumber);

            if (cellDate >= startDate && cellDate <= endDate) {
                day.classList.add(cellDate.getTime() === startDate.getTime() || cellDate.getTime() === endDate.getTime() ? 'selected' : 'range');
            }
        });
    }
}

// Инициализация календаря
renderCalendar(currentMonth, currentYear);
