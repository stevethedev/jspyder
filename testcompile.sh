SRC_DIRECTORIES="--js `find ./src/ -name *.js` --js_module_root src"
TEST_DIRECTORIES="--js `find ./test/ -name *.js` --js_module_root test"
FORMATTING="--formatting PRETTY_PRINT"
LANGUAGE_OUT="--language_out=ES5"
FILE_OUT="bin/jspyder.tests.js"
OTHER_FLAGS="--debug true --warning_level=VERBOSE"

java -jar ./closure-compiler/compiler.jar \
    $LANGUAGE_OUT $FORMATTING $TEST_DIRECTORIES \
    $SRC_DIRECTORIES  $OTHER_FLAGS \
    --js_output_file $FILE_OUT