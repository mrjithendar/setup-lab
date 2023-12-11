<?php
/**
 * Builder template for footer
 *
 * @package luique
 */

?>

<?php
	$footer_template = get_field( 'footer_template', 'option' );
	$args = array( 'post_type' => 'hf_templates', 'p' => $footer_template );
?>

<div class="footer__builder">
    <?php
    	$loop = new WP_Query( $args );
		    while ( $loop->have_posts() ) : $loop->the_post();
		        the_content();
		    endwhile; wp_reset_postdata();
    ?>
</div>