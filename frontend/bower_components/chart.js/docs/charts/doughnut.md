# Doughnut and Pie
Pie and doughnut charts are probably the most commonly used charts. They are divided into segments, the arc of each segment shows the proportional value of each piece of data.

They are excellent at showing the relational proportions between data.

Pie and doughnut charts are effectively the same class in Chart.js, but have one different default value - their `cutoutPercentage`. This equates what percentage of the inner should be cut out. This defaults to `0` for pie charts, and `50` for doughnuts.

They are also registered under two aliases in the `Chart` core. Other than their different default value, and different alias, they are exactly the same.

{% chartjs %}
{
    "type": "doughnut",
    "data": {
        "labels": [
            "Red",
            "Blue",
            "Yellow"
        ],
        "datasets": [{
            "label": "My First Dataset",
            "data": [300, 50, 100],
            "backgroundColor": [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)"
            ]
        }]
    }
}
{% endchartjs %}

## Example Usage

```javascript
// For a pie chart
var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: options
});
```

```javascript
// And for a doughnut chart
var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    options: options
});
```

## Dataset Properties

The doughnut/pie chart allows a number of properties to be specified for each dataset. These are used to set display properties for a specific dataset. For example, the colour of a the dataset's arc are generally set this way.

| Name | Type | [Scriptable](../general/options.md#scriptable-options) | [Indexable](../general/options.md#indexable-options) | Default
| ---- | ---- | :----: | :----: | ----
| [`backgroundColor`](#styling) | [`Color`](../general/colors.md) | Yes | Yes | `'rgba(0, 0, 0, 0.1)'`
| [`borderAlign`](#border-alignment) | `string` | Yes | Yes | `'center'`
| [`borderColor`](#styling) | [`Color`](../general/colors.md) | Yes | Yes | `'#fff'`
| [`borderWidth`](#styling) | `number` | Yes | Yes | `2`
| [`data`](#data-structure) | `number[]` | - | - | **required**
| [`hoverBackgroundColor`](#interations) | [`Color`](../general/colors.md) | Yes | Yes | `undefined`
| [`hoverBorderColor`](#interactions) | [`Color`](../general/colors.md) | Yes | Yes | `undefined`
| [`hoverBorderWidth`](#interactions) | `number` | Yes | Yes | `undefined`
| [`weight`](#styling) | `number` | - | - | `1`

### Styling

The style of each arc can be controlled with the following properties:

| Name | Description
| ---- | ----
| `backgroundColor` | arc background color.
| `borderColor` | arc border color.
| `borderWidth` | arc border width (in pixels).
| `weight` | The relative thickness of the dataset. Providing a value for weight will cause the pie or doughnut dataset to be drawn with a thickness relative to the sum of all the dataset weight values.

All these values, if `undefined`, fallback to the associated [`elements.arc.*`](../configuration/elements.md#arc-configuration) options.

### Border Alignment

The following values are supported for `borderAlign`.
* `'center'` (default)
* `'inner'`

When `'center'` is set, the borders of arcs next to each other will overlap. When `'inner'` is set, it is guaranteed that all the borders are not overlap.

### Interactions

The interaction with each arc can be controlled with the following properties:

| Name | Description
| ---- | -----------
| `hoverBackgroundColor` | arc background color when hovered.
| `hoverBorderColor` | arc border color when hovered.
| `hoverBorderWidth` | arc border width when hovered (in pixels).

All these values, if `undefined`, fallback to the associated [`elements.arc.*`](../configuration/elements.md#arc-configuration) options.

## Config Options

These are the customisation options specific to Pie & Doughnut charts. These options are merged with the global chart configuration options, and form the options of the chart.

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| `cutoutPercentage` | `number` | `50` - for doughnut, `0` - for pie | The percentage of the chart that is cut out of the middle.
| `rotation` | `number` | `-0.5 * Math.PI` | Starting angle to draw arcs from.
| `circumference` | `number` | `2 * Math.PI` | Sweep to allow arcs to cover.
| `animation.animateRotate` | `boolean` | `true` | If true, the chart will animate in with a rotation animation. This property is in the `options.animation` object.
| `animation.animateScale` | `boolean` | `false` | If true, will animate scaling the chart from the center outwards.

## Default Options

We can also change these default values for each Doughnut type that is created, this object is available at `Chart.defaults.doughnut`. Pie charts also have a clone of these defaults available to change at `Chart.defaults.pie`, with the only difference being `cutoutPercentage` being set to 0.

## Data Structure

For a pie chart, datasets need to contain an array of data points. The data points should be a number, Chart.js will total all of the numbers and calculate the relative proportion of each.

You also need to specify an array of labels so that agenttips appear correctly.

```javascript
data = {
    datasets: [{
        data: [10, 20, 30]
    }],

    // These labels appear in the legend and in the agenttips when hovering different arcs
    labels: [
        'Red',
        'Yellow',
        'Blue'
    ]
};
```
