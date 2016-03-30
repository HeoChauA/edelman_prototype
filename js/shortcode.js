if (typeof shortcode_editor == 'undefined') {
	shortcode_editor = {};
}
shortcode_editor.addHandler = function( shortcode ) {
	jQuery('#'+shortcode.shortcode+'_button').click(function() {
		var atts = '';
        if (Object(shortcode.data) === shortcode.data) {
            shortcode.data = shortcode_editor.flatten(shortcode.data);
            jQuery.each( shortcode.data, function( key, val ) {
                atts += key + '="' + val + '" ';
            });
        }
		var text = '['+shortcode.shortcode+' '+atts+'][/'+shortcode.shortcode+']';
		if( !tinyMCE.activeEditor ) {
    		jQuery('textarea#content').append(text);
  		} else {
    		tinyMCE.execCommand('mceInsertContent', false, text);
  		}
	});
}

// See http://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects#answer-19101235
shortcode_editor.flatten = function( data ) {
    var result = {};
    function recurse (cur, prop) {
        if (Object(cur) !== cur) {
            result[prop] = cur;
        } else if (Array.isArray(cur)) {
             for(var i=0, l=cur.length; i<l; i++)
                 recurse(cur[i], prop + "[" + i + "]");
            if (l == 0)
                result[prop] = [];
        } else {
            var isEmpty = true;
            for (var p in cur) {
                isEmpty = false;
                recurse(cur[p], prop ? prop+"_"+p : p);
            }
            if (isEmpty && prop)
                result[prop] = {};
        }
    }
    recurse(data, "");
    return result;
}
