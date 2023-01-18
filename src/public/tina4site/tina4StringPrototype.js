if (!String.prototype.unescapeHTML) {
    String.prototype.unescapeHTML = function() {
        return this.replace(/&[#\w]+;/g, function (s) {
            var entityMap = {
                "&amp;": "&",
                "&lt;": "<",
                "&gt;": ">",
                '&quot;': '"',
                '&#39;': "'",
                '&#x2F;': "/"
            };

            return entityMap[s];
        });
    };
}