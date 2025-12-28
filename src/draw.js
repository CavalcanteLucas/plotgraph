import * as d3 from "d3";

export class Draw {
    constructor() {
        const svg = d3.select("#output-container")
            .append("svg")
            .attr("id", "draw-group");

        svg.append("g").attr("id", "draw-group-inner");

        svg.append("defs")
            .append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 0 10 10")
            .attr("refX", 10)
            .attr("refY", 5)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M 0 0 L 10 5 L 0 10 z")
            .attr("fill", "black");

        this.svg = svg;
    }

    clear() {
        this.svg.selectAll("#draw-group-inner").selectAll("*").remove();
    }

    drawByLevel(treeByLevel) {
        this.clear();
        console.log(treeByLevel);
        const width = 1000;
        const rootGroup = this.svg.select("#draw-group-inner");
        const levelGroups = rootGroup.selectAll(".level-group")
            .data(Object.entries(treeByLevel))
            .enter()
            .append("g")
            .attr("class", "level-group")
            .attr("transform", (d, i) => `translate(0, ${i * 100})`);

        levelGroups.selectAll("circle")
            .data(d => d[1])
            .enter()
            .append("circle")
            .attr("cx", function (_, nodeIndex) {
                const level = d3.select(this.parentNode).datum()[0]; // level key
                const lvl = Number(level);

                const possibleNodes = 2 ** lvl;
                const levelWidth = width / possibleNodes;

                return levelWidth / 2 + nodeIndex * levelWidth;
            })
            .attr("cy", 50)
            .attr("r", 20)
            .attr("fill", d => d === null ? "transparent" : "orange");

        levelGroups.selectAll("text")
            .data(d => d[1])
            .enter()
            .append("text")
            .attr("x", function (_, nodeIndex) {
                const level = d3.select(this.parentNode).datum()[0]; // level key
                const lvl = Number(level);

                const possibleNodes = 2 ** lvl;
                const levelWidth = width / possibleNodes;

                return levelWidth / 2 + nodeIndex * levelWidth;
            }).attr("y", 50)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .text(d => d);

        levelGroups.each(function ([levelKey, nodes], level) {
            if (level === 0) return;

            const possibleNodes = 2 ** level;
            const parentNodes = 2 ** (level - 1);
            const levelWidth = width / possibleNodes;
            const parentWidth = width / parentNodes;

            const group = d3.select(this);

            nodes.forEach((_, nodeIndex) => {
                if (nodes[nodeIndex] === null) return;
                const parentIndex = Math.floor(nodeIndex / 2);

                const x1 = parentWidth / 2 + parentIndex * parentWidth;
                const y1 = -30;
                const x2 = levelWidth / 2 + nodeIndex * levelWidth;
                const y2 = 30;

                group.append("line")
                    .attr("x1", x1)
                    .attr("y1", y1)
                    .attr("x2", x2)
                    .attr("y2", y2)
                    .attr("stroke", "black")
                    .attr("marker-end", "url(#arrow)");
            });
        });
    }
}