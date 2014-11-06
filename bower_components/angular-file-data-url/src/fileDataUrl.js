angular.module("file-data-url", [])
    .directive("ngFile", function() {
        return {
            require: "?ngModel",
            restrict: "A",
            link: function($scope, $element, $attrs, $ngModel) {

                var reader = new FileReader(),
                    reading = false;

                function set(val) {
                    if (! $scope.$$phase) {
                        $scope.$apply(function() {
                            $ngModel.$setViewValue(val);
                        });
                    } else {
                        $ngModel.$setViewValue(val);
                    }
                }

                function onChange() {
                    var file = $element[0].files[0] || false;
                    if (! file) {
                        set(null);
                        return;
                    }

                    // If loading, first abort then load again.
                    // Otherwise will throw an error.
                    if(reader.readyState === 1) {
                        reader.abort();
                    } else {
                        reader.readAsDataURL(file);
                    }

                }

                // Set up all the watcher goodness.
                $element.on("change", onChange);
                angular.forEach(["ngMaxWidth", "ngMaxHeight", "ngQuality", "ngFormat"], function(key) {
                    $attrs.$observe(key, onChange);
                });

                reader.onloadend = function () {

                    // Prevents an aborted read from updating the model.
                    if (! reader.result) {
                        return;
                    }

                    var format = $attrs.ngFormat || "image/jpeg",
                        tmp = new Image();

                    tmp.src = reader.result;
                    tmp.onload = function() {
                        var w = tmp.width,
                            h = tmp.height,
                            quality = parseFloat($attrs.ngQuality || 1.0),
                            maxWidth = parseInt($attrs.ngMaxWidth || tmp.width),
                            maxHeight = parseInt($attrs.ngMaxHeight || tmp.height),
                            canvas = document.createElement("canvas"),
                            ctx = canvas.getContext("2d");

                        if (w > maxWidth) {
                            h *= maxWidth / w;
                            w = maxWidth;
                        }

                        if (h > maxHeight) {
                            w *= maxHeight / h;
                            h = maxHeight;
                        }

                        canvas.width = w;
                        canvas.height = h;
                        ctx.drawImage(this, 0, 0, w, h);

                        set(canvas.toDataURL(format, isNaN(quality) ? 1.0 : quality));
                    };
                };
            }
        };
    });
