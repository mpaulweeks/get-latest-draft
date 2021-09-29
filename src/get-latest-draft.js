const core = require('@actions/core');
const github = require('@actions/github');

function sortArrayOfObjects(arr, cb) {
  function compare(a, b) {
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    return 0;
  }
  const copy = arr.concat();
  copy.sort((a, b) => compare(cb(a), cb(b)));
  return copy;
}

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
    const latest = sortArrayOfObjects(drafts, d => d.created_at).reverse()[0];
    if (latest === undefined) {
      return core.setFailed('No draft releases found');
    }

    core.setOutput('id', latest.id.toString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = run;
