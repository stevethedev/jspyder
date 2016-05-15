java -jar ./closure-compiler/compiler.jar \
    --language_out=ES5 \
    --formatting PRETTY_PRINT \
    --debug true \
    --js ./src/**.js \
    --js ./src/**/*.js \
    --js_module_root src \
    --js_output_file bin/jspyder.js \
    --warning_level=VERBOSE