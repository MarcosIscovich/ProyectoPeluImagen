-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: database1
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fecha_nacimiento` varchar(255) NOT NULL,
  `red_social` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ocupacion` varchar(255) DEFAULT NULL,
  `tipo_cabello` varchar(255) DEFAULT NULL,
  `estado_cabello` varchar(255) DEFAULT NULL,
  `formula` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Evita Arribas-Oliva',NULL,'011(56)931-89-52','direccion 1','miscovich@grupointertron.com','2022-10-01','instagram','2022-10-10 18:52:17','2022-10-22 17:34:57','dueño','seco','dañado','cambio de formula \nsdfsfsfsdfsdfsdfsdfsdfsdfsdfsdfs'),(2,'Adolfo Pizarro Arce',NULL,'513(3421)311-66-14','direccion 2','marcoscba5@gmail.com','2022-09-28','telegram','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','seco','muy dañado','2'),(3,'Natalio Nico Marí Elías',NULL,'268(2775)544-74-99','direccion 3','mail@adsasdad.com','2022-09-28','telegram','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','graso','dañado','3'),(4,'Eugenio Millán Plana',NULL,'084(8907)009-25-50','direccion 4','mail@adsasdad.com','2022-09-28','telegram','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','graso','sano','4'),(5,'Brunilda del Simó',NULL,'33(4309)468-40-75','direccion 5','mail@adsasdad.com','2022-09-28','telegram','2022-10-10 19:10:03','2022-10-10 19:10:03','dueño','graso','dañado','5'),(6,'Julia Hoyos Villegas',NULL,'137(44)451-71-78','direccion 6','mail@adsasdad.com','2022-09-28','telegram','2022-10-10 19:10:03','2022-10-10 19:10:03','dueño','graso','dañado','6'),(7,'Ofelia Escobar Barroso',NULL,'11(54)597-18-22','direccion 7','mail@adsasdad.com','2022-09-28','telegram','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','seco','dañado','7'),(8,'Amador Ribas',NULL,'81(1896)119-38-10','direccion 8','mail@adsasdad.com','2022-09-28','telegram','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','seco','sano','8'),(9,'Lara Murillo Alvarez',NULL,'527(916)099-10-68','direccion 9','mail@adsasdad.com','2022-09-28','telegram','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','seco','muy dañado','9'),(10,'Manu Aller Orozco',NULL,'5(9811)253-42-05','direccion 10','mail@adsasdad.com','2022-09-28','telegram','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','graso','sano','10'),(11,'Reinaldo Amat Pozo',NULL,'6(7178)797-71-73','direccion 11','mail@adsasdad.com','2022-09-28','telegram','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','seco','sano','11'),(12,'Ciríaco Borrego Múgica',NULL,'9(8870)825-17-72','direccion 12','mail@adsasdad.com','2022-09-28','telegram','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','seco','sano','12'),(13,'Paco Aragón',NULL,'8(0608)864-53-52','direccion 13','mail@adsasdad.com','2022-09-28','telegram','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','seco','sano','13'),(14,'David Barriga Pombo',NULL,'158(6724)696-22-48','direccion 1','miscovich@grupointertron.com','2022-09-29','instagram','2022-10-19 20:17:38','2022-10-19 20:17:38','empleado','graso','dañado','lorem ipsun'),(15,'Gastón Cuadrado Meléndez',NULL,'03(484)690-12-69','direccion 1','miscovich@grupointertron.com','2022-09-28','instagram','2022-10-20 11:26:18','2022-10-20 11:26:18','empleado','sano','sano','lorem ipsun'),(16,'Andrew Reynolds',NULL,'372(225)401-37-85',' Cnel Suárez 487','creipreucruxolla-5284@yopmail.com','2022-09-28','Facebook','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','graso','dañado','Lorem ipsun'),(17,'Paula Mclaughlin',NULL,'72(772)442-87-57','Libertad 704','creipreucruxolla-5284@yopmail.com','2022-09-28','Instagram','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','graso','sano','Lorem ipsun'),(18,'Elizabeth Cochran',NULL,'95(578)520-65-85','Sanchez De Bustamante 241','rillulunefru-4118@yopmail.com','2022-09-28','Telegram','2022-10-10 19:10:03','2022-10-10 19:10:03','dueño','graso','dañado','Lorem ipsun'),(19,'Brian Leonard',NULL,'3(37)007-54-03','L N Alem/31 223','votehouzofa-5368@yopmail.com','2022-09-28','TikTok','2022-10-10 19:10:03','2022-10-10 19:10:03','dueño','graso','dañado','Lorem ipsun'),(20,'Darren Blair',NULL,'5(55)103-00-92','Gral Bustos 774 Piso 2 Cofico','goppaupamiveu-6958@yopmail.com','2022-09-28','Facebook','2022-10-19 20:17:38','2022-10-19 20:17:38','empleado','seco','dañado','Lorem ipsun'),(21,'Ms. Kathleen Lawrence',NULL,'6(9203)315-41-39','Luis N. Palma 813','maluppouteucoi-6917@yopmail.com','2022-09-28','Instagram','2022-10-20 11:26:18','2022-10-20 11:26:18','empleado','seco','sano','Lorem ipsun'),(22,'Michael Walker',NULL,'32(9334)553-56-38','San Martin 2236 Piso 1','dittoufraukatrou-8216@yopmail.com','2022-09-28','Telegram','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','seco','muy dañado','Lorem ipsun'),(23,'Nancy Thompson',NULL,'976(79)112-62-66','Jose Paez 1560','xullitrubocri-4991@yopmail.com','2022-09-28','TikTok','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','graso','sano','Lorem ipsun'),(24,'Amanda Larson',NULL,'096(30)350-61-69','Av Pedro Luro 10449 Pb','grupazeicrouke-1620@yopmail.com','2022-09-28','Facebook','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','seco','sano','Lorem ipsun'),(25,'Julie Stevens',NULL,'4(8005)771-03-46','Laprida 967','gozeubroummequou-7219@yopmail.com','2022-09-28','Instagram','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','seco','sano','Lorem ipsun'),(26,'Marcus Hart',NULL,'2(9972)255-32-70','Aviador Origone 230','zappappeufrumei-8798@yopmail.com','2022-09-28','Telegram','2022-10-19 20:17:38','2022-10-19 20:17:38','empleado','seco','sano','Lorem ipsun'),(27,'Christopher Gentry',NULL,'7(154)159-87-92','Paso De La Patria 470','greizaugourokou-3025@yopmail.com','2022-09-28','TikTok','2022-10-20 11:26:18','2022-10-20 11:26:18','dueño','seco','dañado','Lorem ipsun'),(28,'Stephen Reed',NULL,'6(44)314-24-97',' Cnel Suárez 488','puttixikilo-2443@yopmail.com','2022-09-28','Facebook','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','seco','muy dañado','Lorem ipsun'),(29,'Susan Hernandez MD',NULL,'158(224)760-25-90','Libertad 705','cracoujovoije-8025@yopmail.com','21/10/2022','Instagram','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','graso','dañado','Lorem ipsun'),(30,'Johnny Burke',NULL,'12(46)697-02-20','Sanchez De Bustamante 242','cracoujovoije-8025@yopmail.com','10/10/2022','Telegram','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','graso','sano','Lorem ipsun'),(31,'Andrew Strickland',NULL,'0(58)801-77-77','L N Alem/31 224','queddeiceutoifro-4178@yopmail.com','08/10/2022','TikTok','2022-10-10 19:10:03','2022-10-10 19:10:03','dueño','graso','dañado','Lorem ipsun'),(32,'Kristin Vaughn',NULL,'3(188)020-68-04','Gral Bustos 774 Piso 2 Cofico','keneicaugabu-8399@yopmail.com','08/10/2022','Facebook','2022-10-19 20:17:38','2022-10-19 20:17:38','dueño','graso','dañado','Lorem ipsun'),(33,'John Griffin',NULL,'379(729)876-95-47','Luis N. Palma 814','creifressuzeupra-3035@yopmail.com','19/10/2022','Instagram','2022-10-20 11:26:18','2022-10-20 11:26:18','empleado','seco','dañado','Lorem ipsun'),(34,'Nichole Martin',NULL,'5(96)700-90-78','San Martin 2236 Piso 2','jexessehegi-2897@yopmail.com','18/10/2022','Telegram','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','seco','sano','Lorem ipsun'),(35,'Sandra Middleton',NULL,'2(4977)072-85-98','Jose Paez 1561','safrecoullonnu-7957@yopmail.com','14/10/2022','TikTok','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','seco','muy dañado','Lorem ipsun'),(36,'Roger Lopez',NULL,'3(296)569-67-86','Av Pedro Luro 10449 Pb','prauvoiduboiba-6157@yopmail.com','17/10/2022','Facebook','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','graso','sano','Lorem ipsun'),(37,'Cassandra Wall',NULL,'78(5262)327-61-25','Laprida 968','quoullopreddauri-4815@yopmail.com','11/10/2022','Instagram','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','seco','sano','Lorem ipsun'),(38,'Mrs. Nancy Taylor',NULL,'2(6583)496-07-56','Aviador Origone 231','yeufroisaveifou-3906@yopmail.com','18/10/2022','Telegram','2022-10-19 20:17:38','2022-10-19 20:17:38','empleado','seco','sano','Lorem ipsun'),(39,'Justin Waters',NULL,'2(977)079-34-55','Paso De La Patria 471','frifoimummaba-6380@yopmail.com','11/10/2022','TikTok','2022-10-20 11:26:18','2022-10-20 11:26:18','empleado','seco','sano','Lorem ipsun'),(40,'Justin Johnson',NULL,'159(25)523-59-32',' Cnel Suárez 489','prussussauxeisse-7970@yopmail.com','11/10/2022','Facebook','2022-10-10 19:10:03','2022-10-10 19:10:03','dueño','seco','dañado','Lorem ipsun'),(41,'Joshua Sanchez',NULL,'04(5452)599-84-54','Libertad 706','pouprouttettafe-9238@yopmail.com','21/10/2022','Instagram','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','seco','muy dañado','Lorem ipsun'),(42,'Nancy Mason',NULL,'6(1716)790-28-34','Sanchez De Bustamante 243','fraddibequetra-9708@yopmail.com','18/10/2022','Telegram','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','graso','dañado','Lorem ipsun'),(43,'Martha Campbell',NULL,'49(93)231-23-06','L N Alem/31 225','jeddubugraze-4569@yopmail.com','11/10/2022','TikTok','2022-10-10 19:10:03','2022-10-10 19:10:03','empleado','graso','sano','Lorem ipsun'),(44,'Dr. Jon Sanchez',NULL,'485(926)935-05-33','Gral Bustos 774 Piso 2 Cofico','zoujujocobo-8596@yopmail.com','11/10/2022','Facebook','2022-10-19 20:17:38','2022-10-19 20:17:38','dueño','graso','dañado','Lorem ipsun'),(45,'Crystal Navarro',NULL,'7(9872)066-29-79','Luis N. Palma 815','xedidakoupra-4509@yopmail.com','21/10/2022','Instagram','2022-10-20 11:26:18','2022-10-20 11:26:18','dueño','graso','dañado','Lorem ipsun');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fichas`
