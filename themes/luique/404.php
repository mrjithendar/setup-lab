<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package luique
 */

get_header();
?>

<?php 

$bg_image = get_field( 'bg_image', 'option' ); 
$content = get_field( 'p404_content', 'option' );

?>

<!-- 404 -->
<div class="parallax-container">
	<div class="flex-conteiner-fluid text-center justify-content-center error-page">
		<div>
			<?php if ( $bg_image ) : ?>
			<svg class="mask-object" viewBox="0 0 431 176">
				<defs>
					<path fill="none" id="thePath" d="M416.1 142.5v31.4h-39.6v-31.4h-74.2v-19L370 5.9h46.1v101.3h14.6v35.3h-14.6zm-196.4 32.6c-34.8 0-63.1-21.1-63.1-57.8v-59c0-36.5 28.3-57.8 63.1-57.8 34.6 0 62.6 21.4 62.6 57.8v59c.1 36.7-28 57.8-62.6 57.8zm-105.1-1.2H75v-31.4H.9v-19L68.5 5.9h46.1v101.3h14.6v35.3h-14.6v31.4z"/>
				</defs>
				<clipPath id="mask">
					<use xlink:href="#thePath"/>
				</clipPath>
				<image clip-path="url(#mask)" width="431" height="176" xlink:href="<?php echo esc_url( $bg_image['sizes']['luique_1920xAuto'] ); ?>" ></image>
				<use xlink:href="#thePath"/>
			</svg>
			<?php else : ?>
			<div class="error-page__num"><?php echo esc_html__( '404', 'luique' ); ?></div>
			<?php endif; ?>
	        <?php if ( $content ) : ?>
		    <div class="paragraph"><?php echo wp_kses_post( $content ); ?></div>
		    <?php else : ?>
		    <div class="paragraph">
		    	<p><?php echo esc_html__( 'We are unable to find the page you are looking for.', 'luique' ); ?></p>
		    </div>
		    <?php endif; ?>
		</div>
	</div>
</div>
<!-- /404 -->

<?php
get_footer();