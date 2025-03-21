export interface IPagination {
  currentPage: number; // Số trang hiện tại
  itemsPerPage: number; // Số lượng record tối đa trên 1 trang
  totalItems: number; // Tổng số lượng record toàn bộ trang
  totalPages: number; // Tổng số page
}

export interface IBackendResponsePagination<T> {
  meta: IPagination;
  items: T[];
}

export interface IFindAllResponse<T> {
  count: number;
  items: T[];
}

export default interface IParams {
  status: number;
  message: string;
}

