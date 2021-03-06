const md = require('marked-it-core').generate;
const fs = require('fs');

String.prototype.interpolate = function (params) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  return new Function(...names, `return \`${this}\`;`)(...vals);
};

const path = './src-pages/content/';
const pages = fs.readdirSync(path);

const templatePath = './src-pages/template.html';
const template = fs.readFileSync(templatePath, 'utf8');

const outputPath = './public/pages/';

const delim = '~';

pages.forEach((page) => {
  let content = fs.readFileSync(path + page, 'utf8').split(delim);
  const title = content.shift().trim();
  const description = content.shift().trim();
  let body = content.join(delim);
  
  body = md(body).html.text;
  content = template.interpolate({
    title,
    description,
    body,
  });

  fs.writeFileSync(outputPath + page.replace(/\.[^.]+$/, '.html'), content);
  console.log(`Built "${title}"`);
});
