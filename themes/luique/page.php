<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package luique
 */

get_header();
?>

	<?php while ( have_posts() ) : the_post(); ?>

	<!-- Section Started Heading -->
	<div class="section section-inner started-heading">
		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">

					<!-- titles -->
					<div class="m-titles align-center">
						<h1 class="m-title scrolla-element-anim-1 scroll-animate" data-animate="active">
							<?php the_title(); ?>
						</h1>
					</div>

				</div>
			</div>
		</div>
	</div>

	<!-- Single Post -->
	<div class="section section-inner m-archive">
		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-10 offset-1">

					<!-- Content -->
					<?php get_template_part( 'template-parts/content', 'page' ); ?>

					<!-- Footer post -->
					<footer class="post-footer scrolla-element-anim-1 scroll-animate" data-animate="active">

						<!-- Post nav -->
						<?php

						wp_link_pages( array(
							'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'luique' ),
							'after'  => '</div>',
						) );

						?>

					</footer>

					<?php if ( comments_open() || get_comments_number() ) : ?>
					<!-- Comments -->
					<div class="comments-post scrolla-element-anim-1 scroll-animate" data-animate="active">
						<?php
							// If comments are open or we have at least one comment, load up the comment template.
							comments_template();
						?>
					</div>
					<?php endif; ?>

					<div class="v-line-left v-line-top"><div class="v-line-block"><span></span></div></div>

				</div>
			</div>
		</div>
	</div>

	<?php endwhile; ?>

<?php
get_footer();
