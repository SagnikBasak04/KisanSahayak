export function validateAndFormatDate(day, month, year) {
    // Convert the strings to numbers
    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    if (
        isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum) ||
        dayNum <= 0 || monthNum <= 0 || monthNum > 12 || yearNum <= 0 || dayNum > 31
    ) {
        return ""; //default error
    }

    const date = new Date(yearNum, monthNum - 1, dayNum);

    // Checking if the day, month, and year form a valid date
    if (
        date.getDate() !== dayNum ||
        date.getMonth() + 1 !== monthNum ||
        date.getFullYear() !== yearNum
    ) {
        return "";
    }

    // Formatting the date in DD/MM/YYYY format
    const formattedDay = dayNum.toString().padStart(2, '0');
    const formattedMonth = monthNum.toString().padStart(2, '0');
    const formattedYear = yearNum.toString();

    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
}