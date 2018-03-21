CKEDITOR.plugins.add('abbr',{
    icons: 'abbr',
    init: function (editor) {

        editor.addCommand('abbr',new CKEDITOR.dialogCommand('abbrDialog'));

        editor.ui.addButton('Abbr',{
            icons: 'abbr',
            label: '添加缩写',
            command: 'abbr',
            toolbar: 'myGroup.100'
        });
        CKEDITOR.dialog.add('abbrDialog',this.path + 'dialogs/abbr.js');
        if(editor.contextMenu) {
            // debugger;
            editor.addMenuGroup('abbrGroup');
            editor.addMenuItem('abbrItem',{
                label: '编辑缩写',
                icon: this.path + 'icons/abbr.png',
                command: 'abbr',
                group: 'abbrGroup'
            });
            // showing the Menu Option "In Context"
            editor.contextMenu.addListener(function (element) {
                if(element.getAscendant('abbr',true)) {
                    return { abbrItem: CKEDITOR.TRISTATE_OFF };
                }
            });
        }
    }
});
