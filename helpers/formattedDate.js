function formatDate(value){
    return new Date(value).toISOString().split('T')[0]
}

// console.log(formatDate("1998-07-22 07:00:00.000 +0700"))

module.exports = formatDate;