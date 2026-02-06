import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Main parser function that routes to specific handlers based on file type
 */
export const parseResume = async (file) => {
    try {
        let text = '';
        if (file.type === 'application/pdf') {
            text = await parsePDF(file);
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            text = await parseDOCX(file);
        } else {
            throw new Error('Unsupported file format');
        }

        return extractSections(text);
    } catch (error) {
        console.error('Parsing error:', error);
        throw error;
    }
};

/**
 * Extracts text from a PDF file
 */
const parsePDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + '\n';
    }

    return fullText;
};

/**
 * Extracts text from a DOCX file
 */
const parseDOCX = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
};

/**
 * Heuristic-based section extraction
 */
const extractSections = (text) => {
    // Basic normalization
    const normalizedText = text.replace(/\s+/g, ' ').trim();

    // Initial structure
    const resumeData = {
        personalInfo: {
            fullName: '',
            email: '',
            phone: '',
            jobTitle: '',
            linkedin: '',
            portfolio: '',
            summary: ''
        },
        experience: [],
        education: [],
        skills: [],
        projects: []
    };

    // Extract Email (Regex)
    const emailMatch = normalizedText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/);
    if (emailMatch) resumeData.personalInfo.email = emailMatch[0];

    // Extract Phone (Regex)
    const phoneMatch = normalizedText.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    if (phoneMatch) resumeData.personalInfo.phone = phoneMatch[0];

    // Attempt to extract Name (very heuristic - assumes first few words)
    // A better approach would be to look for the first line or use NLP, but for regex/simple heuristic:
    // We'll skip name extraction for now to avoid bad false positives, or take the first 3 words.
    // Let's take the first non-empty line as a guess for the name.
    const nameMatch = text.split('\n').find(line => line.trim().length > 0 && line.trim().length < 30);
    if (nameMatch) {
        resumeData.personalInfo.fullName = nameMatch.trim();
    }

    // Extract Sections based on Keywords
    // We will simple look for keywords and grab the text chunk following it until the next keyword.

    // Define markers
    const markers = {
        experience: ['experience', 'employment', 'work history', 'professional experience'],
        education: ['education', 'academic', 'qualifications', 'degrees'],
        skills: ['skills', 'technologies', 'technical skills', 'stack'],
        projects: ['projects', 'key projects', 'portfolio'],
        summary: ['summary', 'profile', 'about me', 'objective']
    };

    // Simple text search for markers (Case insensitive)
    const lowerText = normalizedText.toLowerCase();

    // Helper to find index of sections
    const findSectionStart = (keywords) => {
        for (const word of keywords) {
            const index = lowerText.indexOf(word);
            if (index !== -1) return index;
        }
        return -1;
    };

    const indices = [
        { section: 'experience', index: findSectionStart(markers.experience) },
        { section: 'education', index: findSectionStart(markers.education) },
        { section: 'skills', index: findSectionStart(markers.skills) },
        { section: 'projects', index: findSectionStart(markers.projects) },
        { section: 'summary', index: findSectionStart(markers.summary) }
    ].filter(i => i.index !== -1).sort((a, b) => a.index - b.index);

    // Extract content between indices
    indices.forEach((item, i) => {
        const start = item.index;
        const end = indices[i + 1] ? indices[i + 1].index : normalizedText.length;
        // +20 to skip the header itself roughly
        let content = normalizedText.substring(start, end).replace(item.section, '');

        // Very basic parsing of the content string into arrays for specific sections
        if (item.section === 'skills') {
            // Split by commas or bullets
            resumeData.skills = content.split(/[,•\n]/).map(s => s.trim()).filter(s => s.length > 2 && s.length < 30).slice(0, 15); // Limit to 15 reasonable skills
        } else if (item.section === 'summary') {
            resumeData.personalInfo.summary = content.trim().substring(0, 500); // Limit length
        } else if (item.section === 'experience') {
            // Providing a single "bulk" experience item for the user to edit later is safer than trying to regex complex dates/companies
            resumeData.experience.push({
                id: Date.now(),
                title: 'Imported Experience',
                company: 'Please Edit',
                startDate: '',
                endDate: '',
                description: content.substring(0, 500) // Truncate to avoid massive blocks
            });
        } else if (item.section === 'education') {
            resumeData.education.push({
                id: Date.now(),
                degree: 'Imported Education',
                school: content.substring(0, 100),
                graduationDate: ''
            });
        }
    });

    return resumeData;
};
