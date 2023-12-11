<?php
/**
 * The template for displaying comments
 *
 * This is the template that displays the area of the page that contains both the current comments
 * and the comment form.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package luique
 */

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments.
 */
if ( post_password_required() ) {
	return;
}
?>

<!-- Comments -->
<div id="comments" class="section__comments">

	<?php
	// You can start editing here -- including this comment!
	if ( have_comments() ) :
		?>

		<div class="m-titles">
			<div class="m-title align-left">
				<?php comments_number( esc_html__( 'No comments found', 'luique' ), esc_html__( '1 Comment', 'luique' ), esc_html__( '% Comments', 'luique' ) ); ?>
			</div>
		</div>

		<ul class="comments">
			<?php
			wp_list_comments( array(
				'style'	  => 'ul',
				'avatar_size' => '80',
				'callback' => 'luique_comment'
			) );
			?>
		</ul><!-- .comment-list -->

		<?php
		the_comments_navigation( array(
			'screen_reader_text' => ' ',
			'prev_text' => esc_html__( 'Older comments', 'luique' ),
			'next_text' => esc_html__( 'Newer comments', 'luique' )
		) );

		// If comments are closed and there are comments, let's leave a little note, shall we?
		if ( ! comments_open() ) :
			?>
			<p class="no-comments"><?php esc_html_e( 'Comments are closed.', 'luique' ); ?></p>
			<?php
		endif;

	endif; // Check for have_comments().
	?>

	<div class="form-comment">
		<?php
			$req = get_option( 'require_name_email' );
			$aria_req = ( $req ? " aria-required='true'" : '' );

			$comment_args = array(
				'title_reply' => esc_html__( 'Leave a comment', 'luique' ),
				'title_reply_to' => esc_html__( 'Leave a comment to %s', 'luique' ),
				'cancel_reply_link' => esc_html__( 'Cancel Reply', 'luique' ),
				'title_reply_before' => '<div class="m-titles"><div class="m-title align-left">',
				'title_reply_after' => '</div></div>',
				'label_submit' => esc_html__( 'Submit', 'luique' ),
				'comment_field' => '<div class="group-row"><div class="group"><textarea class="textarea" rows="3" placeholder="' . esc_attr__( 'Comment', 'luique' ).'" id="comment" name="comment" aria-required="true" ></textarea></div></div>',
				'must_log_in' => '<p class="must-log-in">' . esc_html__( 'You must be ', 'luique' ) . '<a href="' . esc_url( wp_login_url( apply_filters( 'the_permalink', get_permalink( ) ) ) ) . '">' . esc_html__( 'logged in', 'luique' ) . '</a>' . esc_html__( ' to post a comment.', 'luique' ) . '</p>',
				'logged_in_as' => '<p class="logged-in-as">' . esc_html__( 'Logged in as ', 'luique' ) . '<a href="' . esc_url( admin_url( 'profile.php' ) ) . '">' . esc_html( $user_identity ) . '</a>' . esc_html__( '. ', 'luique' ) . '<a href="' . esc_url( wp_logout_url( apply_filters( 'the_permalink', get_permalink( ) ) ) ) . '" title="' . esc_attr__( 'Log out of this account', 'luique' ) . '">' . esc_html__( 'Log out?', 'luique' ) . '</a></p>',
				'comment_notes_before' => '',
				'comment_notes_after' => '',
				'fields' => apply_filters( 'comment_form_default_fields', array(
					'author' => '<div class="group-row"><div class="group"><input id="author" name="author" type="text" placeholder="' . esc_attr__( 'Name', 'luique' ) . '" class="input" value="" ' . $aria_req . ' /></div>',
					'email' => '<div class="group"><input id="email" name="email" type="text" placeholder="' . esc_attr__( 'Email', 'luique' ) . '" class="input" value="" ' . $aria_req . ' /></div></div>',
				)),
				'class_submit' => 'btn',
				'submit_field' => ' <div class="group-row"><div class="group">%1$s %2$s</div></div>',
				'submit_button' => '<button type="submit" name="%1$s" id="%2$s" class="%3$s"><span>%4$s</span></button>'
			);

			comment_form( $comment_args );
		?>
	</div>

</div><!-- #comments -->
