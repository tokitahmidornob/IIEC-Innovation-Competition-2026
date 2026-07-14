// IIEC Innovation Competition 2026 - SPA Routing Engine

// Render the grid list of all competition segments
function renderHome() {
    const contentArea = document.getElementById("content-area");
    const heroBanner = document.getElementById("hero-banner");
    
    if (!contentArea) return;
    
    // Ensure the Hero Banner is visible in Home view
    if (heroBanner) {
        heroBanner.style.display = "block";
    }
    
    // Build the grid and section headers
    let htmlContent = `
        <div class="section-header">
            <h2 class="section-title">Competition <span class="gradient-text">Segments</span></h2>
            <p class="section-desc">Explore the diverse range of competitive tracks and select your arena of innovation.</p>
        </div>
        <div class="segment-grid">
    `;
    
    // Dynamically generate cards from data.js
    competitionSegments.forEach((segment, index) => {
        const formattedIndex = String(index + 1).padStart(2, '0');
        htmlContent += `
            <article class="segment-card glass">
                <div class="card-glow"></div>
                <div class="card-content">
                    <div class="card-badge">Segment ${formattedIndex}</div>
                    <h3 class="card-title">${segment.title}</h3>
                    <p class="card-desc">${segment.shortDesc}</p>
                    <div class="card-actions">
                        <a href="${segment.rulebookLink}" class="btn btn-card btn-outline">Read Rulebook</a>
                        <a href="${segment.regLink}" class="btn btn-card btn-primary">Register Now</a>
                        <button class="btn btn-card btn-outline view-details-btn" data-id="${segment.id}">View Details</button>
                    </div>
                </div>
            </article>
        `;
    });
    
    htmlContent += `</div>`;
    contentArea.innerHTML = htmlContent;
    initTilt(); // Initialize the dynamic 3D tilt effect
}

// Render the detailed view for a single segment
function renderSegment(segmentId) {
    const contentArea = document.getElementById("content-area");
    const heroBanner = document.getElementById("hero-banner");
    
    if (!contentArea) return;
    
    // Find the targeted segment in data.js
    const segment = competitionSegments.find(s => s.id === segmentId);
    if (!segment) {
        renderHome();
        return;
    }
    
    // Hide the Hero Banner in detail view for a clean SPA experience
    if (heroBanner) {
        heroBanner.style.display = "none";
    }
    
    // Generate detailed view markup
    contentArea.innerHTML = `
        <div class="segment-detail-view">
            <div class="back-navigation">
                <button class="btn btn-outline back-home-btn">&larr; Back to Home</button>
            </div>
            
            <article class="detail-card glass">
                <div class="detail-header-section">
                    <span class="detail-badge">Competition Track</span>
                    <h1 class="detail-title gradient-text">${segment.title}</h1>
                </div>
                
                <div class="detail-body-section">
                    <h3 class="details-heading">Overview</h3>
                    <p class="detail-description-text">${segment.fullDesc}</p>
                    
                    <div class="detail-meta-box">
                        <div class="detail-meta-item">
                            <span class="meta-label">Venue</span>
                            <span class="meta-value">IUBAT Campus</span>
                        </div>
                        <div class="detail-meta-item">
                            <span class="meta-label">Estimated Prize Pool</span>
                            <span class="meta-value text-glow-pink">75K BDT (Shared Pool)</span>
                        </div>
                        <div class="detail-meta-item">
                            <span class="meta-label">Registration Offer</span>
                            <span class="meta-value text-pink">10% Discount Available</span>
                        </div>
                    </div>
                </div>
                
                <div class="detail-footer-actions">
                    <a href="${segment.rulebookLink}" class="btn btn-outline detail-action-btn">Read Rulebook</a>
                    <a href="${segment.regLink}" class="btn btn-primary btn-glow detail-action-btn">Register Now</a>
                </div>
            </article>
        </div>
    `;
    
    // Smooth scroll to top of page when viewing details
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Setup Event Listeners for Dynamic Routing
function initRouter() {
    const contentArea = document.getElementById("content-area");
    const navbarHomeBtn = document.getElementById("nav-home-btn");
    const heroCtaBtn = document.getElementById("hero-cta-btn");
    
    if (!contentArea) return;
    
    // Use event delegation for click handlers inside the dynamic content container
    contentArea.addEventListener("click", (e) => {
        // Handle "View Details" button click
        if (e.target.classList.contains("view-details-btn")) {
            const segmentId = e.target.getAttribute("data-id");
            renderSegment(segmentId);
        }
        
        // Handle "Back to Home" button click
        if (e.target.classList.contains("back-home-btn")) {
            renderHome();
        }
    });
    
    // Handle Navigation Header Home Link click
    if (navbarHomeBtn) {
        navbarHomeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            renderHome();
        });
    }
    
    // Handle Hero CTA Pre-Register button scroll
    if (heroCtaBtn) {
        heroCtaBtn.addEventListener("click", () => {
            const target = document.getElementById("content-area");
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Initial page setup on DOM loaded
document.addEventListener("DOMContentLoaded", () => {
    renderHome();
    initRouter();
});

// Dynamic 3D Tilt Effect on cards
function initTilt() {
    const cards = document.querySelectorAll(".segment-card");
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation angles (max tilt angle of 10 degrees)
            const maxTilt = 10;
            const rotateY = ((x - centerX) / centerX) * maxTilt;
            const rotateX = -((y - centerY) / centerY) * maxTilt;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = "transform 0.05s linear";
        });
        
        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
            card.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
        });
    });
}
