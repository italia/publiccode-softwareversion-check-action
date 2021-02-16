# publiccode.yml version action for Github

[![Join the #publiccode channel](https://img.shields.io/badge/Slack%20channel-%23publiccode-blue.svg?logo=slack)](https://developersitalia.slack.com/messages/CAM3F785T)
[![Get invited](https://slack.developers.italia.it/badge.svg)](https://slack.developers.italia.it/)

This action checks whether `softwareVersion` in your [publiccode.yml file](https://github.com/italia/publiccode.yml)
is aligned with the latest tag.

Click `Use this template` button to create your action based on this template.

## Examples

Include this action in your repo by creating 
`.github/workflows/publiccode-versioning.yml`and edit where needed:

```yml
on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - name: Parse publiccode.yml
        uses: italia/publiccode-version-action
```

You can easily create a pull request to update `softwareVersion` in your 
`publiccode.yml` file.

```yml
on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - name: Parse publiccode.yml
        uses: italia/publiccode-version-action
        id: pva
      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v3
        if: failure()
        with:
          title: "feat: update softwareVersion ${{ steps.pva.outputs.version }} in publiccode.yml"
          branch: feature/publiccode-${{ steps.pva.outputs.version }}
```

See [Create Pull Request Github action documentation](https://github.com/marketplace/actions/create-pull-request) 
for more info

## Build the action

Install dependencies

```sh
npm i
```

Build the action

```sh
npm run build
```

## Contributing

Contributing is always appreciated.
Feel free to open issues, fork or submit a Pull Request.
If you want to know more about how to add new fields, check out [CONTRIBUTING.md](CONTRIBUTING.md).
In order to support other country-specific extensions in addition to Italy some
refactoring might be needed.

## Maintainers

This software is maintained by the
[Developers Italia](https://developers.italia.it/) team.

## License

© 2021 Dipartimento per la Trasformazione Digitale - Presidenza del Consiglio dei
Ministri

Licensed under the EUPL.
The version control system provides attribution for specific lines of code.

## Remarks

This GitHub Action is published in the Github Marketplace.
As such, you can find the [Terms of Service here](https://docs.github.com/en/free-pro-team@latest/github/site-policy/github-marketplace-terms-of-service).
Also, [here](https://docs.github.com/en/free-pro-team@latest/github/site-policy/github-marketplace-developer-agreement)
you can find the GitHub Marketplace Developer Agreement.