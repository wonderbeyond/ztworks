var swig = require('swig'),
    app = require('express')(),
    path = require('path'),
    util = require('util');

var serverPort = 1337;

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);
swig.setDefaults({ cache: false });

app.get(/([^\/]+)\/([^\/]+)/, function(req, res) {
  var ztName = req.params[0];
  var templateName = req.params[1];
  res.render(path.join('zts', ztName, 'templates', templateName), {});
});

app.listen(serverPort);
console.log(util.format('Application Started on http://localhost:%d/', serverPort));
