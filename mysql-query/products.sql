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
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `sale_price` decimal(10,2) DEFAULT NULL,
  `stock_quantity` int(11) NOT NULL,
  `weight` decimal(10,2) DEFAULT NULL,
  `dimensions` varchar(100) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `material` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `image_url` varchar(255) DEFAULT NULL,
  `warranty_period` varchar(50) DEFAULT NULL,
  `return_policy` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `category_id`, `brand`, `price`, `sale_price`, `stock_quantity`, `weight`, `dimensions`, `color`, `size`, `material`, `is_active`, `created_at`, `updated_at`, `image_url`, `warranty_period`, `return_policy`) VALUES
(1, 'white shirt yussop', 'This white T-shirt features a bold graphic of Yussop, capturing the character\'s essence in vibrant detail. Made from soft, high-quality cotton, it offers comfort and style with a classic crew neckline and relaxed fit. Perfect for fans and casual wear', 1, 'Urban Threads', 300.00, 150.00, 100, 150.00, '', 'White', 'Medium', 'Cotton', 1, '0000-00-00 00:00:00', '2024-10-10 18:51:13', 'http://localhost:4002/assets/file/white-shirt.jpg', '7 days', 'If you’re not satisfied with your purchase, you can return it within 30 days for a full refund or exchange. Items must be unused and in original condition. Please contact us for return instructions.'),
(2, 'Red tools shirt', 'This vibrant red shirt features a classic design with a comfortable fit. Made from soft, high-quality cotton, it’s perfect for adding a bold pop of color to your wardrobe. Ideal for everyday wear.', 1, 'Urban Threads', 300.00, 200.00, 99, 150.00, '', 'Red', 'Medium', 'Cotton', 1, '0000-00-00 00:00:00', '2024-10-10 18:51:17', 'http://localhost:4002/assets/file/red-shirt.jpg', '6 days', 'If you’re not satisfied with your purchase, you can return it within 30 days for a full refund or exchange. Items must be unused and in original condition. Please contact us for return instructions.'),
(3, 'Blue stunning shirt', 'This vibrant blue shirt features a classic design with a comfortable fit. Made from soft, high-quality cotton, it’s perfect for adding a bold pop of color to your wardrobe. Ideal for everyday wear.', 1, 'Urban Threads', 250.00, 100.00, 93, 150.00, '', 'Blue', 'Medium', 'Cotton', 1, '0000-00-00 00:00:00', '2024-10-10 18:51:21', 'http://localhost:4002/assets/file/blue-shirt.jpg', '6 days', 'If you’re not satisfied with your purchase, you can return it within 30 days for a full refund or exchange. Items must be unused and in original condition. Please contact us for return instructions.'),
(4, 'Grey shoes', 'This vibrant blue shirt features a classic design with a comfortable fit. Made from soft, high-quality cotton, it’s perfect for adding a bold pop of color to your wardrobe. Ideal for everyday wear.', 1, 'New Balance', 500.00, 250.00, 9, 0.00, '', 'Grey white', '16', 'EVA Offers cushioning and shock absorption.', 1, '0000-00-00 00:00:00', '2024-10-10 18:51:25', 'http://localhost:4002/assets/file/grey-shoes.jpg', '6 days', 'If you’re not satisfied with your purchase, you can return it within 30 days for a full refund or exchange. Items must be unused and in original condition. Please contact us for return instructions.'),
(5, 'Green shoes', 'This vibrant blue shirt features a classic design with a comfortable fit. Made from soft, high-quality cotton, it’s perfect for adding a bold pop of color to your wardrobe. Ideal for everyday wear.', 1, 'New Balance', 500.00, 250.00, 6, 0.00, '', 'Lime orange', '16', 'EVA Offers cushioning and shock absorption.', 1, '0000-00-00 00:00:00', '2024-10-10 18:51:30', 'http://localhost:4002/assets/file/green-shoes.jpg', '6 days', 'If you’re not satisfied with your purchase, you can return it within 30 days for a full refund or exchange. Items must be unused and in original condition. Please contact us for return instructions.'),
(6, 'Black Rubber Shoes', 'Durable and waterproof black rubber shoes ideal for outdoor activities.', 1, 'Brand A', 500.00, 300.00, 70, 1.20, '28x10x8 cm', 'Black', '10', 'Rubber', 1, '2024-10-07 14:49:47', '2024-10-10 18:51:34', 'http://localhost:4002/assets/file/black-rubber-shoes.jpg', '1 year', '30 days return policy'),
(7, 'Brown Cap', 'Stylish brown cap made from breathable material.', 2, 'Brand B', 400.00, 200.00, 192, 0.30, '15x15x10 cm', 'Brown', 'One Size', 'Cotton', 1, '2024-10-07 14:49:47', '2024-10-10 18:51:37', 'http://localhost:4002/assets/file/brown-cap.jpg', '6 months', '14 days return policy'),
(8, 'Red Cap', 'Trendy red cap perfect for casual outings.', 2, 'Brand C', 500.00, 350.00, 144, 0.30, '15x15x10 cm', 'Red', 'One Size', 'Polyester', 1, '2024-10-07 14:49:47', '2024-10-10 18:51:41', 'http://localhost:4002/assets/file/red-cap.jpg', '6 months', '14 days return policy');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
