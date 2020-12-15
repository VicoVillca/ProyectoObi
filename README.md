# Instalación de Proyecto-Obi
## Resumen

El siguiente proyecto esta realizado con el propocito de gestionar
y capacitar a los estudiantes de nivel secundario con rumbo a las 
**IOI** (International OLimpiad Informatic) en bolivia, como herramienta
en la **OBI** (Olimpiada Boliviana de Informatica) para la gestion de 
los diferentes niveles y etapas, paguina actual se puede verificar
mediante el siguiente linck.
  - [obi url] - Pagina oficial de la OBI!

Para el mismo utilizaremos las tecnologias de php en el lado back-end 
y React en el Fron-end. 

## Requerimientos necesarios

  - UBUNTU 18.05
  - PHP 7.2.24-0ubuntu0.18.04.6
  - psql (PostgreSQL) 13.0 (Ubuntu 13.0-1.pgdg18.04+1)
  - npm  6.14.8
  - node v14.15.0

## Instalación

  - Clonamos el repositorio con el siguiente codigo en la terminal
    ```sh
    git clone git@github.com:VicoVillca/ProyectoObi.git
    ```
  - creamos la base de datos el mismo esta en PostgresSQL 
    ```sh
    CREATE DATABASE ioidb;
    ```
  - Creamos las tablas e inserts nesesarios
    **ProyectoObi/back_end/BasedeDatosIOI.sql**

## Iniciamos el Back-end
Nuestro lado Back-end esta en tornoa  php para lo cual solo iniciamos el servidor
php con la siguiente linea de codigo en la terminal
```sh
php -S localhost:4000
```
y probamos accediendo al archivo de prueba copiando el linck en el navegador
```sh
http://localhost:4000/proyectoOBI/back_end/prueba.php
```
## Iniciamos el Front-end
el proyecto esta basado en la tecnologia react con npm por tanto tendremos 
que instalar sus respectivos componentes.
  - Abrimos la terminal dentro de la carpeta **proyectoObi/fronte_end/proyecto-obi** 
  - Borramos el archivo **package-lock.json**
  - abrimos la terminal dentro de la carpeta e instalamos dependencias npm
    ```sh
    sudo npm install
    ```
  - Iniciamos el servidor  el puerto 3000
    ```sh
    sudo npm start
    ```
  - abrimos el explorador web y accedemos al siguiente linck 
    ```sh
    http://localhost:3000
    ```


   [obi url]: <https://olimpiada.icpc-bolivia.edu.bo/>
   
