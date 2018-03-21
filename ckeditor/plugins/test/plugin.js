CKEDITOR.plugins.add( 'test', {
    icons: 'test',
    init: function( editor ) {
        editor.addCommand( 'test', {
            exec: function( editor ) {
                var selection = editor.getSelection();
                var selectionText = selection.getSelectedText();
                if(selectionText) {
                    editor.fire('fuck',{num: 11});
                }
                // debugger;
                // var now = new Date();
                // editor.insertHtml( 'The current date and time is: <em>' + now.toString() + '</em>' );
            }
        });
        editor.ui.addButton( 'test', {
            label: '测试',
            icons: 'test',
            command: 'test',
            // toolbar: 'insert,100'
        });
    }
});
