import { gql } from '@apollo/client';

export const GET_BANNERS_SLIDER = gql`
    query getBannerSlider($sliderId: Int!) {
        lofBannerSlider(sliderId: $sliderId) {
            banners {
                link
                resource_path
                resource_type
                resource_map {
                    max_width
                    min_width
                }
                title
            }
        }
    }
`