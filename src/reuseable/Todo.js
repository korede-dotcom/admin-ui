import React, { useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchAndSelect from "./SelectSearch";
import { useMutation } from "@tanstack/react-query"; 
import { useQuery } from '@tanstack/react-query';
import { getAllUsers,CreateTodo,getAllTodos } from "services/Dashboard";
import {formatUserSearch} from "reuseable/formatSearch"

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  addButton: {
    marginTop: theme.spacing(2),
  },
  listItemText: {
    textDecoration: (props) => (props.completed ? "line-through" : "none"),
  },
}));

const TodoList = () => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [Users, setUsers] = useState([]);
  const [getTodos, setTodos] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [copyState, setCopyState] = useState('');
  
  console.log("🚀 ~ file: Todo.js:55 ~ getTodos:", getTodos)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assigned_to:"",
  });
  console.log("🚀 ~ file: Todo.js:62 ~ newTask:", newTask)

    const selectChnages = (selectedOption) => {
        setNewTask(prev => {
         return{
            ...prev,
            assigned_to:selectedOption.value
         }   
    });
  };



  const { mutate, isLoading,isError} = useMutation({
    mutationFn: CreateTodo,
    onSuccess: (data) => {
      console.log("🚀 ~ file: index.js:127 ~ data:", data)
      
    }  
    });


  const {test} = useQuery({
  
    queryKey:['getAllUsers'],
    queryFn: () => getAllUsers(),
    onSuccess:(d) => {
        console.log("🚀 ~ file: Todo.js:245 ~ d:", d)
        setUsers(d?.data?.users)
    }
    // onError: (err) => {
   
  });
    useQuery({
  
    queryKey:['getAllTodos'],
    queryFn: () => getAllTodos(),
    onSuccess:(d) => {
        console.log("🚀 ~ file: Todo.js:245 ~ d:", d)
        setTodos(d)
    }
    // onError: (err) => {
   
  });

  const useUser = formatUserSearch(Users)

  const handleNewTaskChange = (event) => {
    setNewTask({
      ...newTask,
      [event.target.name]: event.target.value,
    });
  };
  const handleOldTaskChange = (event) => {
    setNewTask({
      ...newTask,
      [event.target.name]: event.target.value,
    });
  };

  const handleNewTaskSubmit = () => {
    mutate(newTask)

    // setTasks([...tasks, newTask]);
    setOpen(false);
    // setNewTask({
    //   name: "",
    //   description: "",
    //   completed: false,
    //   image: "",
    // });
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };


  const handleEditTask = (index) => {
    // setSelectedTask(index);
    // setNewTask(getTodos[index]);
    // setEditMode(true);
   
        // setCopyState(getTodos.filter((_, i) => i === index))
        setCopyState(getTodos[index]);
    
        
        setOpen2(true);
    };
    console.log("🚀 ~ file: Todo.js:142 ~ handleEditTask ~ setTodos:", copyState)

//   const handleTaskCompletion = (index) => {
//     const newTasks = [...tasks];
//     newTasks[index] = {
//       ...newTasks[index],
//       completed: !newTasks[index].completed,
//     };
//     setTasks(newTasks);
//   };
  

  const handleEditSubmit = () => {
    const newTasks = [...tasks];
    newTasks[selectedTask] = newTask;
    setTasks(newTasks);
    setOpen(false);
    setEditMode(false);
    setSelectedTask(null);
    setNewTask({
      name: "",
      description: "",
      completed: false,
      image: "",
    });
  };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = (event) => {
//       setNewTask({
//         ...newTask,
//         image: event.target.result,
//       });
//     };
//   };



  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography variant="h6">Todo List</Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={() => setOpen(true)}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Grid>
      </Grid>
      <List>
        {getTodos && getTodos.map((task, index) => (
          <ListItem key={index} divider>
            <ListItemAvatar>
              <Checkbox
                checked={task?.completed}
                // onChange={() => handleTaskCompletion(index)}
                />
                </ListItemAvatar>
                <ListItemText
                           primary={task?.title}
                           secondary={task?.description}
                           className={classes.listItemText}
                         />
                <ListItemSecondaryAction>
                <IconButton onClick={() => handleEditTask(index)}>
                {/* <EditIcon /> */}
                <p style={{fontWeight:"lighter",fontSize:"10px",color:"blue"}}>assigned to {task.user.name} </p>
                </IconButton>
                <IconButton onClick={() => handleDeleteTask(index)}>
                <DeleteIcon />
                </IconButton>
                </ListItemSecondaryAction>
                </ListItem>
                ))}
                </List>
                <Modal open={open} onClose={() => setOpen(false)}>
                <div className={classes.paper}>
                <Typography variant="h6" gutterBottom>
                {editMode ? "Edit Task" : "New Task"}
                </Typography>
                <TextField
                         label="title"
                         name="title"
                         onChange={handleNewTaskChange}
                         fullWidth
                         margin="normal"
                         autoFocus
                       />
                <TextField
                         label="Description"
                         name="description"
                         onChange={handleNewTaskChange}
                         fullWidth
                         margin="normal"
                       />
                {/* <FormControlLabel
                control={
                // <Checkbox
                // checked={newTask.completed}
                // onChange={(event) =>
                // setNewTask({
                // ...newTask,
                // completed: event.target.checked,
                // })
                // }
                // />
                }
                label="Completed"
                margin="normal"
                /> */}
                <SearchAndSelect users={useUser} handleChange={selectChnages}/>
                {/* <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ marginTop: "16px" }}
                /> */}
                {/* {newTask.image && (
                <img
                src={newTask.image}
                alt="task"
                style={{ width: "100%", marginTop: "16px" }}
                />
                )} */}
                <Button
                variant="contained"
                color="primary"
                onClick={handleNewTaskSubmit}
                // onClick={editMode ? handleEditSubmit : handleNewTaskSubmit}
                className={classes.addButton}
                >
                {editMode ? "Save" : "Add"}
                </Button>
                </div>
                </Modal>

                <Modal open={open2} onClose={() => setOpen2(false)}>
                <div className={classes.paper}>
                <Typography variant="h6" gutterBottom>
                {editMode ? "Edit Task" : "New Task"}
                </Typography>
                <TextField
                         label="title"
                         name="title"
                        //  value={copyState.title || ''}
                         onChange={handleOldTaskChange}
                         fullWidth
                         margin="normal"
                         autoFocus
                       />
                <TextField
                         label="Description"
                         name="description"
                        //  value={copyState.description || ''}
                         onChange={handleOldTaskChange}
                         fullWidth
                         margin="normal"
                       />
                {/* <FormControlLabel
                control={
                // <Checkbox
                // checked={newTask.completed}
                // onChange={(event) =>
                // setNewTask({
                // ...newTask,
                // completed: event.target.checked,
                // })
                // }
                // />
                }
                label="Completed"
                margin="normal"
                /> */}
                <SearchAndSelect users={useUser} handleChange={selectChnages}/>
                {/* <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ marginTop: "16px" }}
                /> */}
                {/* {newTask.image && (
                <img
                src={newTask.image}
                alt="task"
                style={{ width: "100%", marginTop: "16px" }}
                />
                )} */}
                <Button
                variant="contained"
                color="primary"
                onClick={handleNewTaskSubmit}
                // onClick={editMode ? handleEditSubmit : handleNewTaskSubmit}
                className={classes.addButton}
                >
                {editMode ? "Save" : "Add"}
                </Button>
                </div>
                </Modal>
                </div>
                );
                };
                
                export default TodoList;