--

DROP TABLE IF EXISTS `fichas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fichas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ocupacion` varchar(255) NOT NULL,
  `tipo_cabello` varchar(255) DEFAULT NULL,
  `estado_cabello` varchar(255) DEFAULT NULL,
  `formula` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `clienteId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `clienteId` (`clienteId`),
  CONSTRAINT `fichas_ibfk_1` FOREIGN KEY (`clienteId`) REFERENCES `cliente` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fichas`
--

LOCK TABLES `fichas` WRITE;
/*!40000 ALTER TABLE `fichas` DISABLE KEYS */;
/*!40000 ALTER TABLE `fichas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prod_colocado`
--

DROP TABLE IF EXISTS `prod_colocado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prod_colocado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orden` int NOT NULL,
  `cantidadProducto` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `turnoId` int DEFAULT NULL,
  `productoId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `turnoId` (`turnoId`),
  KEY `productoId` (`productoId`),
  CONSTRAINT `prod_colocado_ibfk_23` FOREIGN KEY (`turnoId`) REFERENCES `turnos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `prod_colocado_ibfk_24` FOREIGN KEY (`productoId`) REFERENCES `productos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prod_colocado`
--

LOCK TABLES `prod_colocado` WRITE;
/*!40000 ALTER TABLE `prod_colocado` DISABLE KEYS */;
/*!40000 ALTER TABLE `prod_colocado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `stock` int NOT NULL,
  `precio` int DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Ampolla de Nurticion','esta es la descripcion el producto 1',3,2332,'','2022-10-20 14:36:19','2022-10-25 13:33:07'),(2,'crema de peinar','asdasdad',2,678,'','2022-10-20 18:19:14','2022-10-20 18:19:14');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tiposervicios`
--

DROP TABLE IF EXISTS `tiposervicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tiposervicios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre_servicio` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiposervicios`
--

LOCK TABLES `tiposervicios` WRITE;
/*!40000 ALTER TABLE `tiposervicios` DISABLE KEYS */;
INSERT INTO `tiposervicios` VALUES (1,'peluqueria','2022-10-10 18:52:17','2022-10-10 18:52:17'),(2,'uñas','2022-10-10 18:52:17','2022-10-10 18:52:17');
/*!40000 ALTER TABLE `tiposervicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trabajos`
--

DROP TABLE IF EXISTS `trabajos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trabajos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `duracion` int NOT NULL,
  `precio` int NOT NULL,
  `cantTrabajadores` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `tiposervicioId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tiposervicioId` (`tiposervicioId`),
  CONSTRAINT `trabajos_ibfk_1` FOREIGN KEY (`tiposervicioId`) REFERENCES `tiposervicios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trabajos`
--

LOCK TABLES `trabajos` WRITE;
/*!40000 ALTER TABLE `trabajos` DISABLE KEYS */;
INSERT INTO `trabajos` VALUES (5,'Corte',1,1500,1,'2022-10-10 19:05:33','2022-10-25 13:31:14',1),(6,'Color Raiz',2,2500,1,'2022-10-10 19:05:44','2022-10-25 13:31:43',1),(7,'Color General',1,4000,1,'2022-10-19 18:39:49','2022-10-25 13:31:21',1),(8,'Reflejos',4,12000,1,'2022-10-20 18:28:01','2022-10-25 13:31:31',1),(9,'Mechas',43,12000,1,'2022-10-20 18:28:13','2022-10-25 13:31:54',1),(10,'Nutricion',1,2000,1,'2022-10-25 13:32:29','2022-10-25 13:32:29',1),(11,'Lavado',2,600,1,'2022-10-25 13:32:42','2022-10-25 13:32:42',1),(12,'Brushing',1,1500,1,'2022-10-25 13:32:42','2022-10-25 13:32:42',1),(13,'Peinados',1,2500,1,'2022-10-25 13:32:42','2022-10-25 13:32:42',1),(14,'Permanente',1,8000,1,'2022-10-25 13:32:42','2022-10-25 13:32:42',1),(15,'Semi',1,1600,1,'2022-10-25 13:32:42','2022-10-25 13:32:42',2),(16,'Kapping',1,2000,1,'2022-10-25 13:32:42','2022-10-25 13:32:42',2),(17,'Esculpidas',1,3500,1,'2022-10-25 13:32:42','2022-10-25 13:32:42',2),(18,'Adicional Diseño',1,400,1,'2022-10-25 13:32:42','2022-10-25 13:32:42',2),(19,'Esmalte Comun',1,900,1,'2022-10-25 13:32:42','2022-10-25 13:32:42',2),(20,'Belleza Pies',1,1200,1,'2022-10-25 13:32:42','2022-10-25 13:32:42',2),(21,'Belleza Pies Semi',1,1800,1,'2022-10-25 13:32:42','2022-10-25 13:32:42',2),(22,'Belleza Pies Comun',1,1200,1,'2022-10-25 13:32:42','2022-10-25 13:32:42',2);
/*!40000 ALTER TABLE `trabajos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turnos`
--

DROP TABLE IF EXISTS `turnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turnos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha_concurrencia` varchar(255) NOT NULL,
  `precio` int NOT NULL,
  `hora_desde` datetime NOT NULL,
  `hora_hasta` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `clienteId` int DEFAULT NULL,
  `trabajoId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `clienteId` (`clienteId`),
  KEY `trabajoId` (`trabajoId`),
  CONSTRAINT `turnos_ibfk_25` FOREIGN KEY (`clienteId`) REFERENCES `cliente` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `turnos_ibfk_26` FOREIGN KEY (`trabajoId`) REFERENCES `trabajos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=162 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turnos`
--

LOCK TABLES `turnos` WRITE;
/*!40000 ALTER TABLE `turnos` DISABLE KEYS */;
INSERT INTO `turnos` VALUES (1,'2022-10-15',2500,'2022-10-15 12:00:00','2022-10-15 14:00:00','2022-10-15 11:21:17','2022-10-15 18:47:29',3,5),(2,'2022-10-15',3200,'2022-10-15 06:00:00','2022-10-15 08:30:00','2022-10-15 11:37:02','2022-10-15 18:49:22',12,5),(3,'2022-10-15',3400,'2022-10-15 09:30:00','2022-10-15 10:30:00','2022-10-15 11:38:03','2022-10-15 18:47:31',5,5),(4,'2022-10-15',3500,'2022-10-15 15:00:00','2022-10-15 18:30:00','2022-10-15 13:27:40','2022-10-15 18:47:24',8,5),(5,'2022-10-15',6000,'2022-10-15 11:30:00','2022-10-15 12:00:00','2022-10-15 13:31:27','2022-10-15 18:47:26',4,6),(6,'2022-10-08',6500,'2022-10-08 05:00:00','2022-10-08 08:30:00','2022-10-15 13:31:57','2022-10-18 20:54:43',2,5),(7,'2022-10-08',2500,'2022-10-08 06:00:00','2022-10-08 07:30:00','2022-10-15 17:12:41','2022-10-25 13:23:01',1,5),(8,'2022-10-17',4500,'2022-10-17 06:00:00','2022-10-17 06:30:00','2022-10-15 17:12:51','2022-10-15 17:12:51',1,6),(9,'2022-10-15',3400,'2022-10-15 10:30:00','2022-10-15 11:00:00','2022-10-15 17:13:46','2022-10-15 17:13:46',1,5),(10,'2022-10-18',9000,'2022-10-18 09:30:00','2022-10-18 10:00:00','2022-10-18 13:09:07','2022-10-18 13:09:07',2,5),(11,'2022-10-20',8900,'2022-10-20 05:30:00','2022-10-20 07:00:00','2022-10-20 12:52:11','2022-10-20 19:25:45',5,7),(12,'2022-10-20',9000,'2022-10-20 08:00:00','2022-10-20 08:30:00','2022-10-20 18:09:58','2022-10-20 19:25:42',5,6),(13,'2022-10-20',12000,'2022-10-20 09:30:00','2022-10-20 10:00:00','2022-10-20 18:10:17','2022-10-20 19:26:17',7,9),(14,'2022-10-20',18000,'2022-10-20 12:30:00','2022-10-20 15:00:00','2022-10-20 18:39:26','2022-10-20 19:29:10',3,5),(15,'2022-10-20',20000,'2022-10-20 11:00:00','2022-10-20 13:30:00','2022-10-20 18:47:06','2022-10-20 19:29:12',5,6),(17,'2022-10-21',3500,'2022-10-21 08:00:00','2022-10-21 08:30:00','2022-10-21 12:04:28','2022-10-21 12:27:03',5,5),(18,'2022-10-10',9600,'2022-10-10 09:00:00','2022-10-10 09:30:00','2022-10-21 14:04:34','2022-10-21 14:04:34',1,5),(19,'2022-10-21',3500,'2022-10-21 12:30:00','2022-10-21 13:00:00','2022-10-21 14:04:50','2022-10-21 14:04:50',6,6),(20,'2022-10-21',3100,'2022-10-21 11:30:00','2022-10-21 12:00:00','2022-10-21 17:08:02','2022-10-21 17:08:02',1,6),(21,'2022-10-21',2000,'2022-10-21 09:30:00','2022-10-21 10:00:00','2022-10-21 17:08:08','2022-10-21 17:08:08',3,8),(22,'2022-10-21',1500,'2022-10-21 14:30:00','2022-10-21 15:00:00','2022-10-21 17:08:14','2022-10-21 17:08:41',10,5),(23,'2022-10-21',1500,'2022-10-21 17:30:00','2022-10-21 18:00:00','2022-10-21 17:08:21','2022-10-21 17:08:21',3,7),(24,'2022-10-21',1000,'2022-10-21 13:30:00','2022-10-21 14:00:00','2022-10-21 17:08:33','2022-10-21 17:08:33',1,6),(25,'2022-10-10',8000,'2022-10-14 05:30:00','2022-10-14 07:30:00','2022-10-21 17:13:35','2022-10-21 17:18:49',3,7),(28,'2022-10-08',3500,'2022-10-08 09:30:00','2022-10-08 10:00:00','2022-10-21 17:20:35','2022-10-21 17:20:35',4,7),(29,'2022-10-08',7800,'2022-10-08 11:30:00','2022-10-08 12:00:00','2022-10-21 17:20:43','2022-10-21 17:20:43',1,6),(30,'2022-10-19',7100,'2022-10-19 09:00:00','2022-10-19 09:30:00','2022-10-21 18:02:01','2022-10-21 18:02:01',9,5),(31,'2022-10-18',6300,'2022-10-18 15:00:00','2022-10-18 15:30:00','2022-10-21 18:03:36','2022-10-21 18:03:36',4,7),(32,'2022-10-14',9500,'2022-10-14 09:00:00','2022-10-14 09:30:00','2022-10-21 18:04:04','2022-10-21 18:04:04',3,6),(33,'2022-10-17',3000,'2022-10-17 13:00:00','2022-10-17 13:30:00','2022-10-21 20:02:42','2022-10-21 20:02:42',5,7),(36,'2022-10-11',1100,'2022-10-11 06:00:00','2022-10-11 06:30:00','2022-10-21 20:03:12','2022-10-21 20:03:12',4,9),(37,'2022-10-18',1200,'2022-10-11 12:30:00','2022-10-11 13:00:00','2022-10-21 20:03:18','2022-10-21 20:03:18',3,8),(38,'2022-10-11',1300,'2022-10-11 09:30:00','2022-10-11 10:00:00','2022-10-21 20:03:25','2022-10-21 20:03:25',2,7),(39,'2022-10-11',4500,'2022-10-11 18:30:00','2022-10-11 19:00:00','2022-10-21 20:03:33','2022-10-21 20:03:33',4,8),(40,'2022-10-21',4000,'2022-10-21 16:00:00','2022-10-21 16:30:00','2022-10-21 20:04:56','2022-10-21 20:04:56',5,7),(41,'2022-10-21',2500,'2022-10-21 20:30:00','2022-10-21 21:00:00','2022-10-21 20:05:04','2022-10-21 20:05:04',4,6),(42,'2022-10-12',15000,'2022-10-12 13:30:00','2022-10-12 14:00:00','2022-10-21 20:05:12','2022-10-21 20:05:12',3,8),(43,'2022-10-08',2500,'2022-10-08 14:00:00','2022-10-08 14:30:00','2022-10-21 20:05:21','2022-10-25 13:23:00',2,6),(44,'2022-10-22',2500,'2022-10-22 15:30:00','2022-10-22 16:00:00','2022-10-22 12:55:29','2022-10-24 13:59:06',2,6),(45,'2022-10-22',4000,'2022-10-22 13:30:00','2022-10-22 14:00:00','2022-10-22 12:57:27','2022-10-24 18:42:15',7,7),(46,'2022-10-22',4000,'2022-10-22 17:30:00','2022-10-22 18:00:00','2022-10-22 12:59:41','2022-10-22 12:59:41',2,7),(61,'2022-10-24',4600,'2022-10-24 21:00:00','2022-10-24 22:30:00','2022-10-24 19:55:55','2022-10-24 20:54:27',1,5),(62,'2022-10-24',3500,'2022-10-24 10:00:00','2022-10-24 12:00:00','2022-10-24 20:01:26','2022-10-25 13:16:00',7,5),(63,'2022-10-24',1400,'2022-10-24 16:30:00','2022-10-24 19:00:00','2022-10-24 20:53:25','2022-10-24 20:54:22',1,6),(65,'2022-10-25',1000,'2022-10-25 09:00:00','2022-10-25 10:30:00','2022-10-25 11:17:06','2022-10-25 12:59:28',3,6),(66,'2022-10-25',4000,'2022-10-25 10:30:00','2022-10-25 12:30:00','2022-10-25 11:18:58','2022-10-27 13:25:15',1,7),(67,'2022-10-25',3000,'2022-10-25 14:00:00','2022-10-25 16:00:00','2022-10-25 12:43:28','2022-10-25 13:05:11',2,6),(68,'2022-10-25',9000,'2022-10-25 14:00:00','2022-10-25 16:00:00','2022-10-25 12:50:16','2022-10-25 13:05:15',8,9),(69,'2022-10-25',4600,'2022-10-25 10:00:00','2022-10-25 10:30:00','2022-10-25 12:53:30','2022-10-25 12:59:30',5,7),(70,'2022-10-25',4800,'2022-10-25 18:00:00','2022-10-25 18:30:00','2022-10-25 13:08:41','2022-10-25 13:10:56',1,5),(71,'2022-10-25',7000,'2022-10-25 19:00:00','2022-10-25 19:30:00','2022-10-25 13:13:24','2022-10-25 13:13:32',1,7),(72,'2022-10-26',3000,'2022-10-26 04:00:00','2022-10-26 05:30:00','2022-10-26 12:08:33','2022-10-27 13:15:50',15,8),(73,'2022-10-20',1200,'2022-10-15 12:00:00','2022-10-15 14:00:00','2022-10-22 12:55:29','2022-10-24 13:59:06',1,15),(74,'2022-10-27',3500,'2022-10-15 06:00:00','2022-10-15 08:30:00','2022-10-22 12:57:27','2022-10-24 18:42:15',1,20),(75,'2022-10-31',9500,'2022-10-15 09:30:00','2022-10-15 10:30:00','2022-10-22 12:59:41','2022-10-22 12:59:41',6,13),(76,'2022-11-23',3500,'2022-10-15 15:00:00','2022-10-15 18:30:00','2022-10-24 19:55:55','2022-10-24 20:54:27',12,5),(77,'2022-11-01',1000,'2022-10-15 11:30:00','2022-10-15 12:00:00','2022-10-24 20:01:26','2022-10-25 13:16:00',2,19),(78,'2022-10-17',1200,'2022-10-08 05:00:00','2022-10-08 08:30:00','2022-10-24 20:53:25','2022-10-24 20:54:22',11,11),(79,'2022-11-06',1300,'2022-10-08 06:00:00','2022-10-08 07:30:00','2022-10-25 11:17:06','2022-10-25 12:59:28',1,7),(80,'2022-10-08',9800,'2022-10-17 06:00:00','2022-10-17 06:30:00','2022-10-25 11:18:58','2022-10-25 13:05:06',13,18),(81,'2022-10-06',6400,'2022-10-15 10:30:00','2022-10-15 11:00:00','2022-10-25 12:43:28','2022-10-25 13:05:11',7,6),(82,'2022-11-11',7000,'2022-10-18 09:30:00','2022-10-18 10:00:00','2022-10-25 12:50:16','2022-10-25 13:05:15',1,21),(83,'2022-10-10',8900,'2022-10-20 05:30:00','2022-10-20 07:00:00','2022-10-25 12:53:30','2022-10-25 12:59:30',8,7),(84,'2022-10-24',2500,'2022-10-20 08:00:00','2022-10-20 08:30:00','2022-10-25 13:08:41','2022-10-25 13:10:56',9,19),(85,'2022-10-05',3200,'2022-10-20 11:00:00','2022-10-20 12:00:00','2022-10-25 13:13:24','2022-10-25 13:13:32',5,7),(86,'2022-10-07',3400,'2022-10-20 11:00:00','2022-10-20 13:30:00','2022-10-26 12:08:33','2022-10-26 19:31:33',3,16),(87,'2022-10-03',3500,'2022-10-20 11:00:00','2022-10-20 13:30:00','2022-10-26 19:19:26','2022-10-26 19:19:26',4,22),(88,'2022-10-28',6000,'2022-10-21 08:00:00','2022-10-21 08:30:00','2022-10-26 19:29:12','2022-10-26 19:31:20',2,7),(89,'2022-11-25',6500,'2022-10-10 09:00:00','2022-10-10 09:30:00','2022-10-26 19:31:49','2022-10-26 19:31:54',9,11),(90,'2022-10-14',2500,'2022-10-21 12:30:00','2022-10-21 13:00:00','2022-10-26 19:32:11','2022-10-26 19:32:11',4,8),(91,'2022-10-24',4500,'2022-10-21 11:30:00','2022-10-21 12:00:00','2022-10-26 19:32:38','2022-10-26 19:32:43',11,6),(92,'2022-11-15',3400,'2022-10-21 09:30:00','2022-10-21 10:00:00','2022-10-26 19:32:53','2022-10-26 19:33:25',2,15),(93,'2022-10-24',9000,'2022-10-21 14:30:00','2022-10-21 15:00:00','2022-10-26 19:33:38','2022-10-26 19:33:41',4,12),(94,'2022-11-11',8900,'2022-10-21 17:30:00','2022-10-21 18:00:00','2022-10-26 19:33:55','2022-10-26 19:33:58',14,21),(95,'2022-10-16',9000,'2022-10-21 13:30:00','2022-10-21 14:00:00','2022-10-26 19:34:07','2022-10-26 19:34:11',1,5),(96,'2022-10-12',12000,'2022-10-14 05:30:00','2022-10-14 07:30:00','2022-10-24 20:01:26','2022-10-25 13:16:00',2,5),(97,'2022-11-26',18000,'2022-10-08 09:30:00','2022-10-08 10:00:00','2022-10-24 20:53:25','2022-10-24 20:54:22',10,17),(98,'2022-11-09',20000,'2022-10-08 11:30:00','2022-10-08 12:00:00','2022-10-25 11:17:06','2022-10-25 12:59:28',11,22),(99,'2022-11-05',3500,'2022-10-19 09:00:00','2022-10-19 09:30:00','2022-10-25 11:18:58','2022-10-25 13:05:06',6,6),(100,'2022-11-04',9600,'2022-10-18 15:00:00','2022-10-18 15:30:00','2022-10-25 12:43:28','2022-10-25 13:05:11',7,5),(101,'2022-10-16',3500,'2022-10-14 09:00:00','2022-10-14 09:30:00','2022-10-25 12:50:16','2022-10-25 13:05:15',2,21),(102,'2022-10-22',3100,'2022-10-17 13:00:00','2022-10-17 13:30:00','2022-10-25 12:53:30','2022-10-25 12:59:30',1,13),(103,'2022-10-25',2000,'2022-10-11 06:00:00','2022-10-11 06:30:00','2022-10-25 13:08:41','2022-10-25 13:10:56',12,12),(104,'2022-10-04',1500,'2022-10-03 17:00:00','2022-10-03 17:30:00','2022-10-25 13:13:24','2022-10-25 13:13:32',12,10),(105,'2022-11-04',1500,'2022-10-03 19:00:00','2022-10-03 19:30:00','2022-10-26 12:08:33','2022-10-26 19:31:33',14,22),(106,'2022-10-01',1000,'2022-10-03 14:00:00','2022-10-03 14:30:00','2022-10-26 19:19:26','2022-10-26 19:19:26',9,15),(107,'2022-11-15',9000,'2022-10-25 19:00:00','2022-10-25 19:30:00','2022-10-26 19:29:12','2022-10-27 13:25:38',8,5),(108,'2022-10-29',3500,'2022-10-26 12:30:00','2022-10-26 13:30:00','2022-10-26 19:31:49','2022-10-26 19:31:54',11,21),(109,'2022-11-26',7800,'2022-10-19 11:00:00','2022-10-19 11:30:00','2022-10-26 19:32:11','2022-10-26 19:32:11',10,19),(110,'2022-10-26',7100,'2022-10-26 19:30:00','2022-10-26 21:30:00','2022-10-26 19:32:38','2022-10-27 13:11:34',8,21),(111,'2022-10-29',6300,'2022-10-26 07:30:00','2022-10-26 08:30:00','2022-10-26 19:32:53','2022-10-26 19:33:25',13,21),(112,'2022-11-28',9500,'2022-10-17 09:30:00','2022-10-17 10:30:00','2022-10-26 19:33:38','2022-10-26 19:33:41',6,19),(113,'2022-10-21',3000,'2022-10-03 13:00:00','2022-10-03 13:30:00','2022-10-26 19:33:55','2022-10-26 19:33:58',7,17),(114,'2022-10-11',1100,'2022-10-03 16:00:00','2022-10-03 16:30:00','2022-10-26 19:34:07','2022-10-26 19:34:11',8,18),(115,'2022-11-20',1200,'2022-10-03 17:00:00','2022-10-03 17:30:00','2022-10-24 20:01:26','2022-10-25 13:16:00',5,11),(116,'2022-10-08',1300,'2022-10-03 19:00:00','2022-10-03 19:30:00','2022-10-24 20:53:25','2022-10-24 20:54:22',6,8),(117,'2022-10-22',4500,'2022-10-03 14:00:00','2022-10-03 14:30:00','2022-10-25 11:17:06','2022-10-25 12:59:28',3,21),(118,'2022-10-21',4000,'2022-10-25 19:00:00','2022-10-25 19:30:00','2022-10-25 11:18:58','2022-10-25 13:05:06',9,9),(119,'2022-11-13',2500,'2022-10-26 12:30:00','2022-10-26 13:30:00','2022-10-25 12:43:28','2022-10-25 13:05:11',10,16),(120,'2022-11-15',15000,'2022-10-19 11:00:00','2022-10-19 11:30:00','2022-10-25 12:50:16','2022-10-25 13:05:15',8,21),(121,'2022-10-06',2500,'2022-10-26 15:30:00','2022-10-26 16:30:00','2022-10-25 12:53:30','2022-10-25 12:59:30',11,5),(122,'2022-11-08',2500,'2022-10-26 07:30:00','2022-10-26 08:30:00','2022-10-25 13:08:41','2022-10-25 13:10:56',7,13),(123,'2022-10-23',4000,'2022-10-17 09:30:00','2022-10-17 10:30:00','2022-10-25 13:13:24','2022-10-25 13:13:32',5,19),(124,'2022-11-24',4000,'2022-10-03 13:00:00','2022-10-03 13:30:00','2022-10-26 12:08:33','2022-10-26 19:31:33',5,8),(125,'2022-11-03',4600,'2022-10-03 16:00:00','2022-10-03 16:30:00','2022-10-26 19:19:26','2022-10-26 19:19:26',3,7),(126,'2022-11-08',3500,'2022-10-03 17:00:00','2022-10-03 17:30:00','2022-10-26 19:29:12','2022-10-26 19:31:20',8,12),(127,'2022-10-04',1400,'2022-10-03 19:00:00','2022-10-03 19:30:00','2022-10-26 19:31:49','2022-10-26 19:31:54',15,22),(128,'2022-11-07',1000,'2022-10-03 14:00:00','2022-10-03 14:30:00','2022-10-26 19:32:11','2022-10-26 19:32:11',7,9),(129,'2022-11-15',4000,'2022-10-25 19:00:00','2022-10-25 19:30:00','2022-10-26 19:32:38','2022-10-26 19:32:43',6,17),(130,'2022-11-29',3000,'2022-10-26 12:30:00','2022-10-26 13:30:00','2022-10-26 19:32:53','2022-10-26 19:33:25',7,7),(131,'2022-10-17',9000,'2022-10-19 11:00:00','2022-10-19 11:30:00','2022-10-26 19:33:38','2022-10-26 19:33:41',10,16),(132,'2022-10-26',4600,'2022-10-26 15:30:00','2022-10-26 18:00:00','2022-10-26 19:33:55','2022-10-27 13:35:34',9,20),(133,'2022-10-09',4800,'2022-10-26 07:30:00','2022-10-26 08:30:00','2022-10-26 19:34:07','2022-10-26 19:34:11',11,10),(134,'2022-10-09',7000,'2022-10-17 09:30:00','2022-10-17 11:30:00','2022-10-24 20:01:26','2022-10-25 13:16:00',3,21),(135,'2022-11-01',3000,'2022-10-03 13:00:00','2022-10-03 13:30:00','2022-10-24 20:53:25','2022-10-24 20:54:22',3,21),(136,'2022-10-31',2500,'2022-10-03 16:00:00','2022-10-03 17:00:00','2022-10-25 11:17:06','2022-10-25 12:59:28',9,12),(137,'2022-11-06',3200,'2022-10-03 17:00:00','2022-10-03 19:00:00','2022-10-25 11:18:58','2022-10-25 13:05:06',5,19),(138,'2022-10-06',3400,'2022-10-03 19:00:00','2022-10-03 20:00:00','2022-10-25 12:43:28','2022-10-25 13:05:11',14,7),(139,'2022-10-22',3500,'2022-10-03 14:00:00','2022-10-03 14:30:00','2022-10-25 12:50:16','2022-10-25 13:05:15',4,14),(140,'2022-11-17',6000,'2022-10-25 19:00:00','2022-10-25 21:00:00','2022-10-25 12:53:30','2022-10-25 12:59:30',9,8),(141,'2022-10-26',6500,'2022-10-26 10:00:00','2022-10-26 12:00:00','2022-10-25 13:08:41','2022-10-27 13:35:28',1,5),(142,'2022-10-17',2500,'2022-10-19 11:00:00','2022-10-19 15:00:00','2022-10-25 13:13:24','2022-10-25 13:13:32',7,16),(143,'2022-10-26',4500,'2022-10-26 18:00:00','2022-10-26 19:00:00','2022-10-26 12:08:33','2022-10-27 13:35:36',9,5),(144,'2022-11-04',3400,'2022-10-26 07:30:00','2022-10-26 08:30:00','2022-10-26 19:19:26','2022-10-26 19:19:26',7,13),(145,'2022-11-22',9000,'2022-10-17 09:30:00','2022-10-17 10:30:00','2022-10-26 19:29:12','2022-10-26 19:31:20',15,8),(146,'2022-10-07',8900,'2022-10-03 13:00:00','2022-10-03 14:00:00','2022-10-26 19:31:49','2022-10-26 19:31:54',11,14),(147,'2022-10-25',9000,'2022-10-03 16:00:00','2022-10-03 17:00:00','2022-10-26 19:32:11','2022-10-26 19:32:11',10,6),(148,'2022-11-08',12000,'2022-10-03 17:00:00','2022-10-03 19:00:00','2022-10-26 19:32:38','2022-10-26 19:32:43',11,11),(149,'2022-10-01',18000,'2022-10-03 19:00:00','2022-10-03 20:00:00','2022-10-26 19:32:53','2022-10-26 19:33:25',4,13),(150,'2022-11-01',20000,'2022-10-22 15:30:00','2022-10-22 17:30:00','2022-10-22 12:55:29','2022-10-24 13:59:06',6,6),(151,'2022-10-10',3500,'2022-10-22 13:30:00','2022-10-22 15:30:00','2022-10-22 12:57:27','2022-10-24 18:42:15',10,12),(152,'2022-10-02',9600,'2022-10-22 15:30:00','2022-10-22 16:30:00','2022-10-22 12:55:29','2022-10-24 13:59:06',3,16),(153,'2022-10-27',3500,'2022-10-22 13:30:00','2022-10-22 19:30:00','2022-10-22 12:57:27','2022-10-24 18:42:15',6,6),(154,'2022-11-27',3100,'2022-10-22 17:30:00','2022-10-22 18:30:00','2022-10-22 12:59:41','2022-10-22 12:59:41',12,5),(155,'2022-11-28',2000,'2022-10-24 21:00:00','2022-10-24 23:00:00','2022-10-24 19:55:55','2022-10-24 20:54:27',9,8),(156,'2022-10-24',1500,'2022-10-24 12:30:00','2022-10-24 14:30:00','2022-10-24 20:01:26','2022-10-27 13:36:46',8,18),(157,'2022-10-30',1500,'2022-10-24 16:30:00','2022-10-24 17:30:00','2022-10-24 20:53:25','2022-10-24 20:54:22',7,14),(158,'2022-10-27',4000,'2022-10-27 17:30:00','2022-10-27 18:00:00','2022-10-27 13:07:17','2022-10-27 13:13:01',3,7),(159,'2022-10-13',2300,'2022-10-13 10:00:00','2022-10-13 10:30:00','2022-10-27 13:08:49','2022-10-27 13:08:52',3,6),(160,'2022-10-27',600,'2022-10-27 10:30:00','2022-10-27 12:00:00','2022-10-27 13:11:58','2022-10-27 13:24:21',43,11),(161,'2022-10-27',2000,'2022-10-27 13:00:00','2022-10-27 19:00:00','2022-10-27 13:12:08','2022-10-27 13:24:23',5,10);
/*!40000 ALTER TABLE `turnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (7,'marcos','$2b$10$PxnTcVsZYIxF22ixA7u.0.mkrp/8EtdK21spMKgs0bdoQkyJQp.sC','2022-10-25 18:21:24','2022-10-25 18:21:24');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-27 10:37:41
