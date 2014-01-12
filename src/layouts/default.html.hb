<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>{{ site.title }} {{title}}</title>
    <link rel="shortcut icon" href="favicon.ico" />
    <!--<link rel="icon" type="image/svg+xml" href="favicon.svg" />-->
    <link href="index.css" rel="stylesheet" type="text/css" media="all" />
  </head>
  <body>

    {{partial "header.html.hb"}}

    {{{ content }}}

    <script src="index.js"></script>
  </body>
</html>
