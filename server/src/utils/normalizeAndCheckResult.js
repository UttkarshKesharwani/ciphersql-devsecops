


function normalizeResult(userQueryResult, refQueryResult){
    console.log(userQueryResult,refQueryResult);
    let user = userQueryResult.map(row => Object.values(row).sort());
    let ref = refQueryResult.map(row => Object.values(row).sort());
    console.log(JSON.stringify(user) === JSON.stringify(ref));
    return JSON.stringify(user) === JSON.stringify(ref);
}


export default normalizeResult;
