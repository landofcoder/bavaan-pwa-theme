import React, {Fragment} from 'react';
import { useParams } from 'react-router-dom';
import { useBrandInfo } from '../../hooks/useBrandInfo';
import LoadingIndicator from "@magento/venia-ui/lib/components/LoadingIndicator";
import defaultClasses from './brandInfo.css';
import { Link } from 'react-router-dom';
import { Title } from "@magento/venia-ui/lib/components/Head";
import { mergeClasses } from "../../classify";
import ProductsBrand from "./productsBrand";
import { Util } from '@magento/peregrine';
const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();

const BrandInfo = props => {
    const brandConfiguration = storage.getItem('BrandConfiguration');
    const brand_list_page_page_title = brandConfiguration && brandConfiguration.Brand && brandConfiguration.Brand.brand_list_page_page_title ? brandConfiguration.Brand.brand_list_page_page_title : "All Brands"
    const { brandUrl } = useParams();
    const { brandData, brandError, brandLoading } = useBrandInfo({ brandUrl });

    let brand = null;
    if (brandLoading) {
        return <LoadingIndicator/>
    }
    if (brandError) {
        return 'Something wrong'
    }
    if (
        brandData &&
        brandData.lofBrandList &&
        brandData.lofBrandList.items &&
        brandData.lofBrandList.total_count !== 0
        ) {
        brand = brandData.lofBrandList.items[0]
    }

    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <Fragment>
            {/*<Breadcrumbs brandId={brand.brand_id} />*/}
            <Title>{brand.name}</Title>
            <div className={classes.breadCrumb}>
                <Link className={classes.breadCrumbLink} to="/">{`Home`}</Link>
                <span className={classes.breadCrumbSeparator}>{`/`}</span>
                <Link className={classes.breadCrumbLink} to="/brands.html">{brand_list_page_page_title}</Link>
                <span className={classes.breadCrumbSeparator}>{`/`}</span>
                <span className={classes.breadCrumbText}>{brand.name}</span>
            </div>
            <div className={classes.brandImage}>
                <img src={brand.image} className={classes.brandImage} alt={brand.name}/>
            </div>
            <ProductsBrand id={brand.brand_id} classes={classes}/>
        </Fragment>
    )
};
export default BrandInfo;
