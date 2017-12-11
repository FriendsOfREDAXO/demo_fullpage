<html lang="<?php echo rex_clang::getCurrent()->getCode(); ?>">
<head>

<!--
	Fullpage-Demo für REDAXO 5
	https://redaxo.org/
	https://friendsofredaxo.github.io/
-->

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title><?php echo $title; ?></title>
	<meta name="keywords" content="<?php echo $keywords; ?>">
	<meta name="description" content="<?php echo $description; ?>">

	<link rel="shortcut icon" href="<?php echo rex_url::base('assets/addons/demo_fullpage/themes/' . $fullpagedemo['theme'] . '/img/favicon.ico'); ?>">
	<link rel="icon" type="image/png" sizes="16x16" href="<?php echo rex_url::base('assets/addons/demo_fullpage/themes/' . $fullpagedemo['theme'] . '/img/favicon-16x16.png'); ?>">
	<link rel="icon" type="image/png" sizes="16x16" href="<?php echo rex_url::base('assets/addons/demo_fullpage/themes/' . $fullpagedemo['theme'] . '/img/favicon-32x32.png'); ?>">

	<link rel="stylesheet" href="<?php echo rex_url::base('assets/addons/demo_fullpage/css/bootstrap.min.css'); ?>">
	<link rel="stylesheet" href="<?php echo rex_url::base('assets/addons/demo_fullpage/css/fullPage.min.css'); ?>">

	<link rel="stylesheet" href="<?php echo rex_url::base('assets/addons/demo_fullpage/themes/' . $fullpagedemo['theme'] . '/css/theme.css'); ?>">

	<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
		<script src="<?php echo rex_url::base('assets/addons/demo_fullpage/js/html5shiv_respond.min.js'); ?>"></script>
	<![endif]-->

</head>

<body>

<div class="loader">Loading ...</div>