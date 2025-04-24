// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all tab links and content sections
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Store current active tab in sessionStorage
    const storedTab = sessionStorage.getItem('activeTab');
    
    // If there's a stored tab and it exists, activate it
    if (storedTab) {
        const tabToActivate = document.querySelector(`.tab-link[data-tab="${storedTab}"]`);
        if (tabToActivate) {
            activateTab(storedTab);
        } else {
            // Default to first tab if stored tab doesn't exist
            activateTab('brochures');
        }
    } else {
        // Default to first tab if no stored preference
        activateTab('brochures');
    }
    
    // Add click event listeners to all tab links
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            activateTab(tabId);
            
            // Store the active tab ID in sessionStorage
            sessionStorage.setItem('activeTab', tabId);
        });
    });
    
    // Function to activate a specific tab
    function activateTab(tabId) {
        // Remove active class from all tabs
        tabLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Add active class to selected tab
        document.querySelector(`.tab-link[data-tab="${tabId}"]`).classList.add('active');
        document.getElementById(tabId).classList.add('active');
    }
    
    // Create dropdown menu for mobile view
    createMobileMenu();
});

// Function to create a dropdown menu for mobile view
function createMobileMenu() {
    // Check if we're on mobile
    const isMobile = window.matchMedia("(max-width: 600px)").matches;
    
    if (isMobile) {
        // Create dropdown container
        const dropdownContainer = document.createElement('div');
        dropdownContainer.className = 'project-dropdown';
        
        // Create select element
        const select = document.createElement('select');
        select.id = 'project-select';
        
        // Get all tab links
        const tabLinks = document.querySelectorAll('.tab-link');
        
        // Create options from tab links
        tabLinks.forEach(link => {
            const option = document.createElement('option');
            option.value = link.getAttribute('data-tab');
            
            // Get the display text based on current language
            const currentLang = document.lang_switch.lang.value;
            const langSpan = link.querySelector(`span.lang[lang="${currentLang}"]`);
            option.textContent = langSpan ? langSpan.textContent : link.textContent;
            
            select.appendChild(option);
        });
        
        // Set the current active tab as selected
        const activeTab = document.querySelector('.tab-link.active');
        if (activeTab) {
            select.value = activeTab.getAttribute('data-tab');
        }
        
        // Add change event listener
        select.addEventListener('change', function() {
            activateTab(this.value);
            sessionStorage.setItem('activeTab', this.value);
        });
        
        // Append select to container
        dropdownContainer.appendChild(select);
        
        // Insert dropdown after personal info and before first section
        const personalInfo = document.querySelector('.personal-info');
        const firstSection = document.querySelector('section');
        personalInfo.parentNode.insertBefore(dropdownContainer, firstSection);
        
        // Function to activate a tab
        function activateTab(tabId) {
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            document.getElementById(tabId).classList.add('active');
        }
    }
}

// Update mobile menu when language changes
window.addEventListener('change', function(e) {
    if (e.target.name === 'lang') {
        // Recreate mobile menu with updated language
        const dropdown = document.querySelector('.project-dropdown');
        if (dropdown) {
            dropdown.remove();
            createMobileMenu();
        }
    }
});