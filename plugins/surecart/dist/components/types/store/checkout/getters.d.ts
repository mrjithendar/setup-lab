/**
 * Gets the current checkout for the page.
 */
export declare const currentCheckout: () => any;
/**
 * Is the checkout currently locked.
 * Pass an optional lock name to find if a
 * specific lock name is locking checkout.
 */
export declare const checkoutIsLocked: (lockName?: string) => boolean;
/**
 * Get a line item by product id.
 */
export declare const getLineItemByProductId: (productId: string) => import("src/types").LineItem;
