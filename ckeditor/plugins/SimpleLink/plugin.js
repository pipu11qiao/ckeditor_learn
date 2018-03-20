CKEDITOR.plugins.add( 'SimpleLink', {
    icons: 'simplelink',
    init: function( editor ) {
        editor.addCommand( 'simplelink', new CKEDITOR.dialogCommand( 'simplelinkDialog' ) );
        editor.ui.addButton( 'SimpleLink', {
            label: '添加超链接',
            icons: 'simplelink',
            command: 'simplelink',
            toolbar: 'link,0'
        });

        CKEDITOR.dialog.add( 'simplelinkDialog', this.path + 'dialogs/simplelink.js' );
    }
});