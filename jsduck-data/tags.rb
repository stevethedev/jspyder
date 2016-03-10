require "jsduck/tag/boolean_tag"

class Async < JsDuck::Tag::BooleanTag
    def initialize
        @pattern = "async"
        @signature = {:long => "async", :short => "a"}
        @html_position = POS_DOC + 0.1
        @css = <<-EOCSS
            .signature .async {
                color: #1b5e20;
                background: #a5d6a7;
                border: 1px solid #1b5e20;
            }
            .async-box {
                border-color: #1b5e20;
            }
        EOCSS
        super
    end
    
    def to_html(context)
        <<-EOHTML
            <div class='rounded-box async-box'>
            <p>This is an asynchronous method, and requires at least one callback function to prevent race-conditions.</p>
            </div>
        EOHTML
    end
end

class TagDict < JsDuck::Tag::BooleanTag
    def initialize
        @pattern = "dict"
    end
end