const linkedin = require('linkedin-api');
const instagram = require('instagram-web-api');
const octokit = require('octokit');

// LinkedIn API settings
const linkedinApi = new linkedin({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'YOUR_REDIRECT_URI',
});

// Instagram API settings
const instagramApi = new instagram({
  username: 'YOUR_USERNAME',
  password: 'YOUR_PASSWORD',
});

// GitHub API settings
const githubApi = new octokit({
  auth: 'YOUR_GITHUB_TOKEN',
});

// Function to share resume on LinkedIn
async function shareOnLinkedIn(resumeUrl) {
  try {
    const post = await linkedinApi.post({
      comment: 'Check out my resume!',
      content: {
        title: 'My Resume',
        description: 'Check out my resume!',
        submittedUrl: resumeUrl,
      },
      visibility: {
        code: 'anyone',
      },
    });
    console.log(post);
  } catch (error) {
    console.error(error);
  }
}

// Function to share resume on Instagram
async function shareOnInstagram(resumeUrl) {
  try {
    const post = await instagramApi.uploadPhoto({
      photo: resumeUrl,
      caption: 'Check out my resume!',
    });
    console.log(post);
  } catch (error) {
    console.error(error);
  }
}

// Function to share resume on GitHub
async function shareOnGitHub(resumeUrl) {
  try {
    const post = await githubApi.repos.create({
      owner: 'YOUR_GITHUB_USERNAME',
      repo: 'YOUR_GITHUB_REPO',
      title: 'My Resume',
      body: 'Check out my resume!',
      url: resumeUrl,
    });
    console.log(post);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  shareOnLinkedIn,
  shareOnInstagram,
  shareOnGitHub,
};
