import axios from 'axios';

// GitHub API configuration
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Create axios instance with authentication headers
const githubApi = axios.create({
  headers: GITHUB_TOKEN ? {
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json'
  } : {
    'Accept': 'application/vnd.github.v3+json'
  }
});

export const fetchRepoDetails = async (url) => {
  try {
    // Extract owner and repo from URL
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) throw new Error('Invalid GitHub URL');

    const [_, owner, repo] = match;
    const cleanRepo = repo.replace(/\.git$/, '');

    // Parallel fetch for better performance
    const [readmeRes, packageRes, repoInfoRes, commitsRes, languagesRes] = await Promise.allSettled([
      // Fetch README (try main and master branches)
      axios.get(`https://raw.githubusercontent.com/${owner}/${cleanRepo}/main/README.md`)
        .catch(() => axios.get(`https://raw.githubusercontent.com/${owner}/${cleanRepo}/master/README.md`)),

      // Fetch package.json
      axios.get(`https://raw.githubusercontent.com/${owner}/${cleanRepo}/main/package.json`)
        .catch(() => axios.get(`https://raw.githubusercontent.com/${owner}/${cleanRepo}/master/package.json`)),

      // Fetch repository metadata from GitHub API (authenticated)
      githubApi.get(`https://api.github.com/repos/${owner}/${cleanRepo}`),

      // Fetch recent commits (authenticated)
      githubApi.get(`https://api.github.com/repos/${owner}/${cleanRepo}/commits?per_page=5`),

      // Fetch language breakdown (authenticated)
      githubApi.get(`https://api.github.com/repos/${owner}/${cleanRepo}/languages`)
    ]);

    const readme = readmeRes.status === 'fulfilled' ? readmeRes.value?.data || '' : '';
    const packageJson = packageRes.status === 'fulfilled' ? packageRes.value?.data : null;
    const repoInfo = repoInfoRes.status === 'fulfilled' ? repoInfoRes.value?.data : null;
    const commits = commitsRes.status === 'fulfilled' ? commitsRes.value?.data : [];
    const languages = languagesRes.status === 'fulfilled' ? languagesRes.value?.data : {};

    // === ENHANCED PROJECT TYPE DETECTION ===
    let projectType = 'Software Project';
    const readmeLower = readme.toLowerCase();

    if (packageJson) {
      // Detect based on dependencies
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
      if (deps['react'] || deps['vue'] || deps['angular']) projectType = 'Web Application';
      else if (deps['express'] || deps['fastify'] || deps['koa']) projectType = 'Backend API';
      else if (deps['commander'] || deps['yargs']) projectType = 'CLI Tool';
      else if (packageJson.main && !deps['react']) projectType = 'JavaScript Library';
    }

    // Override with README hints
    if (readmeLower.includes('cli tool') || readmeLower.includes('command-line')) projectType = 'CLI Tool';
    else if (readmeLower.includes('rest api') || readmeLower.includes('graphql')) projectType = 'API Service';
    else if (readmeLower.includes('library') || readmeLower.includes('sdk')) projectType = 'Developer Library';
    else if (readmeLower.includes('web app') || readmeLower.includes('dashboard')) projectType = 'Web Application';
    else if (readmeLower.includes('mobile app')) projectType = 'Mobile Application';

    // === EXTRACT DESCRIPTION & SUMMARY ===
    let description = repoInfo?.description || '';
    let summary = readme.split('\n')
      .filter(line => {
        const trimmed = line.trim();
        return trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('```') && trimmed.length > 20;
      })
      .slice(0, 3)
      .join(' ')
      .substring(0, 300);

    if (!summary || summary.length < 30) {
      summary = description || `A ${projectType.toLowerCase()} focused on clean architecture and modern development practices.`;
    }

    // === EXTRACT FEATURES (ENHANCED) ===
    const featureSection = readme.match(/##\s*(?:Features|Key Features|Highlights)([\s\S]*?)(?=##|$)/i);
    let features = [];

    if (featureSection) {
      features = featureSection[1]
        .split('\n')
        .filter(line => line.trim().match(/^[-*•]\s+/))
        .map(f => f.replace(/^[-*•\s]+/, '').replace(/[*_`]/g, '').trim())
        .filter(f => f.length > 10 && f.length < 150)
        .slice(0, 5);
    }

    if (features.length === 0) {
      features = readme.split('\n')
        .filter(line => line.trim().match(/^[-*•]\s+\*\*/))
        .map(f => f.replace(/^[-*•\s]+/, '').replace(/[*_`]/g, '').trim())
        .slice(0, 5);
    }

    // === TECH STACK DETECTION (ENHANCED) ===
    let techStack = [];

    if (packageJson?.dependencies) {
      const deps = Object.keys(packageJson.dependencies);
      techStack = deps.filter(dep =>
        !dep.startsWith('@types') &&
        !dep.includes('eslint') &&
        !dep.includes('prettier')
      ).slice(0, 8);
    }

    // Add languages from GitHub API
    const topLanguages = Object.keys(languages).slice(0, 3);
    techStack = [...new Set([...topLanguages, ...techStack])];

    if (techStack.length === 0) {
      techStack = ['JavaScript', 'Node.js', 'Modern Web Stack'];
    }

    // === EXTRACT TECHNICAL INSIGHTS ===
    const technicalKeywords = [
      'architecture', 'performance', 'optimization', 'scalable', 'real-time',
      'asynchronous', 'concurrent', 'distributed', 'microservice', 'serverless',
      'caching', 'authentication', 'security', 'encryption', 'api design'
    ];

    const insights = readme.split(/[.!?]/)
      .filter(sentence => {
        const lower = sentence.toLowerCase();
        return technicalKeywords.some(key => lower.includes(key)) && sentence.length > 30;
      })
      .map(s => s.trim())
      .slice(0, 3);

    // === EXTRACT USE CASES ===
    const useCaseSection = readme.match(/##\s*(?:Use Cases|Usage|Getting Started|Why)([\s\S]*?)(?=##|$)/i);
    let useCases = [];

    if (useCaseSection) {
      useCases = useCaseSection[1]
        .split('\n')
        .filter(line => line.trim().match(/^[-*•💡]/))
        .map(u => u.replace(/^[-*•💡\s]+/, '').replace(/[*_`]/g, '').trim())
        .slice(0, 3);
    }

    // === PROCESS COMMITS ===
    const recentUpdates = commits
      .map(c => c.commit.message.split('\n')[0])
      .filter(msg => msg.length > 5 && !msg.toLowerCase().includes('merge'))
      .slice(0, 3);

    // === CALCULATE PROJECT STATS ===
    const stats = {
      stars: repoInfo?.stargazers_count || 0,
      forks: repoInfo?.forks_count || 0,
      openIssues: repoInfo?.open_issues_count || 0,
      lastUpdated: repoInfo?.updated_at ? new Date(repoInfo.updated_at).toLocaleDateString() : 'Recently',
      license: repoInfo?.license?.name || 'Not specified'
    };

    // === FALLBACK VALUES ===
    const defaultFeatures = [
      `Built with ${techStack[0] || 'modern technologies'}`,
      'Clean, maintainable codebase',
      'Production-ready architecture'
    ];

    const defaultInsights = [
      'Implements industry-standard design patterns',
      'Optimized for developer experience and extensibility'
    ];

    const defaultUseCases = [
      'Streamlining development workflows',
      'Building scalable applications'
    ];

    return {
      name: cleanRepo,
      owner,
      readme,
      description,
      summary,
      techStack,
      projectType,
      features: features.length > 0 ? features : defaultFeatures,
      insights: insights.length > 0 ? insights : defaultInsights,
      recentUpdates: recentUpdates.length > 0 ? recentUpdates : [`Updated ${cleanRepo}`, 'Enhanced core functionality'],
      useCases: useCases.length > 0 ? useCases : defaultUseCases,
      stats,
      languages: topLanguages
    };
  } catch (error) {
    console.error('Error fetching repo details:', error);
    return null;
  }
};
