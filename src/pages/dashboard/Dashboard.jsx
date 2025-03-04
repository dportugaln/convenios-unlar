import React from "react";
import { useSelector } from "react-redux";
import { Grid, Card, CardContent, Typography, Divider } from '@mui/material';
import { appSelector } from "../../redux/AppRedux";

import '../../App.css'; // Import a CSS file for your animations

const headingStyle = {
    textAlign: "center",
    color: "white",
    marginTop: "10px", // Adjust the top margin to center vertically
    fontWeight: 'bold',
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
};

const Dashboard = () => {
    const redirectToUNLaR = () => {
        window.location.href = "https://www.unlar.edu.ar";
    };

    const redirectToFetchlist = () => {
        window.location.href = "/listado";
    };

    const todoList = useSelector(appSelector.todo);

    const completedTasks = todoList.filter(task => task.completed).length;
    const pendingTasks = todoList.length - completedTasks;

    return (
        <Grid container spacing={10} className="animated-container">
            {/* Heading */}
            <Grid item xs={12}>
            <Typography variant="h2" gutterBottom style={headingStyle}>
                    PACTO
                </Typography>
                <Divider style={{ backgroundColor: "white", height: 2, margin:"0 auto" }}/>
                <Typography variant="h4" style={headingStyle}>
                    Universidad Nacional de La Rioja
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Card className="animated-card">
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Bienvenidos a la Plataforma de Administración de Convenios para la Transparencia Organizacional de la UNLaR
                        </Typography>
                        <Typography>
                        Esta plataforma está diseñada para promover la transparencia institucional y brindar acceso a valiosas
                        oportunidades. Aquí podrá explorar y conocer los convenios públicamente, fortaleciendo así nuestra comunidad universitaria.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

{/*             <Grid item xs={6} className="animated-grid">
                <Card style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" style={{ marginRight: '10px' }}>
                            Convenios firmados: {completedTasks}/{todoList.length}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} className="animated-grid">
                <Card style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" style={{ marginRight: '10px' }}>
                            Convenios pendientes: {pendingTasks}/{todoList.length}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid> */}
            <Grid item xs={6} className="animated-grid">
                <Card onClick={redirectToFetchlist} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" style={{ marginRight: '10px' }}>
                            Listado de convenios
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6} className="animated-grid">
                <Card onClick={redirectToUNLaR} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" style={{ marginRight: '10px' }}>
                            Página de UNLaR
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
