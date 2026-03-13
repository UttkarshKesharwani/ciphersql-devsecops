

function generateSqlQueries(sampleTables) {

    let queries = [];

    for (let table of sampleTables) {

        // CREATE TABLE
        const columns = table.columns.map(c => `${c.columnName} ${c.dataType}`).join(",");
        queries.push(
            `CREATE TABLE ${table.tableName} (${columns});`
        );


        // INSERT rows
        if (table.rows.length) {
            const values = table.rows.map(row => {
                const rowValues = Object.values(row).map(v =>
                    typeof v === "string" ? `'${v}'` : v
                );
                return `(${rowValues.join(",")})`;
            });

            queries.push(
                `INSERT INTO ${table.tableName} VALUES ${values.join(",")};`
            );
        }
    }

    return queries;
}

export default generateSqlQueries;

