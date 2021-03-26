const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    prompting(){
        return this.prompt([
            {
                type:'input',
                name:'name',
                message:'your project name',
                default:this.appname
            },
            {
                type:'input',
                name:'buildName',
                message:'your project buildName',
                default:this.appname
            }
        ])
        .then(answers=>{
            this.answers = answers
        })
    }
    writing(){
        // 把每一个文件都通过模版转换到目标路径
        const templtePaths = [
            "configs/daily/app.yaml",
            "configs/production/app.yaml",
            "docker/default.conf",
            // "Dockerfile",
            "public/favicon.ico",
            "public/index.html",
            "public/manifest.json",
            "src/App.js",
            "src/index.js",
            "src/index.css",
            "package.json",
            "README.md", 
        ]
        templtePaths.forEach(item=>{
            // item =>每一个文件路径
            this.fs.copyTpl(
                this.templatePath(item),
                this.destinationPath(item),
                this.answers
            )
        })
    }


}