import { Plugin } from 'obsidian';

const ALL_Components: Record<string, any> = {
    ':+1:': '👍',
    ':sunglasses:': '😎',
    ':smile:': '😄',
};

export default class ExamplePlugin extends Plugin {
    async onload() {
        this.registerMarkdownPostProcessor((element, context) => {
            const codeblocks = element.findAll('code');

            for (let codeblock of codeblocks) {
                const text = codeblock.innerText;
                if (text.startsWith("CharSheet") || text.contains("CharSheet")) {
                    //if span is changed to div make the div inline
                    const Component = codeblock.createSpan({
                        text: ALL_Components[text] ?? text,//this might only work with Strings
                    });
                    codeblock.replaceWith(Component);
                }
            }
        });
    }
}

function renderInlineCode(){
    
}