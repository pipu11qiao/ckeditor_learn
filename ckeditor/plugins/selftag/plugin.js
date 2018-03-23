'use strick';
(function () {
    CKEDITOR.plugins.add('selftag',{
        requires: 'fakeobjects',
        icons: 'anchor,ancor-rtl,link,unlink',
        hidpi: true,
        onLoad: function () {
            // Add the CSS styles for anchor placeholders.
            var iconPath = CKEDITOR.getUrl( this.path + 'images' + ( CKEDITOR.env.hidpi ? '/hidpi' : '' ) + '/anchor.png' ),
                baseStyle = 'background:url(' + iconPath + ') no-repeat %1 center;border:1px dotted #00f;background-size:16px;';

            var template = '.%2 a.cke_anchor,' +
                '.%2 a.cke_anchor_empty' +
                ',.cke_editable.%2 a[name]' +
                ',.cke_editable.%2 a[data-cke-saved-name]' +
                '{' +
                baseStyle +
                'padding-%1:18px;' +
                // Show the arrow cursor for the anchor image (FF at least).
                'cursor:auto;' +
                '}' +
                '.%2 img.cke_anchor' +
                '{' +
                baseStyle +
                'width:16px;' +
                'min-height:15px;' +
                // The default line-height on IE.
                'height:1.15em;' +
                // Opera works better with "middle" (even if not perfect)
                'vertical-align:text-bottom;' +
                '}';

            // Styles with contents direction awareness.
            function cssWithDir( dir ) {
                return template.replace( /%1/g, dir == 'rtl' ? 'right' : 'left' ).replace( /%2/g, 'cke_contents_' + dir );
            }

            CKEDITOR.addCss( cssWithDir( 'ltr' ) + cssWithDir( 'rtl' ) );
        },
        init: function (editor) {
            var allowed = 'a[!href]',
                required = 'a[href]';

        },

    });
})();