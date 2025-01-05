// Component loading functionality
async function loadComponent(componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const html = await response.text();
        
        // Create a temporary container
        const temp = document.createElement('div');
        temp.innerHTML = html;
        
        // Extract the content
        const content = temp.firstElementChild;
        if (!content) {
            throw new Error('No content found in component');
        }
        
        return content.cloneNode(true);
    } catch (error) {
        console.error('Error loading component:', error);
        return null;
    }
}

async function initializeComponent(targetSelector, componentPath) {
    const targetElement = document.querySelector(targetSelector);
    if (!targetElement) {
        console.error(`Target element ${targetSelector} not found`);
        return;
    }

    const component = await loadComponent(componentPath);
    if (!component) {
        console.error(`Failed to load component from ${componentPath}`);
        return;
    }

    // Clear target and append new component
    targetElement.innerHTML = '';
    targetElement.appendChild(component);

    // Initialize navigation if this is a nav-bar component
    if (componentPath.includes('nav-bar.html')) {
        // Force a small delay to ensure DOM is updated
        setTimeout(() => {
            if (window.initializeNavigation) {
                window.initializeNavigation();
            } else {
                console.error('Navigation initialization function not found');
            }
        }, 100);
    }
}

// Export the function
window.initializeComponent = initializeComponent;
