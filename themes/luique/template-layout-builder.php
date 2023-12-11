<?php
/**
 * Template Name: Layout builder (Elementor)
 * Template Post Type: page, portfolio
 *
 * @package luique
*/

get_header(); 
?>

<?php

while ( have_posts() ) : the_post(); 

$post_type = get_post_type();

?>

<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php if ( $post_type == 'portfolio' ) : ?>
	<section class="project-single">
	<?php endif; ?>

	<?php the_content(); ?>

	<?php if ( $post_type == 'portfolio' ) : ?>
	</section>
	<?php endif; ?>
</div><!-- #post-<?php the_ID(); ?> -->

<?php

endwhile; 

?>
	
<?php
get_footer();