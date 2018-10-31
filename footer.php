		<footer class="footer"></footer>

	<?php wp_footer(); ?>
  <script>
    var THEME_URL = "<?php echo get_template_directory_uri() ?>";
    var BASEURL = "<?php echo home_url('/wp-json/wp/v2/') ?>";
    var HOMEURL = "<?php echo home_url() ?>";
    var dateFormat = "<?php echo get_option( 'date_format' ) ?>";
    <?php if(is_front_page() && is_home()): ?>
      var rest = "posts/"
      var id = "<?php echo get_the_ID(); ?>";
    <?php elseif (is_front_page()): ?>
      var rest = "pages/"
      var id = "<?php echo get_the_ID(); ?>";
    <?php elseif (is_home()): ?>
      var rest = "posts/"
      var id = "<?php echo get_the_ID(); ?>";
    <?php elseif (is_page()): ?>
      var rest = "pages/"
      var id = "<?php echo get_the_ID(); ?>";
    <?php else: ?>
      var rest = "posts/"
      var id = "<?php echo get_the_ID(); ?>";
    <?php endif; ?>
  </script>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="http://maps.google.com/maps/api/js?key=AIzaSyB7G2H-VADxE_heaPPV31LGpexdZT1nRVY"></script>
  <script src="<?php echo get_template_directory_uri() ?>/js/bundle.js" type="text/javascript" charset="utf-8"></script>
	</body>
</html>
