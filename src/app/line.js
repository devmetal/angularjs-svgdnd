import angular from 'angular';
import d3      from 'd3';

const width = 600;
const barHeight = 30;

const chart = () => {
    return {
        restrict: 'E',
        scope: {
            data: '=data'
        },
        template: `<svg id="line-chart" class="chart"></svg>`,
        link: ($scope, $elem, $attrs) => {
            const x = d3.scale.linear()
                .domain([0, d3.max($scope.data)])
                .range([0, width]);

            const svgElem = $elem.find('svg')[0];
            const chart = d3.select(svgElem)
                .attr("width", width)
                .attr("height", barHeight * $scope.data.length);

            const bar = chart.selectAll("g")
                .data($scope.data)
                .enter().append("g")
                .attr("transform", (d,i) => `translate(0,${i * barHeight})`)
                .attr("draggable", true)
                .attr("data-d", d => d);

            bar.append("rect")
                .attr("width", x)
                .attr("height", barHeight - 1);

            bar.append("text")
                .attr("x", d => x(d) - 3)
                .attr("y", y => barHeight / 2)
                .attr("dy", ".35em")
                .text(d => d);

            const handleDragStart = (e) => {
                console.log('dragstart');
                const data = {d: e.target.getAttribute("data-d")};
                e.dataTransfer.setData('application/json', JSON.stringify(data));
            };

            const bars = svgElem.querySelectorAll("g");
            [...bars].forEach(bar => {
                bar.addEventListener('dragstart', handleDragStart, false);
            });
        }
    }
}

export default chart;
