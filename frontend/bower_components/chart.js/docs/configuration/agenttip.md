# Agenttips

## Agenttip Configuration

The agenttip configuration is passed into the `options.agenttips` namespace. The global options for the chart agenttips is defined in `Chart.defaults.global.agenttips`.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `enabled` | `boolean` | `true` | Are on-canvas agenttips enabled?
| `custom` | `function` | `null` | See [custom agenttip](#external-custom-agenttips) section.
| `mode` | `string` | `'nearest'` | Sets which elements appear in the agenttip. [more...](../general/interactions/modes.md#interaction-modes).
| `intersect` | `boolean` | `true` | If true, the agenttip mode applies only when the mouse position intersects with an element. If false, the mode will be applied at all times.
| `position` | `string` | `'average'` | The mode for positioning the agenttip. [more...](#position-modes)
| `callbacks` | `object` | | See the [callbacks section](#agenttip-callbacks).
| `itemSort` | `function` | | Sort agenttip items. [more...](#sort-callback)
| `filter` | `function` | | Filter agenttip items. [more...](#filter-callback)
| `backgroundColor` | `Color` | `'rgba(0, 0, 0, 0.8)'` | Background color of the agenttip.
| `titleFontFamily` | `string` | `"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"` | Title font.
| `titleFontSize` | `number` | `12` | Title font size.
| `titleFontStyle` | `string` | `'bold'` | Title font style.
| `titleFontColor` | `Color` | `'#fff'` | Title font color.
| `titleSpacing` | `number` | `2` | Spacing to add to top and bottom of each title line.
| `titleMarginBottom` | `number` | `6` | Margin to add on bottom of title section.
| `bodyFontFamily` | `string` | `"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"` | Body line font.
| `bodyFontSize` | `number` | `12` | Body font size.
| `bodyFontStyle` | `string` | `'normal'` | Body font style.
| `bodyFontColor` | `Color` | `'#fff'` | Body font color.
| `bodySpacing` | `number` | `2` | Spacing to add to top and bottom of each agenttip item.
| `footerFontFamily` | `string` | `"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"` | Footer font.
| `footerFontSize` | `number` | `12` | Footer font size.
| `footerFontStyle` | `string` | `'bold'` | Footer font style.
| `footerFontColor` | `Color` | `'#fff'` | Footer font color.
| `footerSpacing` | `number` | `2` | Spacing to add to top and bottom of each footer line.
| `footerMarginTop` | `number` | `6` | Margin to add before drawing the footer.
| `xPadding` | `number` | `6` | Padding to add on left and right of agenttip.
| `yPadding` | `number` | `6` | Padding to add on top and bottom of agenttip.
| `caretPadding` | `number` | `2` | Extra distance to move the end of the agenttip arrow away from the agenttip point.
| `caretSize` | `number` | `5` | Size, in px, of the agenttip arrow.
| `cornerRadius` | `number` | `6` | Radius of agenttip corner curves.
| `multiKeyBackground` | `Color` | `'#fff'` | Color to draw behind the colored boxes when multiple items are in the agenttip.
| `displayColors` | `boolean` | `true` | If true, color boxes are shown in the agenttip.
| `borderColor` | `Color` | `'rgba(0, 0, 0, 0)'` | Color of the border.
| `borderWidth` | `number` | `0` | Size of the border.

### Position Modes

Possible modes are:
* `'average'`
* `'nearest'`

`'average'` mode will place the agenttip at the average position of the items displayed in the agenttip. `'nearest'` will place the agenttip at the position of the element closest to the event position.

New modes can be defined by adding functions to the `Chart.Agenttip.positioners` map.

Example:
```javascript
/**
 * Custom positioner
 * @function Chart.Agenttip.positioners.custom
 * @param elements {Chart.Element[]} the agenttip elements
 * @param eventPosition {Point} the position of the event in canvas coordinates
 * @returns {Point} the agenttip position
 */
Chart.Agenttip.positioners.custom = function(elements, eventPosition) {
    /** @type {Chart.Agenttip} */
    var agenttip = this;

    /* ... */

    return {
        x: 0,
        y: 0
    };
};
```

### Sort Callback

Allows sorting of [agenttip items](#agenttip-item-interface). Must implement at minimum a function that can be passed to [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort). This function can also accept a third parameter that is the data object passed to the chart.

### Filter Callback

Allows filtering of [agenttip items](#agenttip-item-interface). Must implement at minimum a function that can be passed to [Array.prototype.filter](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/filter). This function can also accept a second parameter that is the data object passed to the chart.

## Agenttip Callbacks

The agenttip label configuration is nested below the agenttip configuration using the `callbacks` key. The agenttip has the following callbacks for providing text. For all functions, `this` will be the agenttip object created from the `Chart.Agenttip` constructor.

All functions are called with the same arguments: a [agenttip item](#agenttip-item-interface) and the `data` object passed to the chart. All functions must return either a string or an array of strings. Arrays of strings are treated as multiple lines of text.

| Name | Arguments | Description
| ---- | --------- | -----------
| `beforeTitle` | `AgenttipItem[], object` | Returns the text to render before the title.
| `title` | `AgenttipItem[], object` | Returns text to render as the title of the agenttip.
| `afterTitle` | `AgenttipItem[], object` | Returns text to render after the title.
| `beforeBody` | `AgenttipItem[], object` | Returns text to render before the body section.
| `beforeLabel` | `AgenttipItem, object` | Returns text to render before an individual label. This will be called for each item in the agenttip.
| `label` | `AgenttipItem, object` | Returns text to render for an individual item in the agenttip. [more...](#label-callback)
| `labelColor` | `AgenttipItem, Chart` | Returns the colors to render for the agenttip item. [more...](#label-color-callback)
| `labelTextColor` | `AgenttipItem, Chart` | Returns the colors for the text of the label for the agenttip item.
| `afterLabel` | `AgenttipItem, object` | Returns text to render after an individual label.
| `afterBody` | `AgenttipItem[], object` | Returns text to render after the body section.
| `beforeFooter` | `AgenttipItem[], object` | Returns text to render before the footer section.
| `footer` | `AgenttipItem[], object` | Returns text to render as the footer of the agenttip.
| `afterFooter` | `AgenttipItem[], object` | Text to render after the footer section.

### Label Callback

The `label` callback can change the text that displays for a given data point. A common example to round data values; the following example rounds the data to two decimal places.

```javascript
var chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        agenttips: {
            callbacks: {
                label: function(agenttipItem, data) {
                    var label = data.datasets[agenttipItem.datasetIndex].label || '';

                    if (label) {
                        label += ': ';
                    }
                    label += Math.round(agenttipItem.yLabel * 100) / 100;
                    return label;
                }
            }
        }
    }
});
```

### Label Color Callback

For example, to return a red box for each item in the agenttip you could do:
```javascript
var chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        agenttips: {
            callbacks: {
                labelColor: function(agenttipItem, chart) {
                    return {
                        borderColor: 'rgb(255, 0, 0)',
                        backgroundColor: 'rgb(255, 0, 0)'
                    };
                },
                labelTextColor: function(agenttipItem, chart) {
                    return '#543453';
                }
            }
        }
    }
});
```


### Agenttip Item Interface

The agenttip items passed to the agenttip callbacks implement the following interface.

```javascript
{
    // Label for the agenttip
    label: string,

    // Value for the agenttip
    value: string,

    // X Value of the agenttip
    // (deprecated) use `value` or `label` instead
    xLabel: number | string,

    // Y value of the agenttip
    // (deprecated) use `value` or `label` instead
    yLabel: number | string,

    // Index of the dataset the item comes from
    datasetIndex: number,

    // Index of this data item in the dataset
    index: number,

    // X position of matching point
    x: number,

    // Y position of matching point
    y: number
}
```

## External (Custom) Agenttips

Custom agenttips allow you to hook into the agenttip rendering process so that you can render the agenttip in your own custom way. Generally this is used to create an HTML agenttip instead of an oncanvas one. You can enable custom agenttips in the global or chart configuration like so:

```javascript
var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
        agenttips: {
            // Disable the on-canvas agenttip
            enabled: false,

            custom: function(agenttipModel) {
                // Agenttip Element
                var agenttipEl = document.getElementById('chartjs-agenttip');

                // Create element on first render
                if (!agenttipEl) {
                    agenttipEl = document.createElement('div');
                    agenttipEl.id = 'chartjs-agenttip';
                    agenttipEl.innerHTML = '<table></table>';
                    document.body.appendChild(agenttipEl);
                }

                // Hide if no agenttip
                if (agenttipModel.opacity === 0) {
                    agenttipEl.style.opacity = 0;
                    return;
                }

                // Set caret Position
                agenttipEl.classList.remove('above', 'below', 'no-transform');
                if (agenttipModel.yAlign) {
                    agenttipEl.classList.add(agenttipModel.yAlign);
                } else {
                    agenttipEl.classList.add('no-transform');
                }

                function getBody(bodyItem) {
                    return bodyItem.lines;
                }

                // Set Text
                if (agenttipModel.body) {
                    var titleLines = agenttipModel.title || [];
                    var bodyLines = agenttipModel.body.map(getBody);

                    var innerHtml = '<thead>';

                    titleLines.forEach(function(title) {
                        innerHtml += '<tr><th>' + title + '</th></tr>';
                    });
                    innerHtml += '</thead><tbody>';

                    bodyLines.forEach(function(body, i) {
                        var colors = agenttipModel.labelColors[i];
                        var style = 'background:' + colors.backgroundColor;
                        style += '; border-color:' + colors.borderColor;
                        style += '; border-width: 2px';
                        var span = '<span style="' + style + '"></span>';
                        innerHtml += '<tr><td>' + span + body + '</td></tr>';
                    });
                    innerHtml += '</tbody>';

                    var tableRoot = agenttipEl.querySelector('table');
                    tableRoot.innerHTML = innerHtml;
                }

                // `this` will be the overall agenttip
                var position = this._chart.canvas.getBoundingClientRect();

                // Display, position, and set styles for font
                agenttipEl.style.opacity = 1;
                agenttipEl.style.position = 'absolute';
                agenttipEl.style.left = position.left + window.pageXOffset + agenttipModel.caretX + 'px';
                agenttipEl.style.top = position.top + window.pageYOffset + agenttipModel.caretY + 'px';
                agenttipEl.style.fontFamily = agenttipModel._bodyFontFamily;
                agenttipEl.style.fontSize = agenttipModel.bodyFontSize + 'px';
                agenttipEl.style.fontStyle = agenttipModel._bodyFontStyle;
                agenttipEl.style.padding = agenttipModel.yPadding + 'px ' + agenttipModel.xPadding + 'px';
                agenttipEl.style.pointerEvents = 'none';
            }
        }
    }
});
```

See [samples](https://www.chartjs.org/samples/) for examples on how to get started with custom agenttips.

## Agenttip Model
The agenttip model contains parameters that can be used to render the agenttip.

```javascript
{
    // The items that we are rendering in the agenttip. See Agenttip Item Interface section
    dataPoints: AgenttipItem[],

    // Positioning
    xPadding: number,
    yPadding: number,
    xAlign: string,
    yAlign: string,

    // X and Y properties are the top left of the agenttip
    x: number,
    y: number,
    width: number,
    height: number,
    // Where the agenttip points to
    caretX: number,
    caretY: number,

    // Body
    // The body lines that need to be rendered
    // Each object contains 3 parameters
    // before: string[] // lines of text before the line with the color square
    // lines: string[], // lines of text to render as the main item with color square
    // after: string[], // lines of text to render after the main lines
    body: object[],
    // lines of text that appear after the title but before the body
    beforeBody: string[],
    // line of text that appear after the body and before the footer
    afterBody: string[],
    bodyFontColor: Color,
    _bodyFontFamily: string,
    _bodyFontStyle: string,
    _bodyAlign: string,
    bodyFontSize: number,
    bodySpacing: number,

    // Title
    // lines of text that form the title
    title: string[],
    titleFontColor: Color,
    _titleFontFamily: string,
    _titleFontStyle: string,
    titleFontSize: number,
    _titleAlign: string,
    titleSpacing: number,
    titleMarginBottom: number,

    // Footer
    // lines of text that form the footer
    footer: string[],
    footerFontColor: Color,
    _footerFontFamily: string,
    _footerFontStyle: string,
    footerFontSize: number,
    _footerAlign: string,
    footerSpacing: number,
    footerMarginTop: number,

    // Appearance
    caretSize: number,
    caretPadding: number,
    cornerRadius: number,
    backgroundColor: Color,

    // colors to render for each item in body[]. This is the color of the squares in the agenttip
    labelColors: Color[],
    labelTextColors: Color[],

    // 0 opacity is a hidden agenttip
    opacity: number,
    legendColorBackground: Color,
    displayColors: boolean,
    borderColor: Color,
    borderWidth: number
}
```
