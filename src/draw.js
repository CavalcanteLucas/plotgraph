import * as d3 from "d3";
import { TreeNode } from "./tree.js";

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
        this.tree = new TreeNode();;
    }

    clearDrawGroup() {
        this.svg.selectAll("#draw-group-inner").selectAll("*").remove();
    }

    clear() {
        this.clearDrawGroup();
        this.tree = new TreeNode();
    }

    insert(value) {
        this.tree.insert(Number(value));
    }

    delete(value) {
        this.tree.delete(Number(value));
    }

    drawByLevel() {
        const self = this;
        this.clearDrawGroup();
        const treeByLevel = this.tree.printByLevel();
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
            .attr("class", function (_, nodeIndex) {
                const level = d3.select(this.parentNode).datum()[0];
                const lvl = Number(level);
                return `node-${lvl}-${nodeIndex}`;
            })
            .attr("cx", function (_, nodeIndex) {
                const level = d3.select(this.parentNode).datum()[0];
                const lvl = Number(level);
                const levelWidth = width / (2 ** lvl);
                return levelWidth / 2 + nodeIndex * levelWidth;
            })
            .attr("cy", 50)
            .attr("r", 20)
            .attr("fill", d => d === null ? "transparent" : "orange")
            .attr("stroke", d => d === null ? "transparent" : "black")
            .on("click", function (event, d) {
                if (d === null) return;
                const nodeClass = d3.select(this).attr("class");
                const index = nodeClass.split("-")[2];
                const level = nodeClass.split("-")[1];
                console.log("Clicked node:", nodeClass, "at level:", level, "with index:", index, "and value:", d);
                console.log(self.tree);
                self.tree.delete(d);
                self.drawByLevel();
            })
            .on("mouseover", function (event, d) {
                if (d === null) return;
                d3.select(this).attr("fill", "coral");
            })
            .on("mouseout", function (event, d) {
                if (d === null) return;
                d3.select(this).attr("fill", "orange");
            });

        levelGroups.selectAll("text")
            .data(d => d[1])
            .enter()
            .append("text")
            .attr("x", function (_, nodeIndex) {
                const level = d3.select(this.parentNode).datum()[0];
                const levelWidth = width / (2 ** Number(level));
                return levelWidth / 2 + nodeIndex * levelWidth;
            }).attr("y", 50)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("class", "node-text")
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