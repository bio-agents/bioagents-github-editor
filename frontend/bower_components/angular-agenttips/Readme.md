Angular Agenttips
==================

[![Join the chat at https://gitter.im/720kb/angular-agenttips](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/720kb/angular-agenttips?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


Angular Agenttips is an angularjs directive that generates a agenttip on your element.


The angular agenttips is developed by [720kb](http://720kb.net).

##Requirements


AngularJS v1.2+

##Screen
![Angular agenttips](http://i.imgur.com/2rOwAbQ.png)

###Browser support


![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
 ✔ | ✔ | IE9 + | ✔ | ✔ |


## Load

To use the directive, include the angular agenttips's javascript and css files in your web page:

```html
<!DOCTYPE HTML>
<html>
<head>
  <link href="src/css/angular-agenttips.css" rel="stylesheet" type="text/css" />
</head>
<body ng-app="app">
  //.....
  <script src="src/js/angular-agenttips.js"></script>
</body>
</html>
```

##Install

###Bower installation

```
$ bower install angular-agenttips --save
```
_then load the js files in your html_

###Npm installation

```
$ npm install angular-agenttips --save
```

_then load the js files in your html_

###Add module dependency

Add the 720kb.agenttips module dependency

```js
angular.module('app', [
  '720kb.agenttips'
 ]);
```


Call the directive wherever you want in your html page

```html

<a href="#" agenttips title="agenttip">Agenttip me</a>

```
##Options
Angular agenttips allows you to use some options via `attribute` data

####Agenttip position
You can set your agenttip to show on `left` or `right` or `top` or `bottom` position
using the `agenttip-side=""` attribute. Default: `top`
```html
<a href="#" agenttips agenttip-title="tip" agenttip-side="top">Agenttip me</a>
<a href="#" agenttips agenttip-title="tip" agenttip-side="bottom">Agenttip me</a>
<a href="#" agenttips agenttip-title="tip" agenttip-side="left">Agenttip me</a>
<a href="#" agenttips agenttip-title="tip" agenttip-side="right">Agenttip me</a>
```

####Agenttip title
You can set your agenttip title (text/html doesn't matter)
using the `agenttip-title=""` attribute or simply via `title=""` html attribute

```html
<a href="#" agenttips agenttip-title="tip" agenttip-title="Hey" agenttip-content="<i>Woa!</i>">Agenttip me</a>
<a href="#" agenttips agenttip-title="tip" title="Hey" agenttip-content="<i>Woa!</i>">Agenttip me</a>
```

####Agenttip content
You can set your agenttip content
using the `agenttip-content=""` attribute

```html
<a href="#" agenttips agenttip-title="tip" agenttip-content="Woa!">Agenttip me</a>
```
####Agenttip HTML content
You can set your agenttip html content
using the `agenttip-html=""` attribute

```html
<a href="#" agenttips agenttip-title="tip" agenttip-html="<i>Woa!</i>">Agenttip me</a>
```
####Agenttip view
You can use your own view inside the agenttip
using the `agenttip-view=""` attribute

```html
<a href="#" agenttips agenttip-title="tip" agenttip-view="path/to/view.html">Agenttip me</a>
```

####Agenttip view model
You can set a model for your agenttip view
using the `agenttip-view-model=""`

```html
<a href="#" agenttips agenttip-title="tip" agenttip-view-model="myModel" agenttip-view="path/to/view.html">Agenttip me</a>
```
then use it in your agenttip html template:

```html
<!-- path/to/view.html -->
<span>Agenttip me with data - {{ agenttipViewModel }}</span>
```

####Agenttip view controller
You can set a controller for your agenttip view
using the `agenttip-view=""` together with `agenttip-view-ctrl=""`  attribute

```html
<a href="#" agenttips agenttip-title="tip" agenttip-view="path/to/view.html" agenttip-view-ctrl="MyCtrl">Agenttip me</a>
```

####Agenttip size
You can set your agenttip size (small || medium (default) || large)
using the `agenttip-size=""` attribute. Default: `medium`

```html
<a href="#" agenttips agenttip-title="tip"  agenttip-size="small">Agenttip me</a>
<a href="#" agenttips agenttip-title="tip" agenttip-size="medium">Agenttip me</a>
<a href="#" agenttips agenttip-title="tip" agenttip-size="large">Agenttip me</a>
```
####Agenttip speed
You can set the agenttip transition speed ('fast' || 'medium' || 'slow' || int(milliseconds))
using the `agenttip-speed=""` attribute. Default: `medium`

```html
<a href="#" agenttips agenttip-speed="fast" agenttip-title="tip">Agenttip fast</a>
<a href="#" agenttips agenttip-speed="medium" agenttip-title="tip">Agenttip medium</a>
<a href="#" agenttips agenttip-speed="slow" agenttip-title="tip">Agenttip slow</a>
<a href="#" agenttips agenttip-speed="950" agenttip-title="tip">Agenttip custom</a>
```
####Agenttip delay
You can set the agenttip transition delay (ms)
using the `agenttip-delay=""` attribute. Default: `0`

```html
<a href="#" agenttips agenttip-delay="800" agenttip-title="tip">Agenttip in 800ms</a>
```
####Agenttip try
If space is not available for agenttip , it will automatically search for a similar alternative position to show. You can set agenttip try (1 || 0)
using the `agenttip-try=""` attribute. Default: `true`

```html
<a href="#" agenttips agenttip-title="tip" agenttip-try="1">Agenttip me</a>
<a href="#" agenttips agenttip-title="tip" agenttip-try="0">Agenttip me</a>
```
####Agenttip lazy
If you want to re-init the agenttip position everytime the agenttip trigger events are fired, you can set agenttip lazy mode (true || false)
using the `agenttip-lazy=""` attribute. Default: `true`

```html
<a href="#" agenttips agenttip-lazy="false" agenttip-content="Hi" agenttip-show-trigger="mouseover">
I will re-init my position everytime the mouseover event is fired
</a>
<a href="#" agenttips agenttip-lazy="true" agenttip-content="Hi" agenttip-show-trigger="mouseover">
I will init my position on mouseover only the first time event is fired
</a>
```

####Agenttip triggers
You can set your agenttip to show/hide on specific event/events, you can use the `agenttip-show-trigger=""` and the `agenttip-hide-trigger=""` attribute for this scope.
Defaults: `mouseover`, `mouseleave`
```html
<a href="#" agenttips agenttip-title="tip" agenttip-show-trigger="click" agenttip-side="top">Show agenttip only on click</a>
<a href="#" agenttips agenttip-title="tip" agenttip-hide-trigger="click" agenttip-side="bottom">Hide agenttip only on click</a>
<a href="#" agenttips agenttip-title="tip" agenttip-show-trigger="mouseover click" agenttip-hide-trigger="click" agenttip-side="left">Show agenttip on click and mouseover and hide agenttip only on click</a>
```

_**Close button**_

If you want to hide on click, you can configure a close button using text or HTML. This allows your users to click the button inside the agenttip instead of clicking on the original trigger. Default: `null` (no close button)
```html
<a href="#" agenttips agenttip-title="tip" agenttip-show-trigger="mouseover click" agenttip-hide-trigger="click" agenttip-close-button="x" agenttip-side="left">Show agenttip on click and mouseover and hide agenttip only on click, with option to click on the X</a>
<a href="#" agenttips agenttip-title="tip" agenttip-show-trigger="mouseover click" agenttip-hide-trigger="click" agenttip-close-button='<button type="button">Close Me!</button>' agenttip-side="left">Show agenttip on click and mouseover and hide agenttip only on click, with option to click on HTML button</a>
```

####Agenttip hide trigger target
You can use ```agenttip-hide-target=""``` to specify if the target of the ```agenttip-hide-trigger=""``` is the element or the agenttip itself.
Values are "element" or "agenttip". Default: `element`

```html
<a href="#" agenttips agenttip-title="agenttip" agenttip-hide-trigger="click" agenttip-hide-target="agenttip">
Click on the agenttip to hide agenttip
</a>
```

####Agenttip CSS class
You can set a custom CSS class or a set of, using the  `agenttip-class=""` attribute. Default: `''` (empty string)
```html
<a href="#" agenttips agenttip-class="agenttip-custom agenttip-for-me" agenttip-title="tip" agenttip-side="top">
I will show a agenttip with class="agenttip-custom agenttip-for-me"
</a>
```


####Agenttip scroll
In case your agenttip target element moves (either by scrolling or by use of .js) you can enable agenttip positioning check using `agenttip-scroll="true"` attribute. When this is enabled, agenttip element position is checked every 20ms and agenttip position is updated when necessary. This comes extra handy when using close triggers and you need to keep agenttip besides the target element. Default: `false`
```html
<a href="#" agenttips agenttip-title="I move along with my element" agenttip-scroll="true">
I will follow my element movements
</a>
```

## Global Options
Application wide defaults for most of the options can be set using the `agenttipConfigProvider`:

```js
angular
  .module('app')
  .config(function(agenttipsConfigProvider) {
    agenttipsConfigProvider.options({
      lazy: false,
      size: 'large'
    })
  });
```
Options that are not specified are kept unchanged.
Option names are the same as attribute names without the "agenttip-" prefix: `scroll`, `showTrigger`, `hideTrigger`,
`hideTarget`, `side`, `size`, `try`, `class`, `speed`, `delay`, `lazy`, `closeButton`

Of course specific agenttips can still overwrite any default using attributes.

Calling `options` method without arguments returns the complete options object.

## Example

###[Live demo](https://720kb.github.io/angular-agenttips)

##Theming
You can edit the default Css file `angular-agenttips.css` if you want to make a new theme for the agenttips.

##Contributing

We will be much grateful if you help us making this project to grow up.
Feel free to contribute by forking, opening issues, pull requests etc.

## License

The MIT License (MIT)

Copyright (c) 2014 Filippo Oretti, Dario Andrei

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
