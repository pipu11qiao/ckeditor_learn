CKEDITOR.dialog.add('abbrDialog',function (editor) {
    return {
        // the dialog definition comes here ...
        title: '缩写属性',
        minWidth: 400,
        minHeight: 200,
        contents: [
            {
                id: 'tab-basic',
                label: '基本设置',
                elements: [
                    // UI elements of the first tab will be defined here.
                    {
                        type: 'text',
                        id: 'abbr',
                        label: '缩写',
                        validate: CKEDITOR.dialog.validate.notEmpty( "缩写不能为空." ),
                        setup: function (element) {
                            this.setValue(element.getText());
                        },
                        commit: function (element) {
                            element.setText(this.getValue());
                        }
                    },
                    {
                        type: 'text',
                        id: 'title',
                        label: '解释',
                        validate: CKEDITOR.dialog.validate.notEmpty( "解释不能为空." ),
                        setup: function (element) {
                            this.setValue(element.getAttribute('title'));
                        },
                        commit: function (element) {
                            element.setAttribute('title',this.getValue());
                        }
                    }
                ]
            },
            {
                id: 'tab-adv',
                label: '额外设置',
                elements: [
                    // UI lements of the second tab will be defined here.
                    {
                        type: 'text',
                        id: 'id',
                        label: 'Id',
                        setup: function (element) {
                            this.setValue(element.getAttribute('id'));
                        },
                        commit: function (element) {
                            var id = this.getValue();
                            if(id) {
                                element.setAttribute('id',id);
                            }else if(!this.insertMode) {
                                element.removeAttribute('id');
                            }
                        }
                    }
                ]
            }
        ],
        onShow: function () {
            var selection = editor.getSelection();
            var element = selection.getStartElement();
            if (element) {
                element = element.getAscendant('abbr', true);
            }
            if (!element || element.getName() !== 'abbr') {
                element = editor.document.createElement('abbr');
                this.insertMode = true;
            }
            else {
                this.insertMode = false;
            }
            if(!this.insertMode) {
                this.setupContent(element);
            }
            this.element = element;

        },
        onOk: function () {
            var dialog = this;
            var abbr = dialog.element;
            dialog.commitContent(abbr);
            if(dialog.insertMode) {
                editor.insertElement(abbr);
            }

        },
    };
});
