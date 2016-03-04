#!/bin/bash
# compiles all compilable projects in the directory

function help {
    echo "JSpyder Compiler Script"
    echo " "
    echo "./compile.sh [options]"
    echo " "
    echo "options:"
    echo "-h, --help         show brief help"
    echo "-a, --all          complete compilation"
    echo "-d, --docs         generate documentation"
    echo "-i, --icons        generate icon css"
    echo "-c, --css          generate jspyder css"
}

function sass_fn {
    echo "Generating CSS files..."
    test "$DO_ICONS" -eq "1" && sass_fn_icons
    test "$DO_CSS" -eq "1" && sass_fn_jspyder
}

function sass_fn_icons {
    echo " > Material Icons..."
    sass ./sass/material-icons.scss ./css/material-icons.css
}
function sass_fn_jspyder {
    echo " > JSpyder..."
    sass ./sass/jspyder.scss ./css/jspyder.css
}

function generate_docs {
    echo "Generating Documentation..."
    
    if [ -d "./docs" ] ; then
        echo " > Clearing Old Documentation..."
        rm -d -r docs
    fi

    echo " > Writing New Documentation..."
    jsduck --title "JSpyder" --tags ./jsduck-data/tags.rb ./js --output ./docs
}

function closure_compiler {
    java -jar ./closure-compiler/compiler.jar --language_out=ES5 --js ./js/jspyder.js --js ./js/js-**.js --js_output_file ./js-compiled/jspyder.js
}

function install_html {
    echo "Installing HTML Files for GitHub Pages Site"
    
    if [ -d "./gh-pages/docs" ] ; then
        echo " > Clearing GitHub Site Documentation Files..."
	rm -d -r ./gh-pages/docs
    fi

    echo " > Installing new documentation"
    cp -r ./docs ./gh-pages/docs
    
    if [ -d "./gh-pages/js" ] ; then
        echo " > Clearing GitHub Site JavaScript..."
	rm -d -r ./gh-pages/js
    fi

    echo " > Installing new JavaScript..."
    cp -r ./js-compiled ./gh-pages/js

    if [ -d "./gh-pages/css" ] ; then
        echo " > Clearing GitHub Site CSS..."
	rm -d -r ./gh-pages/css
    fi
    echo " > Installing new CSS files..."
    cp -r ./css ./gh-pages/css

    (test "$DO_INSTALL_HTML" -eq "1") && cd ./gh-pages && git add --all && git commit -m "Automatic update pushed to GitHub Site by JSpyder Compiler script" && git push && cd ..
}

test $# -eq "0" && help

DO_DOCS=0
DO_ICONS=0
DO_CSS=0
DO_HTML=0
DO_INSTALL_HTML=0
DO_COMPILE_JS=0

while test $# -gt 0; do
    case "$1" in
        -h|--help)
            shift
	    help
            ;;
             
        -d|--docs)
            shift
            DO_DOCS=1
            ;;
        
        -i|--icons)
            shift
            DO_ICONS=1
            ;;
            
        -c|--css)
            shift
            DO_CSS=1
            ;;

	-H|--install-html)
	    shift
	    DO_HTML=1
	    DO_INSTALL_HTML=1
	    ;;

	-h|--html)
	    shift
	    DO_HTML=1
	    ;;

	-j|--compile-javascript)
	    shift
	    DO_COMPILE_JS=1
	    ;;

	-a|--all)
	    shift
	    DO_HTML=1
	    DO_INSTALL_HTML=1
	    DO_ICONS=1
	    DO_CSS=1
	    DO_DOCS=1
	    DO_COMPILE_JS=1
	    ;;
	*)
	    shift
	    ;;
    esac
done

(test "$DO_ICONS" -eq "1" || test "$DO_CSS" -eq "1") && (sass_fn)
(test "$DO_DOCS" -eq "1") && (generate_docs)
(test "$DO_COMPILE_JS" -eq "1") && (closure_compiler)
(test "$DO_HTML" -eq "1") && (install_html)
