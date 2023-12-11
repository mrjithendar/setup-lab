/**
 * Available product prices
 * @returns {Price[]} - Returns an array of prices that are not archived
 */
export declare const availablePrices: () => import("../../types").Price[];
/**
 * Check if product label stock is enabled and not out of stock purchases are allowed.
 *
 * @returns {boolean} - Returns stock needs to be checked or not
 */
export declare const isStockNeedsToBeChecked: boolean;
/**
 * Check if this option is out of stock base on the selected variant.
 */
export declare const isOptionSoldOut: (optionNumber: number, option: string) => boolean;
/**
 * Check if this option is out of stock base on the selected variant.
 */
export declare const isOptionMissing: (optionNumber: number, option: string) => boolean;
/**
 * Is product out of stock.
 *
 * @returns {boolean} - Returns true if product is out of stock
 */
export declare const isProductOutOfStock: () => boolean;
export declare const isSelectedVariantMissing: () => boolean;
