const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const time = (new Date()).toTimeString();
    console.log(time);
    core.setOutput("time", time);

    const myToken = core.getInput('github_token');

    const context = github.context;
    const octokit = github.getOctokit(myToken);
    const response = await octokit.rest.repos.listReleases({
      owner: context.owner,
      repo: context.repo,
    });

    const drafts = response.data.filter(rel => rel.draft);
    console.log(drafts);

    const latest = drafts[0];
    console.log(latest);
    core.setOutput('id', latest.id.toString());
  } catch (error) {
    console.log('there was an error during runtime!');
    core.setFailed(error.message);
  }
}

module.exports = run;
