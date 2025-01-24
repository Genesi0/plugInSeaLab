const spawn = require('child_process').spawn
var fs = require('fs');
const path = require('path');

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
    router.get("/dlLast", (req, res) => {
      app.debug('Checking last');
      var files = fs.readdirSync('/home/pi/');
      let logFiles = [];
      let lastFile = '';
      let count = 0;
      let bigstring = '';
      for (let i = 0; i < files.length; i = i + 1) {
        bigstring = bigstring + files[i];
        if (files[i].includes('log_')) {
          logFiles.push(files[i]);
          count = count +1;
        }
      }
      if (logFiles.length != 0) {
        lastFile = logFiles[0];
        let max = parseInt(lastFile.substring(4));
        for (let i = 0; i < logFiles.length; i = i + 1) {
          let currentNum = parseInt(logFiles[i].substring(4));
          if (currentNum > max) {
            max = currentNum;
            lastFile = logFiles[i];
          }
        }
      }
      let fileToDl = lastFile;
      spawn(
        'sudo',
        ['sh', '/home/pi/plugInSeaLab/modLastLog.sh', `${fileToDl}`]
      );
      res.send(`<a href='file:////home/pi/${fileToDl}' download >Télécharger ${fileToDl}</a> ${count} (log_) fichiers trouvés`);
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