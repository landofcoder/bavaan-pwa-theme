import gql from 'graphql-tag';

export const BRAND_FRAGMENT = gql`
    fragment BrandFragment on Brand {
        brand_id
        creation_time
        description
        image
        meta_description
        meta_keywords
        name
        thumbnail
        url_key
        products {
            total_count
            items {
                description {
                    html
                }
                id
                media_gallery_entries {
                    id
                    label
                    position
                    disabled
                    file
                }
                meta_description
                name
                price {
                    regularPrice {
                        amount {
                            currency
                            value
                        }
                    }
                }
                sku
                small_image {
                    url
                }
                url_key
                url_suffix
                ... on ConfigurableProduct {
                    configurable_options {
                        attribute_code
                        attribute_id
                        id
                        label
                        values {
                            default_label
                            label
                            store_label
                            use_default_value
                            value_index
                            swatch_data {
                                ... on ImageSwatchData {
                                    thumbnail
                                }
                                value
                            }
                        }
                    }
                    variants {
                        attributes {
                            code
                            value_index
                        }
                        product {
                            id
                            media_gallery_entries {
                                id
                                disabled
                                file
                                label
                                position
                            }
                            sku
                            stock_status
                            price {
                                regularPrice {
                                    amount {
                                        currency
                                        value
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const LIST_BRANDS = gql`
    query lofBrandList($pageSize: Int) {
        lofBrandList(pageSize: $pageSize) {
            items {
                ...BrandFragment
            }
            page_info {
                current_page
                page_size
                total_pages
            }
            total_count
        }
    }
    ${BRAND_FRAGMENT}
`;

export const LIST_BRANDS_BY_PRODUCT_ID = gql`
    query lofBrandByProduct($product_id: Int) {
        lofBrandByProduct(product_id: $product_id) {
            items {
                ...BrandFragment
            }
            total_count
        }
    }
    ${BRAND_FRAGMENT}
`;

export const GET_SEARCH_BRAND = gql`
    query lofBrandList($brandName: String) {
        lofBrandList(search: $brandName) {
            items {
                ...BrandFragment
            }
            total_count
        }
    }
    ${BRAND_FRAGMENT}
`;

export const GET_GROUPS_BRAND = gql`
    query lofBrandGroups($brandGroupName: String, $pageSize: Int) {
        lofBrandGroups(search: $brandGroupName, pageSize: $pageSize) {
            items {
                group_id
                name
                shown_in_sidebar
                url_key
                brands {
                    items {
                        ...BrandFragment
                    }
                total_count
                }
            }
            total_count
            page_info {
                current_page
                page_size
                total_pages
            }
        }
    }
    ${BRAND_FRAGMENT}
`;

export const GET_STORE_CONFIG_BRAND = gql`
    query storeConfigData {
        storeConfig {
            id
            code
            locale
            secure_base_media_url
            Brand {
                brand_block_addition_class
                brand_block_autoplay
                brand_block_autoplay_pauseonhover
                brand_block_autoplay_timeout
                brand_block_brand_groups
                brand_block_carousel_layout
                brand_block_default_items
                brand_block_dots
                brand_block_enable
                brand_block_interval
                brand_block_item_per_page
                brand_block_large_items
                brand_block_lg_column_item
                brand_block_loop
                brand_block_md_column_item
                brand_block_mobile_items
                brand_block_nav
                brand_block_nav_next
                brand_block_nav_prev
                brand_block_number_item
                brand_block_number_item_per_column
                brand_block_portrait_items
                brand_block_pretext
                brand_block_rtl
                brand_block_show_brand_name
                brand_block_sm_column_item
                brand_block_tablet_items
                brand_block_tablet_small_items
                brand_block_title
                brand_block_xs_column_item
                brand_list_page_grid_config_heading
                brand_list_page_item_per_page
                brand_list_page_layout
                brand_list_page_lg_column_item
                brand_list_page_md_column_item
                brand_list_page_meta_description
                brand_list_page_meta_keywords
                brand_list_page_page_title
                brand_list_page_seo_config_heading
                brand_list_page_show_brand_name
                brand_list_page_sm_column_item
                brand_list_page_xs_column_item
                general_settings_enable
                general_settings_enable_menu
                general_settings_enable_search
                general_settings_route
                general_settings_url_prefix
                general_settings_url_suffix
                group_page_item_per_page
                group_page_lg_column_item
                group_page_md_column_item
                group_page_show_brand_name
                group_page_sm_column_item
                group_page_xs_column_item
                product_view_page_brand_layout_listing
                product_view_page_brand_text
                product_view_page_enable_brand_info
                product_view_page_show_brand_description
                product_view_page_show_brand_image
                product_view_page_show_brand_name
                product_view_page_show_brand_text
            }
        }
    }
`;
