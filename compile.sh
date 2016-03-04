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

test $# -eq "0" && help

DO_DOCS=0
DO_ICONS=0
DO_CSS=0

while test $# -gt 0; do
    case "$1" in
        -h|--help)
            shift
	    help
            ;;
             
        -a|-d|--docs)
            shift
            DO_DOCS=1
            ;;
        
        -a|-i|--icons)
            shift
            DO_ICONS=1
            ;;
            
        -a|-c|--css)
            shift
            DO_CSS=1
            ;;

	*)
	    shift
	    ;;
    esac
done

(test "$DO_ICONS" -eq "1" || test "$DO_CSS" -eq "1") && (sass_fn)
(test "$DO_DOCS" -eq "1") && (generate_docs)
