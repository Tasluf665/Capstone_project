import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";

const ResourceUsageChart = ({ data }) => {
    const theme = useTheme();

    return (
        <Box
            gridColumn="span 12"
            gridRow="span 2"
            backgroundColor={theme.palette.background.alt}
            p="1.5rem"
            borderRadius="0.55rem"
            alt='A bar chart titled "Resource Usage Comparison" compares usage percentages across four resource types: CPU Usage, Memory Usage, Network Traffic, and Storage Usage. The x-axis lists the resource types, while the y-axis represents usage percentage. Each resource type has two bars: a beige bar labeled "Before" and a red bar labeled "After," showing a reduction in usage for each category after a change.'
        >
            <Typography variant="h6" sx={{ color: theme.palette.secondary[100], mb: "1rem" }}>
                Resource Usage Comparison
            </Typography>
            <Box height="260px">
                <ResponsiveBar
                    data={data}
                    theme={{
                        axis: {
                            domain: {
                                line: {
                                    stroke: theme.palette.secondary[200],
                                },
                            },
                            legend: {
                                text: {
                                    fill: theme.palette.secondary[200],
                                    fontSize: 14,
                                },
                            },
                            ticks: {
                                line: {
                                    stroke: theme.palette.secondary[200],
                                    strokeWidth: 1,
                                },
                                text: {
                                    fill: theme.palette.secondary[200],
                                },
                            },
                        },
                        legends: {
                            text: {
                                fill: theme.palette.secondary[200],
                                fontSize: 14,
                            },
                        },
                        tooltip: {
                            container: {
                                color: theme.palette.primary.main,
                            },
                        },
                    }}
                    margin={{ top: 20, right: 40, bottom: 100, left: 60 }}
                    keys={["before", "after"]}
                    indexBy="category"
                    padding={0.3}
                    valueScale={{ type: "linear" }}
                    indexScale={{ type: "band", round: true }}
                    colors={{ scheme: "nivo" }}
                    borderColor={{
                        from: "color",
                        modifiers: [["darker", 1.6]],
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Resource Type",
                        legendPosition: "middle",
                        legendOffset: 32,
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Usage Percentage",
                        legendPosition: "middle",
                        legendOffset: -40,
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{
                        from: "color",
                        modifiers: [["darker", 1.6]],
                    }}
                    legends={[
                        {
                            dataFrom: "keys",
                            anchor: "bottom",
                            direction: "row",
                            justify: false,
                            translateX: 0,
                            translateY: 80,
                            itemsSpacing: 20,
                            itemWidth: 60,
                            itemHeight: 20,
                            itemDirection: "left-to-right",
                            itemOpacity: 1,
                            symbolSize: 16,
                            itemBackground: "none",
                            itemTextColor: theme.palette.secondary.light,
                            itemBorderRadius: 12,
                            itemPadding: 4,
                            effects: [],
                            style: {
                                fontSize: 11,
                                fontWeight: 'bold',
                            },
                        },
                    ]}
                />
            </Box>
        </Box>
    );
};

export default ResourceUsageChart;