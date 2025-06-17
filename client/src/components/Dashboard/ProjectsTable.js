import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DataGridCustomToolbar } from "components";

const ProjectsTable = ({ rows }) => {
    console.log(rows);
    const theme = useTheme();

    const columns = [
        {
            field: "key",
            headerName: "Task ID",
            flex: 1,
        },
        {
            field: "summary",
            headerName: "Summary",
            flex: 2,
        },
        {
            field: "priority",
            headerName: "Priority",
            flex: 1,
            renderCell: (params) => (
                <Box
                    sx={{
                        backgroundColor:
                            params.value === "High" ? theme.palette.error.main :
                                params.value === "Medium" ? theme.palette.warning.main :
                                    theme.palette.info.main,
                        padding: "4px 8px",
                        borderRadius: "4px",
                        color: "white",
                    }}
                >
                    {params.value}
                </Box>
            ),
        },
        {
            field: "storyPoints",
            headerName: "Story Points",
            flex: 1,
        },
        {
            field: "updated",
            headerName: "Last Updated",
            flex: 1,
            valueFormatter: (params) => {
                return new Date(params.value).toLocaleDateString();
            },
        },
        {
            field: "labels",
            headerName: "Labels",
            flex: 1,
            valueFormatter: (params) => {
                return params.value?.join(", ") || "No labels";
            },
        },
    ];

    return (
        <Box
            mt="20px"
            height="400px"
            sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: theme.palette.background.light,
                },
                "& .MuiDataGrid-footerContainer": {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderTop: "none",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${theme.palette.secondary[200]} !important`,
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row._id}
                components={{
                    Toolbar: DataGridCustomToolbar,
                }}
            />
        </Box>
    );
};

export default ProjectsTable; 