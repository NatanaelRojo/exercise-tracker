export const formatUTCStringToCustomDate = (utcString) => {
    let formatedDate = utcString.replace(/,/g, '');
    formatedDate = formatedDate.split(' ');

    return `${formatedDate[0]} ${formatedDate[2]} ${formatedDate[1]} ${formatedDate[3]}`;
}

// Example usage
const inputDate = "Thu, 21 Mar 2024 00:00:00 GMT";
const formattedDate = formatUTCStringToCustomDate(inputDate);

console.log(formattedDate);  // Output: "Thu Mar 21 2024"
