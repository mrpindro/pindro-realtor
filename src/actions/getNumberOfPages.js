const numberOfPages = (pages, setPages) => {
    switch (pages) {
        case 1:
            return setPages([1]);
        case 2:
            return setPages([1, 2]);
        case 3:
            return setPages([1, 2, 3]);
        case 4:
            return setPages([1, 2, 3, 4]);
        case 5:
            return setPages([1, 2, 3, 4, 5]);
        case 6:
            return setPages([1, 2, 3, 4, 5, 6]);
    }
}

export default numberOfPages;