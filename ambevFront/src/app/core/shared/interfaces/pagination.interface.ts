export class Pagination<T> {
    data: Array<T>;
    totalItems: number;
    totalPages: number;
    currentPage: number;

    constructor(
        totalItems: number = 10,
        totalPages: number = 10,
        currentPage: number = 1,
        data: T[] = []
    ) {
        this.totalItems = totalItems;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
        this.data = data;
    }
}