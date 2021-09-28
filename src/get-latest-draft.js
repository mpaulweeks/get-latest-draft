const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const time = (new Date()).toTimeString();
    core.setOutput('time', time);
    console.log('time', time);

    const myToken = core.getInput('github_token');
    console.log('github_token', myToken);

    const context = github.context;
    console.log('context', context);

    const contextInfo = context.repo;
    console.log('contextInfo', context);

    const octokit = github.getOctokit(myToken);
    console.log('octokit', octokit);

    const response = await octokit.rest.repos.listReleases({
      owner: contextInfo.owner,
      repo: contextInfo.repo,
    });
    console.log('response', response);

    const drafts = response.data.filter(rel => rel.draft);
    console.log('drafts', drafts);

    const latest = drafts[0];
    console.log(latest);
    core.setOutput('id', latest.id.toString());
  } catch (error) {
    console.log('there was an error during runtime!');
    core.setFailed(error.message);
  }
}

module.exports = run;
