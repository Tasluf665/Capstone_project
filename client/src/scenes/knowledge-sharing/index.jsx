import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  TextField,
  Button,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  InputAdornment,
  Tooltip,
  Chip,
} from "@mui/material";
import {
  PhotoCamera,
  Delete,
  Favorite,
  FavoriteBorder,
  Share,
  Search,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { $user } from "store/user";
import { useStore } from "@nanostores/react";
import useAuth from "../../hooks/useAuth";
import useBacklog from "../../hooks/useBacklog";
import secureLocalStorage from "react-secure-storage";
import jwtEncode from "jwt-encode";
import profileImage from "assets/profile.jpeg";

const newPostInitialState = {
  title: "",
  content: "",
  videos: [],
  images: [],
  project: "",
};

const KnowledgeSharing = () => {
  const { authenticated } = useAuth();
  const { userProjects, loading: backlogLoading } = useBacklog(
    authenticated,
    null
  ); // Fetch existing projects
  const [posts, setPosts] = useState([]);
  const user = useStore($user);
  const [video, setVideo] = useState("");
  const [newPost, setNewPost] = useState({ ...newPostInitialState });
  const [filter, setFilter] = useState({
    author: "all",
    project: "all",
    department: "all",
  });
  const [tabValue, setTabValue] = useState(0);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const theme = useTheme();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPost({
        ...newPost,
        images: [...newPost.images, URL.createObjectURL(file)],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate required fields
    if (!newPost.title || !newPost.content || !newPost.project) {
      alert("Please fill in all required fields.");
      return;
    }

    const token = jwtEncode(
      secureLocalStorage.getItem("session"),
      process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY
    );

    await axios
      .post(
        // f-string to dynamically set the backend URL
        `${
          process.env.REACT_APP_BACKEND_URL || "http://localhost:3002"
        }/api/social`,
        { ...newPost },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const postId = response.data.postId;
        const department = response.data.department || "IT";
        setPosts([
          ...posts,
          {
            ...newPost,
            _id: postId,
            uid: user.id,
            timestamp: new Date().toISOString(),
            comments: [],
            pp: user.photo || profileImage,
            name: user.name,
            last_name: user.lastName,
            department: department,
          },
        ]);
        setNewPost({ ...newPostInitialState }); // Reset new post state
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        alert("Error creating post. Please try again.");
      });

    /*;*/
  };

  const handleDelete = async (postId) => {
    const token = jwtEncode(
      secureLocalStorage.getItem("session"),
      process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY
    );
    await axios
      .delete(
        // f-string to dynamically set the backend URL
        `${
          process.env.REACT_APP_BACKEND_URL || "http://localhost:3002"
        }/api/social/${postId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setPosts(posts.filter((post) => post._id !== postId));
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
        alert("Error deleting post. Please try again.");
      });
  };

  const handleFavorite = async (postId) => {
    const token = jwtEncode(
      secureLocalStorage.getItem("session"),
      process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY
    );
    try {
      const response = await axios
        .post(
          `${
            process.env.REACT_APP_BACKEND_URL || "http://localhost:3002"
          }/api/social/like/${postId}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const updatedPosts = posts.map((post) => {
            if (post._id === postId) {
              const isLiked = post.likes.some((like) => like.uid === user.id);
              return {
                ...post,
                likes: isLiked
                  ? post.likes.filter((like) => like.uid !== user.id)
                  : [...post.likes, { uid: user.id }],
                likesCount: isLiked
                  ? post.likesCount - 1
                  : (post.likesCount || 0) + 1,
              };
            }
            return post;
          });
          setPosts(updatedPosts);
          return response.data;
        });
    } catch (error) {
      console.error("Error liking post:", error);
      alert("Error liking post. Please try again.");
    }
  };

  const handleShare = (post) => {
    setSelectedPost(post);
    setShareDialogOpen(true);
  };

  const handleCloseShareDialog = () => {
    setShareDialogOpen(false);
  };

  const handleCopyLink = () => {
    const link = `http://localhost:3000/knowledge-sharing/${selectedPost._id}`;
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  const handleEmailShare = () => {
    const subject = `Check out this post: ${selectedPost.title}`;
    const body = `I thought you might be interested in this post: ${selectedPost.content}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleAddComment = async (postId) => {
    if (newComment.trim()) {
      const token = jwtEncode(
        secureLocalStorage.getItem("session"),
        process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY
      );
      await axios
        .post(
          // f-string to dynamically set the backend URL
          `${
            process.env.REACT_APP_BACKEND_URL || "http://localhost:3002"
          }/api/social/comment/${postId}`,
          {
            content: newComment,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const updatedPosts = posts.map((post) => {
            if (post._id === postId) {
              return {
                ...post,
                comments: [
                  ...post.comments,
                  {
                    _id: response.data.commentId,
                    content: newComment,
                    uid: user.id,
                    name: user.name,
                    last_name: user.lastName,
                    department: response.data.department || "IT",
                    email: user.email || "",
                    pp:
                      user.photo ||
                      "https://upload.wikimedia.org/wikipedia/commons/8/83/Default-Icon.jpg",
                    timestamp: new Date().toISOString(),
                  },
                ],
              };
            }
            return post;
          });
          setPosts(updatedPosts);
          setNewComment(""); // Clear the comment input
        })
        .catch((error) => {
          console.error("Error adding comment:", error);
          alert("Error adding comment. Please try again.");
        });
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    const token = jwtEncode(
      secureLocalStorage.getItem("session"),
      process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY
    );
    await axios
      .delete(
        // f-string to dynamically set the backend URL
        `${
          process.env.REACT_APP_BACKEND_URL || "http://localhost:3002"
        }/api/social/comment/${postId}/${commentId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        const updatedPosts = posts.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              comments: post.comments.filter(
                (comment) => comment._id !== commentId
              ),
            };
          }
          return post;
        });
        setPosts(updatedPosts);
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
        alert("Error deleting comment. Please try again.");
      });
  };
  const handleAddVideo = () => {
    if (video.trim()) {
      setNewPost((prevPost) => ({
        ...prevPost,
        videos: [...prevPost.videos, video],
      }));
      setVideo("");
    }
  };

  const handleDeleteVideo = (index) => {
    setNewPost((prevPost) => ({
      ...prevPost,
      videos: prevPost.videos.filter((_, i) => i !== index),
    }));
  };

  const UserTooltip = ({ name, lastName, department, email }) => {
    return (
      <Box sx={{ p: 1 }}>
        <Typography variant="subtitle2">
          {name} {lastName}
        </Typography>

        <Typography variant="body2" sx={{ mb: 1 }}>
          Department: <b>{department}</b>
        </Typography>

        <Typography variant="body2" sx={{ mb: 1, color: "text.info" }}>
          {email}
        </Typography>
      </Box>
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          // f-string to dynamically set the backend URL
          `${
            process.env.REACT_APP_BACKEND_URL || "http://localhost:3002"
          }/api/social`
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Box sx={{ p: 3, maxWidth: "800px", margin: "0 auto" }}>
      <Paper
        sx={{
          p: 2,
          mb: 2,
          display: "flex",
          alignItems: "center",
          borderRadius: "12px",
        }}
      >
        <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>M</Avatar>
        <Typography variant="h6">Knowledge Sharing Feed</Typography>
      </Paper>
      <Tabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label="All Posts" />
        <Tab label="My Posts" />
      </Tabs>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2,
            // Background color for the TextField
            "& .MuiInputBase-root": {
              backgroundColor: theme.palette.primary.main, // Adapts to light/dark theme
              color: theme.palette.text.primary, // Text color adapts to theme
              borderRadius: "4px", // Optional: consistent border radius
            },
            // Border color for default state
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: theme.palette.divider, // Border adapts to theme
              },
              "&:hover fieldset": {
                borderColor: theme.palette.text.secondary, // Hover border adapts to theme
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.main, // Focus border uses primary color
              },
            },

            "& .MuiInputBase-input": {
              color: theme.palette.text.primary,
              marginTop: 0,
              backgroundColor: theme.palette.primary.main,
            },
            // Placeholder text color
            "& .MuiInputBase-input::placeholder": {
              color: theme.palette.primary.main, // Placeholder adapts to theme
              opacity: 1, // Ensure placeholder visibility
              backgroundColor: theme.palette.primary.main,
            },
          }}
        />
        {tabValue === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Filter by Author</InputLabel>
                <Select
                  value={filter.author}
                  onChange={(e) =>
                    setFilter({ ...filter, author: e.target.value })
                  }
                >
                  <MenuItem value="all">All</MenuItem>
                  {Array.from(new Set(posts.map((post) => post.author))).map(
                    (author) => (
                      <MenuItem key={author} value={author}>
                        {author}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Filter by Project</InputLabel>
                <Select
                  value={filter.project}
                  onChange={(e) =>
                    setFilter({ ...filter, project: e.target.value })
                  }
                >
                  <MenuItem value="all">All</MenuItem>
                  {Array.from(new Set(posts.map((post) => post.project))).map(
                    (project) => (
                      <MenuItem key={project} value={project}>
                        {project}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Filter by Department</InputLabel>
                <Select
                  value={filter.department}
                  onChange={(e) =>
                    setFilter({ ...filter, department: e.target.value })
                  }
                >
                  <MenuItem value="all">All</MenuItem>
                  {Array.from(
                    new Set(posts.map((post) => post.department))
                  ).map((department) => (
                    <MenuItem key={department} value={department}>
                      {department}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}
      </Box>
      <List>
        {posts.map((post) => (
          <ListItem key={post.id} sx={{ mb: 2 }}>
            <Card sx={{ width: "100%", borderRadius: "12px", boxShadow: 2 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    component="img"
                    alt="profile"
                    src={post.pp}
                    height="42px"
                    width="42px"
                    borderRadius="50%"
                    referrerPolicy="no-referrer"
                    sx={{ objectFit: "cover", mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">{post.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      <Tooltip
                        title={
                          <UserTooltip
                            name={post.name}
                            department={post.department}
                            lastName={post.last_name}
                          />
                        }
                        arrow
                        placement="top"
                      >
                        <span
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          {post.name} {post.last_name}
                        </span>
                      </Tooltip>
                      {" • "}
                      {post.project} • {post.department} •{" "}
                      {
                        // hide seconds
                        new Date(post.timestamp).toLocaleDateString("es-MX", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        }) +
                          " " +
                          new Date(post.timestamp).toLocaleTimeString("es-MX", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                      }
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
                  {post.content}
                </Typography>
                {post.videos.length > 0 &&
                  post.videos.map((video, index) => (
                    <Box sx={{ mb: 2 }} key={index}>
                      <iframe
                        width="100%"
                        height="315"
                        src={video}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ borderRadius: "8px" }}
                      />
                    </Box>
                  ))}
                {post.images.length > 0 &&
                  post.images.map((image, index) => (
                    <Box sx={{ mb: 2 }} key={index}>
                      <CardMedia
                        component="img"
                        image={image}
                        alt={`Post image ${index + 1}`}
                        sx={{ borderRadius: "8px" }}
                      />
                    </Box>
                  ))}

                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={() => handleFavorite(post._id)}>
                      {
                        // check if uid is in likes array [{uid}]
                        post.likes?.length > 0 &&
                        post.likes.some((like) => like.uid === user.id) ? (
                          <Favorite color="error" />
                        ) : (
                          <FavoriteBorder />
                        )
                      }
                    </IconButton>
                    <Typography variant="body2" sx={{ mr: 0.5 }}>
                      {post.likesCount || 0}
                    </Typography>
                    <IconButton onClick={() => handleShare(post)}>
                      <Share />
                    </IconButton>
                    {(post.uid === user.id || user.role === "admin") && (
                      <IconButton onClick={() => handleDelete(post._id)}>
                        <Delete />
                      </IconButton>
                    )}
                  </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Comments
                  </Typography>
                  {post.comments.map((comment) => (
                    <Box
                      key={comment._id}
                      sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}
                    >
                      <Box
                        component="img"
                        alt="profile"
                        src={comment.pp || profileImage}
                        height="42px"
                        width="42px"
                        borderRadius="50%"
                        referrerPolicy="no-referrer"
                        sx={{ objectFit: "cover", mr: 2 }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Tooltip
                            title={
                              <UserTooltip
                                name={comment.name}
                                last_name={comment.last_name}
                                department={comment.department}
                                email={comment.email}
                              />
                            }
                            arrow
                            placement="top"
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                            >
                              {comment.name} {comment.last_name}
                            </Typography>
                          </Tooltip>
                          {(post.uid === user.id || user.role === "admin") && (
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleDeleteComment(post._id, comment._id)
                              }
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          )}
                        </Box>
                        <Typography variant="body2">
                          {comment.content}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {
                            // hide seconds
                            new Date(comment.timestamp).toLocaleDateString(
                              "es-MX",
                              {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                              }
                            ) +
                              " " +
                              new Date(comment.timestamp).toLocaleTimeString(
                                "es-MX",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )
                          }
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <Box
                      component="img"
                      alt="profile"
                      src={
                        user.photo ||
                        "https://upload.wikimedia.org/wikipedia/commons/8/83/Default-Icon.jpg"
                      }
                      height="42px"
                      width="52px"
                      borderRadius="50%"
                      referrerPolicy="no-referrer"
                      sx={{ objectFit: "cover", mr: 2 }}
                    />
                    <TextField
                      fullWidth
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      size="small"
                      sx={{
                        mr: 1,
                        // Background color for the TextField
                        "& .MuiInputBase-root": {
                          backgroundColor: theme.palette.primary.main, // Adapts to light/dark theme
                          color: theme.palette.text.primary, // Text color adapts to theme
                          borderRadius: "4px", // Optional: consistent border radius
                        },
                        // Border color for default state
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: theme.palette.divider, // Border adapts to theme
                          },
                          "&:hover fieldset": {
                            borderColor: theme.palette.text.secondary, // Hover border adapts to theme
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: theme.palette.primary.main, // Focus border uses primary color
                          },
                        },

                        "& .MuiInputBase-input": {
                          color: theme.palette.text.primary,
                          marginTop: 0,
                          backgroundColor: theme.palette.primary.main,
                        },
                        // Placeholder text color
                        "& .MuiInputBase-input::placeholder": {
                          color: theme.palette.secondary.main, // Placeholder adapts to theme
                          opacity: 1, // Ensure placeholder visibility
                          backgroundColor: theme.palette.primary.main,
                        },
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={() => handleAddComment(post._id)}
                      disabled={!newComment.trim()}
                    >
                      Post
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
      <Dialog open={shareDialogOpen} onClose={handleCloseShareDialog}>
        <DialogTitle>Share Post</DialogTitle>
        <DialogContent>
          <Typography>Share this post via email or copy the link.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEmailShare}>Email</Button>
          <Button onClick={handleCopyLink}>Copy Link</Button>
          <Button onClick={handleCloseShareDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Paper sx={{ p: 2, mt: 2, borderRadius: "12px" }}>
        <Typography variant="h6" gutterBottom>
          Add a New Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Content"
            name="content"
            value={newPost.content}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Project</InputLabel>
            <Select
              name="project"
              value={newPost.project}
              onChange={handleInputChange}
            >
              {userProjects.map((project) => (
                <MenuItem key={project.key} value={project.projectName}>
                  {project.projectName || "Unnamed Project"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="media-upload"
              type="file"
              onChange={handleMediaChange}
            />
            <label htmlFor="media-upload">
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
            <Typography variant="body2" sx={{ ml: 1 }}>
              {newPost.images.length > 0 ? "Media uploaded" : "Upload media"}
            </Typography>

            {/* display thumbnail */}
          </Box>
          {newPost.images.length > 0 && (
            <Box sx={{ display: "flex", mt: 3, gap: 1 }}>
              {newPost.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Uploaded thumbnail ${index}`}
                  style={{
                    width: "100px",
                    objectFit: "contain",
                    borderRadius: "4px",
                    mr: 1,
                  }}
                />
              ))}
            </Box>
          )}
          {/* box for youtube list video */}
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="YouTube Video URL"
              name="video"
              value={video}
              onChange={(e) => setVideo(e.target.value)}
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddVideo}
              sx={{ mt: 2 }}
            >
              Add Video
            </Button>
            <Box sx={{ mt: 2 }}>
              {newPost.videos.map((vid, index) => (
                <Chip
                  key={index}
                  label={vid}
                  onDelete={() => handleDeleteVideo(index)}
                  sx={{ mr: 1 }}
                />
              ))}
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default KnowledgeSharing;
