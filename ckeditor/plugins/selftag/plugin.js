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
        afterInit: function( editor ) {
            // Empty anchors upcasting to fake objects.
            editor.dataProcessor.dataFilter.addRules( {
                elements: {
                    s: function( element ) {
                        function createFakeSelfTag( editor, attributes,type ) {
                            return editor.createFakeElement( editor.document.createElement( 's', {
                                attributes: attributes
                            } ), 'tag_define', 'tag' + type );
                        }
                        return editor.createFakeParserElement( element, 'tag_define', 'tag_define' );
//                         editor.on('fuck',function (e) {
//                             var data = e.data;
//                             var editor = e.editor;
//                             var insertText = prompt('输入想要的文本');
//                             if(insertText) {
//                                 var attributes = {
//                                     'data-obj': JSON.stringify({
//                                         type: 'define',
//                                         value: 'id1,id2'
//                                     })
//                                 };
//                                 var selection = editor.getSelection();
//                                 var ranges = selection.getRanges();
//                                 var range = ranges[0];
//
//                                 ranges[0].collapse(true);
//                                 selection.selectRanges(ranges);
// //            debugger;
//
//                                 editor.insertElement(createFakeSelfTag(editor,attributes,'define'));
//                             }
//
//                         });
//                         debugger;
//                         debugger;
//                         if ( !element.attributes.name )
//                             return null;
//
//                         if ( !element.children.length )
//                             return editor.createFakeParserElement( element, 'cke_anchor', 'anchor' );
//
//                         return null;
                    }
                }
            } );

            // var pathFilters = editor._.elementsPath && editor._.elementsPath.filters;
            // if ( pathFilters ) {
            //     pathFilters.push( function( element, name ) {
            //         debugger;
            //         if ( name == 'a' ) {
            //             if ( CKEDITOR.plugins.link.tryRestoreFakeAnchor( editor, element ) || ( element.getAttribute( 'name' ) && ( !element.getAttribute( 'href' ) || !element.getChildCount() ) ) )
            //                 return 'anchor';
            //         }
            //     } );
            // }
        }
    });
})();