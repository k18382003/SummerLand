﻿using Microsoft.EntityFrameworkCore;

namespace Application.Core
{
    public class PagedList<T>: List<T>
    {
        public PagedList(IEnumerable<T> items, int pageNumber, int count, int pageSize)
        {
            CurrentPage = pageNumber;
            PageSize = pageSize;
            TotalCount = count;
            TotalPage = (int)Math.Ceiling(count / (double)PageSize);
            AddRange(items);
        }

        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public int TotalPage { get; set; }

        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
        {
            var count = await source.CountAsync();
            var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(items, pageNumber, count, pageSize);
        }
    }
}
