import axios from 'axios';

export const fetchRepoDetails = async (url) => {
  try {
    // Extract owner and repo from URL
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) throw new Error('Invalid GitHub URL');
    
    const [_, owner, repo] = match;
    const cleanRepo = repo.replace(/\.git$/, '');
    
    // Fetch README
    const readmeRes = await axios.get(`https://raw.githubusercontent.com/${owner}/${cleanRepo}/master/README.md`).catch(() => 
      axios.get(`https://raw.githubusercontent.com/${owner}/${cleanRepo}/main/README.md`)
    ).catch(() => null);

    // Fetch package.json
    const packageRes = await axios.get(`https://raw.githubusercontent.com/${owner}/${cleanRepo}/master/package.json`).catch(() => 
      axios.get(`https://raw.githubusercontent.com/${owner}/${cleanRepo}/main/package.json`)
    ).catch(() => null);

    // Fetch Recent Commits (GitHub API)
    const commitsRes = await axios.get(`https://api.github.com/repos/${owner}/${cleanRepo}/commits?per_page=3`).catch(() => null);
    const recentUpdates = commitsRes?.data?.map(c => c.commit.message) || [];

    const readme = readmeRes?.data || '';
    
    // Extract a brief summary from README or use a meaningful fallback
    let summary = readme.split('\n')
      .filter(line => line.trim() !== '' && !line.startsWith('#'))
      .slice(0, 2)
      .join(' ');
    
    // Detect project type
    let projectType = 'Engineering Project';
    if (readme.toLowerCase().includes('cli')) projectType = 'CLI Tool';
    else if (readme.toLowerCase().includes('library') || readme.toLowerCase().includes('sdk')) projectType = 'Developer Library';
    else if (readme.toLowerCase().includes('api')) projectType = 'Backend API Service';
    else if (readme.toLowerCase().includes('app') || readme.toLowerCase().includes('website')) projectType = 'Web Application';

    if (!summary || summary.length < 10) {
      summary = `A technical exploration into ${projectType.toLowerCase()} development, focusing on clean code and efficient implementation.`;
    }

    // Extract Features (look for 'Features' section or bullet points)
    const features = readme.split('\n')
      .filter(line => line.trim().startsWith('-') || line.trim().startsWith('*'))
      .slice(0, 3)
      .map(f => f.replace(/^[-*\s]+/, '').trim());

    // Extract Engineering Insights (look for specific technical keywords)
    const technicalKeywords = ['architecture', 'performance', 'optimization', 'security', 'scalable', 'asynchronous', 'concurrency'];
    const insights = readme.split('.')
      .filter(sentence => technicalKeywords.some(key => sentence.toLowerCase().includes(key)))
      .slice(0, 2)
      .map(s => s.trim());

    // Extract Use Cases
    const useCaseKeywords = ['usage', 'use case', 'examples', 'how it helps', 'get started', 'ideal for'];
    const useCases = readme.split('\n')
      .filter(line => useCaseKeywords.some(key => line.toLowerCase().includes(key)) || line.trim().startsWith('>'))
      .slice(0, 2)
      .map(u => u.replace(/^>|#|[-*]/g, '').trim());

    return {
      name: cleanRepo,
      owner,
      readme,
      summary: summary.substring(0, 250) + (summary.length > 250 ? '...' : ''),
      techStack: packageRes?.data?.dependencies ? Object.keys(packageRes.data.dependencies) : ['JavaScript', 'GitHub API', 'System Logic'],
      projectType,
      features: features.length > 0 ? features : ['Engineered with modular component architecture', 'Implemented clean coding standards', 'Optimized for developer scalability'],
      insights: insights.length > 0 ? insights : ['Focuses on project structure and maintainability', 'Leverages modern development patterns'],
      recentUpdates: recentUpdates.length > 0 ? recentUpdates : [`Initial implementation of ${cleanRepo}`, 'Added core project logic'],
      useCases: useCases.length > 0 ? useCases : ['Streamlining technical workflows', 'Developing robust engineering solutions']
    };
  } catch (error) {
    console.error('Error fetching repo details:', error);
    return null;
  }
};
