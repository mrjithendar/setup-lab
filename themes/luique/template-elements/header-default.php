<?php
/**
 * Default template for header
 *
 * @package luique
 */

?>

<?php
	$header_logo_img = get_field( 'header_logo_img', 'option' );
	$social_links = get_field( 'social_links', 'option' );
	$social_links_type = get_field( 'social_links_type', 'option' );
?>

<!-- Navbar -->
<div class="navbar default">
	<!-- logo -->
	<div class="logo <?php if ( !$header_logo_img ) : ?>logo-link<?php endif; ?>">
		<a href="<?php echo esc_url( home_url() ); ?>">
			<?php if ( $header_logo_img ) : ?>
			<img src="<?php echo esc_url( $header_logo_img ); ?>" alt="<?php echo esc_attr( bloginfo('name') ); ?>" />
			<?php else : ?>
			<span class="logotype__title"><?php echo esc_html( bloginfo('name') ); ?></span>
			<span class="logotype__sub"><?php echo esc_html( bloginfo('description') ); ?></span>
			<?php endif; ?>
		</a>
	</div>

	<!-- menu btn -->
	<a href="#" class="menu-btn full"><span></span><span></span></a>
</div>

<!-- Menu Full Overlay -->
<div class="menu-full-overlay">

	<div class="menu-full-container">
		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

					<!-- menu full -->
					<div class="menu-full">

						<?php
						if ( has_nav_menu( 'primary' ) ) :
						wp_nav_menu( array(
							'theme_location' => 'primary',
							'container' => '',
							'menu_class' => 'menu-full',
							'walker' => new Luique_Topmenu_Walker(),
						) );
						else:
						wp_nav_menu( array(
							'theme_location' => '',
							'container' => '',
							'menu_class' => 'menu-full',
							'walker' => new Luique_Topmenu_Walker()
						) );
						endif;

						?>

					</div>

					<?php if ( $social_links ) : ?>
					<!-- social -->
					<div class="menu-social-links">
						<?php $i=0; foreach ( $social_links as $link ) : $i++; ?>
						<a href="<?php echo esc_url( $link['url'] ); ?>" target="blank" class="splitting-text-anim-1" data-splitting="chars" title="<?php echo esc_attr( $link['name'] ); ?>">
							<?php if ( $social_links_type == 'icons' ) : ?>
							<i class="<?php echo esc_attr( $link['icon'] ); ?>"></i>
							<?php else : ?>
							<?php echo esc_html( $link['icon_label'] ); ?>
							<?php endif; ?>
						</a>
						<?php endforeach; ?>
					</div>
					<?php endif; ?>

					<div class="v-line-block"><span></span></div>

				</div>
			</div>
		</div>
	</div>

	<div class="menu-overlay"></div>

</div>
