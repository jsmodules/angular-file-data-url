angular.module("file-data-url", [])
    .directive("ngFile", function() {
        return {
            require: "?ngModel",
            restrict: 'A',
            link: function(scope, element, attrs, ngModel) {

                var reader = new FileReader(),
                    set = function(val) {
                        scope.$apply(function() {
                            ngModel.$setViewValue(val);
                        });
                    };

                element.on("change", function() {
                    var file = element[0].files[0] || false;
                    if (! file) {
                        set(null);
                        return;
                    }
                    reader.readAsDataURL(file);
                });

                reader.onloadend = function () {
                    var format = element.data("img-format") || "image/jpeg",
                        tmp = new Image();
                    tmp.src = reader.result;
                    tmp.onload = function() {

                        var w = tmp.width,
                            h = tmp.height,
                            quality = element.data("img-quality") || null,
                            maxWidth = parseInt(element.data("max-width") || tmp.width),
                            maxHeight = parseInt(element.data("max-height") || tmp.height),
                            canvas = document.createElement("canvas"),
                            ctx = canvas.getContext("2d");
                        if (w > h) {
                            if (w > maxWidth) {
                                h *= maxWidth / w;
                                w = maxWidth;
                            }
                        } else {
                            if (h > maxHeight) {
                                w *= maxHeight / w;
                                h = maxHeight;
                            }
                        }
                        canvas.width = w;
                        canvas.height = h;
                        ctx.drawImage(this, 0, 0, w, h);
                        set(canvas.toDataURL(format, quality));
                    };
                };
            }
        };
    });