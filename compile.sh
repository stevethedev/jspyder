#!/bin/bash
# compiles all compilable projects in the directory

# generate css files
echo "Generating CSS files..."

echo " > Material Icons..."
sass ./sass/material-icons.scss ./css/material-icons.css

echo " > JSpyder..."
sass ./sass/jspyder.scss ./css/jspyder.css

echo "Generating Documentation..."

echo " > Clearing Old Documentation..."
rm -d -r docs

echo " > Writing New Documentation..."
jsduck --title "<b>JSpyder</b> <sub><i>v0.0.0</i></sub>" ./js --output ./docs
