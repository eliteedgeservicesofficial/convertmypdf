// DOM Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const removeFile = document.getElementById('removeFile');
const conversionOptions = document.getElementById('conversionOptions');
const convertSection = document.getElementById('convertSection');
const convertBtn = document.getElementById('convertBtn');
const progressSection = document.getElementById('progressSection');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const downloadSection = document.getElementById('downloadSection');
const downloadBtn = document.getElementById('downloadBtn');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

let selectedFile = null;
let selectedFormat = null;

// Mobile menu toggle
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// File upload functionality
dropZone.addEventListener('click', () => {
    fileInput.click();
});

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('border-blue-400', 'bg-blue-50');
});

dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-blue-400', 'bg-blue-50');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('border-blue-400', 'bg-blue-50');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileSelect(files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFileSelect(e.target.files[0]);
    }
});

// Handle file selection
function handleFileSelect(file) {
    // Validate file type
    if (file.type !== 'application/pdf') {
        alert('Please select a PDF file.');
        return;
    }
    
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB.');
        return;
    }
    
    selectedFile = file;
    
    // Display file info
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    
    // Show file info and conversion options
    fileInfo.classList.remove('hidden');
    conversionOptions.classList.remove('hidden');
    
    // Hide other sections
    convertSection.classList.add('hidden');
    progressSection.classList.add('hidden');
    downloadSection.classList.add('hidden');
    
    // Reset selected format
    selectedFormat = null;
    document.querySelectorAll('.conversion-option').forEach(option => {
        option.classList.remove('border-blue-500', 'bg-blue-100');
    });
}

// Remove file
removeFile.addEventListener('click', () => {
    selectedFile = null;
    selectedFormat = null;
    fileInput.value = '';
    
    // Hide all sections
    fileInfo.classList.add('hidden');
    conversionOptions.classList.add('hidden');
    convertSection.classList.add('hidden');
    progressSection.classList.add('hidden');
    downloadSection.classList.add('hidden');
});

// Conversion option selection
document.querySelectorAll('.conversion-option').forEach(option => {
    option.addEventListener('click', () => {
        // Remove selection from all options
        document.querySelectorAll('.conversion-option').forEach(opt => {
            opt.classList.remove('border-blue-500', 'bg-blue-100');
        });
        
        // Add selection to clicked option
        option.classList.add('border-blue-500', 'bg-blue-100');
        selectedFormat = option.dataset.format;
        
        // Show convert button
        convertSection.classList.remove('hidden');
    });
});

// Convert button functionality
convertBtn.addEventListener('click', () => {
    if (!selectedFile || !selectedFormat) {
        alert('Please select a file and conversion format.');
        return;
    }
    
    startConversion();
});

// Start conversion process (simulation)
function startConversion() {
    // Hide convert section and show progress
    convertSection.classList.add('hidden');
    progressSection.classList.remove('hidden');
    
    // Simulate conversion progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        
        if (progress < 30) {
            progressText.textContent = 'Analyzing PDF structure...';
        } else if (progress < 60) {
            progressText.textContent = 'Converting content...';
        } else if (progress < 90) {
            progressText.textContent = 'Optimizing output...';
        } else {
            progressText.textContent = 'Finalizing conversion...';
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                showDownloadSection();
            }, 500);
        }
    }, 200);
}

// Show download section
function showDownloadSection() {
    progressSection.classList.add('hidden');
    downloadSection.classList.remove('hidden');
}

// Download button functionality
downloadBtn.addEventListener('click', () => {
    // In a real implementation, this would download the converted file
    // For demo purposes, we'll show an alert
    alert(`Download started! Your PDF has been converted to ${selectedFormat.toUpperCase()} format.`);
    
    // Reset the form after download
    setTimeout(() => {
        removeFile.click();
    }, 1000);
});

// Utility function to format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add some interactive animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate feature cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    document.querySelectorAll('.grid > div').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

