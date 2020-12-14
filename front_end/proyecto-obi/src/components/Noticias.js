import React, { useEffect, useState } from 'react';


// core components
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardIcon from "../components/Card/CardIcon.js";
import CardBody from "../components/Card/CardBody.js";
import CardFooter from "../components/Card/CardFooter.js";
import DateRange from "@material-ui/icons/DateRange";

import Update from "@material-ui/icons/Update";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import styles from "../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import avatar from "../assets/img/icpc_logo.jpg";//../assets/img/faces/marc.jpg";
import avatar1 from "../assets/img/OBI_small.jpg";//../assets/img/faces/marc.jpg";

import Link from '@material-ui/core/Link';

import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import '../assets/css/horizontal.css';
import Cookies from "universal-cookie";
import HOST from "../variables/general.js";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(styles);
const baseUrl=HOST.Url_Public+'Noticia.php';
//"../../variables/general.js";
const cookies = new Cookies();
const header = HOST.header(cookies.get('token'));

const content = [
    /*{
		title: 'Vulputate Mollis Ultricies',
		description:
			'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.',
		button: 'Read More',
		image: 'https://i.imgur.com/ZXBtVw7.jpg',
		user: 'Daniel',
		userProfile: 'https://s7.postimg.cc/abavelo3v/1_3x.png',
	},
	{
		title: 'Tortor Dapibus',
		description:
			'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
		button: 'Discover',
		image: 'https://i.imgur.com/DCdBXcq.jpg',
		user: 'Samantha',
		userProfile: 'https://s7.postimg.cc/ujy8zz7vv/5_3x.png',
	},
	{
		title: 'Phasellus volutpat metus',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.',
		button: 'Buy now',
		image: 'https://i.imgur.com/DvmN8Hx.jpg',
		user: 'Michael',
		userProfile: 'https://s7.postimg.cc/6exjimijv/3_3x.png',
	},
	{
		title: 'Ultricies Vulputate Mollis',
		description:
			'Aenean eu leo quam. Pellentesque ornare sem lacinia  nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
		button: 'Read More',
		image: 'https://i.imgur.com/ZXBtVw7.jpg',
		user: 'Jessica',
		userProfile: 'https://s7.postimg.cc/7ihnu80ij/4_3x.png',
	},
	{
		title: 'Odo Aenean Quam Tortor',
		description:
			'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		button: 'Discover',
		image: 'https://i.imgur.com/DCdBXcq.jpg',
		user: 'William',
		userProfile: 'https://s7.postimg.cc/f9ydt4zmj/2_3x.png',
	},
	{
		title: 'Volutpat Aenean metus',
		description:
			'quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentumconsectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis.',
		button: 'Buy now',
		image: 'https://i.imgur.com/DvmN8Hx.jpg',
		user: 'Katerina',
		userProfile: 'https://s7.postimg.cc/hsk2th5tn/6_3x.png',
	},*/
  ];

  
export default function Noticias(){
	const [data,setData]=useState([]);
	const classes = useStyles();
	//******  getAll
	const getAll=async()=>{
		await axios.post(baseUrl,{_metod: 'getAllPublic'},header
	  ).then(
		response => {
			console.log(response);
		  if(response.data.estado===1){
			setData(response.data.val);
			//setData2(response.data.val);
		  }
		}
	  ).catch(
		error=>{
		  //setData2(data);;
		  //console.log(error);
		}
	  )
	};


	useEffect(()=>{
		getAll();
		//console.log(process.env);
	  },[]);
	
    return(
        <div>
            <GridContainer>
                <GridItem xs={12} sm={9} md={9} >
					{(content.length===0)?'':

					<Slider  autoplay={3000} >
						{content.map((item, index) => (
							<div
								key={index}
								style={{ background: `url('${item.image}') no-repeat center center`}}
							>
								<center>
								<div style={{
									position: 'absolute', left: '50%', top: '50%',
									transform: 'translate(-50%, -50%)'
								}}>
									<h5>{item.description}</h5>
									
									<Button color="primary" variant='contained'>
										{item.button}
									</Button>
								</div>
								</center>
							</div>
						))}
					</Slider>
					}
					{data.map(console =>(
						<GridItem key={console.idnoticia}>
							<Card>
								<CardBody>
									<ReactMarkdown>{"# "+console.titulo+"\n## "+console.subtitulo+"\n"+console.contenido}</ReactMarkdown>
									
									<div className={classes.stats}>
										<Update />
										 ADMIN:{console.fecha}
									</div>
								</CardBody>
							</Card>
						</GridItem>
					))}
					
                </GridItem>


                <GridItem xs={12} sm={3} md={3}>
                    <Card>
                        <CardHeader color="primary" stats icon>
                        <p className={classes.cardCategory}>Auspiciadores</p>
                        <h3 className={classes.cardTitle}>Anfitriones</h3>
                        </CardHeader>
                        <CardBody>
                            <center><img src={avatar} alt="logo1"/></center>
                            <center><img src={avatar1} alt="logo1"/></center>
                        </CardBody>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <Update />
                                Recién actualizado
                            </div>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader color="primary" stats icon>
                        <CardIcon color="primary">
                            <Icon><DateRange/></Icon>
                        </CardIcon>
                        <p className={classes.cardCategory}>historial</p>
                        <h3 className={classes.cardTitle}>Competencias Pasadas</h3>
                        </CardHeader>
                        <CardBody>
                        <Link href="#" >
                            Link
                        </Link>
                        </CardBody>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <Update />
                                Recién actualizado
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
    
}
