#!/bin/bash
sudo npm link
cd ../.signalk
echo "Removing pluginSeaLab from nodes_modules ..."
rm -rf nodes_modules/pluginsealab
sudo npm link ../plugInSeaLab
echo "Restarting SignalK service"
service signalk restart