/*! tina4-components - *0.1 */
!function (e, t) {
    /*If browser*/
    'function' == typeof define ? /*Define as expression*/ define([], t) /*Else Define as plugin */ : e["grapejs-tina4-asset"] = t()
}(window, (function () {
    return tina4asset = function () {
        this.cssAssetsArray = function () {
            let css = [];
            $.ajax({
                url: '/api/tina4site/assets/css',
                type: "GET",
                async:false,
                success: function (data) {
                    l = data.length;
                    for (let i = 0; i < l; i++) {
                        css.push(data[0].url)
                    }
                }
            });
            return css;
        }
        this.javascriptAssetsArray = function () {
            let js = [];
            $.ajax({
                url: '/api/tina4site/assets/javascript',
                type: "GET",
                async:false,
                success: function (data) {
                    l = data.length;
                    for (var i = 0; i < l; i++) {
                        js.push(data[i].url)
                    }
                }
            });
            return js;
        }
    }
}))

