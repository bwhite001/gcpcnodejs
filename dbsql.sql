-- --------------------------------------------------------

--
-- Table structure for table `Admins`
--

CREATE TABLE IF NOT EXISTS `Admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_super` tinyint(1) DEFAULT '0',
  `username` int(11) DEFAULT NULL,
  `password_digest` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Award_Types`
--

CREATE TABLE IF NOT EXISTS `Award_Types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Bookings`
--

CREATE TABLE IF NOT EXISTS `Bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comp_type` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `range_id` int(11) DEFAULT NULL,
  `shooter_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `range_id` (`range_id`),
  KEY `shooter_id` (`shooter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Grades`
--

CREATE TABLE IF NOT EXISTS `Grades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `grade` varchar(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Match_Types`
--

CREATE TABLE IF NOT EXISTS `Match_Types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `handicap` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Range_Lanes`
--

CREATE TABLE IF NOT EXISTS `Range_Lanes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `range_num` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Scores`
--

CREATE TABLE IF NOT EXISTS `Scores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `pistol_or_rifle` tinyint(1) DEFAULT '0',
  `series_id` int(11) DEFAULT NULL,
  `shooter_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `series_id` (`series_id`),
  KEY `shooter_id` (`shooter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Score_Pistols`
--

CREATE TABLE IF NOT EXISTS `Score_Pistols` (
  `id` int(11) DEFAULT NULL,
  `handicap` int(11) DEFAULT NULL,
  `suported` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Score_Rifles`
--

CREATE TABLE IF NOT EXISTS `Score_Rifles` (
  `id` int(11) DEFAULT NULL,
  `match_type` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  KEY `id` (`id`),
  KEY `match_type` (`match_type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Serieses`
--

CREATE TABLE IF NOT EXISTS `Serieses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` datetime DEFAULT NULL,
  `length` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Shooters`
--

CREATE TABLE IF NOT EXISTS `Shooters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `gender` tinyint(1) DEFAULT '0',
  `grade` int(11) DEFAULT NULL,
  `junior` tinyint(1) DEFAULT '0',
  `cnum` int(11) DEFAULT NULL,
  `rfid` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `grade` (`grade`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Bookings`
--
ALTER TABLE `Bookings`
  ADD CONSTRAINT `Bookings_ibfk_1` FOREIGN KEY (`range_id`) REFERENCES `Range_Lanes` (`id`),
  ADD CONSTRAINT `Bookings_ibfk_2` FOREIGN KEY (`shooter_id`) REFERENCES `Shooters` (`id`);

--
-- Constraints for table `Scores`
--
ALTER TABLE `Scores`
  ADD CONSTRAINT `Scores_ibfk_1` FOREIGN KEY (`series_id`) REFERENCES `Serieses` (`id`),
  ADD CONSTRAINT `Scores_ibfk_2` FOREIGN KEY (`shooter_id`) REFERENCES `Shooters` (`id`);

--
-- Constraints for table `Score_Pistols`
--
ALTER TABLE `Score_Pistols`
  ADD CONSTRAINT `Score_Pistols_ibfk_1` FOREIGN KEY (`id`) REFERENCES `Scores` (`id`);

--
-- Constraints for table `Score_Rifles`
--
ALTER TABLE `Score_Rifles`
  ADD CONSTRAINT `Score_Rifles_ibfk_1` FOREIGN KEY (`id`) REFERENCES `Scores` (`id`),
  ADD CONSTRAINT `Score_Rifles_ibfk_2` FOREIGN KEY (`match_type`) REFERENCES `Match_Types` (`id`);

--
-- Constraints for table `Shooters`
--
ALTER TABLE `Shooters`
  ADD CONSTRAINT `Shooters_ibfk_1` FOREIGN KEY (`grade`) REFERENCES `Grades` (`id`);