import { gql } from '@apollo/client';

export const LIST_BRANDS = gql`
    query lofBrandList(
        $pageSize: Int
        $currentPage: Int
        $filter: BrandFilterInput
    ) {
        lofBrandList(
            pageSize: $pageSize
            currentPage: $currentPage
            filter: $filter
        ) {
            items {
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
            page_info {
                current_page
                page_size
                total_pages
            }
            total_count
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
    getListBrandsQuery: LIST_BRANDS,
    getFilterInputsQuery: GET_FILTER_INPUTS
};
