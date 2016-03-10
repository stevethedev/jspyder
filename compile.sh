#!/bin/bash
# compiles all compilable projects in the directory

function help {
    echo "JSpyder Compiler Script"
    echo " "
    echo "./compile.sh [options]"
    echo " "
    echo "options:"
    echo "-?, --help                 show brief help"
    echo "-a, --all                  complete compilation"
    echo "-d, --docs                 generate documentation"
    echo "-i, --icons                generate icon css"
    echo "-c, --css                  generate jspyder css"
    echo "-p, --package              packages jspyder for deployment"
    echo "-j, --compile-javascript   runs closure-compiler against jspyder"
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
    echo "Compiling JavaScript..."
    java -jar ./closure-compiler/compiler.jar --language_out=ES5 --js ./js/jspyder.js --js ./js/js-**.js --js_output_file ./js-compiled/jspyder.js
}

function closure_compiler_debug {
    echo "Compiling Debug JavaScript..."
    java -jar ./closure-compiler/compiler.jar --language_out=ES5 --formatting PRETTY_PRINT --debug true --js ./js/jspyder.js --js ./js/js-**.js --js_output_file ./js-compiled/jspyder.debug.js
}

function package_jspyder {
    echo "Packaging JSpyder..."
    
    if [ -d "./jspyder" ] ; then
        rm -d -r ./jspyder/*
    else
        mkdir ./jspyder
    fi
    
    echo " > Packaging JavaScript Files..."
    cp -r ./js-compiled ./jspyder/js
    
    echo " > Packaging SASS..."
    cp -r ./sass ./jspyder/sass

    echo " > Packaging CSS..."
    cp -r ./css ./jspyder/css
    
    echo " > Packaging Documentation..."
    cp -r ./docs ./jspyder/docs
    
    echo "JSpyder packaged into ./jspyder/"
}

test $# -eq "0" && help

DO_DOCS=0
DO_ICONS=0
DO_CSS=0
DO_COMPILE_JS=0
DO_COMPILE_JS_DEBUG=0
DO_PACKAGE_JS=0

while test $# -gt 0; do
    case "$1" in
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

        -j|--compile-javascript)
            shift
            DO_COMPILE_JS=1
            ;;
            
        -p|--package)
            shift
            DO_PACKAGE_JS=1
            ;;

        -a|--all)
            shift
            DO_ICONS=1
            DO_CSS=1
            DO_DOCS=1
            DO_COMPILE_JS=1
            DO_PACKAGE_JS=1
            ;;
            
        -?|--help)
            shift
            help
            ;;
            
        *)
            shift
            ;;
    esac
done

(test "$DO_ICONS" -eq "1" || test "$DO_CSS" -eq "1") && (sass_fn)
(test "$DO_DOCS" -eq "1") && (generate_docs)
(test "$DO_COMPILE_JS" -eq "1") && (closure_compiler) && (closure_compiler_debug)
(test "$DO_PACKAGE_JS" -eq "1") && (package_jspyder)
