document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const transcriptForm = document.getElementById('transcript-form');
    const videoUrlInput = document.getElementById('video-url');
    const submitBtn = document.getElementById('submit-btn');
    const loadingSection = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');
    const resultContainer = document.getElementById('result-container');
    const transcriptContent = document.getElementById('transcript-content');
    const downloadBtn = document.getElementById('download-btn');

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // API configuration
    const API_AVAILABLE = false; // Set to true when you have the backend API running
    const API_URL = 'http://localhost:3000/api/transcript';

    // Function to extract YouTube video ID from URL
    function extractVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    // Function to show loading state with animation
    function showLoading() {
        loadingSection.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        resultContainer.classList.add('hidden');
        submitBtn.disabled = true;
        
        // Add pulsing animation to the loader
        document.querySelector('.loader').classList.add('pulse');
        
        // Scroll to the loading section
        loadingSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Function to show error state with animation
    function showError() {
        loadingSection.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        resultContainer.classList.add('hidden');
        submitBtn.disabled = false;
        
        // Add shake animation to the error message
        const errorElem = errorMessage.querySelector('p');
        errorElem.classList.add('shake');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            errorElem.classList.remove('shake');
        }, 820);
        
        // Scroll to the error message
        errorMessage.scrollIntoView({ behavior: 'smooth' });
    }

    // Function to show results with a fade-in effect
    function showResults(transcript) {
        loadingSection.classList.add('hidden');
        errorMessage.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        submitBtn.disabled = false;
        
        // Clear any existing text first
        transcriptContent.textContent = '';
        
        // Scroll to the result container
        resultContainer.scrollIntoView({ behavior: 'smooth' });
        
        // Create a fade-in effect by typing the transcript
        const typeSpeed = Math.max(1, Math.floor(transcript.length / 5000)); // Adjust typing speed based on length
        let i = 0;
        
        function typeWriter() {
            if (i < transcript.length) {
                // Append the next chunk of text
                const chunk = transcript.slice(i, i + typeSpeed);
                transcriptContent.textContent += chunk;
                i += typeSpeed;
                
                // Keep the scroll at the top during typing
                transcriptContent.scrollTop = 0;
                
                setTimeout(typeWriter, 1);
            }
        }
        
        typeWriter();
    }

    // Function to generate a realistic transcript based on video ID
    function generateMockTranscript(videoId) {
        // Create a title based on the video ID
        const titles = [
            "How to Master JavaScript in 2023",
            "Complete Guide to Machine Learning",
            "The Future of Artificial Intelligence",
            "Web Development Best Practices",
            "Understanding Blockchain Technology",
            "Data Science for Beginners",
            "Advanced Python Programming Techniques",
            "React vs Angular: Comprehensive Comparison",
            "Cloud Computing Explained",
            "UX Design Principles Every Developer Should Know"
        ];
        
        // Use the video ID to deterministically select a title
        const titleIndex = videoId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % titles.length;
        const videoTitle = titles[titleIndex];
        
        // Generate speaker names
        const speakers = ["Host", "Sarah", "Michael", "Dr. Johnson", "Guest"];
        
        // Create a structured transcript with timestamps, speakers, and content
        let transcript = `Transcript for: "${videoTitle}" (Video ID: ${videoId})\n\n`;
        
        // Introduction section
        transcript += `[00:00] Host: Welcome to this video on ${videoTitle}. Today we're going to explore this fascinating topic in depth.\n\n`;
        transcript += `[00:14] Host: Before we begin, if you find this content helpful, don't forget to like and subscribe for more educational videos.\n\n`;
        transcript += `[00:22] Host: Let's start with an overview of what we'll cover today.\n\n`;
        
        // Main content - dynamically generated based on the video title
        if (videoTitle.includes("JavaScript")) {
            transcript += `[00:38] Host: JavaScript has evolved significantly over the years, and in 2023, there are several key concepts you need to master.\n\n`;
            transcript += `[00:52] Sarah: I've been using JavaScript for over 10 years now, and the landscape has changed dramatically.\n\n`;
            transcript += `[01:05] Host: Let's start with modern ES6+ features that every developer should know.\n\n`;
            transcript += `[01:18] Host: Arrow functions have simplified the syntax for writing functions. Let me show you some examples.\n\n`;
            transcript += `[01:45] Sarah: One thing to note about arrow functions is how they handle the 'this' keyword differently from traditional functions.\n\n`;
            transcript += `[02:10] Host: Next, let's talk about destructuring, which provides a cleaner way to extract values from objects and arrays.\n\n`;
            transcript += `[02:38] Sarah: Destructuring has become an essential part of modern JavaScript, especially when working with React and other frameworks.\n\n`;
            transcript += `[03:15] Host: Now let's discuss async/await, which has revolutionized how we handle asynchronous operations.\n\n`;
            transcript += `[03:42] Sarah: Before async/await, we relied heavily on callbacks and promises, which often led to callback hell.\n\n`;
            transcript += `[04:20] Host: Let me demonstrate how async/await can simplify your code with a practical example.\n\n`;
            transcript += `[05:55] Host: Another important aspect of modern JavaScript is working with modules.\n\n`;
            transcript += `[06:30] Sarah: ES modules have standardized how we share code between files, making our applications more maintainable.\n\n`;
            transcript += `[07:15] Host: Let's not forget about the popular JavaScript frameworks and libraries dominating the industry.\n\n`;
            transcript += `[07:42] Sarah: React, Vue, and Angular all have their strengths, but choosing the right one depends on your project requirements.\n\n`;
            transcript += `[08:50] Host: Testing is also crucial in JavaScript development. Jest and Mocha are widely used testing frameworks.\n\n`;
            transcript += `[09:35] Sarah: I personally prefer Jest due to its simplicity and powerful mocking capabilities.\n\n`;
            transcript += `[10:28] Host: Finally, let's discuss TypeScript, which has gained massive popularity as a superset of JavaScript.\n\n`;
            transcript += `[11:03] Sarah: TypeScript's static typing helps catch errors during development rather than at runtime.\n\n`;
            transcript += `[12:15] Host: Let's wrap up with some recommendations for further learning and practice.\n\n`;
        } else if (videoTitle.includes("Machine Learning") || videoTitle.includes("Artificial Intelligence") || videoTitle.includes("Data Science")) {
            transcript += `[00:45] Dr. Johnson: Machine learning is transforming industries across the globe, from healthcare to finance.\n\n`;
            transcript += `[01:12] Host: Can you explain the difference between supervised and unsupervised learning?\n\n`;
            transcript += `[01:25] Dr. Johnson: Absolutely. In supervised learning, we train algorithms using labeled data, while unsupervised learning discovers patterns in unlabeled data.\n\n`;
            transcript += `[02:10] Dr. Johnson: Let me demonstrate this with a practical example using a simple dataset.\n\n`;
            transcript += `[03:38] Host: What programming languages and tools are most commonly used in the industry?\n\n`;
            transcript += `[03:52] Dr. Johnson: Python dominates the field, with libraries like TensorFlow, PyTorch, and scikit-learn being essential tools.\n\n`;
            transcript += `[04:30] Dr. Johnson: Let's look at a basic classification problem using scikit-learn.\n\n`;
            transcript += `[06:15] Host: What about deep learning? How does it differ from traditional machine learning?\n\n`;
            transcript += `[06:28] Dr. Johnson: Deep learning is a subset of machine learning that uses neural networks with many layers, hence "deep."\n\n`;
            transcript += `[07:05] Dr. Johnson: Neural networks are inspired by the structure of the human brain, with interconnected nodes or "neurons."\n\n`;
            transcript += `[08:22] Host: Could you explain the concept of overfitting and how to prevent it?\n\n`;
            transcript += `[08:35] Dr. Johnson: Overfitting occurs when a model learns the training data too well, including its noise and outliers.\n\n`;
            transcript += `[09:10] Dr. Johnson: To prevent overfitting, we use techniques like regularization, cross-validation, and early stopping.\n\n`;
            transcript += `[10:40] Host: What exciting developments do you see on the horizon for AI and machine learning?\n\n`;
            transcript += `[10:55] Dr. Johnson: I'm particularly excited about advancements in reinforcement learning and the ethical frameworks being developed.\n\n`;
            transcript += `[11:48] Dr. Johnson: We're also seeing impressive progress in natural language processing, with models like GPT producing increasingly human-like text.\n\n`;
            transcript += `[12:36] Host: What advice would you give to someone just starting in this field?\n\n`;
            transcript += `[12:45] Dr. Johnson: Start with the fundamentals of statistics and linear algebra, then build a strong foundation in Python programming.\n\n`;
            transcript += `[13:20] Dr. Johnson: Don't be afraid to participate in competitions on platforms like Kaggle to apply your knowledge to real problems.\n\n`;
        } else if (videoTitle.includes("Web Development")) {
            transcript += `[00:42] Michael: Web development is constantly evolving, with new frameworks and tools emerging regularly.\n\n`;
            transcript += `[01:08] Host: What are the fundamental skills every web developer should master?\n\n`;
            transcript += `[01:15] Michael: HTML, CSS, and JavaScript remain the core technologies that power the web.\n\n`;
            transcript += `[01:45] Michael: Beyond that, understanding HTTP, APIs, and at least one backend language like Node.js or Python is crucial.\n\n`;
            transcript += `[02:30] Host: Let's talk about responsive design. Why is it so important?\n\n`;
            transcript += `[02:42] Michael: With the variety of devices used to access websites today, responsive design ensures your site looks good and functions well on all screen sizes.\n\n`;
            transcript += `[03:18] Michael: Let me show you some CSS techniques for creating responsive layouts.\n\n`;
            transcript += `[05:05] Host: What about performance optimization? How can developers ensure their sites load quickly?\n\n`;
            transcript += `[05:22] Michael: Performance is critical for user experience and SEO. Techniques include minifying code, optimizing images, and implementing lazy loading.\n\n`;
            transcript += `[06:10] Michael: Tools like Lighthouse and WebPageTest can help identify performance bottlenecks.\n\n`;
            transcript += `[07:35] Host: How has the rise of progressive web apps changed web development?\n\n`;
            transcript += `[07:50] Michael: PWAs bridge the gap between web and native applications, offering features like offline functionality and push notifications.\n\n`;
            transcript += `[08:45] Michael: Let me demonstrate how to implement service workers to enable offline capabilities.\n\n`;
            transcript += `[10:18] Host: Security is a major concern. What best practices should developers follow?\n\n`;
            transcript += `[10:30] Michael: Always validate user input, use HTTPS, implement proper authentication, and keep your dependencies updated.\n\n`;
            transcript += `[11:22] Michael: Cross-site scripting (XSS) and SQL injection remain common vulnerabilities that developers must guard against.\n\n`;
            transcript += `[12:40] Host: Finally, what does the future of web development look like?\n\n`;
            transcript += `[12:52] Michael: We're seeing increased adoption of WebAssembly, which allows high-performance code written in languages like C++ to run in browsers.\n\n`;
            transcript += `[13:30] Michael: AI-assisted development tools are also transforming how we write and debug code.\n\n`;
            transcript += `[14:15] Host: Thank you for these insights. Any final advice for aspiring web developers?\n\n`;
            transcript += `[14:22] Michael: Build projects that solve real problems, contribute to open source, and never stop learning new technologies.\n\n`;
        } else {
            // Generic content for other topics
            transcript += `[00:40] Host: This topic has gained significant attention in recent years, and for good reason.\n\n`;
            transcript += `[01:05] Guest: I've been working in this field for over a decade, and the advancements we've seen are truly remarkable.\n\n`;
            transcript += `[01:30] Host: Let's start with the fundamentals that everyone should understand.\n\n`;
            transcript += `[02:15] Guest: The key concepts to grasp are [technical term 1], [technical term 2], and [technical term 3].\n\n`;
            transcript += `[03:00] Guest: Let me explain each of these in detail, starting with [technical term 1].\n\n`;
            transcript += `[04:20] Host: Could you provide some real-world examples of how this is being applied?\n\n`;
            transcript += `[04:35] Guest: Certainly. Companies like [Company A] and [Company B] have implemented this technology with impressive results.\n\n`;
            transcript += `[05:50] Guest: For instance, [Company A] reported a 40% increase in efficiency after adopting these principles.\n\n`;
            transcript += `[06:30] Host: What challenges do practitioners in this field commonly face?\n\n`;
            transcript += `[06:45] Guest: The biggest hurdles are typically [challenge 1], [challenge 2], and integrating with existing systems.\n\n`;
            transcript += `[07:55] Guest: Let me share some strategies for overcoming these challenges based on my experience.\n\n`;
            transcript += `[09:10] Host: How do you see this field evolving over the next five years?\n\n`;
            transcript += `[09:25] Guest: I predict we'll see greater integration with [related technology], more accessible tools for beginners, and novel applications in [emerging sector].\n\n`;
            transcript += `[10:40] Guest: The potential impact on [industry] could be transformative, potentially disrupting traditional approaches.\n\n`;
            transcript += `[11:15] Host: What resources would you recommend for viewers who want to learn more?\n\n`;
            transcript += `[11:30] Guest: There are excellent online courses on platforms like Coursera and Udemy, as well as comprehensive books by [Author X] and [Author Y].\n\n`;
            transcript += `[12:20] Guest: Don't underestimate the value of hands-on projects and joining community forums where you can learn from others.\n\n`;
            transcript += `[13:05] Host: Any final thoughts or advice for our audience?\n\n`;
            transcript += `[13:15] Guest: Stay curious, be persistent through the learning curve, and don't be afraid to experiment with different approaches.\n\n`;
        }
        
        // Conclusion
        transcript += `[14:30] Host: That brings us to the end of today's video. I hope you found this information valuable.\n\n`;
        transcript += `[14:45] Host: If you have any questions, please leave them in the comments section below.\n\n`;
        transcript += `[14:58] Host: Thanks for watching, and see you in the next video!\n\n`;
        
        return transcript;
    }

    // Function to fetch transcript
    async function fetchTranscript(videoId) {
        try {
            if (API_AVAILABLE) {
                // Fetch from actual API if available
                const response = await fetch(`${API_URL}/${videoId}`);
                const data = await response.json();
                
                if (!data.success) {
                    throw new Error(data.error || 'Failed to fetch transcript');
                }
                
                return data.transcript;
            } else {
                // This is a mockup - for demo purposes when API is not available
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        // For demo purposes, we'll return a mock transcript
                        if (videoId) {
                            const mockTranscript = generateMockTranscript(videoId);
                            resolve(mockTranscript);
                        } else {
                            reject(new Error('Invalid video ID'));
                        }
                    }, 1500); // Simulate network delay
                });
            }
        } catch (error) {
            console.error('Error fetching transcript:', error);
            throw error;
        }
    }

    // Add input animation
    videoUrlInput.addEventListener('focus', () => {
        videoUrlInput.classList.add('focused');
    });
    
    videoUrlInput.addEventListener('blur', () => {
        if (!videoUrlInput.value) {
            videoUrlInput.classList.remove('focused');
        }
    });

    // Event listener for form submission
    transcriptForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const videoUrl = videoUrlInput.value.trim();
        const videoId = extractVideoId(videoUrl);
        
        if (!videoId) {
            showError();
            return;
        }
        
        showLoading();
        
        try {
            const transcript = await fetchTranscript(videoId);
            showResults(transcript);
        } catch (error) {
            console.error('Error:', error);
            showError();
        }
    });

    // Event listener for download button with animation
    downloadBtn.addEventListener('click', () => {
        // Add click animation
        downloadBtn.classList.add('clicked');
        setTimeout(() => downloadBtn.classList.remove('clicked'), 300);
        
        const transcript = transcriptContent.textContent;
        const videoUrl = videoUrlInput.value.trim();
        const videoId = extractVideoId(videoUrl) || 'transcript';
        
        // Create a blob and download link
        const blob = new Blob([transcript], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = `${videoId}-transcript.txt`;
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}); 