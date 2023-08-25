<?php
/**
 * Builder template for header
 *
 * @package luique
 */

?>

<?php
	$header_template = get_field( 'header_template', 'option' );
	$args = array( 'post_type' => 'hf_templates', 'p' => $header_template );
?>

<div class="header__builder">
    <?php
    	$loop = new WP_Query( $args );
		    while ( $loop->have_posts() ) : $loop->the_post();
		        the_content();
		    endwhile; wp_reset_postdata();
    ?>
</div>