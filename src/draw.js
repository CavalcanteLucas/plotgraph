export class Draw {
    constructor(svg) {
        this.svg = svg;
    }

    clear() {
        this.svg.select("#draw-group-inner").remove();
    }

    drawByLevel(treeByLevel) {
        const levelGroups = this.svg.selectAll(".level-group")
            .data(Object.entries(treeByLevel))
            .enter()
            .append("g")
            .attr("class", "level-group")
            .attr("transform", (d, i) => `translate(0, ${i * 100})`);

        levelGroups.selectAll("circle")
            .data(d => d[1])
            .enter()
            .append("circle")
            .attr("cx", (d, i) => i * 100)
            .attr("cy", 50)
            .attr("r", 20)
            .attr("fill", "orange");

        levelGroups.selectAll("text")
            .data(d => d[1])
            .enter()
            .append("text")
            .attr("x", (d, i) => i * 100)
            .attr("y", 50)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .text(d => d);
    }
}