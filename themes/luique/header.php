<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package luique
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<!-- Meta Data -->
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<?php wp_body_open(); ?>

	<?php
		$disable_preloader = get_field( 'disable_preloader', 'option' );
		$header_template = get_field( 'header_template', 'option' );
		$preload_logo_img = get_field( 'preload_logo_img', 'option' );
	?>

	<div class="container-page">

		<?php if ( ! $disable_preloader ) : ?>
		<!-- Preloader -->
		<div class="preloader">
			<div class="centrize full-width">
				<div class="vertical-center">
					<?php if ( $preload_logo_img ) : ?>
					<div class="spinner-logo">
						<img src="<?php echo esc_url( $preload_logo_img ); ?>" alt="<?php echo esc_attr( bloginfo('name') ); ?>" />
						<div class="spinner-dot"></div>
						<div class="spinner spinner-line"></div>
					</div>
					<?php endif; ?>
					<?php if ( ! $preload_logo_img ) : ?>
					<div class="spinner-logo">
						<div class="spinner-dot"></div>
						<div class="spinner spinner-line"></div>
					</div>
					<?php endif; ?>
				</div>
			</div>
		</div>
		<?php endif; ?>

		<!-- Header -->
		<header class="header">
			<?php
			if ( ! $header_template ) :
				get_template_part( 'template-elements/header', 'default' );
			else :
				get_template_part( 'template-elements/header', 'builder' );
			endif; ?>
		</header>

		<!-- Wrapper -->
		<div class="wrapper">
