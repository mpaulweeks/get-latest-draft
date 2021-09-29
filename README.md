# get-latest-draft

GitHub action to retrieve the latest draft release

## Example usage

```yaml
jobs:
  build:
    steps:
      - name: Get latest draft
        id: get_latest_draft
        uses: mpaulweeks/get-latest-draft@v1.0
        with:
          GITHUB_TOKEN: ${{ github.token }}

      # use the id to do something, like publish it!
      - name: Publish the draft
        uses: eregon/publish-release@v1
        env:
          GITHUB_TOKEN: ${{ github.token }}
        with:
          release_id: ${{ steps.get_latest_draft.outputs.id }}
```
