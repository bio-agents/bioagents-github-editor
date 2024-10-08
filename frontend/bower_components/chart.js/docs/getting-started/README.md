# Getting Started

Let's get started using Chart.js!

First, we need to have a canvas in our page.

```html
<canvas id="myChart"></canvas>
```

Now that we have a canvas we can use, we need to include Chart.js in our page.

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
```

Now, we can create a chart. We add a script to our page:

```javascript
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },

    // Configuration options go here
    options: {}
});
```

It's that easy to get started using Chart.js! From here you can explore the many options that can help you customise your charts with scales, agenttips, labels, colors, custom actions, and much more.

All our examples are [available online](https://www.chartjs.org/samples/latest/) but you can also download the `Chart.js.zip` archive attached to every [release](https://github.com/chartjs/Chart.js/releases) to experiment with our samples locally from the `/samples` folder.
