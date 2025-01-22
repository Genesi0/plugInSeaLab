const spawn = require('child_process').spawn


module.exports = function (app) {
  let plugin = {};

  plugin.start = function (props) {
  }
  plugin.registerWithRouter = function (router) {
    router.get("/shutdown", (req, res) => {
      app.debug('shutting down...');
      spawn(
        'sudo',
        ['shutdown', 'now']
      );
      res.send("Rapsberry éteinte. Merci d'attendre 20sec avant de débrancher");
    })
    router.get("/newFile", (req, res) => {
      app.debug('Changing file...');
      spawn(
        'sudo',
        ['sh', '/home/pi/plugInSeaLab/newFileCanLogger.sh']
      );
      res.send("<meta http-equiv='refresh' content='3; url=http://10.10.10.1:3000/pluginsealab/'>Nouveau fichier créé. Redirection dans 3 sec...");
    })
  }

  plugin.id = "pluginsealab"
  plugin.name = "SeaLab PlugIn"
  plugin.description = "Provides an API to shutdown the machine the server is running on"

  plugin.schema = {
    type: "object",
    properties: {
    }
  }

  return plugin;
}