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
                        <div class="button-container">
                            <a href="${segment.regLink}" class="btn btn-card btn-primary" style="flex: 1;">Register Now</a>
                            <a href="https://iubatpayment.net/payment/IIEC" target="_blank" class="btn btn-card pay-btn" style="flex: 1;">Payment</a>
                        </div>
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
    
    // Inject AI Pitch Validator for Hackathon, Idea Pitching, and Business Case Study
    let validatorHtml = "";
    if (["hackathon", "idea-pitching", "business-case-study"].includes(segmentId)) {
        validatorHtml = `
            <div class="ai-pitch-validator">
                <div class="validator-title">
                    <span>💡</span> AI Pitch Validator
                </div>
                <p class="validator-desc">Describe your project idea, startup concept, or business solution in one sentence to get an instant viability assessment from Gemini AI.</p>
                <div class="pitch-input-group">
                    <input type="text" id="pitch-input-field" class="pitch-input" placeholder="Describe your idea in one sentence..." autocomplete="off">
                    <button id="validate-pitch-btn" class="pitch-btn">Validate Idea</button>
                </div>
                <div id="pitch-result-box" class="pitch-result-box"></div>
            </div>
        `;
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
                            <span class="meta-label">Registration Status</span>
                            <span class="meta-value text-pink">Open</span>
                        </div>
                    </div>
                </div>
                
                <div class="detail-footer-actions">
                    <a href="${segment.rulebookLink}" class="btn btn-outline detail-action-btn">Read Rulebook</a>
                    <div class="button-container">
                        <a href="${segment.regLink}" class="btn btn-primary btn-glow detail-action-btn" style="flex: 1;">Register Now</a>
                        <a href="https://iubatpayment.net/payment/IIEC" target="_blank" class="btn pay-btn detail-action-btn" style="flex: 1;">Payment</a>
                    </div>
                </div>
                
                ${validatorHtml}
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
    contentArea.addEventListener("click", async (e) => {
        // Handle "View Details" button click
        if (e.target.classList.contains("view-details-btn")) {
            const segmentId = e.target.getAttribute("data-id");
            renderSegment(segmentId);
        }
        
        // Handle "Back to Home" button click
        if (e.target.classList.contains("back-home-btn")) {
            renderHome();
        }
        
        // Handle "Validate Idea" button click
        if (e.target.id === "validate-pitch-btn") {
            const pitchInput = document.getElementById("pitch-input-field");
            const resultBox = document.getElementById("pitch-result-box");
            if (!pitchInput || !resultBox) return;
            
            const pitchText = pitchInput.value.trim();
            if (!pitchText) return;
            
            // Show loading state
            resultBox.innerHTML = `
                <div class="thinking-loader">
                    Gemini is analyzing your pitch<span class="loader-dot"></span><span class="loader-dot"></span><span class="loader-dot"></span>
                </div>
            `;
            resultBox.classList.add("active");
            
            try {
                const systemPrompt = "Analyze the startup/project idea. Return EXACTLY three bullet points formatted strictly as: " +
                                     "1. Innovation Score (x/10)\n" +
                                     "2. Potential Challenge\n" +
                                     "3. Verdict\n" +
                                     "Do not return any introductory or concluding text, only these 3 points.";
                
                const rawReply = await callGeminiAPI(pitchText, systemPrompt);
                
                // Parse reply lines into structured bullet items if possible, or display as standard bullets
                const lines = rawReply.split('\n').filter(line => line.trim().length > 0);
                let listHtml = '<ul class="result-bullets">';
                lines.forEach(line => {
                    // Remove leading digit or dot prefix if present to clean it up
                    const cleanedLine = line.replace(/^\d+[\.\s\-]+/, "").trim();
                    if (cleanedLine) {
                        listHtml += `<li>${cleanedLine}</li>`;
                    }
                });
                listHtml += '</ul>';
                
                resultBox.innerHTML = listHtml;
            } catch (error) {
                console.error(error);
                resultBox.innerHTML = `<span style="color: var(--accent-crimson)">Failed to validate idea. Please verify your network and try again.</span>`;
            }
        }
    });
    
    // Handle Navigation Header Home Link click
    if (navbarHomeBtn) {
        navbarHomeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            renderHome();
        });
    }
    
    // Handle Hero CTA Register button scroll
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
    initChatbot(); // Initialize AI Concierge Chatbot
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

