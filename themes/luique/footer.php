<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package luique
 */

?>

<?php

$hide_footer = get_field( 'hide_footer' );
$footer_layout = get_field( 'footer_layout', 'option' );

if ( is_404() ) {
	$hide_footer = 1;
}

?>
	
		</div>

		<?php if ( ! $hide_footer ) : ?>
		<!-- Footer -->
	    <div class="footer<?php if ( ! $footer_layout ) : ?> footer-default<?php endif; ?>">
	    	<?php 
			if ( ! $footer_layout ) :
				get_template_part( 'template-elements/footer', 'default' );
			else :
				get_template_part( 'template-elements/footer', 'builder' );
			endif; ?>
	    </div>
		<?php endif; ?>

	</div>

	<!-- cursor --> 
	<div class="cursor"></div>
	
	<?php wp_footer(); ?>

</body>
</html>