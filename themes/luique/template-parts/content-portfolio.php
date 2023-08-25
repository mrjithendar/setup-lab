<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package luique
 */

?>

<?php

/* post content */
$current_categories = get_the_terms( get_the_ID(), 'portfolio_categories' );
$categories_string = '';
$categories_slugs_string = '';
if ( $current_categories && ! is_wp_error( $current_categories ) ) {
	$arr_keys = array_keys( $current_categories );
	$last_key = end( $arr_keys );
	foreach ( $current_categories as $key => $value ) {
		if ( $key == $last_key ) {
			$categories_string .= $value->name . ' ';
		} else {
			$categories_string .= $value->name . ', ';
		}
		$categories_slugs_string .= 'sorting-' . $value->slug . ' ';
	}
}

$image = get_the_post_thumbnail_url( get_the_ID(), 'luique_900xAuto' );
$id = get_the_ID();
$title = get_the_title();
$popup_url = get_the_permalink();

$portfolio_short_text = get_field( 'portfolio_short_text', $id );
$portfolio_link = get_field( 'portfolio_link', $id );
$portfolio_bg_texture = get_field( 'portfolio_bg_texture', $id );
$type = get_field( 'portfolio_type', $id );
$popup_class = '';
$images = false;

if ( $type == 1 ) {
	$popup_url = get_the_post_thumbnail_url( $id, 'full' );
	$popup_class = '';
} elseif ( $type == 2 ) {
	$popup_url = get_field( 'video_url', $id );
	$popup_class = 'has-popup-video';
} elseif ( $type == 3 ) {
	$popup_url = get_the_post_thumbnail_url( $id, 'full' );
	$popup_class = '';
	$images = get_field( 'gallery', $id );
} else {}

?>

<div class="works-col col-xs-12 col-sm-12 col-md-12 col-lg-12 <?php echo esc_attr( $categories_slugs_string ); ?>">
	<div class="works-item scrolla-element-anim-1 scroll-animate" data-animate="active">
		<?php if ( $image ) : ?>
		<div class="image">
			<div class="img">
				<a <?php if ( empty($portfolio_link) ) : ?>href="<?php echo esc_url( $popup_url ); ?>"<?php endif; ?><?php if ( ! empty($portfolio_link) ) : ?>href="<?php echo esc_url( $portfolio_link ); ?>" target="blank"<?php endif; ?> class="<?php echo esc_attr( $popup_class ); ?>"<?php if ( $type == 3 ) : ?> data-elementor-lightbox-title="<?php echo esc_attr( $title ); ?>" data-elementor-lightbox-slideshow="gallery-<?php echo esc_attr( $id ); ?>"<?php endif; ?>>
					<img src="<?php echo esc_url( $image ); ?>" alt="<?php echo esc_attr( $title ); ?>" />
					<span class="overlay"></span>
				</a>
				<?php if( $images ) : ?>
				<div id="gallery-<?php echo esc_attr( $id ); ?>" class="mfp-hide">
					<?php foreach( $images as $image ): ?>
					<?php $gallery_img_src = wp_get_attachment_image_src( $image['ID'], 'full' ); ?>
					<a href="<?php echo esc_url( $gallery_img_src[0] ); ?>"<?php if ( $type == 3 ) : ?> data-elementor-lightbox-slideshow="gallery-<?php echo esc_attr( $id ); ?>" data-elementor-lightbox-title="<?php echo esc_attr( $title ); ?>"<?php endif; ?>></a>
					<?php endforeach; ?>
				</div>
				<?php endif; ?>
			</div>
		</div>
		<?php endif; ?>
		<?php if ( $title || $text ) : ?>
		<div class="desc">
			<?php if ( $categories_string ) : ?>
			<span class="category">
				<?php echo wp_kses_post( $categories_string ); ?>
			</span>
			<?php endif; ?>
			<?php if ( $title ) : ?>
			<h5 class="name">
				<a <?php if ( empty($portfolio_link) ) : ?>href="<?php echo esc_url( $popup_url ); ?>"<?php endif; ?><?php if ( ! empty($portfolio_link) ) : ?>href="<?php echo esc_url( $portfolio_link ); ?>" target="blank"<?php endif; ?> class="<?php echo esc_attr( $popup_class ); ?>"<?php if ( $type == 3 ) : ?> data-elementor-lightbox-title="<?php echo esc_attr( $title ); ?>" data-elementor-lightbox-slideshow="gallery-<?php echo esc_attr( $id ); ?>"<?php endif; ?>>
					<?php echo esc_html( $title ); ?>
				</a>
			</h5>
			<?php endif; ?>
			<?php if ( $portfolio_short_text ) : ?>
			<div class="text">
				<?php echo wp_kses_post( $portfolio_short_text ); ?>
			</div>
			<?php endif; ?>
			<a <?php if ( empty($portfolio_link) ) : ?>href="<?php echo esc_url( $popup_url ); ?>"<?php endif; ?><?php if ( ! empty($portfolio_link) ) : ?>href="<?php echo esc_url( $portfolio_link ); ?>" target="blank"<?php endif; ?> class="<?php echo esc_attr( $popup_class ); ?> lnk"<?php if ( $type == 3 ) : ?> data-elementor-lightbox-title="<?php echo esc_attr( $title ); ?>" data-elementor-lightbox-slideshow="gallery-<?php echo esc_attr( $id ); ?>"<?php endif; ?>>
				<?php echo esc_html__( 'See project', 'luique' ); ?>
			</a>
		</div>
		<?php endif; ?>
		<?php if ( $portfolio_bg_texture ) : ?>
		<div class="bg-img" style="background-image: url(<?php echo esc_url( $portfolio_bg_texture ); ?>);"></div>
		<?php endif; ?>
	</div>
</div>
