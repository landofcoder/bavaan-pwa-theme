import { gql } from '@apollo/client';

export const LIST_PRODUCTS_BY_BRAND_ID = gql`
    query lofProductByBrand(
        $brand_id: Int!
        $pageSize: Int
        $currentPage: Int
        $filter: ProductAttributeFilterInput
        $sort: ProductAttributeSortInput
    ) {
        lofBrandById(
            brand_id: $brand_id
        ){
            brand_id
            description
            name
            page_title
            meta_keywords
            meta_description
        }
        lofProductByBrand(
            brand_id: $brand_id
            pageSize: $pageSize
            currentPage: $currentPage
            filter: $filter
            sort: $sort
            ) {
            aggregations {
                label
                count
                attribute_code
                options {
                    label
                    value
                }
            }
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
            total_count
            page_info {
                total_pages
            }
        }
    }
`;

export const GET_FILTER_INPUTS = gql`
    query GetFilterInputsForBrand {
        __type(name: "ProductAttributeFilterInput") {
            inputFields {
                name
                type {
                    name
                }
            }
        }
    }
`;

export default {
    getProductFiltersByBrandQuery: LIST_PRODUCTS_BY_BRAND_ID,
    getFilterInputsQuery: GET_FILTER_INPUTS
};
