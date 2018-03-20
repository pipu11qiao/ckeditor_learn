CKEDITOR.editorConfig = function (config) {
    config.language = 'zh-cn';

    config.toolbar = 'Editor';

    config.extraPlugins = 'SimpleLink';

    config.toolbar_Editor = [
        {name: 'styles', items: ['Format']},
        {name: 'basicstyles', items: ['Bold', 'Italic', 'RemoveFormat']},
        {name: 'align', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight']},
        {name: 'links', items: ['SimpleLink']},
        {name: 'paragraph', items: ['NumberedList', 'BulletedList']},
        {name: 'insert', items: ['Image', 'Table']},
        {name: 'document', items: ['Source']}
    ];
    // if(WIDGET_ENV === 'develop') {
    //     config.toolbar_Editor.push({ name: 'document', items: [ 'Source' ] });
    // }
    // config.removePlugins = 'elementspath';


    config.format_tags = 'h1;h2;h3;h4;h5;p';

    // This is optional, but will let us define multiple different styles for multiple editors using the same CSS file.
    config.bodyClass = 'document-editor';
    // An array of stylesheets to style the WYSIWYG area.
    // Note: it is recommended to keep your own styles in a separate file in order to make future updates painless.
    config.contentsCss = ['../css/ckeditor_style.css'];

    config.allowedContent = true;
    // config.allowedContent = true;
    // "a[href,target]"
};

