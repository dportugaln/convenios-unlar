import React from "react";
import { useSelector } from "react-redux";
import { Grid, Paper, Box, Card, CardContent, Typography } from '@mui/material';
import ToDoImg from '../../assets/images/todo.png';
import FetchlistImg from '../../assets/images/fetchlist.png';
import { appSelector } from "../../redux/AppRedux";

const Dashboard = () => {

    const redirectToTodo = () => {
        window.location.href = "/todo";
    };

    const redirectToFetchlist = () => {
        window.location.href = "/fetchlist";
    };

    const todoList = useSelector(appSelector.todo);

    const completedTasks = todoList.filter(task => task.completed).length;
    const pendingTasks = todoList.length - completedTasks;

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                    <Box>
                        Dashboard
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Card style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" style={{ marginRight: '10px' }}>
                            Convenios firmados: {completedTasks}/{todoList.length}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" style={{ marginRight: '10px' }}>
                            Convenios pendientes: {pendingTasks}/{todoList.length}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card onClick={redirectToTodo} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" style={{ marginRight: '10px' }}>
                            Todo
                        </Typography>
                        <img src={ToDoImg} style={{ maxWidth: '30px' }} alt="Todo" />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card onClick={redirectToFetchlist} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" style={{ marginRight: '10px' }}>
                            Fechlist
                        </Typography>
                        <img src={FetchlistImg} style={{ maxWidth: '30px' }} alt="Fetchlist" />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
