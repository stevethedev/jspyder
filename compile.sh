#!/bin/bash
# compiles all compilable projects in the directory

JSPYDER_OUT_DIR="./jspyder"

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
    test "$DO_ICONS" -eq "1" && sass_fn_icons
    test "$DO_CSS" -eq "1" && sass_fn_jspyder
}

function sass_fn_icons {
    echo " > Material Icons CSS..."
    
    if [ ! -d "$JSPYDER_OUT_DIR/sass" ] ; then
        mkdir "$JSPYDER_OUT_DIR/sass"
    fi
    
    if [ ! -d "$JSPYDER_OUT_DIR/css" ] ; then
        mkdir "$JSPYDER_OUT_DIR/css"
    fi
    
    if [ ! -d "$JSPYDER_OUT_DIR/css/font" ] ; then
        mkdir "$JSPYDER_OUT_DIR/css/font"
    fi

    sass "./sass/material-icons.scss" "$JSPYDER_OUT_DIR/css/material-icons.css"
    cp "./sass/material-icons.scss" "$JSPYDER_OUT_DIR/sass/material-icons.scss"
    cp "./material-icon-font/"* "$JSPYDER_OUT_DIR/css/font/"
}
function sass_fn_jspyder {
    echo " > JSpyder CSS..."

    if [ ! -d "$JSPYDER_OUT_DIR/sass" ] ; then
        mkdir "$JSPYDER_OUT_DIR/sass"
    fi
    
    if [ ! -d "$JSPYDER_OUT_DIR/css" ] ; then
        mkdir "$JSPYDER_OUT_DIR/css"
    fi

    sass "./sass/jspyder.scss" "$JSPYDER_OUT_DIR/css/jspyder.css"
    cp "./sass/"* "$JSPYDER_OUT_DIR/sass/"
}

function generate_docs {
    if [ -d "$JSPYDER_OUT_DIR/docs" ] ; then
        echo " > Clearing Old Documentation..."
        rm -d -r "$JSPYDER_OUT_DIR/docs"
    fi
    
    mkdir "$JSPYDER_OUT_DIR/docs"

    echo " > Writing New Documentation..."
    jsduck --title "JSpyder" --tags ./jsduck-data/tags.rb ./js --output "$JSPYDER_OUT_DIR/docs"
}

function closure_compiler {
    echo " > Compiling JavaScript..."
    java -jar ./closure-compiler/compiler.jar --language_out=ES5 --js ./src/*.js --js_module_root src --js_output_file "$JSPYDER_OUT_DIR/js/jspyder.js"
}

function closure_compiler_debug {
    echo " > Compiling Debug JavaScript..."
    java -jar ./closure-compiler/compiler.jar --language_out=ES5 --formatting PRETTY_PRINT --debug true --js ./src/*.js --js_module_root src --js_output_file "$JSPYDER_OUT_DIR/js/jspyder.debug.js"
}


test $# -eq "0" && help

DO_DOCS=0
DO_ICONS=0
DO_CSS=0
DO_COMPILE_JS=0
DO_COMPILE_JS_DEBUG=0

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
            
        -a|--all)
            shift
            DO_ICONS=1
            DO_CSS=1
            DO_DOCS=1
            DO_COMPILE_JS=1
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

if [ ! -d "$JSPYDER_OUT_DIR" ] ; then
    mkdir "$JSPYDER_OUT_DIR"
fi

echo "Compiling and Packaging JSpyder..."
(test "$DO_COMPILE_JS" -eq "1") && (closure_compiler) && (closure_compiler_debug)
(test "$DO_ICONS" -eq "1" || test "$DO_CSS" -eq "1") && (sass_fn)
(test "$DO_DOCS" -eq "1") && (generate_docs)
echo "JSpyder packaged: $JSPYDER_OUT_DIR"