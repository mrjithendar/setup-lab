<?php
/**
 * Custom template tags for this theme
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package luique
 */

if ( ! function_exists( 'luique_get_categories' ) ) {
	/**
	 * Displays Categories
	 */
	function luique_get_categories( $taxonomy, $order_by = 'DESC' ) {
		$args = array(
			'type'			=> 'post',
			'child_of'		=> 0,
			'parent'		=> '',
			'orderby'		=> 'name',
			'order'			=> $order_by,
			'hide_empty'	=> 1,
			'hierarchical'	=> 1,
			'taxonomy'		=> $taxonomy,
			'pad_counts'	=> false
		);

		return get_categories( $args );
	}
}

if ( ! function_exists( 'luique_post_details' ) ) :
	/**
	 * Displays post details: date, author, categories.
	 */
	function luique_post_details() {
		if ( is_singular() ) :
			$categories_list = get_the_category_list( esc_html__( ', ', 'luique' ) );

			if ( $categories_list ) :
				printf( esc_html__( '%1$s / ', 'luique' ), $categories_list );
			endif;

			echo esc_html( get_the_date() ) . esc_html__( ' / by ', 'luique' ) . '<a href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a>';


		endif; // End is_singular().
	}
endif;

if ( ! function_exists( 'luique_post_author' ) ) :
	/**
	 * Displays post details: date, author, categories.
	 */
	function luique_post_author() {
		if ( is_singular() ) :
			echo esc_html__( 'by ', 'luique' ) . '<a href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '">' . esc_html( get_the_author() ) . '</a>';
		endif; // End is_singular().
	}
endif;

if ( ! function_exists( 'luique_post_navigation' ) ) :
	/**
	 * Displays an optional next link.
	 */
	function luique_post_navigation() {
		if ( is_singular() ) :

			$next_post = get_adjacent_post( false, '', true );

			?>

			<?php if ( is_a( $next_post, 'WP_Post' ) ) : ?>

			<!-- Section Navigation -->
			<div class="section section-inner m-page-navigation">
				<div class="container">
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-10 offset-1">

							<div class="h-titles h-navs">
								<a href="<?php echo esc_url( get_permalink( $next_post->ID ) ); ?>">
									<span class="nav-arrow splitting-text-anim-1 scroll-animate" data-splitting="chars" data-animate="active">
										<?php echo esc_html__( 'Next Article', 'luique' ); ?>
									</span>
									<span class="h-title splitting-text-anim-2 scroll-animate" data-splitting="chars" data-animate="active">
										<?php echo wp_kses_post( get_the_title( $next_post->ID ) ); ?>
									</span>
								</a>
							</div>

						</div>
					</div>
				</div>
			</div>

			<?php endif; ?>

		<?php
		endif; // End is_singular().
	}
endif;

if ( ! function_exists( 'luique_entry_footer' ) ) :
	/**
	 * Prints HTML with meta information for the categories, tags and comments.
	 */
	function luique_entry_footer() {
		// Hide category and tag text for pages.
		if ( 'post' === get_post_type() ) {
			/* translators: used between list items, there is a space after the comma */
			$tags_list = get_the_tag_list( '', esc_html_x( '', 'list item separator', 'luique' ) );
			if ( $tags_list ) {
				/* translators: 1: list of tags. */
				echo '<span class="tags-links">' . '<span>' . esc_html__( 'Tags:', 'luique' ) . '</span>' . $tags_list . '</span>';
			}
		}

		edit_post_link(
			sprintf(
				wp_kses(
					/* translators: %s: Name of current post. Only visible to screen readers */
					__( 'Edit <span class="screen-reader-text">%s</span>', 'luique' ),
					array(
						'span' => array(
							'class' => array(),
						),
					)
				),
				get_the_title()
			),
			'<span class="edit-link">',
			'</span>'
		);
	}
endif;

if ( ! function_exists( 'luique_comment' ) ) {
	/**
	 * Displays post comments.
	 */
	function luique_comment( $comment, $args, $depth ) {
		?>
			<!-- Item Comment -->
			<li <?php comment_class( 'comment-item' ); ?> id="li-comment-<?php comment_ID(); ?>">
				<div id="comment-<?php comment_ID(); ?>" class="comment comment-box">
					<?php
						$avatar_size = 64;
						if ( '0' != $comment->comment_parent ){
							$avatar_size = 64;
						}
						echo get_avatar( $comment, $avatar_size );
					?>
					<div class="comment-box__body">
						<div class="content-caption post-content description">
							<h5 class="comment-box__details"><?php comment_author_link(); ?> <span><?php comment_date(); ?></span></h5>
							<?php comment_text(); ?>
						</div>
					</div>
					<div class="comment-footer">
						<?php comment_reply_link( array_merge( $args, array( 'depth' => $depth, 'max_depth' => $args['max_depth'] ) ) ); ?>
					</div>
				</div>
		<?php
	}
}
