const core = require("@actions/core")
const yaml = require('js-yaml');
const fs = require('fs');
const simpleGit = require('simple-git');


let main = async () => {
  try {
    const git = simpleGit();
    const tag = (await git.tags()).latest
    const publiccode = core.getInput('publiccode')
    const doc = yaml.load(fs.readFileSync(publiccode, 'utf8'))

    core.info(`Current tag is ${tag}`)

    if (tag && doc.softwareVersion !== tag) {
      core.setOutput("version", tag);
      git.addConfig('user.name', core.getInput('gitname')) 
      git.addConfig('user.email', core.getInput('gitmail'))
      doc.softwareVersion = tag
      fs.writeFileSync(publiccode, yaml.dump(doc), 'utf8')
      git.add('./*').commit(`feat: bump ${publiccode} to version ${tag}`)
      throw `Current ${publiccode} should contain ${tag} version`
    }
  }
  catch (error) {
    core.setFailed(error)
  }
}

main()