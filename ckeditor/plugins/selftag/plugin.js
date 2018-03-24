'use strick';
(function () {
    CKEDITOR.plugins.add('selftag',{
        requires: 'fakeobjects',
        icons: 'define,key,class,index',
        hidpi: true,
        onLoad: function () {
            var me = this;
            // Add the CSS styles for anchor placeholders.
            var getbaseStyle = function (type) {
                var baseStyleStr = '';
                var iconPath = CKEDITOR.getUrl( me.path + 'images' + ( CKEDITOR.env.hidpi ? '/hidpi' : '' ) + '/' + type+ '.png' );
                baseStyleStr += 'img.tag_' + type +
                    '{' +
                    'background:url(' + iconPath + ') no-repeat left center;border:1px dotted #00f;background-size:16px;' +
                '}';
                return  baseStyleStr;
            };
            var classStr = 'img.tag_define,img.tag_key,img.tag_class,.img.tag_index' +
                '{' +
                'width:16px;' +
                'min-height:15px;' +
                // The default line-height on IE.
                'height:1.15em;' +
                // Opera works better with "middle" (even if not perfect)
                'vertical-align:text-bottom;' +
                '}';
            var strArr = 'define,key,class,index';
            strArr = strArr.split(',');
            for(var i = 0,len = strArr.length; i < len; i ++) {
                classStr += getbaseStyle(strArr[i]);
            }
            CKEDITOR.addCss(classStr);
        },
        init: function( editor ) {
            editor.addCommand( 'define', {
                exec: function( editor ) {
                    var selection = editor.getSelection();
                    var selectionText = selection.getSelectedText();
                    if(selectionText) {
                        editor.fire('fuck',{num: 11});
                    }
                }
            });
            editor.ui.addButton( 'define', {
                label: '插入标签',
                icons: 'define',
                command: 'define',
                // toolbar: 'insert,100'
            });
        },
    });
})();