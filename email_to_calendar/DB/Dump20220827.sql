CREATE DATABASE  IF NOT EXISTS `colombian_quest` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `colombian_quest`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: colombian_quest
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
-- Table structure for table `destinies`
--

DROP TABLE IF EXISTS `destinies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destinies` (
  `id_destinies` int NOT NULL AUTO_INCREMENT,
  `destiny` varchar(45) NOT NULL,
  PRIMARY KEY (`id_destinies`),
  UNIQUE KEY `iddestinies_UNIQUE` (`id_destinies`),
  UNIQUE KEY `destinie_UNIQUE` (`destiny`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destinies`
--

LOCK TABLES `destinies` WRITE;
/*!40000 ALTER TABLE `destinies` DISABLE KEYS */;
INSERT INTO `destinies` VALUES (3,'Chicaque'),(4,'Suesca'),(2,'Villa de Leyva'),(1,'Zipaquirá');
/*!40000 ALTER TABLE `destinies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destinies_vehicle_type`
--

DROP TABLE IF EXISTS `destinies_vehicle_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destinies_vehicle_type` (
  `id_destinies_vehicle_type` int NOT NULL AUTO_INCREMENT,
  `id_destiny_fk` int NOT NULL,
  `id_vehicle_type_fk` int NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`id_destinies_vehicle_type`),
  UNIQUE KEY `iddestinies_vehicle_type_UNIQUE` (`id_destinies_vehicle_type`),
  KEY `1_idx` (`id_destiny_fk`),
  KEY `2_idx` (`id_vehicle_type_fk`),
  CONSTRAINT `1` FOREIGN KEY (`id_destiny_fk`) REFERENCES `destinies` (`id_destinies`),
  CONSTRAINT `2` FOREIGN KEY (`id_vehicle_type_fk`) REFERENCES `vehicle_type` (`id_vehicle_type`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destinies_vehicle_type`
--

LOCK TABLES `destinies_vehicle_type` WRITE;
/*!40000 ALTER TABLE `destinies_vehicle_type` DISABLE KEYS */;
INSERT INTO `destinies_vehicle_type` VALUES (1,1,1,380),(2,1,2,513),(3,2,1,620),(4,2,2,868),(5,3,1,300),(6,3,2,399),(7,4,1,410),(8,4,2,545);
/*!40000 ALTER TABLE `destinies_vehicle_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle_type`
--

DROP TABLE IF EXISTS `vehicle_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle_type` (
  `id_vehicle_type` int NOT NULL AUTO_INCREMENT,
  `vehicle_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_vehicle_type`),
  UNIQUE KEY `idvehicle_type_UNIQUE` (`id_vehicle_type`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle_type`
--

LOCK TABLES `vehicle_type` WRITE;
/*!40000 ALTER TABLE `vehicle_type` DISABLE KEYS */;
INSERT INTO `vehicle_type` VALUES (1,'carro'),(2,'van');
/*!40000 ALTER TABLE `vehicle_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-27 17:28:55
