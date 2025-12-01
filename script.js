// ==========================================
// SAI MANGAL SERVICES - MAIN JAVASCRIPT
// ==========================================

// === DATA STRUCTURES ===

// Initialize default halls data
const defaultHallsData = [
    {
        id: 1,
        name: "Sai Mangal Karyalay",
        location: "Nanded City",
        area: "2500 sq ft",
        capacity: 75,
        diningArea: "3000 sq ft",
        parking: "10000 sq ft",
        contact: "78288 20292",
        mapLink: "https://maps.google.com/?q=Nanded+City+Nanded",
        image: "🏛️",
        basePrice: 5000
    },
    {
        id: 2,
        name: "XYZ Mangal Karyalay",
        location: "Nanded Cidco",
        area: "1500 sq ft",
        capacity: 50,
        diningArea: "2500 sq ft",
        parking: "9000 sq ft",
        contact: "23433 09324",
        mapLink: "https://maps.google.com/?q=Nanded+Cidco",
        image: "🏰",
        basePrice: 3000
    },
    {
        id: 3,
        name: "VINOD Mangal Karyalay",
        location: "Hudco Nanded",
        area: "1200 sq ft",
        capacity: 40,
        diningArea: "2000 sq ft",
        parking: "8000 sq ft",
        contact: "23498 39823",
        mapLink: "https://maps.google.com/?q=Hudco+Nanded",
        image: "🏛️",
        basePrice: 2000
    }
];

// Get halls from localStorage or use defaults
function getHallsData() {
    const stored = localStorage.getItem('hallsData');
    if (stored) {
        return JSON.parse(stored);
    }
    localStorage.setItem('hallsData', JSON.stringify(defaultHallsData));
    return defaultHallsData;
}

let hallsData = getHallsData();

// Initialize default services data
const defaultServicesData = {
    beauty: [
        { id: 1, name: "Kranti Parlour", beautician: "Kranti Gore", contact: "12233 44556" },
        { id: 2, name: "Kirti Parlour", beautician: "Kranti Shinde", contact: "55343 11335" },
        { id: 3, name: "Shanti Parlour", beautician: "Shanti Shise", contact: "78839 49940" },
        { id: 4, name: "Shila Parlour", beautician: "Shila", contact: "99876 38332" }
    ],
    catering: [
        { id: 1, name: "Madhu Shine", contact: "83939 93939" },
        { id: 2, name: "Shitlesh SS", contact: "30989 43432" },
        { id: 3, name: "Sai", contact: "84939 20022" }
    ],
    band: [
        { id: 1, name: "XYZ Band", contact: "11111 22222" }
    ],
    music: [
        { id: 1, name: "Sai Music", contact: "98398 39843" },
        { id: 2, name: "Sai dj", contact: "88997 88900" }
    ],
    flower: [
        { id: 1, name: "Floral Elegance", contact: "77889 33445" },
        { id: 2, name: "Bloom Decor", contact: "66778 22334" }
    ],
    mehandi: [
        { id: 1, name: "Mehandi Magic", contact: "88776 55443" },
        { id: 2, name: "Henna Artistry", contact: "77665 44332" }
    ]
};

// Get services from localStorage or use defaults
function getServicesData() {
    const stored = localStorage.getItem('servicesData');
    if (stored) {
        return JSON.parse(stored);
    }
    localStorage.setItem('servicesData', JSON.stringify(defaultServicesData));
    return defaultServicesData;
}

let servicesData = getServicesData();

// Helper functions to get individual service arrays
function getBeautyServices() { return servicesData.beauty || []; }
function getCateringServices() { return servicesData.catering || []; }
function getBandServices() { return servicesData.band || []; }
function getMusicServices() { return servicesData.music || []; }
function getFlowerServices() { return servicesData.flower || []; }
function getMehandiServices() { return servicesData.mehandi || []; }

// Save halls to localStorage
function saveHalls() {
    localStorage.setItem('hallsData', JSON.stringify(hallsData));
}

// Save services to localStorage
function saveServices() {
    localStorage.setItem('servicesData', JSON.stringify(servicesData));
}

