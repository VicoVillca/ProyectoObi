import React , {useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, TextField,Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Copyright from './Copyright';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Alert from 'react-bootstrap/Alert'
import 'bootstrap/dist/css/bootstrap.min.css';
// para los web servises

import axios from 'axios';
import md5 from "md5";
import Cookies from "universal-cookie";
import HOST from "../variables/general.js";
const baseUrl = HOST.Url_Tutor+"Tutor.php";

const cookies = new Cookies();
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}
const header = HOST.header(cookies.get('token'));
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paper2: {
    position: 'absolute',
    width: 600,
    height: '80%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  icons: {
    cursos:'pointer'
  },
  inputMaterial:{
    width:'10%'
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
}));

export default   function LoginUsuario(){
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [openModalIniciar, setOpenIniciar] = useState(false);
  const [openModalNuevo, setOpenNuevo] = useState(false);
  const [viewAlert, setOpenAlertMensaje] = useState(false);
  const [consoleSeleccionada, setConsolaSeleccionada]= useState({
    idtutor:'',
    nombre:'',
    appaterno:'',
    apmaterno:'',
    ci:'',
    correo:'',
    celular:'',
    password:'',
    password2:'',
    mensaje:'Mensaje'
  })
  const handleChangle = e => {
    const {name, value}= e.target;
    setConsolaSeleccionada(prevState=>({
      ...prevState,
      [name]:value
    }))
  }
  const handleModalIniciar = () => {
    handleAlertMensaje(false);
    setOpenIniciar(!openModalIniciar);
    
  };
  const handleModalNuevo = () => {
    handleAlertMensaje(false);
    setOpenNuevo(!openModalNuevo);
  };
  const handleAlertMensaje = (e) => {
    setOpenAlertMensaje(e);
  };

  const handleSubmitIniciar =async(event) =>{
    event.preventDefault();
    handleAlertMensaje(false);//juanhotmail.com
    await axios.post(baseUrl,
      {
          _metod:     'Login',
          Correo:     consoleSeleccionada.correo,
          Password:   md5(consoleSeleccionada.password)
      },header
  )
  .then(
      response => {
        //console.log(response);
          if(response.data.estado===1){
              var respuesta = response.data.val[0];
              //console.log(respuesta);
              cookies.set('idusuario', respuesta.idtutor, {path:"/"});
              cookies.set('username', respuesta.nombre, {path:"/"});
              cookies.set('correo', respuesta.correo, {path:"/"});
              cookies.set('tipo', 'tutor', {path:"/"});
              //console.log("Usuario guardadooo weee");
              window.location.href="./bienvenida";
          }else{
            consoleSeleccionada.mensaje=response.data.mensaje;
            handleAlertMensaje(true);
            //this.setState({alertShow:true});
          }
      }
  )
  .catch(
      error=>{
        consoleSeleccionada.mensaje=""+error;
            handleAlertMensaje(true);
        //this.setState({alertShow:true});
      }
  )
    //ejecutamos el axios
  }

  const handleSubmitCrear = async(event) =>{
    event.preventDefault();
    handleAlertMensaje(false);
    var alerta = false;
    var mensaje ="";
    if(!(consoleSeleccionada.password===consoleSeleccionada.password2)){
      mensaje= mensaje + "Las contraseñas no son iguales";
      alerta= true;
    }

    
    if(!alerta){
      //console.log("valido weeeee listo pára el axios");
      await axios.post(baseUrl,
        {
            _metod:     'Insert',
            Nombre:     consoleSeleccionada.username,
            Ci:         consoleSeleccionada.ci,
            Correo:     consoleSeleccionada.correo,
            Celular:    consoleSeleccionada.celular,
            Password:   md5(consoleSeleccionada.password)
        },header
    )
    .then(
        response => {
          console.log(response);
          consoleSeleccionada.mensaje=response.data.mensaje;
            if(response.data.estado===1){
              handleModalNuevo();
              handleModalIniciar();
              alert("la cuenta ya fue creada con exito");
              //window.location.href="./tutor";
            }else{
              //consoleSeleccionada.mensaje=response.data.mensaje;
              handleAlertMensaje(true);
              //this.setState({alertShow:true});
            }
        }
    )
    .catch(
        error=>{
          consoleSeleccionada.mensaje=""+error;
              handleAlertMensaje(true);
          //this.setState({alertShow:true});
        }
    )
      //valido
      //consoleSeleccionada.mensaje="Las contraseñas no son iguales";
      //handleAlertMensaje(true);
    }else{
      //no valido
      //console.log("No valido");
      consoleSeleccionada.mensaje=mensaje;
      handleAlertMensaje(alerta);
    }
  }

    return (
      <>
        <Button variant="text" color ="inherit" onClick={handleModalIniciar}>
            Iniciar Sesion
        </Button>
        <Button variant="text" color ="inherit" onClick={handleModalNuevo}>
            Crear Cuenta
        </Button>





        {/***  modal para iniciar Sesion  ***/}
        <Modal
          open={openModalIniciar}
          onClose={handleModalIniciar}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <center>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <h3 id="simple-modal-title">Iniciar Sesión</h3>
              </center>
            
            <form onSubmit={handleSubmitIniciar}>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="correo"
                  label="Correo"
                  name="correo"
                  
                  onChange={handleChangle}
                  autoComplete="current-correo"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  onChange={handleChangle}
                  autoComplete="current-password"
                />
                <Alert show={viewAlert} variant="danger" >
                  {consoleSeleccionada.mensaje}
                </Alert>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >  Iniciar
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link  variant="body2">
                      ¿Se te olvidó tu contraseña?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link  variant="body2" onClick={()=>{handleModalNuevo();handleModalIniciar()}}>
                      {"¿No tienes una cuenta? Regístrate"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright />
            </form>
          </Container>
          </div>
        </Modal>


        <Modal
          open={openModalNuevo}
          onClose={handleModalNuevo}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper2}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <center>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <h3 id="simple-modal-title">Crear cuenta de Tutor</h3>
                <br/>
              </center>
            
            <form onSubmit={handleSubmitCrear} autoComplete="off">
            <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={handleChangle}
                id="username"
                label="Nombre y Apellidos"
                name="username"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="ci"
                label="ci"
                type="ci"
                id="ci"
                onChange={handleChangle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                onChange={handleChangle}
                fullWidth
                id="celular"
                label="celular"
                name="celular"
                autoComplete="celular"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="correo"
                label="Correo Electronico"
                name="correo"
                onChange={handleChangle}
                autoComplete="correo"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                onChange={handleChangle}
              />
            </Grid>
            <Grid item xs={12}>
              
            <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Repetir contraseña"
                type="password"
                id="password2"
                onChange={handleChangle}
              />
            </Grid>
          </Grid>
          <Alert show={viewAlert} variant="danger" >
            {consoleSeleccionada.mensaje}
          </Alert>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Crear cuenta
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link  variant="body2" onClick={()=>{handleModalNuevo();handleModalIniciar()}}>
              ¿Ya tienes una cuenta? Iniciar
              </Link>
            </Grid>
          </Grid>
                <Copyright />
            </form>
          </Container>
          </div>
        </Modal>
      </>
    );
}
