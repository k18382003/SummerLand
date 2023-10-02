
namespace Application.Core
{
	public class PagedParams
	{
		public const int MaxPageSize = 30;

		public int PageNumber { get; set; } = 1;

		private int _pageSize = 5;

		public int PageSize
		{
			get => _pageSize;
			set => _pageSize = (value > MaxPageSize) ? 50 : value;
		}

	}
}
