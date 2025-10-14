// Main Application File
// Course data
const courses = [
    {
        id: 1,
        title: "Web Development",
        icon: "🌐",
        description: "Master HTML, CSS, JavaScript and modern frameworks to build responsive, interactive websites and web applications.",
        features: ["HTML5 & CSS3", "JavaScript ES6+", "React.js", "Node.js", "Database Integration"],
        price: "$299",
        originalPrice: "$499",
        category: "web-dev"
    },
    {
        id: 2,
        title: "Cybersecurity",
        icon: "🛡️",
        description: "Learn to protect systems, networks, and programs from digital attacks and implement security measures.",
        features: ["Network Security", "Encryption", "Threat Analysis", "Security Protocols", "Ethical Practices"],
        price: "$349",
        originalPrice: "$599",
        category: "cybersecurity"
    },
    {
        id: 3,
        title: "Data Science",
        icon: "📊",
        description: "Uncover insights from data using statistical analysis, machine learning, and data visualization techniques.",
        features: ["Python & R", "Statistical Analysis", "Machine Learning", "Data Visualization", "Big Data Tools"],
        price: "$399",
        originalPrice: "$649",
        category: "data-science"
    },
    {
        id: 4,
        title: "Android App Development",
        icon: "📱",
        description: "Create powerful Android applications using Java/Kotlin and master the Android SDK and development tools.",
        features: ["Java & Kotlin", "Android SDK", "UI/UX Design", "API Integration", "Google Play Deployment"],
        price: "$279",
        originalPrice: "$449",
        category: "android-dev"
    },
    {
        id: 5,
        title: "Ethical Hacking",
        icon: "🔓",
        description: "Learn penetration testing and vulnerability assessment to secure systems against malicious attacks.",
        features: ["Penetration Testing", "Vulnerability Assessment", "Security Tools", "Network Defense", "Legal Frameworks"],
        price: "$379",
        originalPrice: "$599",
        category: "ethical-hacking"
    },
    {
        id: 6,
        title: "Computer Literacy",
        icon: "💻",
        description: "Build fundamental computer skills from basic operations to productivity software and troubleshooting.",
        features: ["OS Navigation", "Productivity Software", "File Management", "Hardware Basics", "Troubleshooting"],
        price: "$199",
        originalPrice: "$299",
        category: "computer-literacy"
    }
];

// Global variables
let carousel;

// Initialize the application
function init() {
    // Initialize Three.js scene
    initThreeJS();
    
    // Initialize course carousel
    carousel = new CourseCarousel(courses);
    
    // Show welcome achievement
    setTimeout(() => {
        carousel.showAchievement("Welcome to CodeSphere Academy!");
    }, 1500);
}

// Start the app when the page loads
window.addEventListener('load', init);

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, stop animations if needed
    } else {
        // Page is visible, resume animations
    }
});