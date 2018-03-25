'use strick';
(function () {
    var execFun = function (editor,type) {
        var selection = editor.getSelection();
        var selectionText = selection.getSelectedText();
        // 如果有选中的文字那就是新建
        if (selectionText) {
            // 判断是否是在同一个块级元素内
            var ranges = selection.getRanges();
            var range = ranges[0];
            var startBlockElement = range.startPath().block;
            var endBlockElement = range.endPath().block;
            var isSaveBlockElement = startBlockElement.equals(endBlockElement);
            if(isSaveBlockElement){
                // 去新建
                editor.fire('selftag', {
                    type: type
                });
            }
        }else {
            var element = selection.getSelectedElement();
            if ( !element || element.isReadOnly() ){
                return null;
            }
            var selftag = CKEDITOR.plugins.selftag.tryRestoreFakeSelfTag( editor, element );
            if(!selftag){
                return null;
            }
            editor.fire('selftag',{
                type: type,
                selftag: selftag.data('obj'),
                text: selftag.getHtml()
            });

        }

    };
    CKEDITOR.plugins.add('selftag', {
        requires: 'fakeobjects',
        icons: 'define,key,class,ref',
        hidpi: true,
        onLoad: function () {
            var me = this;
            // Add the CSS styles for anchor placeholders.
            var getbaseStyle = function (type) {
                var baseStyleStr = '';
                var iconPath = CKEDITOR.getUrl(me.path + 'images' + ( CKEDITOR.env.hidpi ? '/hidpi' : '' ) + '/' + type + '.png');
                baseStyleStr += 'img.tag_' + type +
                    '{' +
                    'background:url(' + iconPath + ') no-repeat left center;border:1px dotted #00f;background-size:16px;' +
                    '}';
                return baseStyleStr;
            };
            var classStr = 'img.tag_define,img.tag_key,img.tag_class,img.tag_ref' +
                '{' +
                'width:16px;' +
                'min-height:15px;' +
                // The default line-height on IE.
                'height:1.15em;' +
                // Opera works better with "middle" (even if not perfect)
                'vertical-align:text-bottom;' +
                '}';
            var strArr = 'define,key,class,ref';
            strArr = strArr.split(',');
            for (var i = 0, len = strArr.length; i < len; i++) {
                classStr += getbaseStyle(strArr[i]);
            }
            CKEDITOR.addCss(classStr);
        },
        init: function (editor) {
            // 定义
            editor.addCommand('define', {
                exec: function (editor) {
                    execFun(editor,'define');
                }
            });
            editor.ui.addButton('define', {
                label: '插入定义',
                icons: 'define',
                command: 'define',
                toolbar: 'selftag,1'
            });
            // 关键字
            editor.addCommand('key', {
                exec: function (editor) {
                    execFun(editor,'key');
                }
            });
            editor.ui.addButton('key', {
                label: '插入关键字',
                icons: 'key',
                command: 'key',
                toolbar: 'selftag,2'
            });
            // 分类
            editor.addCommand('class', {
                exec: function (editor) {
                    execFun(editor,'class');
                }
            });
            editor.ui.addButton('class', {
                label: '插入分类',
                icons: 'class',
                command: 'class',
                toolbar: 'selftag,3'
            });
            // 索引
            editor.addCommand('ref', {
                exec: function (editor) {
                    execFun(editor,'ref');
                }
            });
            editor.ui.addButton('ref', {
                label: '插入索引',
                icons: 'ref',
                command: 'ref',
                toolbar: 'selftag,4'
            });
            // If the "contextmenu" plugin is loaded, register the listeners.
            if ( editor.contextMenu ) {
                editor.addMenuGroup('sleftag');
                editor.addMenuItems( {
                    'define': {
                        label: '编辑定义',
                        icon: this.path + 'icons/define.png',
                        command: 'define',
                        group: 'sleftag',
                        order: 1
                    },
                    'key': {
                        label: '编辑关键字',
                        icon: this.path + 'icons/key.png',
                        command: 'key',
                        group: 'sleftag',
                        order: 2
                    },
                    'class': {
                        label: '编辑分类',
                        icon: this.path + 'icons/class.png',
                        command: 'class',
                        group: 'sleftag',
                        order: 3
                    },
                    'ref': {
                        label: '编辑索引',
                        icon: this.path + 'icons/ref.png',
                        command: 'ref',
                        group: 'sleftag',
                        order: 4
                    }
                } );
                editor.contextMenu.addListener( function( element ) {
                    if ( !element || element.isReadOnly() )
                        return null;

                    var selftag = CKEDITOR.plugins.selftag.tryRestoreFakeSelfTag( editor, element );
                    if(!selftag){
                        return null;
                    }
                    var type = selftag.data('obj').split('-')[0];
                    var menu = {};
                    menu[type] = CKEDITOR.TRISTATE_OFF;
                    return menu;
                } );
            }
        },
        afterInit: function (editor) {
            // Empty anchors upcasting to fake objects.
            editor.dataProcessor.dataFilter.addRules({
                elements: {
                    s: function (element) {
                        var attributes = element.attributes;
                        if(!attributes['data-obj']) {
                            return null;
                        }
                        var createFakeSelfTag = CKEDITOR.plugins.selftag.createFakeSelfTag;
                        var classStr = 'tag_' + attributes['data-obj'].split('-')[0];
                        return editor.createFakeParserElement(element, classStr, classStr);
                    }
                }
            });
        }
    });
    CKEDITOR.plugins.selftag = {
        createFakeSelfTag: function (editor, attributes,text) {
            var classStr = 'tag_' + attributes['data-obj'].split('-')[0];
            var element = editor.document.createElement('s', {
                    attributes: attributes
                });
            element.appendText(text);
            return editor.createFakeElement(element, classStr, classStr);
        },
        tryRestoreFakeSelfTag: function (editor, element) {
            if (element && element.data('cke-real-element-type')
                && element.data('cke-real-element-type').indexOf('tag_') > -1) {
                return editor.restoreRealElement(element);
            }
        },
        getSelfTagData: function (dataStr) {
            var type,value;
            dataStr = dataStr.split('-');
            type = dataStr[0];
            dataStr = dataStr[1];
            value = dataStr.split(',');
            return {
                type: type,
                value: value
            };
        }
    };
})();