const core = require("@actions/core")
const yaml = require('js-yaml');
const fs = require('fs');
const simpleGit = require('simple-git');


let main = async () => {
  try {
    const git = simpleGit();
    const tag = (await git.tags()).latest

    core.info(`Current tag is ${tag}`)

    const doc = yaml.load(fs.readFileSync('publiccode.yml', 'utf8'))
    if (doc.softwareVersion !== tag) {
      git.addConfig('user.name', 'Publiccode bot') 
      git.addConfig('user.email', 'italia@gmail.com')
      doc.softwareVersion = tag
      let yamlStr = yaml.dump(doc)
      fs.writeFileSync('publiccode.yaml', yamlStr, 'utf8')
      git.add('./*').commit(`feat: bump publiccode.yml to version ${tag}`)
    }
  }
  catch (error) {
    core.setFailed(error)
  }
}

main()