import angular from 'angular';
import d3 from 'd3';

const width = 500;
const height = 500;

const chart = () => {
    return {
        restrict: 'E',
        scope: {
            data: '=data'
        },
        template: `<svg id="bubble-chart" class="chart"></svg>`,
        link: ($scope, $elem, $attrs) => {

            const vis = d3.select($elem.find("svg")[0])
                .attr("width", width)
                .attr("height", height);

            $scope.$watch(() => {
                vis.selectAll('*').remove();

                if (!$scope.data.length) return;

                console.log($scope.data);

                const xRange = d3.scale.linear().range([40, 400]).domain([
                    d3.min($scope.data, d => d),
                    d3.max($scope.data, d => d)
                ]);

                const yRange = d3.scale.linear().range([400, 40]).domain([
                    d3.min($scope.data, d => d),
                    d3.max($scope.data, d => d)
                ]);

                const xAxis = d3.svg.axis().scale(xRange);
                const yAxis = d3.svg.axis().scale(yRange).orient("left");

                vis.append("svg:g").call(xAxis).attr("transform", "translate(0,400)");
                vis.append("svg:g").call(yAxis).attr("transform", "translate(40,0)");

                const circles = vis.selectAll("circle").data($scope.data);
                circles
                    .enter()
                    .insert("circle")
                    .attr("cx", d => xRange(d))
                    .attr("cy", d => yRange(d))
                    .attr("r", 10)
                    .style("fill", "red");
            });

            const handleDragEnter = (e) => {
                console.log('dragenter');
            };

            const handleDragOver = (e) => {
                if (e.preventDefault) {
                    e.preventDefault();
                }
            };

            const handleDrop = (e) => {
                console.log('drop');
                const json = JSON.parse(e.dataTransfer.getData('application/json'));
                $scope.$apply(() => {
                    console.log(json.d);
                    $scope.data.push(parseInt(json.d));
                });
            };

            $elem.find("svg")[0].addEventListener('dragenter', handleDragEnter, false);
            $elem.find("svg")[0].addEventListener('dragover', handleDragOver, false);
            $elem.find("svg")[0].addEventListener('drop', handleDrop, false);
        }
    }
}

export default chart;
