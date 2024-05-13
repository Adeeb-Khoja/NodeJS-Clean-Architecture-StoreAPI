const mongo_operator_map: Record<string,string> = {
    ">" : "$gt",
    ">=" : "$gte",
    "<" : "$lt",
    "<=" : "$lte",
    "=" : "$eq",
    "!=" : "$ne"
}


/**
 * 
 * @param {string} numericFilters string of numeric filters from request query
 * @param {Array<string>} options allowed fields for numeric filters
 * @example
 * numericFilters = "price>100,price<=200"
 * options = ["price","name]
 * Return : { price: { $gt: 100, $lte: 202} }
 * @return queryObject
 */
export const mongo_numeric_filter = (numericFilters: string,options:Array<string>) => {
    
    let queryObject: Record<string,any> = {}

    const regEx = /\b(<|>|>=|=|<|<=)\b/g;

    let replaced = numericFilters.replace(regEx, (match) => `-${mongo_operator_map[match]}-` )

    const splitted_filters = replaced.split(',')  

    splitted_filters.forEach(filter => {
        const [field, operator, value] = filter.split('-')
        
        if(options.includes(field)){  //if valid field

            if(Object.keys(queryObject).includes(field)){  //if field already exists in queryObject
                queryObject[field] = {...queryObject[field], [operator]: Number(value)}
            }
            else {
            queryObject[field] = { [operator]: Number(value) }
            }
        }
    })

    return queryObject
}

    