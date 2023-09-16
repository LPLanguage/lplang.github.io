function executeCode(code) {
            try {
                var jsCode = translateCode(code);
                eval(jsCode);
            } catch (error) {
                console.error('Code execution error:', error);
            }
        }
        function translateCode(inputCode) {
    var lines = inputCode.split('\n');
    var jsCode = '';
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        if (line.includes('prom(')) {
            line = line.replace(/prom\(/g, 'prompt(');
        }
        if (line.includes('conf(')) {
            line = line.replace(/conf\(/g, 'confirm(');
        }
        if (line.includes('err("')) {
            line = line.replace(/err\(/g, 'console.error(');
        }
        if (line.includes('func')) {
            line = line.replace(/^func/g, 'function');
        }
        if (line.includes('alr("')) {
            line = line.replace(/^alr\("/g, 'alert("');
        }
        if (line.includes('clear')) {
            line = line.replace(/^clear/g, 'console.clear()');
        }
        if (line.includes('print(')) {
            line = line.replace(/print\((.+)\);/, 'console.log($1);');
        }
        if (line.includes('random(')) {
            line = line.replace(/random\((\d+), (\d+)\);/, 'Math.floor(Math.random() * ($2 - $1 + 1) + $1);');
        }
        if (line.startsWith('var')) {
            var variableDeclaration = line.substring(3).trim();
            var equalsIndex = line.indexOf('=');
            var spaceIndex = line.indexOf(' ');
            var text = line.substring(line.indexOf('(') + 1, line.lastIndexOf(')')).trim();
            var text2 = line.substring(line.indexOf('=') + 1, line.lastIndexOf('(')).trim();

            if (equalsIndex !== -1) {
                var variableName = line.substring(spaceIndex + 1, equalsIndex).trim();

                if (text2.startsWith('prom')) {
                    jsCode += 'var ' + variableName + ' = prompt(' + text + ');\n';
                } else if (text2.startsWith('conf')) {
                    jsCode += 'var ' + variableName + ' = confirm(' + text + ');\n';
                } else {
                    jsCode += 'var ' + variableDeclaration + '\n';
                }
            }
        } else if (line.startsWith('print(')) {
            var content = line.substring(line.indexOf('(') + 1, line.lastIndexOf(')')).trim();
            if (content.startsWith('obj(')) {
                var objectValue = content.substring(content.indexOf('(') + 1, content.lastIndexOf(')')).trim();
                jsCode += 'console.log(' + objectValue + ');\n';
            } else {
                jsCode += 'console.log(' + content + ');\n';
            }
        } else if (line.startsWith('bool')) {
            var boolDeclaration = line.substring(4).trim();
            var equalsIndex = line.indexOf('=');
            var spaceIndex = line.indexOf(' ');
            if (equalsIndex !== -1) {
                var variableName = line.substring(spaceIndex + 1, equalsIndex).trim();
                if (boolDeclaration.includes('true')) {
                    jsCode += 'var ' + variableName + ' = true;\n';
                } else if (boolDeclaration.includes('false')) {
                    jsCode += 'var ' + variableName + ' = false;\n';
                }else if (boolDeclaration.includes('prom')) {
					var text = line.substring(line.indexOf('(') + 1, line.lastIndexOf(')')).trim();
					'var ' + variableName + ' = prom(' + text + ');\n';
				}else if (boolDeclaration.includes('conf')) {
					var text = line.substring(line.indexOf('(') + 1, line.lastIndexOf(')')).trim();
					'var ' + variableName + ' = conf(' + text + ');\n';
				}
            }
        } else if (line.startsWith('obj')) {
            var objDeclaration = line.substring(3).trim();
            var equalsIndex = objDeclaration.indexOf('=');
            if (equalsIndex !== -1) {
                var variableName = objDeclaration.substring(0, equalsIndex).trim();
                var objValue = objDeclaration.substring(equalsIndex + 1).trim();
                jsCode += 'var ' + variableName + ' = ' + objValue + ';\n';
            }
        } else if (line.startsWith('const')) {
            var variableDeclaration = line.substring(5).trim();
            var equalsIndex = line.indexOf('=');
            var spaceIndex = line.indexOf(' ');
            var text = line.substring(line.indexOf('(') + 1, line.lastIndexOf(')')).trim();
            var text2 = line.substring(line.indexOf('=') + 1, line.lastIndexOf('(')).trim();
            if (equalsIndex !== -1) {
                var variableName = line.substring(spaceIndex + 1, equalsIndex).trim();
                if (text2.startsWith('prom(')) {
                    jsCode += 'const ' + variableName + ' = prompt(' + text + ');\n';
                } else if (text2.startsWith('conf')) {
                    jsCode += 'const ' + variableName + ' = confirm(' + text + ');\n';
                } else {
                    jsCode += 'const ' + variableDeclaration + '\n';
                }
            }
        } else if (line.startsWith('err("')) {
            var text = line.substring(line.indexOf('"') + 1, line.lastIndexOf('"'));
            jsCode += 'console.error("' + text + '");\n';
        } else if (line.startsWith('alr("')) {
            var text = line.substring(line.indexOf('"') + 1, line.lastIndexOf('"'));
            jsCode += 'alert("' + text + '");\n';
        } else if (line.startsWith('conf("')) {
            var text = line.substring(line.indexOf('"') + 1, line.lastIndexOf('"'));
            jsCode += 'confirm(' + text + ');\n';
        } else if (line.startsWith('prom("')) {
            var text = line.substring(line.indexOf('"') + 1, line.lastIndexOf('"'));
            jsCode += 'prompt(' + text + ');\n';
        } else {
            jsCode += line + '\n';
        }
    }
  const crsElements_1 = document.querySelectorAll('lpl'); 
  crsElements_1.forEach(element => {element.style.display = 'none';});
     return jsCode;
}
window.addEventListener('DOMContentLoaded', function() {
    const crsElements = document.querySelectorAll('lpl');
    var code = '';
    crsElements.forEach(function(element) {
        code += element.textContent;
    });
    executeCode(code);
});