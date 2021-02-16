const core = require("@actions/core")
const yaml = require('js-yaml');
const fs = require('fs');
const simpleGit = require('simple-git');


let main = async () => {
  try {
    const git = simpleGit();
    const tag = (await git.tags()).latest
    const publiccode = 'publiccode.yml'
    let docContent = fs.readFileSync(publiccode, 'utf8')
    const doc = yaml.load(docContent)

    core.info(`Current tag is ${tag}`)

    if (tag && doc.softwareVersion !== tag) {
      core.setOutput("version", tag);
      git.addConfig('user.name', core.getInput('gitname')) 
      git.addConfig('user.email', core.getInput('gitmail'))
      docContent = docContent.replace(/softwareVersion:.*/, `softwareVersion: ${tag}`)
      console.log(docContent)
      fs.writeFileSync(publiccode, docContent, 'utf8')
      git.add('./*').commit(`feat: bump ${publiccode} to version ${tag}`)
      throw `Current ${publiccode} should contain ${tag} version`
    }
  }
  catch (error) {
    core.setFailed(error)
  }
}

main()