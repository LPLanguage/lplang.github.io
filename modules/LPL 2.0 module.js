window.addEventListener('DOMContentLoaded', function() {
    const crsElements = document.querySelectorAll('lpl');
    var code = '';
    crsElements.forEach(function(element) {
        code += element.textContent;
    });
    executeCode(code);
});
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
    var insideClass = false;
    var classStack = [];
    function getIndentation(line) {
        return line.search(/\S|$/);
    }
    function getCurrentClass() {
        return classStack.length > 0 ? classStack[classStack.length - 1] : null;
    }
    function translateClassDeclaration(line) {
        var className = line.match(/class\s+(\w+)/)[1];
        jsCode += 'class ' + className + ' {\n';
      }
    function translateMethodDeclaration(line) {
        var methodName = line.match(/method\s+(\w+)/)[1];
        var currentClass = getCurrentClass();
        jsCode += 'this.' + methodName + ' = function() {\n';
    }
    function translateMethodCall(line) {
        var methodName = line.match(/call\s+(\w+)/)[1];
        jsCode += methodName + '.call();\n';
    }
jsCode += 'var zone = {\n';
    jsCode += '  getElById: function(id) {\n';
        jsCode += '    return document.getElementById(id);\n';
    jsCode += '  },\n';
    jsCode += '  getElByClass: function(className) {\n';
        jsCode += '    return document.getElementsByClassName(className);\n';
    jsCode += '  },\n';
    jsCode += '  getElByTag: function(tagName) {\n';
        jsCode += '    return document.getElementsByTagName(tagName);\n';
    jsCode += '  },\n';
    jsCode += '  qrSelect: function(selector) {\n';
        jsCode += '    return document.querySelector(selector);\n';
    jsCode += '  },\n';
    jsCode += '  qrSelectAll: function(selector) {\n';
        jsCode += '    return document.querySelectorAll(selector);\n';
    jsCode += '  },\n';
    jsCode += '  createEl: function(tagName) {\n';
        jsCode += '    return document.createElement(tagName);\n';
    jsCode += '  },\n';
    jsCode += '  addEvList: function(element, event, handler) {\n';
        jsCode += '    element.addEventListener(event, handler);\n';
    jsCode += '  },\n';
    jsCode += '  remEvList: function(element, event, handler) {\n';
        jsCode += '    element.removeEventListener(event, handler);\n';
    jsCode += '  }\n';
jsCode += '};\n';
jsCode += 'function addChild(parent, child) {\n';
jsCode += '  parent.appendChild(child);\n';
jsCode += '}\n';
jsCode += 'function remChild(parent, child) {\n';
jsCode += '  parent.removeChild(child);\n';
jsCode += '}\n';
      for (var i = 0; i < lines.length; i++) {
          var line = lines[i].trim();
          //1.0
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
          //2.0
          if (line.includes('translate();')) {
              line = 'console.log(translateCode(code));';
          }
          line = line.replace(/\.text(?!\w)/g, '.textContent');
          line = line.replace(/([^\.])text(?!\w)/g, '$1textContent');
          line = line.replace(/\.autoCompl(?!\w)/g, '.autocomplete');
          line = line.replace(/([^\.])autoCompl(?!\w)/g, '$1autocomplete');
          line = line.replace(/\.childElCount(?!\w)/g, '.childElementCount');
          line = line.replace(/([^\.])childElCount(?!\w)/g, '$1childElementCount');
          line = line.replace(/\.edit(?!\w)/g, '.contentEditable');//
          line = line.replace(/([^\.])edit(?!\w)/g, '$1contentEditable');
          line = line.replace(/\.firstElChild(?!\w)/g, '.firstElementChild');
          line = line.replace(/([^\.])firstElChild(?!\w)/g, '$1firstElementChild');
          line = line.replace(/\.lastElChild(?!\w)/g, '.lastElementChild');
          line = line.replace(/([^\.])lastElChild(?!\w)/g, '$1lastElementChild');
          line = line.replace(/\.nextElSibl(?!\w)/g, '.nextElementSibling');
          line = line.replace(/([^\.])nextElSibl(?!\w)/g, '$1nextElementSibling');
          line = line.replace(/\.nextSibl(?!\w)/g, '.nextSibling');
          line = line.replace(/([^\.])nextSibl(?!\w)/g, '$1nextSibling');
          line = line.replace(/\.pwnZone(?!\w)/g, '.ownerDocument');//piconjo g0d 0f t3h pr0tal!!!!!!!!!!!
          line = line.replace(/([^\.])pwnZone(?!\w)/g, '$1ownerDocument');
          line = line.replace(/\.ownZone(?!\w)/g, '.ownerDocument');
          line = line.replace(/([^\.])ownZone(?!\w)/g, '$1ownerDocument');
          line = line.replace(/\.parentEl(?!\w)/g, '.parentElement');
          line = line.replace(/([^\.])parentEl(?!\w)/g, '$1parentElement');
          line = line.replace(/\.previousElSibl(?!\w)/g, '.previousElementSibling');
          line = line.replace(/([^\.])previousElSibl(?!\w)/g, '$1previousElementSibling');
          line = line.replace(/\.previousSibl(?!\w)/g, '.previousSibling');
          line = line.replace(/([^\.])previousSibl(?!\w)/g, '$1previousSibling');
          line = line.replace(/param/g, 'constructor');
if (line.startsWith('print(')) {
              var content = line.substring(line.indexOf('(') + 1, line.lastIndexOf(')')).trim();

              if (content.startsWith('obj(')) {
                  var objectValue = content.substring(content.indexOf('(') + 1, content.lastIndexOf(')')).trim();
                  jsCode += 'console.log(' + objectValue + ');\n';
              } else {
                  jsCode += 'console.log(' + content + ');\n';
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
          }
    if (line.startsWith('class')) {
        translateClassDeclaration(line);
      } else if (line.startsWith('method')) {
        translateMethodDeclaration(line);
      } else if (line.startsWith('call')) {
        translateMethodCall(line);
      } else {
        jsCode += line + '\n';
      }
    }
  const crsElements_1 = document.querySelectorAll('lpl'); 
  crsElements_1.forEach(element => {element.style.display = 'none';});
      return jsCode;
  }