async function callGeminiAPI(prompt, systemInstruction) {
    const response = await fetch('/api/gemini', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt, systemInstruction })
    });
    
    if (!response.ok) {
        throw new Error(`Gemini proxy API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content) {
        throw new Error("Invalid response structure from Gemini API");
    }
    
    return data.candidates[0].content.parts[0].text;
}

// Initialize Chatbot Widget Interaction logic
function initChatbot() {
    const chatbotFab = document.getElementById("chatbot-fab");
    const chatbotWindow = document.getElementById("chatbot-window");
    const chatbotCloseBtn = document.getElementById("chatbot-close-btn");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotSendBtn = document.getElementById("chatbot-send-btn");
    const unreadDot = document.getElementById("chatbot-unread-dot");
    
    if (!chatbotFab || !chatbotWindow || !chatbotCloseBtn || !chatbotInput || !chatbotSendBtn) return;

    // --- Helper: open/close the chat window ---
    const openChat = () => {
        chatbotWindow.classList.add("active");
        if (unreadDot) unreadDot.classList.remove("visible");
        chatbotInput.focus();
    };

    const closeChat = () => {
        chatbotWindow.classList.remove("active");
    };

    // --- Toggle chat window visibility ---
    chatbotFab.addEventListener("click", () => {
        if (chatbotWindow.classList.contains("active")) {
            closeChat();
        } else {
            openChat();
        }
    });

    chatbotCloseBtn.addEventListener("click", () => {
        closeChat();
        // Show the unread dot to remind the user the concierge is waiting
        if (unreadDot) unreadDot.classList.add("visible");
    });

    // Proactive Chatbot Greeting
    if (!localStorage.getItem('hasSeenGreeting')) {
        setTimeout(() => {
            // Function to open the chat widget
            openChat();
            
            // Send the welcome message
            const welcomeMsg = "Welcome to IIEC 2026! I am your AI Concierge. Need help navigating our competition segments or registration?";
            appendChatMessage('bot', welcomeMsg);
            
            // Mark as seen
            localStorage.setItem('hasSeenGreeting', 'true');
        }, 3000); // 3-second delay
    }

    // --- Send message logic ---
    const handleSend = async () => {
        const messageText = chatbotInput.value.trim();
        if (!messageText) return;
        
        // Append user message
        appendChatMessage("user", messageText);
        chatbotInput.value = "";
        
        // Append loading/thinking bubble
        const thinkingBubble = appendChatMessage("bot", `
            <div class="thinking-loader">
                Thinking<span class="loader-dot"></span><span class="loader-dot"></span><span class="loader-dot"></span>
            </div>
        `);
        
        try {
            const systemInstruction = "You are the official IIEC 2026 Concierge. Keep answers brief.";
            const reply = await callGeminiAPI(messageText, systemInstruction);
            thinkingBubble.innerText = reply;
        } catch (error) {
            console.error(error);
            thinkingBubble.innerText = "Sorry, I am having trouble connecting right now. Please try again later.";
        }
    };
    
    chatbotSendBtn.addEventListener("click", handleSend);
    chatbotInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    });
}

function appendChatMessage(sender, text) {
    const chatbotMessages = document.getElementById("chatbot-messages");
    if (!chatbotMessages) return null;
    
    const bubble = document.createElement("div");
    bubble.className = `message ${sender}-message`;
    bubble.innerHTML = text;
    
    chatbotMessages.appendChild(bubble);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return bubble;
}
