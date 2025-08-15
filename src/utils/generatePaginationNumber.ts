

export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {

    // Si el numero total de paginas es 7 o Menos, vamos amostrar todas las paginas sin numeros suspensivos

    if (totalPages <= 7) {
        return Array.from({length: totalPages}, (_, i) => i + 1);
    }

    // Si la pagina actual es 1, 2 o 3, vamos amostrar las primeras 3, puntos suspensivos y las ultimas 2

    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    // Si la pagina actual esta entre las ultimas, quiero mostrar las 2 primeras, puntos suspensivos, la pagina actual y los 2 ultimos

    if (currentPage >= totalPages - 2) {
        return [1, 2,'...', totalPages - 2, totalPages - 1, totalPages];
    }

    //Si la pagina actual esta en otro lugar medio, quiero mostrar las 2 primeras, puntos suspensivos, la pagina actual y los 2 ultimos

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
}