using System.Text.Json;
namespace API.Extentions
{
    public static class HttpExtentions
    {
        //To create an extension method, you need to define a static method inside a static class. 
        //The first parameter of the method should be the type you want to extend,
        //prefixed with this keyword.This special keyword tells the C# compiler that this is an extension method.
        public static void AddPaginationHeader(this HttpResponse response, int currentPage, int totalPage
        , int itemPerpage, int totalItems)
        {
            var paginationHeader = new
            {
                currentPage,
                totalPage,
                itemPerpage,
                totalItems
            };

            response.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeader));
        }
    }
}
