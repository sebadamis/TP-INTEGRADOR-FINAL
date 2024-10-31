

export function formatDate(date) {
    
    if(!date) return "No hay fecha";

    const newDate = new Date (date);
    return newDate.toLocaleDateString();

}