// === AUTHENTICATION STATE ===
let currentUser = null;
let selectedHallForBooking = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function () {
    initializeAuth();
    renderHalls();
    renderServices();
    initializeNavigation();
    initializeModals();
    initializeBookingModal();
    initializeScrollEffects();
});

// === AUTHENTICATION ===

function initializeAuth() {
    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIForLoggedInUser();
    }
}

function updateUIForLoggedInUser() {
    const loginBtn = document.getElementById('loginBtn');
    const userProfile = document.getElementById('userProfile');
    const profileName = document.getElementById('profileName');

    if (currentUser) {
        loginBtn.style.display = 'none';
        userProfile.style.display = 'block';
        profileName.textContent = currentUser.name;
    } else {
        loginBtn.style.display = 'block';
        userProfile.style.display = 'none';
    }
}

// Login form handler
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Get stored users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u =>
        (u.email === email || u.mobile === email) && u.password === password
    );

    if (user) {
        currentUser = { name: user.name, email: user.email };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUIForLoggedInUser();
        closeModal('loginModal');
        showNotification('Welcome back, ' + user.name + '!', 'success');
        // Re-render to show contact numbers
        renderHalls();
        renderServices();
    } else {
        showNotification('Invalid credentials. Please try again.', 'error');
    }
});

// Signup form handler
document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const mobile = document.getElementById('signupMobile').value;
    const password = document.getElementById('signupPassword').value;

    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if user already exists
    if (users.find(u => u.email === email || u.mobile === mobile)) {
        showNotification('User already exists!', 'error');
        return;
    }

    // Add new user
    users.push({ name, email, mobile, password });
    localStorage.setItem('users', JSON.stringify(users));

    // Auto login
    currentUser = { name, email };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUIForLoggedInUser();
    closeModal('loginModal');
    showNotification('Account created successfully! Welcome ' + name + '!', 'success');
    // Re-render to show contact numbers
    renderHalls();
    renderServices();
});

// Logout handler
document.getElementById('logoutBtn').addEventListener('click', function (e) {
    e.preventDefault();
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUIForLoggedInUser();
    showNotification('Logged out successfully!', 'success');
    // Re-render to hide contact numbers
    renderHalls();
    renderServices();
});

// === RENDER FUNCTIONS ===

function renderHalls() {
    const hallsGrid = document.getElementById('hallsGrid');
    hallsGrid.innerHTML = '';

    hallsData.forEach(hall => {
        const hallCard = document.createElement('div');
        hallCard.className = 'hall-card';
        hallCard.onclick = () => openHallDetails(hall);

        // Thumbnail: prefer first image if available, fallback to emoji
        const thumbHtml = (hall.images && hall.images.length) ?
            `<img src="${hall.images[0].src}" alt="${hall.name}" style="width:100%;height:140px;object-fit:cover;border-radius:8px;">` :
            `<div class="hall-image">${hall.image || '🏛️'}</div>`;

        hallCard.innerHTML = `
            <div class="hall-thumb">${thumbHtml}</div>
            <div class="hall-content">
                <h3 class="hall-name">${hall.name}</h3>
                <div class="hall-location">📍 ${hall.location}</div>
                <div class="hall-specs">
                    <div class="spec-item">
                        <span class="spec-label">Hall Area</span>
                        <span class="spec-value">${hall.area}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Stage Capacity</span>
                        <span class="spec-value">${hall.capacity} people</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Dining Area</span>
                        <span class="spec-value">${hall.diningArea}</span>
                    </div>
                    <div class="spec-item">
                        <span class="spec-label">Parking</span>
                        <span class="spec-value">${hall.parking}</span>
                    </div>
                </div>
                <div class="hall-actions">
                    <button class="btn btn-primary" onclick="event.stopPropagation(); openHallDetails(${JSON.stringify(hall).replace(/"/g, '&quot;')})">
                        View Details
                    </button>
                    ${currentUser ?
                `<button class="btn btn-secondary" onclick="event.stopPropagation(); bookHall('${hall.name}')">
                            Book Now
                        </button>` :
                `<button class="btn btn-secondary" onclick="event.stopPropagation(); showLoginPrompt()">
                            Login to Book
                        </button>`
            }
                </div>
            </div>
        `;

        hallsGrid.appendChild(hallCard);
        // Add hover behavior: if hall has multiple images, show 2nd image on hover
        (function (card, h) {
            const imgEl = card.querySelector('.hall-thumb img');
            if (!imgEl || !h.images || h.images.length < 2) return;

            let cycleInterval = null;
            card.addEventListener('mouseenter', () => {
                if (!h.images) return;
                if (h.images.length === 2) {
                    imgEl.src = h.images[1].src;
                } else if (h.images.length > 2) {
                    // start cycling from second image
                    let i = 1;
                    cycleInterval = setInterval(() => {
                        imgEl.src = h.images[i].src;
                        i++;
                        if (i >= h.images.length) i = 1;
                    }, 800);
                }
            });

            card.addEventListener('mouseleave', () => {
                if (cycleInterval) {
                    clearInterval(cycleInterval);
                    cycleInterval = null;
                }
                // revert to first image
                if (h.images && h.images.length) imgEl.src = h.images[0].src;
            });
        })(hallCard, hall);
    });
}

