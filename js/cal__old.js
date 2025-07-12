// // Vanilla JS Calendar
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "Augustus", "September", "October", "November", "December"];
let currentMonth = new Date().getMonth(); // 0-11
let currentYear = new Date().getFullYear();

function renderCalendar(month, year) {
    const monthSpan = document.getElementById("currentMonth");
    monthSpan.textContent = monthNames[month] + " " + year;

    const dayGrid = document.getElementById("dayGrid");
    dayGrid.innerHTML = ""; // Clear previous days

    const firstDay = new Date(year, month, 1).getDay(); // Day of the week of the first day
    const lastDate = new Date(year, month + 1, 0).getDate(); // Last date of the month

    // Create empty cells for the days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const prevMonthDate = new Date(year, month, 0).getDate() - (firstDay - 1 - i);
        dayGrid.innerHTML += `
            <div class="cell">
                <div class="date disable">
                    <span class="date-n is-uppercase">${prevMonthDate}</span>
                    <span class="date-r">예약</span>
                    <a href="" class="date-b button is-white">
                        <span class="icon is-large">
                            <i class="ph-fill ph-map-pin-line"></i>
                        </span>
                        <span>김해본사</span>
                    </a>
                    <a href="" class="date-b button is-white">
                        <span class="icon is-small">
                            <i class="ph-fill ph-map-pin-line"></i>
                        </span>
                        <span>경기지사</span>
                    </a>
                </div>
            </div>`;
    }

    const today = new Date();
    const todayDate = today.getDate();

    for (let day = 1; day <= lastDate; day++) {
        const isToday = day === todayDate && month === today.getMonth() && year === today.getFullYear();
        const isPast = day < todayDate && month === today.getMonth() && year === today.getFullYear();
        const isTomorrow = day === todayDate + 1;
        
        // Full date format
        // const fullDate = `${year}.${month + 1}.${day}`; // e.g., "2024-09-15"
        const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        each.
        
        dayGrid.innerHTML += `
            <div class="cell">
                <div class="date ${isToday ? 'disable today' : ''} ${isPast ? 'disable' : ''} ${isTomorrow ? 'tomorrow' : ''}">
                    <span class="date-n is-uppercase">${day}</span>
                    <span class="date-r">예약</span>
                    <a href="${baseReservation}?date=${fullDate}&location=김해본사" data-date="${fullDate}" data-location="김해본사" class="date-b button is-white">
                        <span class="icon is-large">
                            <i class="ph-fill ph-map-pin-line"></i>
                        </span>
                        <span>김해본사</span>
                    </a>
                    <a href="${baseReservation}?date=${fullDate}&location=경기지사" data-date="${fullDate}" data-location="경기지사" class="date-b button is-white">
                        <span class="icon is-small">
                            <i class="ph-fill ph-map-pin-line"></i>
                        </span>
                        <span>경기지사</span>
                    </a>
                </div>
            </div>`;
    }

    const totalDaysInGrid = 35;
    const totalCells = firstDay + lastDate;

    for (let i = totalCells; i < totalDaysInGrid; i++) {
        const nextMonthDate = i - totalCells + 1;
        dayGrid.innerHTML += `
            <div class="cell">
                <div class="date disable">
                    <span class="date-n is-uppercase">${nextMonthDate}</span>
                    <span class="date-r">예약</span>
                    <a href="" class="date-b button is-white">
                        <span class="icon is-large">
                            <i class="ph-fill ph-map-pin-line"></i>
                        </span>
                        <span>김해본사</span>
                    </a>
                    <a href="" class="date-b button is-white">
                        <span class="icon is-small">
                            <i class="ph-fill ph-map-pin-line"></i>
                        </span>
                        <span>경기지사</span>
                    </a>
                </div>
            </div>`;
    }

    const prevButton = document.getElementById("prevMonth");
    if (month === today.getMonth() && year === today.getFullYear()) {
        prevButton.classList.add("disabled");
        prevButton.style.pointerEvents = "none";
    } else {
        prevButton.classList.remove("disabled");
        prevButton.style.pointerEvents = "auto";
    }
}

// Add event listeners for navigation
document.getElementById("prevMonth").addEventListener("click", function(e) {
    e.preventDefault();
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    renderCalendar(currentMonth, currentYear);
});

document.getElementById("nextMonth").addEventListener("click", function(e) {
    e.preventDefault();
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear++;
    } else {
        currentMonth++;
    }
    renderCalendar(currentMonth, currentYear);
});

// Add click event listeners for reservation buttons
// document.addEventListener("click", function(e) {
//     if (e.target.classList.contains("date-b")) {
//         e.preventDefault();
//         const dateParts = e.target.getAttribute("data-date").split("-");
//         const formattedDate = `${dateParts[0]}.${String(dateParts[1]).padStart(2, '0')}.${String(dateParts[2]).padStart(2, '0')}`;
//         const selectedDate = e.target.getAttribute("data-date");
//         const location = e.target.getAttribute("data-location");
        
//         // Store the selected date and location in localStorage
//         localStorage.setItem("selectedDate", formattedDate);
//         localStorage.setItem("selectedLocation", location);

//         // Redirect to reservation page
//         window.location.href = "/reservation.html";
//     }
// });

// Initial render
renderCalendar(currentMonth, currentYear);
