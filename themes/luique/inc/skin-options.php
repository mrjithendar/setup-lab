<?php
/**
 * Skin
**/
function luique_skin() {
	$cursor_ui = get_field( 'cursor_ui', 'option' );
	$theme_ui = get_field( 'theme_ui', 'option' );
	$bg_color = get_field( 'bg_color', 'options' );
	$extra_bg_color = get_field( 'extra_bg_color', 'options' );
	$text_color = get_field( 'text_color', 'options' );
	$theme_color = get_field( 'theme_color', 'options' );
	$btn_color = get_field( 'btn_color', 'options' );
	$base_font_size = get_field( 'base_font_size', 'options' );
	$heading_font_size = get_field( 'heading_font_size', 'options' );
	$post_heading_font_size = get_field( 'post_heading_font_size', 'options' );

	$text_font_family = get_field( 'text_font_family', 'options' );
	$primary_font_family = get_field( 'primary_font_family', 'options' );

	$menu_items_size = get_field( 'menu_items_size', 'options' );
	$sub_menu_items_size = get_field( 'sub_menu_items_size', 'options' );

	$preloader_color = get_field( 'preloader_color', 'options' );

	$text_color_light = get_field( 'text_color_light', 'options' );
	$bg_color_light = get_field( 'bg_color_light', 'options' );
	$extra_bg_color_light = get_field( 'extra_bg_color_light', 'options' );

	$disable_parallax = get_field( 'disable_parallax', 'options' );
	$disable_lines = get_field( 'disable_figures', 'options' );
?>

<style>

	/* Paragraphs Color */
	<?php if ( $text_color ) : ?>
	html,
	body {
		color: <?php echo esc_attr( $text_color ); ?>;
	}
	<?php endif; ?>
	<?php if ( $text_color_light ) : ?>
	body.dark-skin,
	.dark-skin .header .logo .logotype__sub {
		color: <?php echo esc_attr( $text_color_light ); ?>;
	}
	<?php endif; ?>

	/* BG Color */
	<?php if ( $bg_color || $extra_bg_color ) : ?>
	body,
	.section.section-inner,
	.history-item .name.active:after,
	.works-item .image:before,
	.works-item .image:after,
	.works-item .image .img:before,
	.works-item .image .img:after,
	.preloader:before,
	.menu-full-overlay:before {
	 background-color: <?php echo esc_attr( $bg_color ); ?>;
 	}
	.lui-gradient-top {
		background-color: transparent;
		background-image: linear-gradient(0deg, <?php echo esc_attr( $extra_bg_color ); ?> 0%, <?php echo esc_attr( $bg_color ); ?> 100%);
	}
	.lui-gradient-bottom,
	.section.section-inner.started-heading {
		background-color: transparent;
		background-image: linear-gradient(180deg, <?php echo esc_attr( $extra_bg_color ); ?> 0%, <?php echo esc_attr( $bg_color ); ?> 100%);
	}
	.lui-gradient-center {
		background-color: transparent;
		background-image: linear-gradient(180deg, <?php echo esc_attr( $bg_color ); ?> 0%, <?php echo esc_attr( $bg_color ); ?> 100%);
	}
	<?php endif; ?>

	/* Extra BG Color */
	<?php if ( $bg_color_light || $extra_bg_color_light ) : ?>
	body.dark-skin,
	.dark-skin .section.section-inner,
	.dark-skin .history-item .name:after,
	.dark-skin .works-item .image:before,
	.dark-skin .works-item .image:after,
	.dark-skin .works-item .image .img:before,
	.dark-skin .works-item .image .img:after,
	.dark-skin .preloader:before,
	.dark-skin .menu-full-overlay:before {
		background-color: <?php echo esc_attr( $bg_color_light ); ?>;
	}
	.dark-skin .lui-gradient-top {
		background-color: transparent;
		background-image: linear-gradient(0deg, <?php echo esc_attr( $extra_bg_color_light ); ?> 0%, <?php echo esc_attr( $bg_color_light ); ?> 100%);
	}
	.dark-skin .lui-gradient-bottom,
	.dark-skin .section.section-inner.started-heading {
		background-color: transparent;
		background-image: linear-gradient(180deg, <?php echo esc_attr( $extra_bg_color_light ); ?> 0%, <?php echo esc_attr( $bg_color_light ); ?> 100%);
	}
	.dark-skin .lui-gradient-center {
		background-color: transparent;
		background-image: linear-gradient(180deg, <?php echo esc_attr( $bg_color_light ); ?> 0%, <?php echo esc_attr( $bg_color_light ); ?> 100%);
	}
	<?php endif; ?>

	<?php if ( $theme_color ) : ?>
	/* Theme Color */
	a,
	a:link,
	a:active,
	a:visited,
	a.lnk:after,
	.lnk:after,
	.block-quote cite,
	blockquote cite,
	.block-quote cite,
	.wp-block-quote cite,
	.wp-block-quote.is-large cite,
	.wp-block-quote.is-style-large cite,
	.wp-block-pullquote cite,
	.wp-block-calendar a,
	.is-style-outline .wp-block-button__link,
	.menu-full ul li a:hover .char,
	.menu-full ul li a:hover .word,
	.menu-full ul li ul li a:hover .char,
	.menu-full ul li ul li a:hover .word,
	.menu-full ul li ul li.active>a,
	.menu-full ul li.active>a,
	.menu-social-links a:hover i,
	.footer .copyright-text strong, .footer .footer-heading strong,
	.footer .copyright-text b, .footer .footer-heading b,
	.footer .copyright-text a:hover, .footer .footer-heading a:hover,
	.social-links a:hover,
	.m-titles .m-subtitle,
	.h-titles .h-subtitle.red,
	.m-titles .m-subtitle.red,
	.lui-subtitle strong,
	.lui-subtitle b,
	.section.hero-started .subtitle strong,
	.section.hero-started .title strong,
	.section.hero-started .info-list ul li strong,
	.section.hero-started .subtitle b,
	.section.hero-started .title b,
	.section.hero-started .info-list ul li b,
	.skills-item .value .num span,
	.services-item .icon,
	.filter-links a.active,
	.works-items.works-list-items .works-item .desc .category,
	.works-items.works-masonry-items .works-item .desc .category,
	.works-item:hover .desc .name a,
	.pricing-item .icon,
	.pricing-item .price b,
	.pricing-item .list ul li i,
	.archive-item .desc h5 a:hover,
	.contacts-form label strong,
	.contacts-form label b,
	.m-page-navigation a:hover .h-title,
	.content-sidebar ul li a:hover,
	.post-content .wp-block-archives li a:hover,
	.share-post .share-btn:hover,
	.error-page__num,
	.dark-skin .menu-full ul li ul li.active>a,
	.dark-skin .menu-full ul li.active>a,
	.dark-skin .menu-social-links a:hover i,
	.dark-skin .footer .copyright-text a:hover,
	.dark-skin .footer .footer-heading a:hover,
	.dark-skin .social-links a:hover,
	.dark-skin .filter-links a.active,
	.dark-skin .works-item:hover .desc .name a,
	.dark-skin .archive-item .desc h5 a:hover,
	.dark-skin .content-sidebar ul li a:hover,
	.dark-skin .post-content .wp-block-archives li a:hover,
	.dark-skin .share-post .share-btn:hover {
		color: <?php echo esc_attr( $theme_color ); ?>;
	}
	input[type="submit"],
	a.btn:before,
	.btn:before,
	button:before,
	.wp-block-button__link,
	.preloader .spinner,
	.preloader .spinner.spinner-line,
	.swiper-pagination.swiper-pagination-bullets .swiper-pagination-bullet.swiper-pagination-bullet-active,
	.section.hero-started .slide .circle.circle-1,
	.skills-item .dots .dot span,
	.filter-links a:before,
	.pricing-col.center .label,
	a.page-numbers.current,
	a.post-page-numbers.current,
	.page-numbers.current,
	.post-page-numbers.current,
	.content-sidebar .widget-title:before, .content-sidebar h2:before,
	.post-password-form input[type="submit"],
	.dark-skin .swiper-pagination.swiper-pagination-bullets .swiper-pagination-bullet.swiper-pagination-bullet-active,
	.dark-skin .skills-item .dots .dot,
	.dark-skin a.page-numbers.current,
	.dark-skin a.post-page-numbers.current,
	.dark-skin .page-numbers.current,
	.dark-skin .post-page-numbers.current {
		background-color: <?php echo esc_attr( $theme_color ); ?>;
	}
	.wp-block-button__link,
	.is-style-outline .wp-block-button__link,
	.tags-links a,
	.col__sedebar .tagcloud a,
	.wp-block-tag-cloud a,
	.share-post .share-btn:hover,
	.dark-skin .pricing-col.center .label,
	.dark-skin .share-post .share-btn:hover {
		border-color: <?php echo esc_attr( $theme_color ); ?>;
	}
	<?php endif; ?>

	<?php if ( $btn_color ) : ?>
	/* Btn Color */
	input[type="submit"],
	a.btn:before,
	.btn:before,
	button:before,
	.wp-block-button__link,
	.post-password-form input[type="submit"] {
		background-color: <?php echo esc_attr( $btn_color ); ?>;
	}
	.is-style-outline .wp-block-button__link {
		color: <?php echo esc_attr( $btn_color ); ?>;
	}
	.wp-block-button__link,
	.is-style-outline .wp-block-button__link {
		border-color: <?php echo esc_attr( $btn_color ); ?>;
	}
	<?php endif; ?>

	<?php if ( $base_font_size ) : ?>
	/* Base font size */
	html,
	body,
	a.lnk,
	.lnk,
	input[type="text"],
	input[type="email"],
	input[type="search"],
	input[type="password"],
	input[type="tel"],
	input[type="address"],
	input[type="number"],
	textarea {
		font-size: <?php echo esc_attr( $base_font_size ); ?>px;
	}
	<?php endif; ?>

	<?php if ( $heading_font_size ) : ?>
	/* Section heading font size */
	@media screen and (min-width: 1025px) {
		.m-title,
		.m-titles .m-title {
			font-size: <?php echo esc_attr( $heading_font_size ); ?>px;
		}
	}
	<?php endif; ?>

	<?php if ( $post_heading_font_size ) : ?>
	/* Post heading font size */
	@media screen and (min-width: 1025px) {
		.section.section-inner.started-heading .m-titles .m-title {
			font-size: <?php echo esc_attr( $post_heading_font_size ); ?>px;
		}
	}
	<?php endif; ?>

	<?php if ( $text_font_family ) : ?>
	/* Paragraphs Font */
	html,
	body,
	input,
	textarea,
	button,
	input[type="text"],
	input[type="email"],
	input[type="search"],
	input[type="password"],
	input[type="tel"],
	input[type="address"],
	input[type="number"],
	textarea,
	label,
	legend,
	label.error,
	.block-quote,
	blockquote,
	.block-quote,
	.wp-block-quote,
	.wp-block-quote.is-large,
	.wp-block-quote.is-style-large,
	.wp-block-pullquote,
	.block-quote cite,
	blockquote cite,
	.block-quote cite,
	.wp-block-quote cite,
	.wp-block-quote.is-large cite,
	.wp-block-quote.is-style-large cite,
	.wp-block-pullquote cite,
	.menu-full ul li a,
	.menu-full ul li ul li a {
		font-family: '<?php echo esc_attr( $text_font_family['font_name'] ); ?>', serif;
	}
	<?php endif; ?>

	<?php if ( $primary_font_family ) : ?>
	/* Primary Font */
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	.m-title,
	.header .logo .logotype__title,
	.m-titles .m-title,
	.h-titles .h-title,
	.section.hero-started .title,
	.works-items.works-list-items .works-item .desc .name,
	.content-sidebar .widget-title, .content-sidebar h2,
	.section__comments .m-titles .m-title {
		font-family: '<?php echo esc_attr( $primary_font_family['font_name'] ); ?>', serif;
	}
	<?php endif; ?>

	<?php if ( $menu_items_size ) : ?>
	/* Menu size */
	.menu-full ul li a {
		font-size: <?php echo esc_attr( $menu_items_size ); ?>px;
	}
	<?php endif; ?>

	<?php if ( $sub_menu_items_size ) : ?>
	/* Sub Menu size */
	.menu-full ul li ul li a {
		font-size: <?php echo esc_attr( $sub_menu_items_size ); ?>px;
	}
	<?php endif; ?>

	<?php if ( $preloader_color ) : ?>
	/* preloader bg color */
	.preloader:before {
		background: <?php echo esc_attr( $preloader_color ); ?>!important;
	}
	<?php endif; ?>

	<?php if ( $disable_parallax ) : ?>
	/* figures */
	.section.hero-started .slide .circle {
		display: none!important;
	}
	<?php endif; ?>

	<?php if ( $disable_lines ) : ?>
	/* lines */
	.v-line-block {
		display: none!important;
	}
	<?php endif; ?>

	<?php if ( $cursor_ui ) : ?>
	/* cursor */
	.cursor {
		display: none!important;
	}
	<?php endif; ?>

</style>

<?php
}
add_action( 'wp_head', 'luique_skin', 10 );
