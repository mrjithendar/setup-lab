<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package luique
 */

?>

<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="description">
		<div class="post-content scrolla-element-anim-1 scroll-animate" data-animate="active">
			<?php the_content(); ?>
			<?php luique_entry_footer(); ?>
		</div>
	</div>
</div><!-- #post-<?php the_ID(); ?> -->