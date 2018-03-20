CKEDITOR.dialog.add("simplelinkDialog", function (editor) {
    return {
        allowedContent: "a[href,target]",
        title: "添加超连接",
        minWidth: 550,
        minHeight: 100,
        resizable: CKEDITOR.DIALOG_RESIZE_NONE,
        contents: [{
            id: "SimpleLink",
            label: "SimpleLink",
            elements: [{
                type: "text",
                label: "链接地址",
                id: "edp-URL",
                validate: CKEDITOR.dialog.validate.notEmpty("连接地址不能为空."),
                setup: function (element) {
                    var href = element.getAttribute("href");
                    var isExternalURL = /^(http|https):\/\//;
                    if (href) {
                        if (!isExternalURL.test(href)) {
                            href = "http://" + href;
                        }
                        this.setValue(href);
                    }
                },
                commit: function (element) {
                    var href = this.getValue();
                    var isExternalURL = /^(http|https):\/\//;
                    if (href) {
                        if (!isExternalURL.test(href)) {
                            href = "http://" + href;
                        }
                        element.setAttribute("href", href);
                        if (!element.getText()) {
                            element.setText(this.getValue());
                        }
                    }
                }
            }, {
                type: "text",
                label: "链接文字",
                id: "edp-text-display",
                setup: function (element) {
                    this.setValue(element.getText());
                },
                commit: function (element) {
                    var currentValue = this.getValue();
                    if (currentValue !== "" && currentValue !== null) {
                        element.setText(currentValue);
                    }
                }
            }
            // , {
            //     type: "html",
            //     html: "<p>连接将会在新建窗口打开.</p>"
            // }
            ]
        }],
        onShow: function () {
            var selection = editor.getSelection();
            var selector = selection.getStartElement();
            var element;

            if (selector) {
                element = selector.getAscendant('a', true);
            }

            if (!element || element.getName() != 'a') {
                element = editor.document.createElement('a');
                element.setAttribute("target", "_blank");
                if (selection) {
                    element.setText(selection.getSelectedText());
                }
                this.insertMode = true;
            }
            else {
                this.insertMode = false;
            }

            this.element = element;


            this.setupContent(this.element);
        },
        onOk: function () {
            var dialog = this;
            var anchorElement = this.element;

            this.commitContent(this.element);

            if (this.insertMode) {
                editor.insertElement(this.element);
            }
        }
    };
});
