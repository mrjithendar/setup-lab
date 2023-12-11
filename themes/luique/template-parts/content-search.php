<?php
/**
 * Template part for displaying results in search pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package luique
 */

?>

<?php

//options
$blog_categories = get_field( 'blog_categories', 'option' );
$blog_excerpt = get_field( 'blog_excerpt', 'option' );

//content
$image = get_the_post_thumbnail_url( get_the_ID(), 'luique_1920xAuto' );
$categories_list = false;

if( $blog_categories ) {
	$categories_list = get_the_category( get_the_ID() );
}

?>

<div class="archive-item scrolla-element-anim-1 scroll-animate" data-animate="active">
	<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		<?php if ( $image ) : ?>
		<div class="image">
			<a href="<?php echo esc_url( get_permalink() ); ?>">
				<img src="<?php echo esc_url( $image ); ?>" alt="<?php echo esc_attr( get_the_title() ); ?>" />
			</a>
		</div>
		<?php endif; ?>
		<div class="desc">
			<?php if ( get_post_type() == 'post' ) : ?>
			<div class="category lui-subtitle">
				<?php

				if ( $categories_list ) {
					$total = count( $categories_list );
					$i = 0;
					foreach ( $categories_list as $category ) { $i++;
						if ( $total != $i ) {
							echo esc_html( $category->cat_name ) . ', ';
						} else {
							echo esc_html( $category->cat_name );
						}
					}
					echo '<span>' . esc_html__( ' / ', 'luique' ) . '</span>';
				}
				if ( ! empty( get_the_title() ) ) {
					echo '<span>' . esc_html( get_the_date() ) . '</span>';
				} else {
					echo '<span><a class="date" href="' . esc_url( get_the_permalink() ) . '">' . esc_html( get_the_date() ) . '</a></span>';
				}

				?>
			</div>
			<?php endif; ?>
			<h5 class="lui-title">
				<a href="<?php echo esc_url( get_permalink() ); ?>"><?php the_title(); ?></a>
			</h5>
			<?php if ( ! $blog_excerpt ) : ?>
			<div class="lui-text">
				<?php the_excerpt(); ?>
			</div>
			<?php endif; ?>
		</div>
	</div><!-- #post-<?php the_ID(); ?> -->
</div>
