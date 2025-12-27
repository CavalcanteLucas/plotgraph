import * as d3 from "d3";

export class Draw {
    constructor(svg) {
        this.svg = svg;
    }

    clear() {
        this.svg.selectAll("#draw-group-inner").selectAll("*").remove();
    }

    drawByLevel(treeByLevel) {

        // const levels = Object.keys(treeByLevel).length;
        // console.log(levels);

        const width = 1000;

        // for (let i = 0; i < levels; i++) {
        //     const possibleNodes = 2 ** i;
        //     const levelWidth = width / possibleNodes;
        //     console.log(i + 1, possibleNodes, levelWidth);
        //     for (let j = 0; j < possibleNodes; j++) {
        //         console.log(levelWidth / 2 + j * levelWidth);
        //     }
        // }

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
            .attr("fill", d => d === null ? "teal" : "orange");

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
    }
}