import React from 'react';
import { useSelector } from 'react-redux'
import accounting from "accounting";

export default function Balance(){

    const operations = useSelector((state) => state.operations);
    const [total, setTotal] = React.useState([]);

    React.useEffect(() => {
        let entryArray = operations.filter((oneOperation) => oneOperation?.type == 'INCOME');
        let entryArrayTotal = entryArray?.reduce((amount, item) => item.amount + amount, 0);

        let exitArray = operations.filter((oneOperation) => oneOperation?.type == 'EXPENSE');
        let exitArrayTotal = exitArray?.reduce((amount, item) => item.amount + amount, 0);
            
        let arrayTotal = entryArrayTotal - exitArrayTotal;
        setTotal(arrayTotal);
    }, [operations]);

    return(
        <div>
            <h3>{accounting.formatMoney(total, '$', 2, '.', ',')}</h3>
        </div>
    );
}