const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const myToken = core.getInput('github_token');
    const octokit = github.getOctokit(myToken);

    const context = github.context.repo;
    const response = await octokit.rest.repos.listReleases({
      owner: context.owner,
      repo: context.repo,
    });

    const drafts = response.data.filter(rel => rel.draft);
    const latest = drafts[0];

    core.setOutput('id', latest.id.toString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = run;
