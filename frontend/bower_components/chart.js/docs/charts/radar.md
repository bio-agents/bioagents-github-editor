# Radar
A radar chart is a way of showing multiple data points and the variation between them.

They are often useful for comparing the points of two or more different data sets.

{% chartjs %}
{
    "type": "radar",
    "data": {
        "labels": [
            "Eating",
            "Drinking",
            "Sleeping",
            "Designing",
            "Coding",
            "Cycling",
            "Running"
        ],
        "datasets": [{
            "label": "My First Dataset",
            "data": [65, 59, 90, 81, 56, 55, 40],
            "fill": true,
            "backgroundColor": "rgba(255, 99, 132, 0.2)",
            "borderColor": "rgb(255, 99, 132)",
            "pointBackgroundColor": "rgb(255, 99, 132)",
            "pointBorderColor": "#fff",
            "pointHoverBackgroundColor": "#fff",
            "pointHoverBorderColor": "rgb(255, 99, 132)",
            "fill": true
        }, {
            "label": "My Second Dataset",
            "data": [28, 48, 40, 19, 96, 27, 100],
            "fill": true,
            "backgroundColor": "rgba(54, 162, 235, 0.2)",
            "borderColor": "rgb(54, 162, 235)",
            "pointBackgroundColor": "rgb(54, 162, 235)",
            "pointBorderColor": "#fff",
            "pointHoverBackgroundColor": "#fff",
            "pointHoverBorderColor": "rgb(54, 162, 235)",
            "fill": true
        }]
    },
    "options": {
        "elements": {
            "line": {
                "tension": 0,
                "borderWidth": 3
            }
        }
    }
}
{% endchartjs %}

## Example Usage
```javascript
var myRadarChart = new Chart(ctx, {
    type: 'radar',
    data: data,
    options: options
});
```

## Dataset Properties

The radar chart allows a number of properties to be specified for each dataset. These are used to set display properties for a specific dataset. For example, the colour of a line is generally set this way.

| Name | Type | [Scriptable](../general/options.md#scriptable-options) | [Indexable](../general/options.md#indexable-options) | Default
| ---- | ---- | :----: | :----: | ----
| [`backgroundColor`](#line-styling) | [`Color`](../general/colors.md) | - | - | `'rgba(0, 0, 0, 0.1)'`
| [`borderCapStyle`](#line-styling) | `string` | - | - | `'butt'`
| [`borderColor`](#line-styling) | [`Color`](../general/colors.md) | - | - | `'rgba(0, 0, 0, 0.1)'`
| [`borderDash`](#line-styling) | `number[]` | - | - | `[]`
| [`borderDashOffset`](#line-styling) | `number` | - | - | `0.0`
| [`borderJoinStyle`](#line-styling) | `string` | - | - | `'miter'`
| [`borderWidth`](#line-styling) | `number` | - | - | `3`
| [`fill`](#line-styling) | <code>boolean&#124;string</code> | - | - | `true`
| [`label`](#general) | `string` | - | - | `''`
| [`lineTension`](#line-styling) | `number` | - | - | `0.4`
| [`pointBackgroundColor`](#point-styling) | `Color` | Yes | Yes | `'rgba(0, 0, 0, 0.1)'`
| [`pointBorderColor`](#point-styling) | `Color` | Yes | Yes | `'rgba(0, 0, 0, 0.1)'`
| [`pointBorderWidth`](#point-styling) | `number` | Yes | Yes | `1`
| [`pointHitRadius`](#point-styling) | `number` | Yes | Yes | `1`
| [`pointHoverBackgroundColor`](#interactions) | `Color` | Yes | Yes | `undefined`
| [`pointHoverBorderColor`](#interactions) | `Color` | Yes | Yes | `undefined`
| [`pointHoverBorderWidth`](#interactions) | `number` | Yes | Yes | `1`
| [`pointHoverRadius`](#interactions) | `number` | Yes | Yes | `4`
| [`pointRadius`](#point-styling) | `number` | Yes | Yes | `3`
| [`pointRotation`](#point-styling) | `number` | Yes | Yes | `0`
| [`pointStyle`](#point-styling) | <code>string&#124;Image</code> | Yes | Yes | `'circle'`

### General

| Name | Description
| ---- | ----
| `label` | The label for the dataset which appears in the legend and agenttips.

### Point Styling

The style of each point can be controlled with the following properties:

| Name | Description
| ---- | ----
| `pointBackgroundColor` | The fill color for points.
| `pointBorderColor` | The border color for points.
| `pointBorderWidth` | The width of the point border in pixels.
| `pointHitRadius` | The pixel size of the non-displayed point that reacts to mouse events.
| `pointRadius` | The radius of the point shape. If set to 0, the point is not rendered.
| `pointRotation` | The rotation of the point in degrees.
| `pointStyle` | Style of the point. [more...](../configuration/elements#point-styles)

All these values, if `undefined`, fallback first to the dataset options then to the associated [`elements.point.*`](../configuration/elements.md#point-configuration) options.

### Line Styling

The style of the line can be controlled with the following properties:

| Name | Description
| ---- | ----
| `backgroundColor` | The line fill color.
| `borderCapStyle` | Cap style of the line. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap).
| `borderColor` | The line color.
| `borderDash` | Length and spacing of dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash).
| `borderDashOffset` | Offset for line dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset).
| `borderJoinStyle` | Line joint style. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin).
| `borderWidth` | The line width (in pixels).
| `fill` | How to fill the area under the line. See [area charts](area.md).
| `lineTension` | Bezier curve tension of the line. Set to 0 to draw straightlines.

All these values, if `undefined`, fallback to the associated [`elements.line.*`](../configuration/elements.md#line-configuration) options.

### Interactions

The interaction with each point can be controlled with the following properties:

| Name | Description
| ---- | -----------
| `pointHoverBackgroundColor` | Point background color when hovered.
| `pointHoverBorderColor` | Point border color when hovered.
| `pointHoverBorderWidth` | Border width of point when hovered.
| `pointHoverRadius` | The radius of the point when hovered.

## Configuration Options

Unlike other charts, the radar chart has no chart specific options.

## Scale Options

The radar chart supports only a single scale. The options for this scale are defined in the `scale` property.

```javascript
options = {
    scale: {
        // Hides the scale
        display: false
    }
};
```

## Default Options

It is common to want to apply a configuration setting to all created radar charts. The global radar chart settings are stored in `Chart.defaults.radar`. Changing the global options only affects charts created after the change. Existing charts are not changed.

## Data Structure

The `data` property of a dataset for a radar chart is specified as an array of numbers. Each point in the data array corresponds to the label at the same index.

```javascript
data: [20, 10]
```

For a radar chart, to provide context of what each point means, we include an array of strings that show around each point in the chart.

```javascript
data: {
    labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
    datasets: [{
        data: [20, 10, 4, 2]
    }]
}
```
