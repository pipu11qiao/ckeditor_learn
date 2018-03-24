// CKEDITOR.plugins.add('timestamp',{
//     icons: 'timestamp',
//     init: function (editor) {
//         // Plugins logic goes here.
//         debugger;
//         editor.addCommand('insertTimestamp',{
//             exec: function (editor) {
//                 debugger;
//                 var now = new Date();
//                 editor.insertHtml('The current date and time is : <em>' + now.toString() + '</em>');
//             }
//         });
//         editor.ui.addButton('Timestamp',{
//             label: '添加时间',
//             command: 'insertTimestamp',
//             toolbar:  'insert,100'
//         });
//     }
// });
CKEDITOR.plugins.add( 'timestamp', {
    icons: 'define',
    init: function( editor ) {
        editor.addCommand( 'insertTimestamp', {
            exec: function( editor ) {
                var now = new Date();
                editor.insertHtml( 'The current date and time is: <em>' + now.toString() + '</em>' );
            }
        });
        editor.ui.addButton( 'Timestamp', {
            label: '插入时间',
            icons: 'define',
            command: 'insertTimestamp',
            // toolbar: 'insert,100'
        });
    }
});