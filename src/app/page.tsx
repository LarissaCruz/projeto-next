"use client";

import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Image from "next/image";
import styles from "./page.module.css";
import { Input } from "@mui/material";
import axios from "axios";
import { loginUser } from "@/services/api/login";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
const Home = () => {
  const colors = ["#4e4e4e", "#777777", "#292929"];
  const [backgroundColor, setBackgroundColor] = useState(colors[0]);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [isLogado, setIsLogado] = useState<boolean>(false);
  useEffect(() => {
    const interval = setInterval(changeBackgroundColor, 1000);
    return () => clearInterval(interval);
  }, []);

  const changeBackgroundColor = () => {
    setBackgroundColor((prevColor) => {
      const currentIndex = colors.indexOf(prevColor);
      const nextIndex = (currentIndex + 1) % colors.length;
      return colors[nextIndex];
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userData = await loginUser(username, password);
      console.log(userData);
      setError(false);
      setIsLogado(true);

      console.log("Dados do usuário:", userData);
    } catch (error) {
      setIsLogado(false);
      setError(true);
      console.log("Erro ao fazer login:", error.message);
    }
  };

  const appBarStyle = {
    backgroundColor: "black",
    boxShadow: "none",
    color: "black",
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form onSubmit={handleSubmit}>
            {!!error && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Usuario não encontrado por favor cadastre sua conta
              </Alert>
            )}
            {isLogado && (
              <Alert severity="success">Esse usuario possui login</Alert>
            )}
            <Box sx={{ paddingLeft: "30px", paddingRight: "30px" }}>
              <Input
                sx={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  marginBottom: "20px",
                }}
                placeholder="Email"
                value={username}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setUsername(event.target.value)
                }
              />
              <Input
                sx={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  marginBottom: "25px",
                }}
                placeholder="Senha"
                value={password}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setPassword(event.target.value)
                }
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ backgroundColor: "black", paddingY: "10px" }}
              >
                Contained
              </Button>
            </Box>
          </form>
        </Container>
      </Grid>
      <Grid
        item
        xs={7}
        sx={{
          backgroundColor: backgroundColor,
          transition: "background-color 1s ease",
        }}
      ></Grid>
    </Grid>
  );
};

export default Home;
