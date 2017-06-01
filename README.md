# Animaciones

Exploraremos las diferentes tipos de animaciones, explicando beneficios así como las limitaciones de cada una de ellas.

## Requerimientos
- [Node 6.10.3](https://nodejs.org/es/)
- [GIT](https://git-scm.com/downloads) (Controlador de versiones)
- [Chrome](https://www.google.com.mx/chrome/browser/desktop/)

### Sugeridos
- [SourceTree](https://es.atlassian.com/software/sourcetree) (Una interface para interactuar con GIT)
- [cmder](http://cmder.net/) (Emulador de consola)
- [livereload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) (Extensión de Chrome usada para integrar livereload en nuestra aplicación, la cual permitirá refrescar el navegador cuando se realice algún cambio en ciertos archivos)

## Instrucciones
- Abrir una consola
- Clonar el repositorio en alguna carpeta dentro de su computadora ``` git clone https://github.com/Tequila-js/javascript_animations.git```
- Escribir en la consola ```cd javascript_animations```
- Escribir en la consola ```npm install```
- Escribir en la consola ```npm run watch```

Nota:
Puedes también visualizar el proyecto una ves que ejecutes ```npm run build:dev``` y entres abras `/dist/index.html`

## Comandos
|Comando|Acción|
|-------|------|
|`npm run watch`|Crea un servidor el cual permitirá visualizar nuestro proyecto|
|`npm run build:dev`|Procesará nuestros archivos para un ambiente de desarrollo|
|`npm run build:prod`|Procesará nuestros archivos para un ambiente de producción|

## Estructura
```
/
|__app/
|    |__assets/ (archivos usadas en la presentación)
|    |__html/ (contenido)
|    |__js/
|    |   |__animations/ (scripts con animaciones)
|    |   |__defaults/ (valores por detecto usandos usados en scripts)
|    |   |__utilities/ (funciones usadas en varios scripts)
|    |   |__ main.js (código principal)
|    |
|    |__scss/
|       |__characters/ (código para personajes)
|       |__components/ (código de los componentes)
|       |__general/ (código de proposito general)
|       |__settings/ (valores por defecto)
|       |__main.scss (archivo principal con el que se generá código de CSS)
|
|__config/ (configuración para generar JavaScript)
|__dist/ (carpeta auto generada, contiene contenido de la presentación)
|__node_modules/ (carpeta auto generada, contiene los diferentes modulos de la aplicación)
|__scripts/ (scripts usados para generar carpetas criticas dentro de la aplicación)
|__.eslint (reglas que refuerzan el uso de estandares de codificación)
|__gulpfile.js (conjunto de tareas usadas para generar contenido)
|__package.json (descripción del proyecto, dependecias y scripts para generación de contenido)
```

## Acerca de las tecnologias
- [Gulp](http://gulpjs.com/)
  - [automate-your-tasks-easily-with-gulp-js](https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js) 
- [SASS](http://sass-lang.com/)
  - [SASS Guide](http://sass-lang.com/guide)
  - [Sass Guidelines](https://sass-guidelin.es/)
  - [SASS Cheat Sheet](https://sass-cheatsheet.brunoscopelliti.com/)
  - [SASS Meister](https://www.sassmeister.com/) (Buen recurso para practicar SASS)
- [GIT](https://git-scm.com/)
  - [GIT Resources](https://github.com/MDOR/Useful-Resources/blob/master/git_/git.md)
- [Webpack](https://webpack.github.io/)
  - [Getting Started](https://scotch.io/tutorials/getting-started-with-webpack-module-bundling-magic)
- [anime-js](http://anime-js.com/)
