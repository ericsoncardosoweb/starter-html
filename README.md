# Starter Kit HTML

Este é o starter kit que eu criei para otimizar meus processos de desenvolvimento de interfaces. Sintam-se a livres para utilizar, otimizar e contribuir.

Seguindo o conceito de organização modular, neste pack contém os melhores recursos, até o momento, para otimizar o fluxo de trabalho para projetos de grande e pequeno porte.

## Tecnologias

[Gulp](http://gulpjs.com/) - Na minha opinião, o melhor otimizador de tarefas do mercado
[Pug](https://pugjs.org/) - Um ótimo pré-processador HTML
[SASS](http://sass-lang.com/) - Compilador de SCSS com suporte para diversos browsers
[Babel](https://babeljs.io/) - ES6 JavaScript, compilador (ES5 => ES6).
[Flexboxgrid](http://flexboxgrid.com/) - Sistema de grid flexível com **[Bootstrap 4](https://v4-alpha.getbootstrap.com/)**.
[NodeJS](https://nodejs.org/) - JavaScript em ação.

## Como utilizar

Tenha uma máquina boa, pois o node-js consome uma boa cota de memória. Nada de mais.

O **Gulp** é o responsável por rodar as tarefas do projeto. Então Garanta que esteja instalado globalmente em sua máquina.

    $ npm install -g gulp

**Rode os seguintes comandos**

    $ git clone [https://github.com/ericsoncardosoweb/starter-html.git](https://github.com/ericsoncardosoweb/starter-html.git)
    $ cd starter-html/ && npm install
    $ gulp



# Tarefas
`gulp`: Rode a tarefa padrão com os principais conjuntos de processos deste pack
`gulp --dev`: Rode as tarefas no modo de desenvolvimento
`gulp` --prod: Rode as tarefas no modo de produção.

## Scripts e Estilos

 - `styles:scss`: Compile as principais folhas de estilo
 - `scripts:js`: Compile e concatene os scripts em ES6 de sua aplicação principal
 - `components:css`: Compile e concatene os estilos dos componentes*
 - `modules:css`: Compile e concatene os estilos dos módulos*
 - `components:js`: Compile e concatene os scripts em ES6 dos componentes*
 - `modules:js`: Compile e concatene os scripts em ES6 dos módulos*
 -  `vendors:js`: Concatene os scripts os plugins inseridos no diretório vendors/plugins e unifique com os instalados via npm ou bower
 - `vendors:css`: Compile e concatene os scripts em ES6 dos módulos*

> *=> Esses itens são altamente controláveis a partir de sua folha raiz. Fica a escolha do desenvolvedor escolher como carregar as folhas de estilo geradas.

## Mídias

 - `media:images`: Transfira e otimize o tamanho das imagens para web
 - `media:fonts`: Transfira as fontes locais
 - `media:icons`: Transforme seus arquivos `svg` em icon fonts
 - `media:symbols`: Transforme seus arquivos `svg` em symbol links
 - `media:sprites`: Mescle seu conjunto de imagens e uma única imagem + a folha de estilo. [CSS Sprites](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_Images/Implementing_image_sprites_in_CSS) 


## Assets

 - `assets`: Rode em um só comando todas as tarefas abaixo
 - `files:misc`: Transfira os arquivos da pasta /misc conforme a etapa de desenvolvimento (Dev, Prod)
 - `files:media`: Transfira os arquivos da pasta /media conforme o modo de desenvolvimento
 - `files:data`: Transfira os arquivos da pasta /data . Arquivos como json, xml, csv, etc.



## Utilidades

 - `clean`: Delete a pasta /build em um único comando
 - `concatFiles`: Concatene todos os arquivos css e js em um ´´unico arquivo e otimize a performance de sua aplicação.
 - `views`: Compile os arquivos PUG



# Estrutura

Cada diretório neste pack tem um propósito específico. Isso garante uma organização adequada para trabalho com vários desenvolvedores. Inclusive, se fizer bom uso, será fácil reaproveitar seus códigos :)
Caso não precise de qualquer uma delas, basta deletá-las.

|Diretório       |Finalidade               |
|----------------|-------------------------|
|assets          |Agrupamento de todos os arquivos de requisição     |
|components      |Agrupamento dos componentes da aplicação. Ex: buttons, forms, cards, etc.           |
|data            |Onde inserir arquivos .json, .xml, .csv, etc       |
|media           |Hora ou outra sempre nos deparamos com a necessidade de utilizar algum arquivo que foge doo padrões do projeto. Arquivos a vulsos, como PDF, PPT, etc. Este é o lugar idela para alocá-lo, caso não utilize um CDN      |
|misc            |Arquivos para SEO, Configuração que devem ficar na raíz da aplicação final. Ex: robots.txt, php.ini, etc.       |
|modules         |Agrupamento de módulos da aplicação. Ex: Blog, Ecommerce, Login, etc      |
|scripts         |Scripts principais da aplicação       |
|styles          |Estilos principais da aplicação       |
|vendors         |Todas as bibliotecas e plugins que serão utilizados em todas as views       |
|views           |codifique códigos mais limpos e compile-os como .html |


# Nota

A forma em que estão estruturados os arquivos, e suas formas de carregamento no modo de produção estão otimizadas para ferramentas como o pagespeed da Google.

Em caso de dúvidas e sugestões me mande um e-mail contato@ericsoncardoso.com.br ou me add no skype ericson.cardoso2
