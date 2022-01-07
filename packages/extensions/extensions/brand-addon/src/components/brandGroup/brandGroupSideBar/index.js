import React from 'react';
import { useListAllBrandGroup } from "../../../hooks/useListAllBrandGroup";
import LoadingIndicator from "@magento/venia-ui/lib/components/LoadingIndicator";
import classes from './brandGroupSideBar.css';
import { Link } from 'react-router-dom';

const BrandGroupSideBar = props => {
    const { listBrandGroupData, listBrandGroupError, listBrandGroupLoading } = useListAllBrandGroup();

    if (listBrandGroupError) {
        return 'No items';
    }
    if (listBrandGroupLoading) {
        return <LoadingIndicator />;
    }

    return (
        <React.Fragment>
            <div className={classes.brandGroupSideBarLabel}>
                <span>{`Brands Group`}:</span>
            </div>
            <div>
                <ul>
                    {listBrandGroupData.lofBrandGroups.items.map(
                        (brandGroup, index) => {
                            const lowercase = brandGroup.name.toLowerCase();
                            const formatted = lowercase.replace(' ', '-');
                            return (
                                <li key={index} className={classes.brandGroupSideBarItem}>
                                    <Link className={classes.brandLink} to={`/brandsGroup/${formatted}.html`}>
                                        <span>{brandGroup.name}({brandGroup.brands.total_count})</span>
                                    </Link>
                                </li>
                            );
                        }
                    )}
                </ul>
            </div>
        </React.Fragment>
    );
};
export default BrandGroupSideBar;
