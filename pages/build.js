const markdown = require('markdown').markdown;
const fs = require('fs');

String.prototype.interpolate = function(params) {
    const names = Object.keys(params);
    const vals = Object.values(params);
    return new Function(...names, `return \`${this}\`;`)(...vals);
}


const path  = './pages/content/';
const pages = fs.readdirSync(path);

const templatePath = './pages/template.html';
const template = fs.readFileSync(templatePath, 'utf8');

const outputPath = './public/pages/';

const delim = `~`;

pages.forEach( page => {

    let content = fs.readFileSync(path+page, 'utf8').split(delim);
    let title = content.shift().trim();
    let description = content.shift().trim();
    let body = content.join(delim);

    body = markdown.toHTML(body);

    content = template.interpolate({
        title,
        description,
        body
    });

    fs.writeFileSync( outputPath + page.replace(/\.[^.]+$/, '.html') , content);

});