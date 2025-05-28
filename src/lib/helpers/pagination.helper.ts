import { Request } from "express";

export const getPagination = (req: Request) => {
  if (req.query) {
    let { limit = 10, page, search, sortDirection, sortField } = req.query;

    limit = limit ? Number(limit) : 10;
    const offset = page ? (Number(page) - 1) * limit : 0;
    search =
      search && typeof search === "string" && search?.trim() !== ""
        ? search.trim().toLocaleUpperCase()
        : null;
    sortDirection =
      sortDirection && typeof sortDirection === "string"
        ? sortDirection
        : "DESC";
    sortField =
      sortField && typeof sortField === "string" ? sortField : "created_at";

    return { limit, offset, search, sortDirection, sortField };
  } else {
    return {
      limit: 10,
      offset: 0,
      search: null,
      sortDirection: "DESC",
      sortField: "created_at",
    };
  }
};
