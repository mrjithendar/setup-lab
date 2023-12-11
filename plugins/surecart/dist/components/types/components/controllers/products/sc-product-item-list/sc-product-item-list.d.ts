/**
 * External dependencies.
 */
import { EventEmitter } from '../../../../stencil-public-runtime';
/**
 * Internal dependencies.
 */
import { Collection, Product } from '../../../../types';
export type LayoutConfig = {
  blockName: string;
  attributes: any;
}[];
export declare class ScProductItemList {
  el: HTMLScProductItemListElement;
  /** Limit to a set of ids.  */
  ids: string[];
  /** Sort */
  sort: string;
  /** Query to search for */
  query: string;
  /** Should allow search */
  searchEnabled: boolean;
  /** Should allow search */
  sortEnabled: boolean;
  /** Should allow collection filter */
  collectionEnabled: boolean;
  /** Show for a specific collection */
  collectionId: string | null;
  /** Show only featured products. */
  featured: boolean;
  /** Should we paginate? */
  paginationEnabled: boolean;
  /** Should we paginate? */
  ajaxPagination: boolean;
  /** Should we auto-scroll to the top when paginating via ajax */
  paginationAutoScroll: boolean;
  layoutConfig: LayoutConfig;
  paginationAlignment: string;
  limit: number;
  products?: Product[];
  loading: boolean;
  /** Busy indicator */
  busy: boolean;
  /** Error notice. */
  error: string;
  /** Product was searched */
  scSearched: EventEmitter<string>;
  currentPage: number;
  currentQuery: string;
  pagination: {
    total: number;
    total_pages: number;
  };
  /** Collections */
  collections: Collection[];
  /** Selected collections */
  selectedCollections: Collection[];
  componentWillLoad(): void;
  doPagination(page: number): void;
  getProducts(): Promise<void>;
  getCollections(): Promise<void>;
  handleSortChange(): Promise<void>;
  updateProducts(): Promise<void>;
  private debounce;
  handleIdsChange(): void;
  fetchProducts(): Promise<void>;
  renderSortName(): string;
  toggleSelectCollection(collection: Collection): void;
  getCollectionsAfterFiltered(): Collection[];
  render(): any;
}