function renderServices() {
    renderServiceCategory('beautyGrid', getBeautyServices(), 'beauty');
    renderServiceCategory('cateringGrid', getCateringServices(), 'catering');
    renderServiceCategory('bandGrid', getBandServices(), 'band');
    renderServiceCategory('musicGrid', getMusicServices(), 'music');
    renderServiceCategory('flowerGrid', getFlowerServices(), 'flower');
    renderServiceCategory('mehandiGrid', getMehandiServices(), 'mehandi');
}

function renderServiceCategory(gridId, services, type) {
    const grid = document.getElementById(gridId);
    grid.innerHTML = '';

    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';

        // Service image preview: uploaded images or default wedding logo emoji
        const hasImages = service.images && service.images.length > 0;
        const imageHtml = hasImages
            ? `<div class="service-image"><img src="${service.images[0].src}" alt="${service.name}" /></div>`
            : `<div class="service-image service-image-default">💒</div>`;

        let serviceHTML = `
            ${imageHtml}
            <h4 class="service-name">${service.name}</h4>
        `;

        if (service.beautician) {
            serviceHTML += `<p class="service-detail">Beautician: ${service.beautician}</p>`;
        }

        if (currentUser) {
            serviceHTML += `
                <div class="service-contact">
                    📞 ${service.contact}
                </div>
            `;
        } else {
            serviceHTML += `
                <div class="service-contact">
                    <span class="contact-locked" onclick="showLoginPrompt()">
                        🔒 Login Required to View Contact
                    </span>
                </div>
            `;
        }

        serviceCard.innerHTML = serviceHTML;
        grid.appendChild(serviceCard);

        // Add hover effect for multiple images
        if (hasImages && service.images.length > 1) {
            const imgEl = serviceCard.querySelector('.service-image img');
            let cycleInterval = null;

            serviceCard.addEventListener('mouseenter', () => {
                let i = 1;
                cycleInterval = setInterval(() => {
                    imgEl.src = service.images[i].src;
                    i++;
                    if (i >= service.images.length) i = 0;
                }, 800);
            });

            serviceCard.addEventListener('mouseleave', () => {
                if (cycleInterval) {
                    clearInterval(cycleInterval);
                    cycleInterval = null;
                }
                // Revert to first image
                imgEl.src = service.images[0].src;
            });
        }
    });
}

// === MODAL FUNCTIONS ===

function initializeModals() {
    // Login modal
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const modalClose = document.getElementById('modalClose');

    loginBtn.addEventListener('click', () => openModal('loginModal'));
    modalClose.addEventListener('click', () => closeModal('loginModal'));

    // Hall modal
    const hallModalClose = document.getElementById('hallModalClose');
    hallModalClose.addEventListener('click', () => closeModal('hallModal'));

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });

    // Auth tabs
    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            document.querySelectorAll('.auth-form').forEach(form => {
                form.classList.remove('active');
            });

            if (targetTab === 'login') {
                document.getElementById('loginForm').classList.add('active');
            } else {
                document.getElementById('signupForm').classList.add('active');
            }
        });
    });
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function showLoginPrompt() {
    openModal('loginModal');
    showNotification('Please login to view contact details and book services', 'info');
}

