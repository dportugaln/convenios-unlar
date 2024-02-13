import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setTitle } from '../../redux/appRedux';
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Divider } from '@mui/material';

import '../../App.css';

const headingStyle = {
    textAlign: "center",
    color: "white",
    marginTop: "10px",
    fontWeight: 'bold',
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
};

const Dashboard = () => {
    const redirectToDocs = () => {
        window.location.href = "/docs";
    };

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Puntos de interés de la UNLaR'));
    })



    return (
        <Grid container spacing={10} className="animated-container">
            {/* Heading */}
            <Grid item className="animated-grid" xs={12}>
                <Typography variant="h2" gutterBottom
                    style={{
                        ...headingStyle,
                        textShadow: '10px 10px 14px rgba(0, 0, 0, 0.5)'
                    }}>
                    UNLaR Navigator
                </Typography>
                <Divider style={{ backgroundColor: "white", height: 2, margin: "0 auto" }} />
                <Typography variant="h4" style={{
                        ...headingStyle,
                        textShadow: '10px 10px 14px rgba(0, 0, 0, 0.5)'
                    }}>
                    Puntos de interés para la comunidad universitaria
                </Typography>
            </Grid>

            <Grid item className="animated-grid" xs={12}>
                <Card className="animated-card">
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                        ¡Bienvenido a UNLaR Navigator!
                        </Typography>
                        <Typography>
                        Esta herramienta está diseñada para mejorar la experiencia de nuestra comunidad universitaria. Su objetivo es proporcionar un acceso fácil y eficiente a diversos puntos de interés dentro y fuera del campus.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>


            
            <Grid item className="animated-grid" xs={6} >
                <Card onClick={redirectToDocs} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" style={{ marginRight: '10px' }}>
                            Listado
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
