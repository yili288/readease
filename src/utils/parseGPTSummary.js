export default function parseGPTSummary(GPTsummary) {
    const points = GPTsummary.split('\n').map(point => point.trim()).filter(point => point !== "");

    const parsedResult = {};
    points.forEach((point, index) => {
        parsedResult[`point_${index + 1}`] = point.substring(2).trim();
    });

    return parsedResult;
}