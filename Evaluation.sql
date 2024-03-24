-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 23, 2024 at 05:14 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webextension`
--

-- --------------------------------------------------------

--
-- Table structure for table `Evaluation`
--

CREATE TABLE `Evaluation` (
  `userId` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `detected` text DEFAULT NULL,
  `accuracy` text NOT NULL,
  `timeline` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Evaluation`
--

INSERT INTO `Evaluation` (`userId`, `comment`, `detected`, `accuracy`, `timeline`) VALUES
(10, 'I have trouble with massive graph and words combine together\n', NULL, 'yes', '2024-02-27 09:30:59'),
(11, 'can not connect analysis with KIPs', NULL, 'yes', '2024-02-27 15:37:40'),
(17, 'I can not find that', 'circling', 'yes', '2024-03-05 00:15:59');

--
-- Triggers `Evaluation`
--
DELIMITER $$
CREATE TRIGGER `delete_empty` BEFORE INSERT ON `Evaluation` FOR EACH ROW IF NEW.accuracy = '' THEN
        DELETE FROM Evaluation WHERE userId = NEW.userId;
    END IF
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Evaluation`
--
ALTER TABLE `Evaluation`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Evaluation`
--
ALTER TABLE `Evaluation`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
