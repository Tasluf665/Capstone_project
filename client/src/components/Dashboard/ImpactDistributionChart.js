import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";

const ImpactDistributionChart = ({ data }) => {
    const theme = useTheme();

    return (
        <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={theme.palette.background.alt}
            p="1.5rem"
            borderRadius="0.55rem"
        >
            <Typography variant="h6" sx={{ color: theme.palette.secondary[100], mb: "1rem" }}>
                Priority Distribution
            </Typography>
            <Box height="260px">
                <ResponsivePie
                    data={data}
                    theme={{
                        axis: { domain: { line: { stroke: theme.palette.secondary[200] } } },
                        legends: { text: { fill: theme.palette.secondary[200], fontSize: 14 } },
                        tooltip: { container: { color: theme.palette.primary.main } },
                    }}
                    margin={{ top: 20, right: 40, bottom: 100, left: 40 }}
                    innerRadius={0.65}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor={theme.palette.secondary[200]}
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: "color" }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
                    arcLabel={d => `${d.value}`}
                />
            </Box>
        </Box>
    );
};

export default ImpactDistributionChart;