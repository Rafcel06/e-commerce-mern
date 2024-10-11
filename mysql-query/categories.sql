-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 11, 2024 at 07:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e-commerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `parent_id`) VALUES
(1, 'Apparel & Accessories', 'A diverse range of clothing and accessories, including stylish apparel, footwear, and essential accessories. From everyday wear to special occasions, this category offers items that blend fashion with function.', 1),
(2, 'Electronics', 'Cutting-edge gadgets and devices designed to enhance your lifestyle, including smartphones, computers, home appliances, and audio equipment. Discover the latest technology to stay connected and entertained.', 2),
(3, 'Home & Garden', 'Everything you need to create a comfortable and stylish living space. This category features furniture, décor, kitchenware, and garden supplies to enhance both indoor and outdoor environments.', 3),
(4, 'Health & Beauty', 'Products aimed at improving personal well-being and appearance. From skincare and cosmetics to health supplements and fitness equipment, find solutions for maintaining a healthy lifestyle and radiant look.', 4),
(5, 'Sports & Outdoors', 'Gear and equipment designed for athletic and outdoor activities. This category includes everything from sports apparel and fitness equipment to camping gear and outdoor accessories, catering to enthusiasts and adventurers', 5),
(6, 'Toys & Games', 'A variety of toys and games for children of all ages. This category features educational toys, interactive games, and outdoor play equipment to foster creativity, learning, and fun.', 6),
(7, 'Office Supplies', 'Essential items for an organized and productive workspace. This category offers stationery, office furniture, and technology solutions to support efficiency and comfort in your work environment.', 7),
(8, 'Books & Media', 'An extensive collection of books, music, movies, and other media. Explore bestsellers, classic literature, and multimedia entertainment to satisfy your reading and viewing preferences.', 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `parent_id` (`parent_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
