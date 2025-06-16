import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";

const MonthlyImpactChart = ({ data }) => {
    const theme = useTheme();

    return (
        <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={theme.palette.background.alt}
            p="1.5rem"
            borderRadius="0.55rem"
        >
            <Typography variant="h6" sx={{ color: theme.palette.secondary[100], mb: "1rem" }}>
                Task Update Trend
            </Typography>
            <Box height="260px">
                <ResponsiveLine
                    data={data}
                    theme={{
                        axis: {
                            domain: { line: { stroke: theme.palette.secondary[200] } },
                            legend: { text: { fill: theme.palette.secondary[200], fontSize: 14 } },
                            ticks: { line: { stroke: theme.palette.secondary[200], strokeWidth: 1 }, text: { fill: theme.palette.secondary[200] } },
                        },
                        legends: { text: { fill: theme.palette.secondary[200], fontSize: 14 } },
                        tooltip: { container: { color: theme.palette.primary.main } },
                    }}
                    margin={{ top: 20, right: 40, bottom: 100, left: 60 }}
                    xScale={{ type: "point" }}
                    yScale={{ type: "linear", min: 0, max: "auto", stacked: false, reverse: false }}
                    curve="catmullRom"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: "bottom",
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Month",
                        legendOffset: 36,
                        legendPosition: "middle",
                    }}
                    axisLeft={{
                        orient: "left",
                        tickValues: 5,
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Number of Updates",
                        legendOffset: -40,
                        legendPosition: "middle",
                    }}
                    enableGridX={false}
                    enableGridY={false}
                    pointSize={10}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[]}
                />
            </Box>
        </Box>
    );
};

export default MonthlyImpactChart;