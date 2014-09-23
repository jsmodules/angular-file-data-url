# Angular file-data-url Module

A super simple AngularJS directive with encodes images to data url's using a input[type=file] element.

It binds the ngModel controller to the element and automagically sets the ngModel the file contents (if it's an image) to a base64 encoded data url.


## Browser Requirements

*Requires a modern browser with `FileReader` capabilities (i.e: [IE 10 or higher, and other modern browsers](http://caniuse.com/#feat=filereader). It also can resize and change the format of the image. Resizing before uploading is a great way to make uploads just a bit quicker and conserve user bandwidth.

There's currently no fallback for IE <= 9 or Opera mini. Feel free to send a PR if you want to help out.

## Usage

#### Minimal Options

```html
<input type="file" ng-file ng-model="myFile">
```

### All Options

```html
<input type="file" ng-file ng-model="myFile" data-img-format="image/jpeg" data-img-quality="1.0" data-img-max-width="100" data-img-max-height="100">
```
    
## Options

`data-img-format` The the image encoding format: `image/jpeg`, `image/png`, `image/webp` or other format supported by [HTMLCanvasElement.toDataUrl](https://developer.mozilla.org/en/docs/Web/API/HTMLCanvasElement). Defaults to `image/jpeg`.

`data-img-quality` The quality of image encoding. A range from `0` to `1.0` per the [HTMLCanvasElement.toDataUrl](https://developer.mozilla.org/en/docs/Web/API/HTMLCanvasElement) spec. Defaults to null, using the browser default.

`data-img-max-height` The max height, in pixels, of the resulting image. Images bigger than this are scaled down to fit. Defaults to `null` for no limit on the height.

`data-img-max-width` The maxiumum image width, in pixels, of the result image. Images bigger than this are scaled to fit this dimension. Defaults to `null` for no limit on the width.

