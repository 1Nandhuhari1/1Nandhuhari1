/**
 * Analyzes resume data and provides an ATS score and feedback
 */
export const calculateATSScore = (resumeData) => {
    let score = 0;
    const feedback = [];
    const criticalIssues = [];

    // 1. Content Completeness (40 points)

    // Contact Info (10 pts)
    if (resumeData.personalInfo.email && resumeData.personalInfo.phone) {
        score += 10;
    } else {
        resumeData.personalInfo.email ? null : criticalIssues.push("Missing Email Address");
        resumeData.personalInfo.phone ? null : criticalIssues.push("Missing Phone Number");
    }

    // Experience (15 pts)
    if (resumeData.experience && resumeData.experience.length > 0) {
        score += 15;
        // Check specifics
        const hasDescriptions = resumeData.experience.every(exp => exp.description && exp.description.length > 20);
        if (!hasDescriptions) {
            score -= 5;
            feedback.push("Add more details to your experience descriptions.");
        }
    } else {
        criticalIssues.push("No Experience section found.");
    }

    // Education (5 pts)
    if (resumeData.education && resumeData.education.length > 0) {
        score += 5;
    } else {
        feedback.push("Adding an Education section is recommended.");
    }

    // Skills (10 pts)
    if (resumeData.skills && resumeData.skills.length >= 5) {
        score += 10;
    } else if (resumeData.skills && resumeData.skills.length > 0) {
        score += 5;
        feedback.push("Add more skills (aim for at least 5).");
    } else {
        criticalIssues.push("No Skills listed.");
    }

    // 2. Keyword Optimization (30 points)
    // In a real app, this would compare against a specific job description.
    // Here we check for "power words" and general industry terms.

    const powerWords = [
        'developed', 'managed', 'led', 'created', 'designed', 'implemented',
        'improved', 'increased', 'reduced', 'launched', 'collaborated', 'analyzed'
    ];

    const stringifiedData = JSON.stringify(resumeData).toLowerCase();

    let powerWordCount = 0;
    powerWords.forEach(word => {
        if (stringifiedData.includes(word)) powerWordCount++;
    });

    if (powerWordCount >= 5) {
        score += 30;
    } else if (powerWordCount >= 2) {
        score += 15;
        feedback.push(`Use more action verbs (e.g., "Led", "Developed", "Analyzed"). Found: ${powerWordCount}`);
    } else {
        feedback.push("Your resume lacks strong action verbs.");
    }


    // 3. Formatting & Length (30 points)

    // Check Summary Length
    const summaryLen = resumeData.personalInfo.summary ? resumeData.personalInfo.summary.length : 0;
    if (summaryLen > 100 && summaryLen < 1000) {
        score += 15;
    } else if (summaryLen === 0) {
        feedback.push("Add a professional summary.");
    } else if (summaryLen < 100) {
        feedback.push("Expand your professional summary.");
    } else {
        feedback.push("Your summary might be too long.");
    }

    // Check formatting consistency (simulated)
    // We assume the data structure itself enforces some consistency, so we give points for valid data
    if (resumeData.personalInfo.fullName) {
        score += 15;
    } else {
        criticalIssues.push("Missing Full Name.");
    }

    return {
        score: Math.min(100, score),
        feedback,
        criticalIssues
    };
};
