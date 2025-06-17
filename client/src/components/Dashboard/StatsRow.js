import React from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { StatBox } from "components";
import {
    AssignmentTurnedIn,
    Nature,
    Update,
    BarChart,
} from "@mui/icons-material";

const StatsRow = ({ totalStoryPoints, totalSustainabilityBacklog, recentlyUpdated }) => {
    const theme = useTheme();
    const isNonMediumScreen = useMediaQuery("(min-width: 1200px)");

    return (
        <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="160px"
            gap="20px"
            sx={{
                "& > div": {
                    gridColumn: isNonMediumScreen ? undefined : "span 12",
                },
            }}
        >
            <StatBox
                title="Total Story Points"
                value={totalStoryPoints}
                description="In sustainability backlog"
                icon={
                    <AssignmentTurnedIn
                        sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                    />
                }
            />
            <StatBox
                title="Sustainability Backlog"
                value={totalSustainabilityBacklog}
                description="Total unique tasks"
                icon={
                    <Nature
                        sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                    />
                }
            />
            <StatBox
                title="Recently Updated"
                value={recentlyUpdated}
                description="Tasks updated in last 7 days"
                icon={
                    <Update
                        sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                    />
                }
            />
        </Box>
    );
};

export default StatsRow;