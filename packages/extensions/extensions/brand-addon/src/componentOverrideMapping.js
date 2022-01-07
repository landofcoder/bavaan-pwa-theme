/**
 * Mappings for overwrites
 * example: [`@magento/venia-ui/lib/components/Main/main.js`]: './lib/components/Main/main.js'
 */
module.exports = componentOverride = {
    [`@magento/pwa-buildpack/lib/queries/getStoreConfigData.graphql`]: '@landofcoder/brand-addon/src/overwrites/queries/getStoreConfigData.graphql',
    [`@magento/peregrine/lib/talons/Footer/useFooter.js`]: '@landofcoder/brand-addon/src/overwrites/talons/useFooter.js',
    ['@landofcoder/product-extend-addon/lib/talons/ProductDetail/useBrandList.js']: './wrapperBrandList.js',
    ['@landofcoder/product-extend-addon/lib/talons/Homepage/useTopBrands.js']: './wrapperTopBrands.js'
};
