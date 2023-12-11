<?php
/**
 * BookingCreated.
 * php version 5.6
 *
 * @category BookingCreated
 * @package  SureTriggers
 * @author   BSF <username@example.com>
 * @license  https://www.gnu.org/licenses/gpl-3.0.html GPLv3
 * @link     https://www.brainstormforce.com/
 * @since    1.0.0
 */

namespace SureTriggers\Integrations\WoocommerceBookings\Triggers;

use SureTriggers\Controllers\AutomationController;
use SureTriggers\Traits\SingletonLoader;
use SureTriggers\Integrations\WordPress\WordPress;
use WC_Booking;

if ( ! class_exists( 'BookingCreated' ) ) :

	/**
	 * BookingCreated
	 *
	 * @category BookingCreated
	 * @package  SureTriggers
	 * @author   BSF <username@example.com>
	 * @license  https://www.gnu.org/licenses/gpl-3.0.html GPLv3
	 * @link     https://www.brainstormforce.com/
	 * @since    1.0.0
	 *
	 * @psalm-suppress UndefinedTrait
	 */
	class BookingCreated {

		/**
		 * Integration type.
		 *
		 * @var string
		 */
		public $integration = 'WoocommerceBookings';

		/**
		 * Trigger name.
		 *
		 * @var string
		 */
		public $trigger = 'wc_booking_created';

		use SingletonLoader;

		/**
		 * Constructor
		 *
		 * @since  1.0.0
		 */
		public function __construct() {
			add_filter( 'sure_trigger_register_trigger', [ $this, 'register' ] );
		}

		/**
		 * Register action.
		 *
		 * @param array $triggers trigger data.
		 * @return array
		 */
		public function register( $triggers ) {
			$triggers[ $this->integration ][ $this->trigger ] = [
				'label'         => __( 'Booking Created', 'suretriggers' ),
				'action'        => $this->trigger,
				'common_action' => 'woocommerce_new_booking',
				'function'      => [ $this, 'trigger_listener' ],
				'priority'      => 10,
				'accepted_args' => 1,
			];

			return $triggers;
		}

		/**
		 *  Trigger listener
		 *
		 * @param int $booking_id Booking ID.
		 *
		 * @return void
		 */
		public function trigger_listener( $booking_id ) {

			if ( '' == $booking_id ) {
				return;
			}

			if ( class_exists( 'WC_Booking' ) ) {
				$booking = new WC_Booking( $booking_id );
				if ( method_exists( $booking, 'get_data' ) ) {
					$booking          = $booking->get_data();
					$booking['start'] = gmdate( 'Y-m-d H:i:s', $booking['start'] );
					$booking['end']   = gmdate( 'Y-m-d H:i:s', $booking['end'] );
					$context          = array_merge( $booking, WordPress::get_user_context( $booking['customer_id'] ) );
					
					AutomationController::sure_trigger_handle_trigger(
						[
							'trigger' => $this->trigger,
							'context' => $context,
						]
					);
				}
			}
		}
	}

	/**
	 * Ignore false positive
	 *
	 * @psalm-suppress UndefinedMethod
	 */
	BookingCreated::get_instance();

endif;
