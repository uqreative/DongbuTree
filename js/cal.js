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
        let locationLinks = '';
    
        // linknya
        branches.forEach(location => {
            locationLinks += `
                <a href="" class="date-b button is-white">
                    <span class="icon is-small">
                        <i class="ph-fill ph-map-pin-line"></i>
                    </span>
                    <span>${location.title}</span>
                </a>`;
        });
        dayGrid.innerHTML += `
            <div class="cell">
                <div class="date disable">
                    <span class="date-n is-uppercase">${prevMonthDate}</span>
                    <span class="date-r">예약</span>
                    ${locationLinks}
                </div>
            </div>`;
    }

    const today = new Date();
    const todayDate = today.getDate();

    for (let day = 1; day <= lastDate; day++) {
        const isToday = day === todayDate && month === today.getMonth() && year === today.getFullYear();
        const isPast = day < todayDate && month === today.getMonth() && year === today.getFullYear();
        const isTomorrow = day === todayDate + 1;
    
        const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const [y, m, d] = fullDate.split('-');
    
        let locationLinks = '';
    
        // branches.forEach(location => {
        //     const isDisabled = calendar.some(event => 
        //         event.ban_spot === location.title
        //         && event.ban_year === y
        //         && event.ban_month === m
        //         && event.ban_date === d
        //     );

            
        
        //     locationLinks += `
        //         <a href="${baseReservation}?id=${location.id}&date=${fullDate}&location=${location.title}" 
        //            data-date="${fullDate}" 
        //            data-location="${location.title}" 
        //            class="date-b button is-white ${isDisabled ? 'disable' : ''}">
        //             <span class="icon is-small">
        //                 <i class="ph-fill ph-map-pin-line"></i>
        //             </span>
        //             <span>${location.title}</span>
        //         </a>`;
        // });

        branches.forEach(location => {
            const filteredEvents = calendar.filter(event => 
                event.ban_spot === location.title
                && event.ban_year === y
                && event.ban_month === m
                && event.ban_date === d
            );
        
            // const filteredLog = log.filter(entry => 
            //     entry.spot_id === location.title && entry.status === '승인'
            // );

            const filteredLog = log.filter(entry => 
                entry.spot_id === location.title && 
                entry.status === '승인' &&
                entry.ban_year === y &&           
                entry.ban_month === m &&          
                entry.ban_date === d               
            );
        
            const logCount = filteredLog.length;
        
            const isClosed = logCount >= location.reservation_close;
        
            const isDisabled = filteredEvents.length > 0 || isClosed;
        
            locationLinks += `
                <a href="${baseReservation}?id=${location.id}&date=${fullDate}&location=${location.title}" 
                   data-date="${fullDate}" 
                   data-location="${location.title}" 
                   class="date-b button is-white ${isDisabled ? 'disable' : ''}">
                    <span class="icon is-small">
                        <i class="ph-fill ph-map-pin-line"></i>
                    </span>
                    <span>${location.title}</span>
                </a>`;
        });
        
    
        dayGrid.innerHTML += `
            <div class="cell">
                <div class="date ${isToday ? 'disable today' : ''} ${isPast ? 'disable' : ''}">
                    <span class="date-n is-uppercase">${day}</span>
                    <span class="date-r">예약</span>
                    ${locationLinks}
                </div>
            </div>`;

    }

    const totalDaysInGrid = 35;
    const totalCells = firstDay + lastDate;

    for (let i = totalCells; i < totalDaysInGrid; i++) {
        const nextMonthDate = i - totalCells + 1;
        let locationLinks = '';
    
        // linknya
        branches.forEach(location => {
            locationLinks += `
                <a href="" class="date-b button is-white">
                    <span class="icon is-small">
                        <i class="ph-fill ph-map-pin-line"></i>
                    </span>
                    <span>${location.title}</span>
                </a>`;
        });

        dayGrid.innerHTML += `
            <div class="cell">
                <div class="date disable">
                    <span class="date-n is-uppercase">${nextMonthDate}</span>
                    <span class="date-r">예약</span>
                    ${locationLinks}
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

const maxMonth = (currentMonth + parseInt(config[0].max_month)) % 12; 
const maxYear = currentYear + Math.floor((currentMonth + parseInt(config[0].max_month)) / 12); 

document.getElementById("nextMonth").addEventListener("click", function(e) {
    e.preventDefault();

    if (currentYear < maxYear || (currentYear === maxYear && currentMonth < maxMonth)) {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        
        renderCalendar(currentMonth, currentYear);
    }
});



// document.getElementById("nextMonth").addEventListener("click", function(e) {
//     e.preventDefault();
//     if (currentMonth === 11) {
//         currentMonth = 0;
//         currentYear++;
//     } else {
//         currentMonth++;
//     }
//     renderCalendar(currentMonth, currentYear);
// });

renderCalendar(currentMonth, currentYear);