function openHallDetails(hall) {
    const modalBody = document.getElementById('hallModalBody');

    // Build images area (carousel-like) if images array exists
    let imagesSection = '';
    if (hall.images && hall.images.length) {
        const mainSrc = hall.images[0].src;
        const mainSubtitle = hall.images[0].subtitle || '';
        const thumbs = hall.images.map((img, i) => ` <img class="hall-detail-thumb" data-index="${i}" src="${img.src}" style="width:60px;height:60px;object-fit:cover;border-radius:6px;cursor:pointer;border:2px solid transparent;"> `).join('');

        imagesSection = `
            <div style="text-align: center; margin-bottom: 1rem;">
                <div style="max-width:720px;margin:0 auto;">
                    <div style="height:360px; display:flex; align-items:center; justify-content:center; background:var(--color-gray); border-radius:8px; overflow:hidden;">
                        <img id="hallMainImg" src="${mainSrc}" alt="${hall.name}" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div id="hallImageSubtitle" style="margin-top:0.5rem; color:var(--color-text-light); font-size:0.95rem;">${mainSubtitle}</div>
                    <div style="display:flex; gap:0.5rem; justify-content:center; margin-top:0.75rem;">${thumbs}</div>
                </div>
            </div>
        `;
    } else {
        imagesSection = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <div style="font-size: 5rem; margin-bottom: 1rem;">${hall.image || '🏛️'}</div>
                <h2 style="color: var(--color-secondary); margin-bottom: 0.5rem;">${hall.name}</h2>
                <p style="color: var(--color-text-light); font-size: 1.1rem;">📍 ${hall.location}</p>
            </div>
        `;
    }

    modalBody.innerHTML = `
        ${imagesSection}

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
            <div class="spec-item">
                <span class="spec-label">Hall Area</span>
                <span class="spec-value">${hall.area}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Stage Capacity</span>
                <span class="spec-value">${hall.capacity} people</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Dining Area</span>
                <span class="spec-value">${hall.diningArea}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Parking Space</span>
                <span class="spec-value">${hall.parking}</span>
            </div>
        </div>

        ${currentUser ? `
            <div style="background: var(--color-gray); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
                <h4 style="margin-bottom: 0.5rem;">Contact Information</h4>
                <p style="font-size: 1.2rem; color: var(--color-secondary); font-weight: 600;">📞 ${hall.contact}</p>
            </div>
        ` : `
            <div style="background: #fff3cd; padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; border-left: 4px solid var(--color-primary);">
                <p style="color: #856404; margin: 0;">🔒 Please <strong onclick="showLoginPrompt()" style="cursor: pointer; text-decoration: underline;">login</strong> to view contact information</p>
            </div>
        `}

        <div style="display: flex; gap: 1rem;">
            <a href="${hall.mapLink}" target="_blank" class="btn btn-secondary" style="flex: 1; text-align: center;">
                📍 View on Map
            </a>
            ${currentUser ?
            `<button class="btn btn-primary" style="flex: 1;" onclick="bookHall('${hall.name}')">
                    Book This Hall
                </button>` :
            `<button class="btn btn-primary" style="flex: 1;" onclick="showLoginPrompt()">
                    Login to Book
                </button>`
        }
        </div>
    `;

    // Wire up thumbnail clicks to change main image/subtitle
    if (hall.images && hall.images.length) {
        const mainImg = modalBody.querySelector('#hallMainImg');
        const subtitleEl = modalBody.querySelector('#hallImageSubtitle');
        const thumbs = modalBody.querySelectorAll('.hall-detail-thumb');
        thumbs.forEach(t => {
            t.addEventListener('click', (ev) => {
                const idx = parseInt(t.dataset.index, 10);
                mainImg.src = hall.images[idx].src;
                subtitleEl.textContent = hall.images[idx].subtitle || '';
                thumbs.forEach(x => x.style.borderColor = 'transparent');
                t.style.borderColor = 'var(--color-secondary)';
            });
        });
        // highlight first
        if (thumbs[0]) thumbs[0].style.borderColor = 'var(--color-secondary)';
    }

    openModal('hallModal');
}

// === BOOKING FUNCTION ===

function bookHall(hallName) {
    if (!currentUser) {
        showLoginPrompt();
        return;
    }

    // Find the hall
    const hall = hallsData.find(h => h.name === hallName);
    if (!hall) return;

    selectedHallForBooking = hall;

    // Close hall modal
    closeModal('hallModal');

    // Populate booking modal
    const bookingHallInfo = document.getElementById('bookingHallInfo');
    bookingHallInfo.innerHTML = `
        <h3 style="color: var(--color-secondary); margin-bottom: 0.5rem;">${hall.name}</h3>
        <p style="color: var(--color-text-light); margin: 0;">📍 ${hall.location}</p>
        <p style="color: var(--color-primary); font-weight: 600; margin-top: 0.5rem;">Base Price: ₹${hall.basePrice}/slot</p>
    `;

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('bookingDate').setAttribute('min', today);

    // Reset form
    document.getElementById('bookingForm').reset();
    document.getElementById('bookingDuration').value = '';
    document.getElementById('basePrice').textContent = '₹0';
    document.getElementById('totalPrice').textContent = '₹0';
    document.getElementById('priceBreakdown').innerHTML = '';
    document.getElementById('dateInfo').textContent = '';

    // Pre-fill user details if logged in
    if (currentUser) {
        document.getElementById('bookingName').value = currentUser.name || '';
    }

    // Open booking modal
    openModal('bookingModal');
}

// Calculate pricing based on date
function calculatePrice(basePrice, selectedDate) {
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday, 5 = Friday

    let multiplier = 1.0;
    let priceInfo = '';
    let dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

    if (dayOfWeek === 0) { // Sunday
        multiplier = 1.25;
        priceInfo = `${dayName}: +25% surcharge`;
    } else if (dayOfWeek === 5 || dayOfWeek === 6) { // Friday or Saturday
        multiplier = 1.10;
        priceInfo = `${dayName}: +10% surcharge`;
    } else {
        priceInfo = `${dayName}: Normal rate`;
    }

    const finalPrice = Math.round(basePrice * multiplier);

    return {
        finalPrice,
        basePrice,
        multiplier,
        priceInfo,
        dayName,
        surcharge: finalPrice - basePrice
    };
}

// Update price display when date or time slot changes
function updatePriceDisplay() {
    const dateInput = document.getElementById('bookingDate');
    const timeSlotInput = document.getElementById('bookingTimeSlot');
    const durationInput = document.getElementById('bookingDuration');
    const basePriceEl = document.getElementById('basePrice');
    const totalPriceEl = document.getElementById('totalPrice');
    const priceBreakdownEl = document.getElementById('priceBreakdown');
    const dateInfoEl = document.getElementById('dateInfo');

    if (!selectedHallForBooking || !dateInput.value) {
        return;
    }

    const basePrice = selectedHallForBooking.basePrice;
    const selectedDate = dateInput.value;
    const timeSlot = timeSlotInput.value;

    // Calculate price
    const pricing = calculatePrice(basePrice, selectedDate);

    // Update base price
    basePriceEl.textContent = `₹${basePrice}`;

    // Update duration based on time slot
    if (timeSlot === 'morning') {
        durationInput.value = '9:00 AM - 5:00 PM (8 hours)';
    } else if (timeSlot === 'night') {
        durationInput.value = '6:00 PM - 11:00 PM (5 hours)';
    } else {
        durationInput.value = '';
    }

    // Update price breakdown
    if (pricing.surcharge > 0) {
        priceBreakdownEl.innerHTML = `
            <div style="margin-bottom: 0.25rem;">📅 ${pricing.priceInfo}</div>
            <div>Surcharge: +₹${pricing.surcharge}</div>
        `;
    } else {
        priceBreakdownEl.innerHTML = `
            <div>📅 ${pricing.priceInfo}</div>
        `;
    }

    // Update total price
    totalPriceEl.textContent = `₹${pricing.finalPrice}`;

    // Update date info
    dateInfoEl.textContent = `${pricing.dayName} - ${pricing.finalPrice === basePrice ? 'Normal rate' : pricing.priceInfo}`;
    dateInfoEl.style.color = pricing.surcharge > 0 ? '#8B0000' : '#10b981';
    dateInfoEl.style.fontWeight = '600';
}

// Initialize booking modal
function initializeBookingModal() {
    const bookingModalClose = document.getElementById('bookingModalClose');
    bookingModalClose.addEventListener('click', () => closeModal('bookingModal'));

    // Date change listener
    document.getElementById('bookingDate').addEventListener('change', updatePriceDisplay);

    // Time slot change listener
    document.getElementById('bookingTimeSlot').addEventListener('change', updatePriceDisplay);

    // Booking form submission
    document.getElementById('bookingForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const bookingDate = document.getElementById('bookingDate').value;
        const timeSlot = document.getElementById('bookingTimeSlot').value;
        const name = document.getElementById('bookingName').value;
        const phone = document.getElementById('bookingPhone').value;
        const notes = document.getElementById('bookingNotes').value;
        const duration = document.getElementById('bookingDuration').value;
        const totalPrice = document.getElementById('totalPrice').textContent;

        if (!bookingDate || !timeSlot) {
            showNotification('Please select date and time slot', 'error');
            return;
        }

        const pricing = calculatePrice(selectedHallForBooking.basePrice, bookingDate);

        // Create booking object
        const booking = {
            user: currentUser.email,
            userName: name,
            userPhone: phone,
            hall: selectedHallForBooking.name,
            hallLocation: selectedHallForBooking.location,
            date: bookingDate,
            timeSlot: timeSlot,
            duration: duration,
            basePrice: selectedHallForBooking.basePrice,
            finalPrice: pricing.finalPrice,
            dayName: pricing.dayName,
            surcharge: pricing.surcharge,
            notes: notes,
            bookingDate: new Date().toISOString(),
            status: 'pending'
        };

        // Save to localStorage
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));

        closeModal('bookingModal');

        // Show success message
        showNotification(
            `Booking confirmed for ${selectedHallForBooking.name} on ${new Date(bookingDate).toLocaleDateString()}! Total: ${totalPrice}`,
            'success'
        );

        // Reset form
        this.reset();
        selectedHallForBooking = null;
    });
}

// === NAVIGATION ===

function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.getElementById('navbar');

    // Hamburger menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Scroll effect on navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// === SCROLL EFFECTS ===

function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.hall-card, .service-card, .stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// === CONTACT FORM ===

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    showNotification('Thank you for your message! We will get back to you soon.', 'success');
    this.reset();
});

// === NOTIFICATION SYSTEM ===

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-xl);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
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

// === MY BOOKINGS ===

document.getElementById('myBookings').addEventListener('click', function (e) {
    e.preventDefault();

    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const userBookings = bookings.filter(b => b.user === currentUser.email);

    if (userBookings.length === 0) {
        showNotification('You have no bookings yet.', 'info');
        return;
    }

    let bookingsList = '<h3>My Bookings</h3><ul style="list-style: none; padding: 0;">';
    userBookings.forEach(booking => {
        const date = new Date(booking.date).toLocaleDateString();
        const timeSlot = booking.timeSlot === 'morning' ? 'Morning (9AM-5PM)' : 'Night (6PM-11PM)';
        bookingsList += `
            <li style="padding: 1rem; background: var(--color-gray); margin-bottom: 0.5rem; border-radius: var(--radius-sm);">
                <strong>${booking.hall}</strong><br>
                <small>📍 ${booking.hallLocation}</small><br>
                <small>📅 ${date} - ${timeSlot}</small><br>
                <small>⏰ ${booking.duration}</small><br>
                <span style="color: var(--color-primary); font-weight: 600;">💰 Total: ₹${booking.finalPrice}</span><br>
                <span style="color: ${booking.status === 'pending' ? '#fbbf24' : '#10b981'}; font-weight: 600;">Status: ${booking.status.toUpperCase()}</span>
            </li>
        `;
    });
    bookingsList += '</ul>';

    const modalBody = document.getElementById('hallModalBody');
    modalBody.innerHTML = bookingsList;
    openModal('hallModal');
});
