import { useState, useEffect } from "react";
import axios from "axios";
import Papa from "papaparse";

const payload = {
  id: "",
  key: "",
  self: "",
  fields: {
    customfield_10016: "",
    summary: "",
    issueType: {
      self: "",
      id: "",
      description: "",
      iconUrl: "",
      name: "",
      subtask: false,
      avatarId: 0,
      entityId: "",
      hierarchyLevel: 0,
    },
    description: "",
    priority: {
      self: "",
      iconUrl: "",
      name: "",
      id: "",
    },
    updated: "",
    labels: [],
    status: {
      self: "",
      description: "",
      iconUrl: "",
      name: "",
      id: "",
    },
  },
  _id: "",
};

const useSustainabilityBacklog = (projectKey) => {
  const [sustainabilityBacklog, setSustainabilityBacklog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropTargetIndex, setDropTargetIndex] = useState(null);
  const [dropTargetList, setDropTargetList] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState("details");
  const [importMode, setImportMode] = useState("backlog");
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [manualIssue, setManualIssue] = useState({
    summary: "",
    description: "",
    priority: "Medium",
    storyPoints: "",
  });

  // Fetch sustainabilityBacklog from the backend
  useEffect(() => {
    if (projectKey) {
      const fetchSustainabilityBacklog = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${
              process.env.REACT_APP_BACKEND_URL || "http://localhost:3001"
            }/api/project/${projectKey}/sustainability-backlog`,
            { withCredentials: true }
          );
          setSustainabilityBacklog(response.data || []);
          setError(null);
        } catch (err) {
          setError(
            err.response?.data?.message ||
              "Error fetching sustainability backlog"
          );
        } finally {
          setLoading(false);
        }
      };
      fetchSustainabilityBacklog();
    }
  }, [projectKey]);

  // Update sustainabilityBacklog in the backend whenever it changes
  const updateSustainabilityBacklog = async (
    sustainabilityBacklog,
    projectKey
  ) => {
    if (!projectKey || sustainabilityBacklog.length === 0) return;

    try {
      await axios.put(
        `${
          process.env.REACT_APP_BACKEND_URL || "http://localhost:3001"
        }/api/project/${projectKey}/sustainability-backlog`,
        { sustainabilityBacklog },
        { withCredentials: true }
      );
      setError(null);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error updating sustainability backlog";
      console.error("Update error:", errorMessage, err);
      setError(errorMessage);
    }
  };

  const handleDragStart = (e, item, sourceList) => {
    if (!isEditing) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData("text/plain", JSON.stringify({ item, sourceList }));
    setDraggedItem(item);
  };

  const handleDragEnter = (e, index, list) => {
    if (!isEditing) return;
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const dropIndex =
      e.clientY < rect.top + rect.height / 2 ? index : index + 1;
    setDropTargetIndex(dropIndex);
    setDropTargetList(list);
  };

  const handleDragLeave = (e) => {
    if (!isEditing) return;
    e.preventDefault();
    setDropTargetIndex(null);
    setDropTargetList(null);
  };

  const handleDragOver = (e) => {
    if (!isEditing) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetList, backlog, setBacklog) => {
    if (!isEditing) return;
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      const { item, sourceList } = data;
      const dropIndex =
        dropTargetIndex !== null
          ? dropTargetIndex
          : targetList === "backlog"
          ? backlog.length
          : sustainabilityBacklog.length;

      if (sourceList === targetList) {
        const list = sourceList === "backlog" ? backlog : sustainabilityBacklog;
        const newList = [...list];
        const currentIndex = newList.findIndex((i) => i.id === item.id);
        newList.splice(currentIndex, 1);
        newList.splice(dropIndex, 0, item);
        sourceList === "backlog"
          ? setBacklog(newList)
          : setSustainabilityBacklog(newList);
      } else {
        if (sourceList === "backlog" && targetList === "sustainability") {
          setBacklog(backlog.filter((i) => i.id !== item.id));
          setSustainabilityBacklog([
            ...sustainabilityBacklog.slice(0, dropIndex),
            item,
            ...sustainabilityBacklog.slice(dropIndex),
          ]);
        } else if (
          sourceList === "sustainability" &&
          targetList === "backlog"
        ) {
          setSustainabilityBacklog(
            sustainabilityBacklog.filter((i) => i.id !== item.id)
          );
          setBacklog([
            ...backlog.slice(0, dropIndex),
            item,
            ...backlog.slice(dropIndex),
          ]);
        }
      }
    } catch (err) {
      console.error("Error handling drop:", err);
      setError("Error handling drop operation");
    }
    setDraggedItem(null);
    setDropTargetIndex(null);
    setDropTargetList(null);
  };

  const handleViewDetails = (issue) => {
    setSelectedIssue(issue);
    setDialogMode("details");
    setOpenDialog(true);
  };

  const handleAddToSustainability = (issue) => {
    if (!sustainabilityBacklog.some((item) => item.id === issue.id)) {
      setSustainabilityBacklog([...sustainabilityBacklog, issue]);
    }
  };

  const handleRemoveFromSustainability = (issue) => {
    setSustainabilityBacklog(
      sustainabilityBacklog.filter((i) => i.id !== issue.id)
    );
  };

  const handleManualImport = (backlog, setBacklog) => {
    if (!manualIssue.summary) return;
    const issue = {
      ...payload,
      id: `manual-${Date.now()}`,
      key: `MANUAL-${Date.now()}`,
      fields: {
        ...payload.fields,
        summary: manualIssue.summary,
        description: manualIssue.description,
        priority: { name: manualIssue.priority },
        customfield_10016: manualIssue.storyPoints
          ? parseInt(manualIssue.storyPoints)
          : null,
        updated: new Date().toISOString(),
      },
    }
    setBacklog([...backlog, issue]);
    setManualIssue({
      summary: "",
      description: "",
      priority: "Medium",
      storyPoints: "",
    });
  };

  const handleFileImport = (event, backlog, setBacklog, setError) => {
    const file = event.target.files[0];

    // check for file type (valid json or csv)
    if (
      !file ||
      (file.type !== "application/json" && file.type !== "text/csv")
    ) {
      alert("Please upload a valid JSON or CSV file.");
      return;
    }

    if (file.type === "text/csv") {
      // Parse CSV file
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const issues = results.data.map((row) => ({
            ...payload,
            id: `csv-${Date.now()}`,
            key: row.key || `CSV-${Date.now()}`,
            expand:
              "operations,versionedRepresentations,editmeta,changelog,renderedFields",
            self: "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10595",
            fields: {
              ...payload.fields,
              summary: row.summary || "",
              description: row.description || "",
              priority: { name: row.priority || "Medium" },
              customfield_10016: row.storyPoints
                ? parseInt(row.storyPoints)
                : null,
              updated: new Date().toISOString(),
            },
          }));
          // merge backlog with parsed issues
          const updatedBacklog = [...backlog, ...issues];

          setBacklog(updatedBacklog);
        },
        error: (error) => {
          setError(`Error parsing CSV file: ${error.message}`);
        },
      });
    }else if (file.type === "application/json") {
      // Parse JSON file
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          if (!Array.isArray(jsonData)) {
            throw new Error("JSON data must be an array of issues.");
          }
          const issues = jsonData.map((item) => ({
            ...payload,
            id: item.id || `json-${Date.now()}`,
            key: item.key || `JSON-${Date.now()}`,
            fields: {
              ...payload.fields,
              summary: item.summary || "",
              description: item.description || "",
              priority: { name: item.priority || "Medium" },
              customfield_10016: item.storyPoints
                ? parseInt(item.storyPoints)
                : null,
              updated: new Date().toISOString(),
            },
          }));
          // merge backlog with parsed issues
          const updatedBacklog = [...backlog, ...issues];
          setBacklog(updatedBacklog);
        } catch (error) {
          setError(`Error parsing JSON file: ${error.message}`);
        }
      };
      reader.readAsText(file);
    }
  };

  return {
    sustainabilityBacklog,
    setSustainabilityBacklog,
    loading,
    error,
    isEditing,
    setIsEditing,
    draggedItem,
    dropTargetIndex,
    dropTargetList,
    openDialog,
    setOpenDialog,
    dialogMode,
    setDialogMode,
    importMode,
    setImportMode,
    selectedIssue,
    setSelectedIssue,
    manualIssue,
    setManualIssue,
    handleDragStart,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleViewDetails,
    handleAddToSustainability,
    handleRemoveFromSustainability,
    handleManualImport,
    handleFileImport,
    updateSustainabilityBacklog,
  };
};

export default useSustainabilityBacklog;
